// ─────────────────────────────────────────────────────────────
//  ALL UI TEXT — FRENCH & ENGLISH
//  ✏️ EDIT any label, instruction, or message below.
//  The t() helper in each page picks the right language.
// ─────────────────────────────────────────────────────────────

export const translations = {
  fr: {
    // ── Navigation ────────────────────────────────────────────
    apply_btn:   'Postuler',
    admin_btn:   'Admin',
    lang_switch: 'EN',
    iun_full:    'Institut Universitaire Nobel',

    // ── Landing ───────────────────────────────────────────────
    badge:        'Candidatures Ouvertes · 1er Juin – 18 Sept. 2026',
    hero_title:   'Bourse d\'Excellence de l\'Institut Universitaire Nobel 2026',
    hero_desc:    'L\'Institut Universitaire Nobel (IUN) récompense le mérite et l\'excellence en offrant des bourses d\'études aux étudiants désireux de suivre leur cursus universitaire sur notre campus de Lomé, au Togo. Rejoignez une institution d\'élite et soumettez votre dossier dès aujourd\'hui.',
    hero_cta:     'Postuler Maintenant',
    hero_fee:     'Frais de dossier : 10 000 FCFA',
    deadline_lbl: 'Date limite',
    deadline_val: '18 Septembre 2026',

    about_title: 'Le Processus de Candidature (En 4 étapes)',

    // ✏️ EDIT: Steps shown on the landing page
    steps: [
      { num: '01', title: 'Informations & Pièces Justificatives', desc: 'Remplissez vos données personnelles et importez vos documents essentiels (Photo d\'identité, Attestation du Bac/O-Level et Acte de naissance). Vous pouvez sauvegarder votre brouillon à tout moment.' },
      { num: '02', title: 'Paiement des Frais d\'Inscription',     desc: 'Réglez les frais de dossier de 10 000 FCFA de manière sécurisée via TMoney. Un justificatif de paiement (capture d\'écran ou reçu) vous sera demandé pour valider l\'étape.' },
      { num: '03', title: 'Examen de sélection', desc: 'Participez à l\'évaluation officielle. Le test se déroulera en présentiel à Lomé pour les résidents au Togo, ou entièrement en ligne pour les candidats internationaux.' },
      { num: '04', title: 'Délibération & Résultats',           desc: 'Après étude de votre dossier et de vos résultats à l\'examen, vous recevrez une notification officielle directement par e-mail confirmant l\'attribution de votre bourse.' },
    ],

    session_banner: 'Vous avez une candidature en cours.',
    session_resume: 'Reprendre ma candidature',
    session_new:    'Nouvelle candidature',

    // ── Page indicator ────────────────────────────────────────
    page1_label: 'Informations Personnelles',
    page2_label: 'Paiement',

    // ── Page 1 ────────────────────────────────────────────────
    p1_title: 'Informations Personnelles',
    p1_sub:   'Tous les champs marqués * sont obligatoires. Utilisez vos informations officielles.',

    full_name:      'Nom Complet *',
    full_name_hint: 'Tel qu\'il apparaît sur vos documents officiels (ex : ADJOBI Kofi Mensah)',
    email:          'Adresse Email *',
    email_hint:     '@example.com',
    nationality:    'Nationalité *',
    phone:          'Numéro de Téléphone *',
    whatsapp:       'Numéro WhatsApp *',
    phone_hint:     'Sélectionnez l\'indicatif pays puis saisissez votre numéro',

    photo_label: 'Photo (style passeport) *',
    photo_hint:  'Photo récente sur fond blanc · JPG ou PNG · Max 3MB',
    photo_cam:   'Prendre une photo',
    photo_up:    'Télécharger',

    cert_label: 'Certificat A-Level / O-Level ou Baccalauréat *',
    cert_hint:  'Relevé de notes ou attestation · PDF, JPG ou PNG · Max 3MB',

    birth_label: 'Acte de Naissance *',
    birth_hint:  'PDF, JPG ou PNG · Max 3MB',

    togo_question: 'Serez-vous au Togo lors de l\'examen de sélection ?',
    togo_yes:      'Oui — je serai au Togo',
    togo_yes_sub:  'L\'examen aura lieu en présentiel à Lomé. La date et le lieu vous seront communiqués par email.',
    togo_no:       'Non — je serai hors du Togo',
    togo_no_sub:   'Votre examen se déroulera en ligne. Le lien et les modalités vous seront envoyés par email.',

    save_btn:  'Sauvegarder',
    next_btn:  'Suivant →',
    saved_msg: 'Sauvegardé ✓',

    // ── Page 2 ────────────────────────────────────────────────
    p2_title: 'Paiement des Frais de Dossier',
    p2_sub:   'Effectuez le paiement puis téléchargez votre preuve ci-dessous.',

    // ✏️ EDIT: No-refund warning
    no_refund: '⚠️  Aucun remboursement ne sera effectué après paiement, quelle que soit l\'issue de la candidature.',

    payment_title:   'Frais de Dossier',
    payment_amount:  '10 000 FCFA',
    payment_method:  'Mode de paiement : TMoney (Mixx by Yas)',
    payment_name_lbl:    'Nom du compte :',
    payment_number_lbl:  'Numéro TMoney :',

    payment_steps: [
      'Envoyez 10 000 FCFA au numéro TMoney indiqué ci-dessus.',
      'Conservez le reçu de transaction (capture d\'écran ou reçu papier photographié).',
      'Téléchargez ce reçu dans le champ ci-dessous.',
    ],

    proof_label: 'Preuve de Paiement *',
    proof_hint:  'Capture d\'écran ou reçu · JPG, PNG ou PDF · Max 1MB',

    previous_btn: '← Précédent',
    send_btn:     'Envoyer ma candidature',

    send_modal_title:   'Confirmer l\'envoi',
    send_modal_body:    'Une fois envoyée, votre candidature sera définitivement verrouillée. Vous ne pourrez plus modifier aucune information. Confirmez-vous l\'envoi ?',
    send_modal_confirm: 'Oui, envoyer',
    send_modal_cancel:  'Annuler',

    // ── Success ───────────────────────────────────────────────
    success_title:   'Candidature envoyée !',
    success_ref_lbl: 'Votre numéro de référence',
    success_msg:     'Votre dossier a bien été reçu. Votre preuve de paiement sera vérifiée et vous recevrez un email avec les prochaines étapes.',
    success_note:    'Conservez ce numéro de référence pour tout suivi.',
    success_contact: 'Pour toute question, contactez-nous sur WhatsApp :',
    back_home:       'Retour à l\'accueil',

    // ── Resubmit (payment rejected) ───────────────────────────
    resubmit_title: 'Paiement non confirmé',
    resubmit_msg:   'Votre preuve de paiement précédente n\'a pas pu être confirmée. Veuillez soumettre un nouveau justificatif.',
    resubmit_btn:   'Soumettre une nouvelle preuve',

    // ── Errors ────────────────────────────────────────────────
    err_required:    'Veuillez remplir tous les champs obligatoires.',
    err_dup_email:   'Cette adresse email est déjà utilisée.',
    err_dup_phone:   'Ce numéro de téléphone est déjà utilisé.',
    err_dup_wp:      'Ce numéro WhatsApp est déjà utilisé.',
    err_file_size:   (max) => `Fichier trop volumineux. Maximum ${max}MB.`,
    err_file_type:   'Type de fichier non accepté.',
    err_upload_fail: 'Échec du téléchargement. Veuillez réessayer.',
    err_generic:     'Une erreur s\'est produite. Veuillez réessayer.',

    // ── File upload shared ─────────────────────────────────────
    choose_file: 'Choisir un fichier',
    or_drag:     'ou glisser-déposer ici',
    uploading:   'Téléchargement…',
    remove_file: 'Supprimer',
    sel_placeholder: '— Sélectionner —',

    // ── Admin login ───────────────────────────────────────────
    admin_login_title: 'Administration de l\'Institut Universitaire Nobel',
    admin_email_lbl:   'Email administrateur',
    admin_pass_lbl:    'Mot de passe',
    admin_login_btn:   'Connexion',
    admin_login_err:   'Email ou mot de passe incorrect.',

    // ── Admin dashboard ───────────────────────────────────────
    dash_title:    'Tableau de Bord',
    dash_sub:      'Bourse d\'Excellence de l\'Institut Universitaire Nobel 2025',
    stat_total:    'Total',
    stat_pending:  'En Attente',
    stat_accepted: 'Acceptées',
    stat_rejected: 'Rejetées',
    filter_all:      'Toutes',
    filter_pending:  'En Attente',
    filter_accepted: 'Acceptées',
    filter_rejected: 'Rejetées',
    search_ph: 'Rechercher par nom ou email…',
    th_ref:     'Référence',
    th_name:    'Nom',
    th_email:   'Email',
    th_exam:    'Examen',
    th_status:  'Statut',
    th_date:    'Date',
    exam_inperson: 'Présentiel',
    exam_online:   'En ligne',
    view_btn:    'Voir',
    no_results:  'Aucune candidature trouvée.',
    logout_btn:  'Déconnexion',

    // ── Admin detail ──────────────────────────────────────────
    back_list:    '← Retour à la liste',
    detail_title: 'Dossier de Candidature',
    sec_personal: 'Informations Personnelles',
    sec_docs:     'Documents',
    sec_payment:  'Paiement',
    sec_admin:    'Décision Administrative',
    view_doc:     'Voir le document',
    notes_lbl:    'Notes internes',
    save_notes:   'Enregistrer',
    saved_notes:  'Enregistré ✓',

    accept_btn: '✓  Accepter le paiement',
    decline_btn: '✗  Rejeter le paiement',

    accept_modal_title: 'Confirmer l\'acceptation',
    accept_modal_body:  'Un email de félicitations sera automatiquement envoyé à ce candidat. Cette action est irréversible.',
    accept_confirm:     'Confirmer et envoyer l\'email',

    decline_modal_title: 'Confirmer le rejet',
    decline_modal_body:  'Un email informant le candidat du rejet de son paiement sera envoyé. Cette action est irréversible.',
    decline_confirm:     'Confirmer et envoyer l\'email',

    modal_cancel:   'Annuler',
    email_preview:  'Aperçu de l\'email',
    email_sent_ok:  'Email envoyé avec succès ✓',

    status_draft_p1:         'Brouillon (page 1)',
    status_draft_p2:         'Brouillon (page 2)',
    status_submitted:        'En attente',
    status_payment_accepted: 'Accepté',
    status_payment_rejected: 'Rejeté',
  },

  // ─────────────────────────────────────────────────────────
  en: {
    apply_btn:   'Apply',
    admin_btn:   'Admin',
    lang_switch: 'FR',
    iun_full:    'Institut Universitaire Nobel',

    badge:        'Applications Open · June 1 – Sept 18, 2026',
    hero_title:   'Institut Universitaire Nobel Excellence Scholarship 2026',
    hero_desc:    'Institut Universitaire Nobel (IUN) rewards merit and academic potential by providing tuition scholarships to deserving students wishing to pursue their university education at our Lomé campus in Togo. Secure your future and submit your application today.',
    hero_cta:     'Apply Now',
    hero_fee:     'Application fee: 10,000 FCFA',
    deadline_lbl: 'Deadline',
    deadline_val: 'September 18, 2026',

    about_title: 'The Application Process (4 Simple Steps)',

    steps: [
      { num: '01', title: 'Profile & Academic Records',    desc: 'Enter your personal details and upload your required documents (Passport-sized photo, A-Level/O-Level Certificate, and Birth Certificate). You can save your progress as a draft and return to edit at any time.' },
      { num: '02', title: 'Application Fee Payment',           desc: 'Pay the non-refundable 10,000 FCFA application fee securely via TMoney. You will need to upload your payment receipt or a screenshot confirmation to validate your file.' },
      { num: '03', title: 'Selection Examination',        desc: 'Sit for the official scholarship evaluation. The screening will take place in person in Lomé for applicants residing in Togo, or entirely online for international candidates.' },
      { num: '04', title: 'Deliberation & Results',               desc: 'Following the review of your academic file and exam performance, an official notification will be sent directly to your email regarding your scholarship status.' },
    ],

    session_banner: 'You have an application in progress.',
    session_resume: 'Resume my application',
    session_new:    'New application',

    page1_label: 'Personal Information',
    page2_label: 'Payment',

    p1_title: 'Personal Information',
    p1_sub:   'All fields marked * are required. Use your official information.',

    full_name:      'Full Name *',
    full_name_hint: 'As it appears on your official documents (e.g.: ADJOBI Kofi Mensah)',
    email:          'Email Address *',
    nationality:    'Nationality *',
    phone:          'Phone Number *',
    whatsapp:       'WhatsApp Number *',
    phone_hint:     'Select country code then enter your number',

    photo_label: 'Photo (passport style) *',
    photo_hint:  'Recent photo on white background · JPG or PNG · Max 3MB',
    photo_cam:   'Take a photo',
    photo_up:    'Upload',

    cert_label: 'A-Level / O-Level Certificate or Baccalaureate *',
    cert_hint:  'Transcript or certificate · PDF, JPG or PNG · Max 3MB',

    birth_label: 'Birth Certificate *',
    birth_hint:  'PDF, JPG or PNG · Max 3MB',

    togo_question: 'Will you be in Togo during the selection exam?',
    togo_yes:      'Yes — I will be in Togo',
    togo_yes_sub:  'The exam will be held in person in Lomé. The date and location will be communicated by email.',
    togo_no:       'No — I will be outside Togo',
    togo_no_sub:   'Your exam will take place online. The link and instructions will be sent by email.',

    save_btn:  'Save',
    next_btn:  'Next →',
    saved_msg: 'Saved ✓',

    p2_title: 'Application Fee Payment',
    p2_sub:   'Make the payment then upload your proof below.',

    no_refund: '⚠️  No refunds will be issued after payment, regardless of the application outcome.',

    payment_title:       'Application Fee',
    payment_amount:      '10,000 FCFA',
    payment_method:      'Payment method: TMoney (Mixx by Yas)',
    payment_name_lbl:    'Account name:',
    payment_number_lbl:  'TMoney number:',

    payment_steps: [
      'Send 10,000 FCFA to the TMoney number shown above.',
      'Save the transaction receipt (screenshot or photo of paper receipt).',
      'Upload this receipt in the field below.',
    ],

    proof_label: 'Payment Evidence *',
    proof_hint:  'Screenshot or receipt · JPG, PNG or PDF · Max 1MB',

    previous_btn: '← Previous',
    send_btn:     'Submit my application',

    send_modal_title:   'Confirm submission',
    send_modal_body:    'Once submitted, your application will be permanently locked. You will not be able to modify any information. Do you confirm?',
    send_modal_confirm: 'Yes, submit',
    send_modal_cancel:  'Cancel',

    success_title:   'Application submitted!',
    success_ref_lbl: 'Your reference number',
    success_msg:     'Your application has been received. Your payment proof will be verified and you will receive an email with the next steps.',
    success_note:    'Keep this reference number for any follow-up.',
    success_contact: 'For any questions, contact us on WhatsApp:',
    back_home:       'Back to home',

    resubmit_title: 'Payment not confirmed',
    resubmit_msg:   'Your previous payment proof could not be confirmed. Please submit a new receipt.',
    resubmit_btn:   'Submit new evidence',

    err_required:    'Please fill in all required fields.',
    err_dup_email:   'This email address is already in use.',
    err_dup_phone:   'This phone number is already in use.',
    err_dup_wp:      'This WhatsApp number is already in use.',
    err_file_size:   (max) => `File too large. Maximum ${max}MB.`,
    err_file_type:   'File type not accepted.',
    err_upload_fail: 'Upload failed. Please try again.',
    err_generic:     'An error occurred. Please try again.',

    choose_file:      'Choose file',
    or_drag:          'or drag and drop here',
    uploading:        'Uploading…',
    remove_file:      'Remove',
    sel_placeholder:  '— Select —',

    admin_login_title: 'Institut Universitaire Nobel Administration',
    admin_email_lbl:   'Admin email',
    admin_pass_lbl:    'Password',
    admin_login_btn:   'Sign In',
    admin_login_err:   'Incorrect email or password.',

    dash_title:    'Dashboard',
    dash_sub:      'Institut Universitaire Nobel Excellence Scholarship 2025',
    stat_total:    'Total',
    stat_pending:  'Pending',
    stat_accepted: 'Accepted',
    stat_rejected: 'Rejected',
    filter_all:      'All',
    filter_pending:  'Pending',
    filter_accepted: 'Accepted',
    filter_rejected: 'Rejected',
    search_ph: 'Search by name or email…',
    th_ref:     'Reference',
    th_name:    'Name',
    th_email:   'Email',
    th_exam:    'Exam',
    th_status:  'Status',
    th_date:    'Date',
    exam_inperson: 'In person',
    exam_online:   'Online',
    view_btn:    'View',
    no_results:  'No applications found.',
    logout_btn:  'Logout',

    back_list:    '← Back to list',
    detail_title: 'Application File',
    sec_personal: 'Personal Information',
    sec_docs:     'Documents',
    sec_payment:  'Payment',
    sec_admin:    'Administrative Decision',
    view_doc:     'View document',
    notes_lbl:    'Internal notes',
    save_notes:   'Save',
    saved_notes:  'Saved ✓',

    accept_btn:  '✓  Accept payment',
    decline_btn: '✗  Reject payment',

    accept_modal_title: 'Confirm acceptance',
    accept_modal_body:  'A congratulatory email will automatically be sent to this applicant. This action is irreversible.',
    accept_confirm:     'Confirm and send email',

    decline_modal_title: 'Confirm rejection',
    decline_modal_body:  'An email notifying the applicant of the payment rejection will be sent. This action is irreversible.',
    decline_confirm:     'Confirm and send email',

    modal_cancel:  'Cancel',
    email_preview: 'Email preview',
    email_sent_ok: 'Email sent successfully ✓',

    status_draft_p1:         'Draft (page 1)',
    status_draft_p2:         'Draft (page 2)',
    status_submitted:        'Pending',
    status_payment_accepted: 'Accepted',
    status_payment_rejected: 'Rejected',
  },
}
