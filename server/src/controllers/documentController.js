import { PDFParse } from 'pdf-parse';
import documentModel from '../models/documents.js';

function preprocessText(text) {
    let cleanedText = text;

    cleanedText = cleanedText.replace(/\d+ \| P a g e/g, "");
    cleanedText = cleanedText.replace(/\s+/g, " ");
    cleanedText = cleanedText.replace(//g, "-");
    cleanedText = cleanedText.replace(/\n\s*\n+/g, "\n\n");

    return cleanedText.toLowerCase().trim();
}

function pageText(text) {
    const pagedText = [];
    let index = 0;
    for (let i = 0; i < text.length - 1; i += 2) {
        const refineText = preprocessText(text[i]);
        pagedText.push(
            chunkText(refineText, 300).map(chunk => {
                return {
                    text: chunk,
                    pageNumber: Number(text[i + 1]),
                    chunkIndex: index++
                }
            })
        )
    }
    return pagedText.flat();
}

function chunkText(text, chunkSize) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}

export async function documentController(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: "File not found."
        })
    }

    const parser = new PDFParse({
        data: req.file.buffer
    })

    const result = await parser.getText();

    await parser.destroy();

    if (!result.text) {
        return res.status(400).json({
            message: "PDF extraction failure."
        })
    }

    const refinedResult = result.text.split(/-- (\d+) of \d+ --/g);
    const pagedText = pageText(refinedResult);

    const document = await documentModel.create({
        fileName: req.file.originalname,
        chunks: pagedText,
        status: "ready"
    })

    return res.status(200).json({
        message: "PDF processed successfully.",
        documentID: document._id,
        fileName: document.fileName,
        size: req.file.size,
        mimeType: req.file.mimetype,
    });
}

export async function getAllDocuments(req, res) {
    const documents = await documentModel.find({});

    const documentList = documents.map(doc => ({
        id: doc._id,
        fileName: doc.fileName,
        status: doc.status,
        uploadedAt: doc.createdAt,
    }));

    return res.status(200).json({ documents: documentList });
}

export async function deleteDocument(req, res) {
    try {
        const { id } = req.params;
        await documentModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Document deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete document." });
    }
}