import express from "express"
import SimpleUniqueUsersController from "../controllers/simpleUniqueUserController"

export const simpleUniqueUserRouter = express.Router()
const SUUC = new SimpleUniqueUsersController()

simpleUniqueUserRouter.get("/", SUUC.getAll)
simpleUniqueUserRouter.get("/:slug", SUUC.getOne)
simpleUniqueUserRouter.post("/", SUUC.createOne)
simpleUniqueUserRouter.patch("/:slug", SUUC.updateOne)