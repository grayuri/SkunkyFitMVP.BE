import express from "express";
import TrainingPlansController from "../controllers/trainingPlansController";
import multer from "multer";

export const trainingPlanRouter = express.Router()
const TPC = new TrainingPlansController()

const storage = multer.memoryStorage()
const upload = multer({ storage })

trainingPlanRouter.get("/", TPC.getAll)
trainingPlanRouter.get("/:slug", TPC.getOne)
trainingPlanRouter.get("/pdf/detailed/:slug", TPC.getTrainingPlanPDF)
trainingPlanRouter.patch("/:slug", upload.single("banner"), TPC.updateOne)
trainingPlanRouter.delete("/:slug", TPC.deleteOne)
trainingPlanRouter.post("/", upload.single("banner"), TPC.createOne)