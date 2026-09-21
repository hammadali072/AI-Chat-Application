import multer from "multer";

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
        cb(new Error("Only PDF files are allowed."));
    }
}

const storage = multer.memoryStorage();

const multerOptions = { storage, fileFilter, limits: { fileSize: 31457280 } };

const upload = multer(multerOptions);

export default upload;