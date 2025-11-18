const { logger = console } = global;

const generate = async (req, res, next) => {
  try {
    const { prompt, model = 'default' } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing prompt in request body' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({ generated: `Echo (no AI configured): ${prompt}` });
    }

   const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      logger?.error('AI proxy error', response.status, text);
      return res.status(502).json({ error: 'AI provider error', details: text });
    }

    const data = await response.json();
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    return res.json({ generated: generatedText });
  } catch (err) {
    next(err);
  }
};

module.exports = { generate };