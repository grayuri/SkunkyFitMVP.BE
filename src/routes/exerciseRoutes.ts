import express from "express"
import ExercisesController from "../controllers/exercisesController"

export const exerciseRouter = express.Router()
const EC = new ExercisesController()

exerciseRouter.get("/", EC.getAll)
exerciseRouter.get("/:slug", EC.getOne)