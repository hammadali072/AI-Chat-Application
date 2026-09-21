import { searchChunks } from './searchController.js';
import { getAnswer } from '../services/AIServices.js';

export async function askController(req, res) {
    const question = req.body.question;
    const topResults = await searchChunks(question);
    const answer = await getAnswer(question, topResults);
    return res.status(200).json({ answer, topResults });
}