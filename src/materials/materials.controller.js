import multer from "multer";
import prisma from "../middlewares/prisma.js";

class UploadController {
  storage = multer.memoryStorage();

  uploader = multer({
    storage: this.storage,
    limits: { fileSize: 100000000 },
  }).single("myFile");

  uploadHandler = async (req, res, next) => {
    try {
      this.uploader(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            message: "Error uploading file",
            error: err.message,
          });
        }

        const { subject } = req.body;
        console.log("Body : " + subject);
        const file = req.file;

        if (!file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        try {
          const uploadedFile = await prisma.file.create({
            data: {
              subject,
              fileName: file.originalname,
              fileType: file.mimetype,
              fileData: file.buffer, // File stored as binary data
            },
          });

          res.status(201).json({
            message: "File uploaded successfully!",
            fileId: uploadedFile.id,
          });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getFilesBySubject = async (req, res) => {
    try {
      const { subject } = req.params;
      const files = await prisma.file.findMany({
        where: { subject },
      });
      if (!files.length) {
        return res
          .status(404)
          .json({ message: "No files found for this subject" });
      }

      res.json(
        files.map((file) => ({
          id: file.id,
          fileName: file.fileName,
          fileType: file.fileType,
          uploadedAt: file.uploadedAt,
        }))
      );
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  };

  downloadFileById = async (req, res) => {
    try {
      const { id } = req.params;

      const file = await prisma.file.findUnique({
        where: { id: parseInt(id) },
      });

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      res.set({
        "Content-Type": file.fileType,
        "Content-Disposition": `attachment; filename="${file.fileName}"`,
      });
      res.send(file.fileData);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  };
}

export default UploadController;
