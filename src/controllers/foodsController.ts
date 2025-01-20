import { Request, Response } from "express"
import { IFood } from "../interfaces/entities/IFood";
import { ILocalDatabase } from "../interfaces/lib/ILocalDatabase";
import { IGetterController } from "../interfaces/controllers/IGetterController";

import { AppError } from "../utils/AppError";
import LocalApiServices from "../services/LocalApiServices";
import LocalDatabase from "../lib/LocalDatabase";
import AwsS3 from "../lib/AwsS3";
import dotenv from "dotenv";

dotenv.config()

const S3 = new AwsS3(
  process.env.AWS_BUCKET_NAME as string,
  process.env.AWS_BUCKET_REGION as string
)

const mockedFood: IFood = {
  name: "",
  category: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  servingSizeGrams: 0,
  slug: "",
  categorySlug: "",
  pictureUrl: ""
}

const db: ILocalDatabase = new LocalDatabase("foods")

export default class FoodsController implements IGetterController {
  async getAll(req: Request, res: Response) {
    try {
      const foodsJson: any = await db.getDatas()
      const foods = JSON.parse(foodsJson)

      const LAS = new LocalApiServices<IFood>(foods, req.query)
      .filterUnwishedFields(mockedFood)
      .filter()
      .sort(mockedFood)
      .paginate()

      const datas = LAS.query

      for (const food of datas) {
        food.pictureUrl = await S3.getFile(food.pictureUrl)
      }

      res.status(200).json({
        results: datas.length,
        total: LAS.total,
        page: parseInt(req.query.page as string) || 1,
        pages: LAS.pages,
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
      const foodJson: any = await db.getData(req.params)
      const food = JSON.parse(foodJson)

      food.pictureUrl = await S3.getFile(food.pictureUrl)

      res.status(200).json(food)
    } 
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to fetch your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }
}