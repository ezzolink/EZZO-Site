// Netlify Function: Proxy para Gemini API (esconde a API Key do cliente)
export const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };

    try {
        const { prompt } = JSON.parse(event.body || '{}');
        if (!prompt) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Prompt is required' }) };

        const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
        if (!API_KEY) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Gemini API key not configured' }) };

        const modelsToTry = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-pro-latest', 'gemini-2.0-flash-lite'];

        for (const model of modelsToTry) {
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }]
                        })
                    }
                );

                if (!response.ok) {
                    console.warn(`Model ${model} failed: ${response.status}`);
                    continue;
                }

                const data = await response.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

                return { statusCode: 200, headers, body: JSON.stringify({ text }) };
            } catch (e) {
                console.warn(`Model ${model} error:`, e.message);
            }
        }

        return { statusCode: 502, headers, body: JSON.stringify({ error: 'All models failed' }) };
    } catch (e) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
    }
};
