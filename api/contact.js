// Fonction serverless Vercel — reçoit le formulaire de contact et envoie l'email via Brevo.
// La clé API reste secrète (variable d'environnement BREVO_API_KEY sur Vercel).
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

module.exports = async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  // corps JSON (Vercel le parse en général ; sinon on le fait à la main)
  let body = req.body;
  if (!body || typeof body === 'string') { try { body = JSON.parse(body || '{}'); } catch(e){ body = {}; } }
  const { nom, email, tel, type, budget, surface, finition, message, attachments, _hp } = body;

  // anti-spam simple : si le champ piège est rempli, on fait semblant d'accepter
  if (_hp) return res.status(200).json({ ok: true });

  if (!nom || !email || !message) return res.status(400).json({ error: 'missing_fields' });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) return res.status(400).json({ error: 'bad_email' });

  // Pièces jointes (photos) : max 3, formats {name, content(base64)}, taille totale bornée.
  let attach;
  if (Array.isArray(attachments) && attachments.length) {
    let totalB64 = 0;
    attach = attachments.slice(0, 3)
      .filter(a => a && typeof a.content === 'string' && /^[A-Za-z0-9+/=]+$/.test(a.content))
      .map((a, i) => ({ name: String(a.name || ('photo-' + (i + 1) + '.jpg')).slice(0, 60), content: a.content }))
      .filter(a => { totalB64 += a.content.length; return totalB64 <= 9_000_000; }); // ~6,7 Mo de photos
    if (!attach.length) attach = undefined;
  }

  const apiKey = process.env.BREVO_API_KEY;
  const to      = process.env.CONTACT_TO  || 'contact@reseauxartisansdeconfiance13.fr';
  const from    = process.env.MAIL_FROM   || 'contact@reseauxartisansdeconfiance13.fr';
  if (!apiKey) return res.status(500).json({ error: 'not_configured' });

  const html =
    '<h2>Nouvelle demande — site</h2>' +
    '<p><strong>Nom :</strong> ' + esc(nom) + '</p>' +
    '<p><strong>Email :</strong> ' + esc(email) + '</p>' +
    '<p><strong>Téléphone :</strong> ' + esc(tel || '—') + '</p>' +
    '<p><strong>Type de projet :</strong> ' + esc(type || '—') + '</p>' +
    '<p><strong>Surface :</strong> ' + esc(surface || '—') + '</p>' +
    '<p><strong>Niveau de finition :</strong> ' + esc(finition || '—') + '</p>' +
    '<p><strong>Budget estimé :</strong> ' + esc(budget || '—') + '</p>' +
    '<p><strong>Message :</strong><br>' + esc(message).replace(/\n/g, '<br>') + '</p>' +
    (attach ? '<p><strong>Photos jointes :</strong> ' + attach.length + '</p>' : '');

  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify({
        sender:  { name: 'Réseaux Artisans de Confiance 13', email: from },
        to:      [{ email: to }],
        replyTo: { email: String(email), name: String(nom) },
        subject: 'Nouvelle demande — ' + (type || 'projet') + ' — ' + nom,
        htmlContent: html,
        attachment: attach
      })
    });
    if (!r.ok) { const t = await r.text(); return res.status(502).json({ error: 'send_failed', detail: t.slice(0, 300) }); }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'server_error', detail: String(e).slice(0, 200) });
  }
};
