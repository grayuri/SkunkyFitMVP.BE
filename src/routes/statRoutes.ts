import express from "express";
import StatsController from "../controllers/statsController";

export const statRouter = express.Router()
const SC = new StatsController()

statRouter.post("/diet", SC.getDietStats)
statRouter.post("/user", SC.getUserStats)
statRouter.post("/exercise", SC.getBurnedCalories)