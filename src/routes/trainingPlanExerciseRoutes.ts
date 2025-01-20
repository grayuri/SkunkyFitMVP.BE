import express from "express";
import TrainingPlanExercisesController from "../controllers/trainingPlanExercisesController";

export const trainingPlanExerciseRouter = express.Router()
const TPEC = new TrainingPlanExercisesController()

trainingPlanExerciseRouter.get("/", TPEC.getAll)
trainingPlanExerciseRouter.get("/:slug", TPEC.getOne)
trainingPlanExerciseRouter.patch("/:slug", TPEC.updateOne)
trainingPlanExerciseRouter.delete("/:slug", TPEC.deleteOne)
trainingPlanExerciseRouter.post("/", TPEC.createOne)