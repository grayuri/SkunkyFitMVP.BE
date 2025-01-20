import express from "express";
import MealsController from "../controllers/mealsController";

export const mealRouter = express.Router()
const MC = new MealsController()

mealRouter.get("/", MC.getAll)
mealRouter.get("/:slug", MC.getOne)
mealRouter.patch("/:slug", MC.updateOne)
mealRouter.delete("/:slug", MC.deleteOne)
mealRouter.post("/", MC.createOne)