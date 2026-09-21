import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
    throw new Error("PORT is not defined in environmental variable.");
}

if (!process.env.MONGO_URI) {
    throw new Error("MongoURI is not defined in environmental variable.");
}

if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not defined in environmental variable.");
}

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY
}

export default config;