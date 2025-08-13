const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const fetch = require('node-fetch').default;

app.post('/api/openai/generate', async (req, res) => {
    const { model, messages, temperature, max_tokens, apiKey } = req.body;

    try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
                max_tokens
            })
        });
        const data = await openaiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying to OpenAI:', error);
        res.status(500).json({ error: 'Failed to connect to OpenAI API' });
    }
});

app.post('/api/gemini/generate', async (req, res) => {
    const { model, contents, temperature, max_tokens, apiKey } = req.body;

    try {
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature,
                    maxOutputTokens: max_tokens
                }
            })
        });
        const data = await geminiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying to Gemini:', error);
        res.status(500).json({ error: 'Failed to connect to Gemini API' });
    }
});

app.post('/api/ollama/generate', async (req, res) => {
    const { model, prompt, temperature, max_tokens, ollamaBaseUrl } = req.body;

    try {
        const ollamaResponse = await fetch(`http://localhost:11434/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model,
                prompt,
                temperature,
                options: {
                    num_predict: max_tokens
                }
            })
        });
        const rawOllamaResponse = await ollamaResponse.text();
        console.error('Raw Ollama API response (generate):', rawOllamaResponse);
        const data = JSON.parse(rawOllamaResponse);
        res.json(data);
    } catch (error) {
        console.error('Error proxying to Ollama:', error);
        console.error('Error connecting to Ollama API:', error);
        res.status(500).json({ error: 'Failed to connect to Ollama API', details: error.message });
    }
});

app.get('/api/ollama/tags', async (req, res) => {
    try {
        const ollamaResponse = await fetch('http://localhost:11434/api/tags');
        const rawOllamaResponse = await ollamaResponse.text();
        console.error('Raw Ollama API response (tags):', rawOllamaResponse);
        const data = JSON.parse(rawOllamaResponse);
        res.json(data);
    } catch (error) {
        console.error('Error proxying to Ollama:', error);
        res.status(500).json({ error: 'Failed to connect to Ollama API' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server listening at http://localhost:${PORT}`);
});