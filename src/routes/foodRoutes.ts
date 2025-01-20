import express from "express"
import FoodsController from "../controllers/foodsController"

export const foodRouter = express.Router()
const FC = new FoodsController()

foodRouter.get("/", FC.getAll)
foodRouter.get("/:slug", FC.getOne)