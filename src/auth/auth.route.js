import { Router } from "express";
import AuthController from "./auth.controller.js";

const auth = Router();
const authController = new AuthController();

auth.post("/login", authController.Login);
auth.post("/register", authController.Register);

export default auth;
