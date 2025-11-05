const https = require('https');

function verifyRecaptcha(req, res, next) {
  const token = req.body?.recaptchaToken;
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({ success: false, message: 'reCAPTCHA not configured' });
  }
  if (!token) {
    return res.status(400).json({ success: false, message: 'Missing recaptchaToken' });
  }

  const postData = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token,
    remoteip: req.ip || ''
  }).toString();

  const options = {
    method: 'POST',
    hostname: 'www.google.com',
    path: '/recaptcha/api/siteverify',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const r = https.request(options, (resp) => {
    let body = '';
    resp.on('data', (chunk) => (body += chunk));
    resp.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        if (data.success) return next();
        return res.status(400).json({ success: false, message: 'reCAPTCHA failed', errors: data['error-codes'] });
      } catch (e) {
        return res.status(502).json({ success: false, message: 'reCAPTCHA verification error' });
      }
    });
  });

  r.on('error', () => res.status(502).json({ success: false, message: 'reCAPTCHA verification error' }));
  r.write(postData);
  r.end();
}

module.exports = { verifyRecaptcha };