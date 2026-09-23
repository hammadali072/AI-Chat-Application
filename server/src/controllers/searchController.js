import documentModel from '../models/documents.js';

export async function searchChunks(question, documentId = null) {
    const words = question.toLowerCase().replace(/[^\w\s]/g, "").split(" ");
    const stopWords = ["what", "whom", "whose", "had", "has", "have", "been", "their", "so", "is", "the", "a", "an", "of", "in", "on", "to", "for", "and", "or", "how", "why", "when", "where", "does", "do", "define", "explain"];
    const keywords = words.filter(word => !stopWords.includes(word));

    let query = {};
    if (documentId && documentId !== 'all') {
        query = { _id: documentId };
    }

    const documents = await documentModel.find(query);
    const results = [];

    for (let i = 0; i < documents.length; i++) {
        const chunks = documents[i].chunks || [];
        for (let j = 0; j < chunks.length; j++) {
            let score = 0;
            for (let k = 0; k < keywords.length; k++) {
                if (chunks[j].text.includes(keywords[k])) {
                    score++;
                }
            }
            results.push({
                text: chunks[j].text,
                score: score,
                pageNumber: chunks[j].pageNumber,
                documentId: documents[i]._id,
                fileName: documents[i].fileName
            });
        }
    }

    const filteredResults = results.filter(result => result.score > 0);
    filteredResults.sort((a, b) => b.score - a.score);

    return filteredResults.slice(0, 5);
}

export async function searchController(req, res) {
    const { question, documentId } = req.body;
    const topResults = await searchChunks(question, documentId);
    return res.status(200).json({ results: topResults });
}