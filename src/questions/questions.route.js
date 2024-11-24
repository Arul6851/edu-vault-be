import { Router } from "express";
import {
  PostQuestion,
  GetQuestions,
  GetQuestionById,
} from "./questions.controller.js";

const questions = Router();

questions.post("/", PostQuestion);
questions.get("/", GetQuestions);
questions.get("/:id", GetQuestionById);

export default questions;
