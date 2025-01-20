import express from "express";
import DietsController from "../controllers/dietsController";
import multer from "multer";

export const dietRouter = express.Router()
const DC = new DietsController()

const storage = multer.memoryStorage()
const upload = multer({ storage })

dietRouter.get("/", DC.getAll)
dietRouter.get("/:slug", DC.getOne)
dietRouter.get("/pdf/detailed/:slug", DC.getDetailedPDF)
dietRouter.get("/pdf/simplified/:slug", DC.getSimplifiedPDF)
dietRouter.patch("/:slug", upload.single("banner"), DC.updateOne)
dietRouter.delete("/:slug", DC.deleteOne)
dietRouter.post("/", upload.single("banner"), DC.createOne)