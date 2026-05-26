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
    .header { background: #0C1B33; padding: 28px 36px; }
    .header h1 { color: #C9A84C; font-size: 22px; margin: 0; }
    .header p  { color: rgba(255,255,255,0.6); font-size: 13px; margin: 6px 0 0; }
    .body   { padding: 32px 36px; color: #1a1208; line-height: 1.7; }
    .body p { margin: 0 0 14px; }
    .highlight { background: #0C1B33; border-radius: 8px; padding: 16px 20px; color: #C9A84C; font-size: 16px; font-weight: bold; text-align: center; margin: 20px 0; }
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
        <a href="${URL}/admin" style="background:#0C1B33;color:#C9A84C;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
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
    // ✏️ EDIT French acceptance email
    const examInfo = app.in_togo
      ? `<p>Étant au Togo, votre examen de sélection se déroulera <strong>en présentiel à Lomé</strong>. Vous serez contacté(e) prochainement avec la date, l'heure et l'adresse exacte.</p>`
      : `<p>Votre examen de sélection se déroulera <strong>en ligne</strong>. Vous recevrez prochainement par email le lien de connexion et toutes les modalités nécessaires.</p>`

    return {
      subject: '🎉 Félicitations ! Votre candidature à la Bourse de l\'Institut Universitaire Nobel 2025 a été acceptée',
      html: wrap(`
        <p>Cher(e) <strong>${name}</strong>,</p>
        <p>Nous avons le plaisir de vous informer que votre paiement a été <strong>confirmé</strong> et que votre candidature à la <strong>Bourse d'Excellence de l'Institut Universitaire Nobel 2025</strong> a été <strong>acceptée</strong>.</p>
        ${examInfo}
        <p>✏️ EDIT: Ajoutez ici toute information supplémentaire (documents à apporter, prérequis, etc.)</p>
        <p>Pour toute question, n'hésitez pas à nous contacter :</p>
        <a href="https://wa.me/${WA.replace('+','')}" class="wa-btn">📱 WhatsApp : ${WA}</a>
        <p style="margin-top:20px;">Cordialement,<br/><strong>L'équipe de l'Institut Universitaire Nobel</strong></p>
      `),
    }
  }

  // ✏️ EDIT English acceptance email
  const examInfoEN = app.in_togo
    ? `<p>Since you are in Togo, your selection exam will take place <strong>in person in Lomé</strong>. You will be contacted shortly with the exact date, time and location.</p>`
    : `<p>Your selection exam will take place <strong>online</strong>. You will receive the connection link and all necessary details by email shortly.</p>`

  return {
    subject: '🎉 Congratulations! Your Institut Universitaire Nobel 2025 application has been accepted',
    html: wrap(`
      <p>Dear <strong>${name}</strong>,</p>
      <p>We are pleased to inform you that your payment has been <strong>confirmed</strong> and your application for the <strong>Institut Universitaire Nobel Excellence Scholarship 2025</strong> has been <strong>accepted</strong>.</p>
      ${examInfoEN}
      <p>✏️ EDIT: Add any additional information here (documents to bring, prerequisites, etc.)</p>
      <p>For any questions, please contact us:</p>
      <a href="https://wa.me/${WA.replace('+','')}" class="wa-btn">📱 WhatsApp: ${WA}</a>
      <p style="margin-top:20px;">Regards,<br/><strong>The Institut Universitaire Nobel Team</strong></p>
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
      subject: 'Information concernant votre paiement — Bourse de l\'Institut Universitaire Nobel 2025',
      html: wrap(`
        <p>Cher(e) <strong>${name}</strong>,</p>
        <p>Après vérification, nous n'avons pas pu <strong>confirmer votre paiement</strong> de 10 000 FCFA pour la Bourse d'Excellence de l'Institut Universitaire Nobel 2025.</p>
        <p>Pour régulariser votre situation, vous pouvez :</p>
        <div class="steps">
          <ul>
            <li>Vérifier que le virement de <strong>10 000 FCFA</strong> a bien été effectué au numéro TMoney <strong>${TNUM}</strong> (${TNAME}).</li>
            <li>Retourner sur le portail <a href="${URL}">${URL}</a> depuis votre navigateur habituel et soumettre une nouvelle preuve de paiement valide.</li>
            <li>Si vous ne pouvez plus accéder au portail, envoyez directement votre reçu via WhatsApp.</li>
          </ul>
        </div>
        <a href="https://wa.me/${WA.replace('+','')}" class="wa-btn">📱 WhatsApp : ${WA}</a>
        <p style="margin-top:20px;">Cordialement,<br/><strong>L'équipe de l'Institut Universitaire Nobel</strong></p>
      `),
    }
  }

  return {
    subject: 'Information regarding your payment — Institut Universitaire Nobel Scholarship 2025',
    html: wrap(`
      <p>Dear <strong>${name}</strong>,</p>
      <p>After review, we were unable to <strong>confirm your payment</strong> of 10,000 FCFA for the Institut Universitaire Nobel Excellence Scholarship 2025.</p>
      <p>To resolve this, you can:</p>
      <div class="steps">
        <ul>
          <li>Verify that the transfer of <strong>10,000 FCFA</strong> was made to TMoney number <strong>${TNUM}</strong> (${TNAME}).</li>
          <li>Return to the portal <a href="${URL}">${URL}</a> on your usual browser and submit a new valid payment receipt.</li>
          <li>If you can no longer access the portal, send your receipt directly via WhatsApp.</li>
        </ul>
      </div>
      <a href="https://wa.me/${WA.replace('+','')}" class="wa-btn">📱 WhatsApp: ${WA}</a>
      <p style="margin-top:20px;">Regards,<br/><strong>The Institut Universitaire Nobel Team</strong></p>
    `),
  }
}

function row(label, value) {
  return `<tr>
    <td style="padding:6px 0;color:#9b9488;font-size:12px;text-transform:uppercase;width:140px;">${label}</td>
    <td style="padding:6px 0;font-weight:600;">${value || '—'}</td>
  </tr>`
}
