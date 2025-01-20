import dotenv from "dotenv"
import { Response } from "express";
import { IDiet } from "../interfaces/entities/IDiet";
import { RequestWithUser } from "../interfaces/controllers/IGeneralController";
import { Diet } from "../models/Diet";
import FactoryControllerTemplate from "./factoryControllerTemplate";
import sharp from "sharp";
import AwsS3 from "../lib/AwsS3";
import getFileType from "../utils/getFileType";
import slugify from "../utils/slugify";
import { IBasicController } from "../interfaces/controllers/IBasicController";
import { MealFood } from "../models/MealFood";
import { Meal } from "../models/Meal";
import SkunkyPDFMaker from "../lib/SkunkyPDFMaker";
import { AppError } from "../utils/AppError";

dotenv.config()

const FCT = new FactoryControllerTemplate()
const S3 = new AwsS3(
  process.env.AWS_BUCKET_NAME as string,
  process.env.AWS_BUCKET_REGION as string
)

const mockedDiet: IDiet = {
  _id: "",
  name: "",
  carbs: 0,
  protein: 0,
  fat: 0,
  calories: 0,
  bannerUrl: "",
  meals: [],
  userId: "",
  planId: "",
  dietObjective: "CUTTING",
  slug: ""
}

export default class DietsController implements IBasicController {
  async getAll(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getAll({
      req,
      res,
      model: Diet,
      mockedObject: mockedDiet,
      populate: [{
        path: "meals",
        model: "Meal",
        populate: [
          {
            path: "foods",
            model: "MealFood"
          }
        ]
      }],
      manageFiles: async (diets) => {
        for (let diet of diets) {
          diet.bannerUrl = await S3.getFile(diet.bannerUrl)

          for (let meal of diet.meals) {
            for (let food of meal.foods) {
              food.pictureUrl = await S3.getFile(food.pictureUrl)
            }
          }
        }
      }
    })
  }

  async getOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getOne({
      req,
      res,
      model: Diet,
      mockedObject: mockedDiet,
      populate: [{
        path: "meals",
        model: "Meal",
        populate: [
          {
            path: "foods",
            model: "MealFood"
          }
        ]
      }],
      manageFiles: async (diet) => {
        diet.bannerUrl = await S3.getFile(diet.bannerUrl)

        for (let meal of diet.meals) {
          for (let food of meal.foods) {
            food.pictureUrl = await S3.getFile(food.pictureUrl)
          }
        }
      }
    })
  }

  async updateOne(req: RequestWithUser, res: Response): Promise<void> {
    if (req.body.name) req.body.slug = slugify(req.body.name)

    if (req.file) {
      const type = getFileType(req.file)
      req.body.bannerUrl = `images/diets/diet-banner-${req.body.slug}.${type}`
    }

    req.user = "123" // Temporary

    return FCT.updateOne({
      req,
      res,
      model: Diet,
      mockedObject: mockedDiet,
      manageFiles: async (oldDiet: IDiet) => {
        if (req.file) {
          const fileBuffer = await sharp(req.file.buffer)
            .resize(800, 800)
            .toBuffer()

          await S3.deleteFile(oldDiet.bannerUrl)
          await S3.createFile(req.file, fileBuffer, req.body.bannerUrl)
        }
      },
      integrateModels: async (oldDiet: IDiet) => {
        if (oldDiet.slug !== req.body.slug) {
          await Meal.updateMany({ dietSlug: oldDiet.slug }, { dietSlug: req.body.slug })
          await MealFood.updateMany({ dietSlug: oldDiet.slug }, { dietSlug: req.body.slug })
        }
      }
    })
  }

  async deleteOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.deleteOne({
      req,
      res,
      model: Diet,
      mockedObject: mockedDiet,
      manageFiles: async (diet: IDiet) => {
        await S3.deleteFile(diet.bannerUrl)
      },
      integrateModels: async (diet: IDiet) => {
        await Meal.deleteMany({ dietSlug: diet.slug })
        await MealFood.deleteMany({ dietSlug: diet.slug })
      }
    })
  }

  async createOne(req: RequestWithUser, res: Response): Promise<void> {
    req.body.slug = slugify(req.body.name)

    if (req.file) {
      const type = getFileType(req.file)
      req.body.bannerUrl = `images/diets/diet-banner-${req.body.slug}.${type}`
    }

    return FCT.createOne({
      req,
      res,
      model: Diet,
      manageFiles: async () => {
        req.user = "123"

        if (req.file) {
          const fileBuffer = await sharp(req.file.buffer)
            .resize(800, 800)
            .toBuffer()

          await S3.createFile(req.file, fileBuffer, req.body.bannerUrl)
        }
      }
    })
  }

  async getSimplifiedPDF(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const diet: any = await Diet.findOne({ slug: req.params.slug }).populate([{
        path: "meals",
        model: "Meal",
        populate: [
          {
            path: "foods",
            model: "MealFood"
          }
        ]
      }])
  
      if (!diet) throw new AppError("This diet doesn't exist. Please, provide a existing diet.", 400)
  
      const SPM = new SkunkyPDFMaker()
  
      SPM.createDietSimplifiedPDF(diet, res)
    } 
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to create your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }

  async getDetailedPDF(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const diet: any = await Diet.findOne({ slug: req.params.slug }).populate([{
        path: "meals",
        model: "Meal",
        populate: [
          {
            path: "foods",
            model: "MealFood"
          }
        ]
      }])
  
      if (!diet) throw new AppError("This diet doesn't exist. Please, provide a existing diet.", 400)
  
      const SPM = new SkunkyPDFMaker()
  
      SPM.createDietDetailedPDF(diet, res)
    } 
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to create your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }
}