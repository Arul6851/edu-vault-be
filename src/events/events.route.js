import { Router } from "express";
import { CreateEvent, GetAllEvents } from "./events.controller.js";

const events = Router();

events.post("/", CreateEvent);
events.get("/", GetAllEvents);

export default events;
