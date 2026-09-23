if (!import.meta.env.VITE_API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined in environmental variable.");
}

const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL
}

export default config;