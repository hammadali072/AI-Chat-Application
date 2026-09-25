import config from "../config/config";
import { handleError } from "../utils/errorHandler";

export async function uploadPDF(file) {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
        const response = await fetch(`${config.API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        const resData = await response.json();

        if (!response.ok) {
            throw new Error(resData.message || 'Upload failed.');
        }

        return resData;
    } catch (error) {
        handleError(error, "Upload failed.");
    }
}

export async function askQuestion(question, documentId = null) {
    try {
        const response = await fetch(`${config.API_BASE_URL}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, documentId }),
        });
        const resData = await response.json();

        if (!response.ok) {
            throw new Error(resData.message || 'Failed to get answer.');
        }

        return resData;
    } catch (error) {
        handleError(error, "Failed to get answer.");
    }
}

export async function getAllDocuments() {
    try {
        const response = await fetch(`${config.API_BASE_URL}`, {
            method: 'GET',
        });

        const resData = await response.json();

        if (!response.ok) {
            throw new Error(resData.message || 'Failed to load documents');
        }

        return resData;
    } catch (error) {
        handleError(error, "Failed to load documents.");
    }
}

export async function deleteDocument(documentId) {
    try {
        const response = await fetch(`${config.API_BASE_URL}/${documentId}`, {
            method: 'DELETE',
        });

        const resData = await response.json();

        if (!response.ok) {
            throw new Error(resData.message || 'Failed to delete document.');
        }

        return resData;
    } catch (error) {
        handleError(error, "Failed to delete document.");
    }
}