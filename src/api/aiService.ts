import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const AI_PROXY_URL = '/.netlify/functions/ai-proxy';

// Initialize Gemini (fallback local)
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Sends a prompt to the EZZO AI (Gemini) and returns the response.
 */
export const chatWithIA = async (prompt: string): Promise<string> => {
    // 1. Tenta o proxy Netlify (production - API key segura no servidor)
    try {
        const proxyResponse = await fetch(AI_PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (proxyResponse.ok) {
            const data = await proxyResponse.json();
            if (data.text) return data.text;
        }
    } catch {
        console.warn("AI proxy unavailable, falling back to direct API...");
    }

    // 2. Fallback: chave direta do cliente (desenvolvimento)
    if (!genAI) {
        console.warn("Gemini API Key missing");
        return "Erro de Configuracao: API Key do Gemini nao encontrada no arquivo .env.";
    }

    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-flash-latest",
        "gemini-pro-latest",
        "gemini-2.0-flash-lite"
    ];

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch {
            console.warn(`Modelo ${modelName} falhou, tentando proximo...`);

            if (modelName === modelsToTry[modelsToTry.length - 1]) {
                console.error("Todos os modelos falharam.");
                return "Desculpe, estou com dificuldades de conexao no momento. Tente novamente em alguns segundos.";
            }
        }
    }

    return "Erro inesperado ao processar resposta.";
};
