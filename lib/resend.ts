import { Resend } from 'resend';
import { getProfile } from './storage';

export async function sendBusinessCard(recipientEmail: string, senderUrl?: string) {
  const profile = getProfile();
  const apiKey = profile.settings.resendApiKey || process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Resend API key not configured. Set it in admin dashboard or .env.local');
  }

  const resend = new Resend(apiKey);
  const { personal, social, media } = profile;

  const cardUrl = senderUrl || personal.website || 'http://localhost:3000';
  const waNumber = social.whatsapp || personal.phone;
  const cleanWa = waNumber ? waNumber.replace(/[^0-9]/g, '') : '';

  const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kartu Nama Digital — ${personal.fullName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f7; color: #1d1d1f; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 580px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.06); }
    
    /* Header Banner */
    .header-banner { background: #161618; padding: 28px 32px; text-align: left; }
    .badge { display: inline-block; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #f59e0b; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 4px 10px; rounded-radius: 20px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px; }
    .banner-company { color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }
    .banner-sub { color: #86868b; font-size: 12px; margin: 4px 0 0; }

    /* Body Content */
    .content { padding: 32px; }
    .greeting { font-size: 16px; line-height: 1.6; color: #1d1d1f; margin-top: 0; margin-bottom: 24px; }
    
    /* Profile ID Snapshot */
    .profile-box { background: #fbfbfd; border: 1px solid #e5e5e7; border-radius: 16px; padding: 24px; margin-bottom: 28px; }
    .avatar-cell { vertical-align: middle; width: 64px; }
    .avatar { width: 64px; height: 64px; border-radius: 14px; object-fit: cover; border: 2px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); background: #e5e5e7; }
    .avatar-initials { width: 64px; height: 64px; border-radius: 14px; background: #1d1d1f; color: #ffffff; font-size: 22px; font-weight: 700; text-align: center; line-height: 64px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .info-cell { vertical-align: middle; padding-left: 20px; }
    .person-name { font-size: 20px; font-weight: 700; color: #1d1d1f; margin: 0; letter-spacing: -0.01em; }
    .person-title { font-size: 14px; font-weight: 600; color: #0071e3; margin: 3px 0 0; }
    .person-company { font-size: 13px; color: #6e6e73; margin: 2px 0 0; }
    .person-tagline { font-size: 13px; font-style: italic; color: #86868b; margin: 12px 0 0; line-height: 1.4; border-top: 1px dashed #e5e5e7; padding-top: 10px; }

    /* Contact Details Table */
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .details-table td { padding: 10px 0; border-bottom: 1px solid #f2f2f4; font-size: 14px; }
    .label-col { width: 100px; color: #86868b; font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
    .value-col { color: #1d1d1f; font-weight: 500; }
    .value-col a { color: #0071e3; text-decoration: none; }

    /* Action Buttons */
    .btn-primary { display: block; background: #0071e3; color: #ffffff !important; font-size: 15px; font-weight: 600; text-align: center; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-bottom: 12px; }
    .btn-secondary { display: block; background: #25D366; color: #ffffff !important; font-size: 14px; font-weight: 600; text-align: center; padding: 12px 28px; border-radius: 12px; text-decoration: none; }

    /* Footer */
    .footer { text-align: center; padding-top: 24px; font-size: 12px; color: #86868b; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <!-- Header Banner -->
      <div class="header-banner">
        <div class="badge">Official Digital Credentials</div>
        <h1 class="banner-company">${personal.company || 'Professional Identity'}</h1>
        <p class="banner-sub">Kartu Nama Digital Interaktif</p>
      </div>

      <!-- Main Body -->
      <div class="content">
        <p class="greeting">
          Halo, salam kenal!<br/><br/>
          Terima kasih telah menyimpan kontak saya. Melalui email ini, saya melampirkan profil resmi dan informasi kontak yang dapat Anda simpan kapan saja:
        </p>

        <!-- Profile Box Snapshot -->
        <div class="profile-box">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td class="avatar-cell">
                ${
                  media.photoUrl
                    ? `<img src="${media.photoUrl}" alt="${personal.fullName}" class="avatar" />`
                    : `<div class="avatar-initials">${personal.fullName ? personal.fullName.substring(0, 2).toUpperCase() : 'ID'}</div>`
                }
              </td>
              <td class="info-cell">
                <h2 class="person-name">${personal.fullName}</h2>
                <div class="person-title">${personal.title || 'Creative Professional'}</div>
                ${personal.company ? `<div class="person-company">${personal.company}</div>` : ''}
              </td>
            </tr>
          </table>

          ${personal.tagline ? `<div class="person-tagline">&ldquo;${personal.tagline}&rdquo;</div>` : ''}
        </div>

        <!-- Contact Channels Table -->
        <table class="details-table" role="presentation" cellspacing="0" cellpadding="0" border="0">
          ${personal.email ? `
          <tr>
            <td class="label-col">Email</td>
            <td class="value-col"><a href="mailto:${personal.email}">${personal.email}</a></td>
          </tr>` : ''}

          ${personal.phone ? `
          <tr>
            <td class="label-col">Telepon</td>
            <td class="value-col"><a href="tel:${personal.phone}">${personal.phone}</a></td>
          </tr>` : ''}

          ${personal.website ? `
          <tr>
            <td class="label-col">Website</td>
            <td class="value-col"><a href="${personal.website}" target="_blank">${personal.website}</a></td>
          </tr>` : ''}

          ${personal.address ? `
          <tr>
            <td class="label-col">Lokasi</td>
            <td class="value-col">${personal.address}</td>
          </tr>` : ''}

          ${social.linkedin ? `
          <tr>
            <td class="label-col">LinkedIn</td>
            <td class="value-col"><a href="${social.linkedin}" target="_blank">Lihat Profil LinkedIn &rarr;</a></td>
          </tr>` : ''}
        </table>

        <!-- Action CTAs -->
        <a href="${cardUrl}" class="btn-primary" target="_blank">
          Buka Kartu &amp; Portfolio Interaktif 3D &rarr;
        </a>

        ${cleanWa ? `
        <a href="https://wa.me/${cleanWa}" class="btn-secondary" target="_blank">
          Chat WhatsApp Langsung
        </a>` : ''}
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      Email ini dikirim otomatis atas permintaan pengunjung kartu nama digital <strong>${personal.fullName}</strong>.<br/>
      Simpan email ini untuk menjaga kontak profesional Anda tetap terhubung.
    </div>
  </div>
</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: `${personal.fullName || 'Digital ID'} <onboarding@resend.dev>`,
    to: recipientEmail,
    subject: `Kartu Nama Digital — ${personal.fullName} (${personal.company || 'Smart ID'})`,
    html: emailHtml,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
