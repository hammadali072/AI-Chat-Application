import { PDFParse } from 'pdf-parse';

function preprocessText(text) {
    let cleanedText = text;

    cleanedText = cleanedText.replace(/-- \d+ of \d+ --/g, "");
    cleanedText = cleanedText.replace(/\d+ \| P a g e/g, "");
    cleanedText = cleanedText.replace(/\s+/g, " ");
    cleanedText = cleanedText.replace(//g, "-");
    // cleanedText = cleanedText.replace(/[ \t]+/g, " ");
    cleanedText = cleanedText.replace(/\n\s*\n+/g, "\n\n");

    return cleanedText.trim();
}

function chunkText(text, chunkSize) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}


export async function uploadController(req, res) {
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

    const cleanedText = preprocessText(result.text);

    console.log(cleanedText);

    const chunkedText = chunkText(cleanedText, 50);

    console.log(chunkedText);

    return res.status(200).json({
        message: "PDF processed successfully.",
        fileName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        // text: result.text
    });
}