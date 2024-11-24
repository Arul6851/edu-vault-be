import { Router } from "express";
import {
  PostAnswers,
  GetAnswersByQuestionID,
  GetAllAnswers,
} from "./answers.controller.js";

const answers = Router();

answers.post("/", PostAnswers);
answers.get("/:questionID", GetAnswersByQuestionID);
answers.get("/", GetAllAnswers);

export default answers;
