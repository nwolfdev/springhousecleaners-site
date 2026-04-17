// Cloudflare Pages Function — handles contact form submissions
// POST /api/contact → sends email via SendGrid to info@springhousecleaners.com
//
// Setup:
// 1. In your SendGrid account, verify springhousecleaners.com as a sending domain
//    (Settings → Sender Authentication → Authenticate Your Domain)
// 2. SendGrid will show you DNS records to add. Add them in Cloudflare DNS.
// 3. Create a SendGrid API key with "Mail Send" permission
// 4. In Cloudflare Pages dashboard: Settings → Environment variables → add:
//    - SENDGRID_API_KEY = (the key)
//    - CONTACT_EMAIL    = info@springhousecleaners.com
//    - FROM_EMAIL       = noreply@springhousecleaners.com (or whatever you authenticated)
// 5. Redeploy. Form submissions flow through this function.

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { name, email, phone, city, service, message, botcheck } = data;

    // Honeypot — bots fill this, humans don't see it
    if (botcheck) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Basic validation
    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Name and email are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const toEmail = env.CONTACT_EMAIL || 'info@springhousecleaners.com';
    const fromEmail = env.FROM_EMAIL || 'noreply@springhousecleaners.com';

    // Build email body
    const emailHtml = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; line-height: 1.6; color: #1a1a1a;">
        <h2 style="color: #0D4F4C; border-bottom: 2px solid #D9593A; padding-bottom: 8px;">
          New Quote Request from springhousecleaners.com
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; font-weight: 600; width: 120px;">Name:</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600;">Email:</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; font-weight: 600;">Phone:</td><td>${escapeHtml(phone)}</td></tr>` : ''}
          ${city ? `<tr><td style="padding: 8px 0; font-weight: 600;">City:</td><td>${escapeHtml(city)}</td></tr>` : ''}
          ${service ? `<tr><td style="padding: 8px 0; font-weight: 600;">Service:</td><td>${escapeHtml(service)}</td></tr>` : ''}
        </table>
        ${message ? `
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
            <div style="font-weight: 600; margin-bottom: 8px;">Message:</div>
            <div style="white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
        ` : ''}
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #8c8c8c;">
          Sent from the contact form on springhousecleaners.com
        </div>
      </div>
    `;

    const emailText = [
      `New Quote Request from springhousecleaners.com`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      city ? `City: ${city}` : null,
      service ? `Service: ${service}` : null,
      message ? `\nMessage:\n${message}` : null
    ].filter(Boolean).join('\n');

    // Send via SendGrid
    const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: toEmail }],
          subject: `New quote request from ${name}`
        }],
        from: {
          email: fromEmail,
          name: 'Spring Cleaning Website'
        },
        reply_to: {
          email: email,
          name: name
        },
        content: [
          { type: 'text/plain', value: emailText },
          { type: 'text/html', value: emailHtml }
        ]
      })
    });

    // SendGrid returns 202 on success with empty body
    if (!sendgridResponse.ok) {
      const err = await sendgridResponse.text();
      console.error('SendGrid error:', sendgridResponse.status, err);
      return new Response(
        JSON.stringify({ success: false, message: 'Something went wrong. Please email us directly at info@springhousecleaners.com.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Something went wrong. Please try emailing us directly.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
