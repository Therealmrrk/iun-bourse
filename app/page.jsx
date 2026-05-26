'use client'
import { useState } from 'react'
import { browserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function RegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '' })
  const [receiptFile, setReceiptFile] = useState(null) // Holds the uploaded file

  // --- THIS IS WHERE THE CODE GOES ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault() // Prevents the page from refreshing automatically
    
    if (!receiptFile) {
      alert("Please upload your payment receipt.")
      return
    }

    try {
      setIsLoading(true);

      // 1. Upload receipt file to the bucket
      const fileExtension = receiptFile.name.split('.').pop();
      const filePath = `receipts/${Date.now()}.${fileExtension}`;

      const { data: uploadData, error: uploadError } = await browserClient.storage
        .from('documents')
        .upload(filePath, receiptFile);

      if (uploadError) throw uploadError;

      // 2. Insert application row linking to that specific file path
      const { error: dbError } = await browserClient
        .from('applications')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            payment_proof_url: filePath, // Storing the path for the Admin to look up
            status: 'submitted'          // Sets up the Admin's review queue
          }
        ]);

      if (dbError) throw dbError;

      // 3. Clear loading state and redirect applicant away from the form
      // Change '/dashboard/status' to whatever your student dashboard/success route is named
      router.push('/dashboard/status');

    } catch (error) {
      console.error("Submission pipeline failed:", error.message);
      alert(`Error processing registration: ${error.message}`);
    } finally {
      setIsLoading(false); // Unfreezes the button regardless of outcome
    }
  }

  return (
    <form onSubmit={handleRegisterSubmit}>
      {/* Your form inputs for name, email, and file upload dropzone here */}
      <input type="text" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
      <input type="file" onChange={(e) => setReceiptFile(e.target.files[0])} />
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit Application'}
      </button>
    </form>
  )
}