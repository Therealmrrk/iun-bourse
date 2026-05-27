'use client'
import { useState, useEffect } from 'react'
import { browserClient } from '@/lib/supabase'

export default function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState(null) // Holds the active receipt URL for the preview modal

  // 1. Fetch applications from Supabase on component mount
  useEffect(() => {
    async function fetchApplications() {
      try {
        setIsLoading(true)
        const { data, error } = await browserClient
          .from('applications')
          .select('*')
          .order('created_at', { ascending: false }) // Newest applications show first

        if (error) throw error
        setApplications(data || [])
      } catch (err) {
        console.error('Error loading applications:', err.message)
        alert('Impossible de charger les candidatures.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  // 2. Generate a signed or public URL to safely view the receipt file from your storage bucket
  const handleViewReceipt = async (filePath) => {
    try {
      // If your bucket is fully Public, you can fetch the public URL instantly:
      const { data } = browserClient.storage
        .from('documents')
        .getPublicUrl(filePath)

      if (!data?.publicUrl) throw new Error('URL generation failed')
      
      // Set the URL state to open our custom side/center overlay modal
      setSelectedReceiptUrl(data.publicUrl)
    } catch (err) {
      console.error('Error fetching file link:', err.message)
      alert('Erreur lors de la récupération du fichier de reçu.')
    }
  }

  // 3. Update application review status (Approve / Reject)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await browserClient
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      // Update local state smoothly so the UI reflects the status change instantly
      setApplications(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      )
    } catch (err) {
      console.error('Status patch failed:', err.message)
      alert('Échec de la mise à jour du statut.')
    }
  }

  return (
    <div className="min-h-screen bg-cream p-6 font-sans text-navy">
      
      {/* Upper Dashboard Header Navigation */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between border-b-2 border-gold/30 pb-6 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-navy">
            Panneau d'Administration
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Gestion et vérification des bordereaux de la Bourse d'Excellence 2026
          </p>
        </div>
        
        {/* Dynamic Metric Indicator Badges */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="bg-white px-4 py-2 rounded-lg border border-gold/20 shadow-sm text-center">
            <span className="block text-xs text-gray-500 uppercase font-bold">Total Reçus</span>
            <span className="text-xl font-bold text-navy">{applications.length}</span>
          </div>
        </div>
      </div>

      {/* Main Data Render Arena */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-500">Chargement des dossiers...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white border rounded-xl p-12 text-center text-gray-400">
            Aucune candidature n'a été soumise pour le moment.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl border border-gold/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-navy text-gold text-xs font-bold uppercase tracking-wider border-b border-gold/30">
                    <th className="px-6 py-4">Nom Complet</th>
                    <th className="px-6 py-4">Adresse Email</th>
                    <th className="px-6 py-4">Justificatif de Paiement</th>
                    <th className="px-6 py-4">Statut Dossier</th>
                    <th className="px-6 py-4 text-right">Actions de Validation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-cream/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-navy">{app.full_name}</td>
                      <td className="px-6 py-4 text-gray-600">{app.email}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewReceipt(app.payment_proof_url)}
                          className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-gold/10 hover:bg-gold/20 text-dark border border-gold/30 px-3 py-1.5 rounded-md transition"
                        >
                          👁️ Voir le Reçu
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
                          app.status === 'approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status === 'approved' ? 'Validé' :
                           app.status === 'rejected' ? 'Rejeté' : 'En Attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'approved')}
                          disabled={app.status === 'approved'}
                          className="bg-green-600 hover:bg-green-700 disabled:opacity-30 text-white text-xs font-bold px-3 py-1.5 rounded transition"
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                          disabled={app.status === 'rejected'}
                          className="bg-red-500 hover:bg-red-600 disabled:opacity-30 text-white text-xs font-bold px-3 py-1.5 rounded transition"
                        >
                          Rejeter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* --- INLINE PAYMENT RECEIPT PREVIEW MODAL --- */}
      {selectedReceiptUrl && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden border-2 border-gold flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-navy p-4 flex items-center justify-between border-b border-gold/20">
              <h3 className="text-gold font-display font-bold text-lg">Justificatif de Paiement de l'Étudiant</h3>
              <button 
                onClick={() => setSelectedReceiptUrl(null)}
                className="text-gray-400 hover:text-white font-bold text-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Live Media Frame Container */}
            <div className="p-4 bg-gray-100 flex-1 overflow-y-auto flex items-center justify-center min-h-[400px]">
              {selectedReceiptUrl.toLowerCase().endsWith('.pdf') ? (
                <iframe 
                  src={selectedReceiptUrl} 
                  className="w-full h-[60vh] rounded border shadow-inner"
                  title="PDF Receipt Document Frame"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={selectedReceiptUrl} 
                  alt="Student Payment Proof receipt object" 
                  className="max-w-full max-h-[60vh] object-contain rounded shadow-md border"
                />
              )}
            </div>

            {/* Close Actions Footer */}
            <div className="bg-cream/40 p-3 border-t text-right">
              <button
                onClick={() => setSelectedReceiptUrl(null)}
                className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-navy-light transition"
              >
                Fermer l'Aperçu
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}