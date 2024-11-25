import { Router } from "express";
import GetAllSubjects from "./subjects.controller";

subjects = Router();

subjects.get("/", GetAllSubjects);
