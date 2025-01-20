import express from "express";
import MealFoodsController from "../controllers/mealFoodsController";

export const mealFoodRouter = express.Router()
const MFC = new MealFoodsController()

mealFoodRouter.get("/", MFC.getAll)
mealFoodRouter.get("/:slug", MFC.getOne)
mealFoodRouter.patch("/:slug", MFC.updateOne)
mealFoodRouter.delete("/:slug", MFC.deleteOne)
mealFoodRouter.post("/", MFC.createOne)