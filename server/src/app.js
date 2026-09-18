import express from 'express';
import morgan from 'morgan';
import cors from "cors";

import router from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/documents", router);

export default app;