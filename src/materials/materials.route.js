import UploadController from "./materials.controller.js";
import { Router } from "express";

const materials = Router();
const uploadController = new UploadController();

materials.post("/upload", uploadController.uploadHandler);
materials.get("/:subject", uploadController.getFilesBySubject);
materials.get("/download/:id", uploadController.downloadFileById);

export default materials;
