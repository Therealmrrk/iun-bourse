// ─────────────────────────────────────────────────────────────
//  EMAIL TEMPLATES
//  ✏️ EDIT: Finalize the email body text before going live.
//  Functions receive the applicant object and return { subject, html }
// ─────────────────────────────────────────────────────────────

const WA   = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '[Numéro WhatsApp IUN]'
const TNAME = process.env.NEXT_PUBLIC_MixxbyYas_NAME   || '[Nom du compte TMoney]'
const TNUM  = process.env.NEXT_PUBLIC_MixxbyYas_NUMBER || '[Numéro TMoney]'
const URL   = process.env.NEXT_PUBLIC_APP_URL       || 'https://bourse.iun.tg'

// ── Shared HTML wrapper ───────────────────────────────────────
const wrap = (body) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f2eb; margin: 0; padding: 20px; }
    .card { background: #fff; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: #1D4492; padding: 28px 36px; }
    .header h1 { color: #C9A84C; font-size: 22px; margin: 0; }
    .header p  { color: rgba(255,255,255,0.6); font-size: 13px; margin: 6px 0 0; }
    .body   { padding: 32px 36px; color: #1a1208; line-height: 1.7; }
    .body p { margin: 0 0 14px; }
    .highlight { background: #1D4492; border-radius: 8px; padding: 16px 20px; color: #C9A84C; font-size: 16px; font-weight: bold; text-align: center; margin: 20px 0; }
    .steps { background: #f5f2eb; border-radius: 8px; padding: 16px 20px; margin: 16px 0; }
    .steps li { margin: 6px 0; color: #1a1208; font-size: 14px; }
    .footer { background: #f5f2eb; padding: 20px 36px; border-top: 1px solid #e8e5de; font-size: 12px; color: #9b9488; text-align: center; }
    .wa-btn { display: inline-block; background: #25D366; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Institut Universitaire Nobel</h1>
      <p>Bourse d'Excellence de l'Institut Universitaire Nobel 2026</p>
    </div>
    <div class="body">${body}</div>
    <div class="footer">
      Institut Universitaire Nobel · Lomé, Togo · <a href="${URL}">${URL}</a>
    </div>
  </div>
</body>
</html>`

// ─────────────────────────────────────────────────────────────
//  1. ADMIN NOTIFICATION — sent when applicant clicks "Send"
// ─────────────────────────────────────────────────────────────
export function adminNotificationEmail(app) {
  const examMode = app.in_togo ? 'Présentiel (Lomé)' : 'En ligne'
  return {
    subject: `[Bourse Institut Universitaire Nobel] Nouvelle candidature — ${app.full_name}`,
    html: wrap(`
      <p>Une nouvelle candidature vient d'être soumise.</p>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        ${row('Référence', app.id)}
        ${row('Nom', app.full_name)}
        ${row('Email', app.email)}
        ${row('Téléphone', app.phone_code + ' ' + app.phone_number)}
        ${row('Nationalité', app.nationality)}
        ${row('Examen', examMode)}
        ${row('Date', new Date().toLocaleString('fr-FR'))}
      </table>
      <p style="margin-top:20px;">
        <a href="${URL}/admin" style="background:#1D4492;color:#C9A84C;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
          Voir le dossier dans le tableau de bord →
        </a>
      </p>
    `),
  }
}

// ─────────────────────────────────────────────────────────────
//  2. ACCEPTANCE EMAIL — sent when admin clicks Accept
//  ✏️ EDIT: Customize the body text below for each scenario.
// ─────────────────────────────────────────────────────────────
export function acceptanceEmail(app, lang = 'fr') {
  const name = app.full_name

  if (lang === 'fr') {
    return {
      subject: 'Confirmation de votre candidature - Institut Universitaire Nobel',
      html: wrap(`
        <p>Cher(e) <strong>${name}</strong>,</p>
        <p>Nous vous informons que votre preuve de paiement a été vérifiée avec succès et que votre candidature pour la bourse de l'Institut Universitaire Nobel a été officiellement <strong>acceptée</strong>.</p>
        <p><strong>Quelle est la prochaine étape ?</strong> La date officielle, l'heure et les modalités d'accès à votre examen d'évaluation vous seront communiquées très prochainement dans un second e-mail. Pensez à vérifier régulièrement votre boîte de réception ainsi que vos courriers indésirables (spams).</p>
        <p>Pour toute question urgente, n'hésitez pas à nous contacter par e-mail ou directement via notre assistance WhatsApp au <strong>${WA}</strong>.</p>
        <p style="margin-top:20px;">Cordialement,<br/><strong>L’équipe d’administration</strong><br/>Institut Universitaire Nobel</p>
      `),
    }
  }

  return {
    subject: 'Application Confirmation - Institut Universitaire Nobel',
    html: wrap(`
      <p>Dear <strong>${name}</strong>,</p>
      <p>We are pleased to inform you that your payment receipt has been successfully verified, and your application for the Institut Universitaire Nobel scholarship has been officially <strong>accepted</strong>.</p>
      <p><strong>What happens next?</strong> The official date, time, and access guidelines for your evaluation exam will be shared with you shortly in a separate email. Please make sure to monitor your inbox and your spam folder regularly.</p>
      <p>For any urgent inquiries, feel free to reply to this email or reach out to us directly via WhatsApp at <strong>${WA}</strong>.</p>
      <p style="margin-top:20px;">Best regards,<br/><strong>The Admissions Team</strong><br/>Institut Universitaire Nobel</p>
    `),
  }
}

// ─────────────────────────────────────────────────────────────
//  3. REJECTION EMAIL — sent when admin clicks Decline
//  ✏️ EDIT: Customize the body text below.
// ─────────────────────────────────────────────────────────────
export function rejectionEmail(app, lang = 'fr') {
  const name = app.full_name

  if (lang === 'fr') {
    return {
      subject: 'Action requise : Preuve de paiement non valide — IUN',
      html: wrap(`
        <p>Cher(e) <strong>${name}</strong>,</p>
        <p>Après vérification de votre dossier, nous vous informons que nous n'avons pas pu valider la preuve de paiement que vous avez soumise.</p>
        <p><strong>Comment corriger cela ?</strong> Votre dossier a été replacé en mode modification. Nous vous invitons à vous reconnecter sur le portail de candidature pour importer un reçu de paiement valide (capture d'écran lisible du transfert ou reçu bancaire officiel).</p>
        <p>Si vous rencontrez des difficultés ou estimez qu'il s'agit d'une erreur, contactez immédiatement notre équipe sur WhatsApp au <strong>${WA}</strong> afin de régulariser votre situation.</p>
        <p style="margin-top:20px;">Cordialement,<br/><strong>L’équipe d’administration</strong><br/>Institut Universitaire Nobel</p>
      `),
    }
  }

  return {
    subject: 'Action Required: Invalid Payment Proof — IUN',
    html: wrap(`
      <p>Dear <strong>${name}</strong>,</p>
      <p>Following a review of your file, we regret to inform you that we could not validate the payment receipt you submitted.</p>
      <p><strong>How to fix this?</strong> Your application dashboard has been unlocked. Please log back into the application portal to upload a valid proof of payment (a clear screenshot of the mobile transfer confirmation or an official banking receipt).</p>
      <p>If you encounter any technical issues or believe this is an error, please reach out to our team immediately via WhatsApp at <strong>${WA}</strong> to resolve the issue.</p>
      <p style="margin-top:20px;">Best regards,<br/><strong>The Admissions Team</strong><br/>Institut Universitaire Nobel</p>
    `),
  }
}

function row(label, value) {
  return `<tr>
    <td style="padding:6px 0;color:#9b9488;font-size:12px;text-transform:uppercase;width:140px;">${label}</td>
    <td style="padding:6px 0;font-weight:600;">${value || '—'}</td>
  </tr>`
}
