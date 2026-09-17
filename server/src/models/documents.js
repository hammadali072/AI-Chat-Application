import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    chunks: [
        {
            text: { type: String, required: true },
            pageNumber: { type: Number, required: true },
            chunkIndex: { type: Number, required: true }
        }
    ],
    status: {
        type: String,
        enum: ["processing", "ready", "failed"],
        default: "processing"
    }
}, {
    timestamps: true
})

const documentModel = mongoose.model("Document", documentSchema);

export default documentModel;