import { Request, Response } from "express"
import { IExercise } from "../interfaces/entities/IExercise";
import { ILocalDatabase } from "../interfaces/lib/ILocalDatabase";
import { IGetterController } from "../interfaces/controllers/IGetterController";

import LocalApiFeatures from "../services/LocalApiServices";
import LocalDatabase from "../lib/LocalDatabase";
import { AppError } from "../utils/AppError";

const mockedExercise: IExercise = {
  name: "",
  muscleTargeted: "",
  equipmentType: "",
  pictureUrl: "",
  slug: "",
  muscleTargetedSlug: "",
  equipmentTypeSlug: ""
}

const db: ILocalDatabase = new LocalDatabase("exercises")

export default class ExercisesController implements IGetterController {
  async getAll(req: Request, res: Response) {
    try {
      const exercisesJson: any = await db.getDatas()
      const exercises = JSON.parse(exercisesJson)

      const LAF = new LocalApiFeatures<IExercise>(exercises, req.query)
      .filterUnwishedFields(mockedExercise)
      .filter()
      .sort(mockedExercise)
      .paginate()

      const datas = LAF.query

      res.status(200).json({
        results: datas.length,
        total: LAF.total,
        page: req.query.page || 1,
        pages: LAF.pages,
        datas
      })
    } 
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to fetch your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const exerciseJson: any = await db.getData(req.params)
      const exercise = JSON.parse(exerciseJson)

      res.status(200).json(exercise)
    } 
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to fetch your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }
}