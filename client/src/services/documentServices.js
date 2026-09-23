import config from "../config/config";

export async function uploadPDF(file) {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch(`${config.API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed.");
    }

    return response.json();
}

export async function askQuestion(question, documentId = null) {
    const response = await fetch(`${config.API_BASE_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, documentId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get answer');
    }

    return response.json();
}

export async function getAllDocuments() {
    const response = await fetch(`${config.API_BASE_URL}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load documents');
    }

    return response.json();
}

export async function deleteDocument(documentId) {
    const response = await fetch(`${config.API_BASE_URL}/${documentId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete document');
    }

    return response.json();
}