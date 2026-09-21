import OpenAI from "openai";
import config from "../config/config.js";

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: config.OPENROUTER_API_KEY,
});

export async function getAnswer(question, topResults) {
    const context = topResults.map(result => result.text).join("\n\n");
    const prompt = `Answer the question using only the content below. If the answer isn't in the content, say you don't know.\n\nContent:\n${context}\n\nQuestion: ${question}`;

    const response = await client.chat.completions.create({
        model: "liquid/lfm-2.5-2.6b:free",
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
}