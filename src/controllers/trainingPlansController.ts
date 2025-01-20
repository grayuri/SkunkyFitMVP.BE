import dotenv from "dotenv";
import { Response } from "express";
import { ITrainingPlan } from "../interfaces/entities/ITrainingPlan";
import { RequestWithUser } from "../interfaces/controllers/IGeneralController";
import { TrainingPlan } from "../models/TrainingPlan";
import FactoryControllerTemplate from "./factoryControllerTemplate";
import sharp from "sharp";
import { IBasicController } from "../interfaces/controllers/IBasicController";
import { TrainingPlanExercise } from "../models/TrainingPlanExercise";
import slugify from "../utils/slugify";
import getFileType from "../interfaces/utils/getFileType";
import AwsS3 from "../lib/AwsS3";
import SkunkyPDFMaker from "../lib/SkunkyPDFMaker";
import { AppError } from "../utils/AppError";

dotenv.config()

const FCT = new FactoryControllerTemplate()
const S3 = new AwsS3(
  process.env.AWS_BUCKET_NAME as string,
  process.env.AWS_BUCKET_REGION as string
)

const mockedTrainingPlan: ITrainingPlan = {
  _id: "",
  name: "",
  exercisesTotal: 0,
  setsTotal: 0,
  timeTotal: 0,
  burnedCaloriesTotal: 0,
  targetedMuscles: [],
  exercises: [],
  bannerUrl: "",
  userId: "",
  slug: ""
}

export default class TrainingPlansController implements IBasicController {
  async getAll(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getAll({
      req,
      res,
      model: TrainingPlan,
      mockedObject: mockedTrainingPlan,
      populate: [{
        path: "exercises",
        model: "TrainingPlanExercise"
      }],
      manageFiles: async (plans) => {
        for (let plan of plans) {
          plan.bannerUrl = await S3.getFile(plan.bannerUrl)
        }
      }
    })
  }

  async getOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getOne({
      req,
      res,
      model: TrainingPlan,
      mockedObject: mockedTrainingPlan,
      populate: [{
        path: "exercises",
        model: "TrainingPlanExercise"
      }],
      manageFiles: async (plan) => {
        plan.bannerUrl = await S3.getFile(plan.bannerUrl)
      }
    })
  }

  async updateOne(req: RequestWithUser, res: Response): Promise<void> {
    if (req.body.name) req.body.slug = slugify(req.body.name)

    if (req.file) {
      const type = getFileType(req.file)
      req.body.bannerUrl = `images/training-plans/training-plan-banner-${req.body.slug}.${type}`
    }

    req.user = "123"

    return FCT.updateOne({
      req,
      res,
      model: TrainingPlan,
      mockedObject: mockedTrainingPlan,
      manageFiles: async (oldPlan: ITrainingPlan) => {
        if (req.file) {
          const fileBuffer = await sharp(req.file.buffer)
            .resize(800, 800)
            .toBuffer()

          await S3.deleteFile(oldPlan.bannerUrl)
          await S3.createFile(req.file, fileBuffer, req.body.bannerUrl)
        }
      },
      integrateModels: async (oldPlan: ITrainingPlan) => {
        if (oldPlan.slug !== req.body.slug) {
          await TrainingPlanExercise.updateMany({ trainingPlanSlug: oldPlan.slug }, { trainingPlanSlug: req.body.slug })
        }
      }
    })
  }

  async deleteOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.deleteOne({
      req,
      res,
      model: TrainingPlan,
      mockedObject: mockedTrainingPlan,
      manageFiles: async (plan: ITrainingPlan) => {
        await S3.deleteFile(plan.bannerUrl)
      },
      integrateModels: async (plan: ITrainingPlan) => {
        await TrainingPlanExercise.deleteMany({ trainingPlanSlug: plan.slug })
      }
    })
  }

  async createOne(req: RequestWithUser, res: Response): Promise<void> {
    req.body.slug = slugify(req.body.name)

    if (req.file) {
      const type = getFileType(req.file)
      req.body.bannerUrl = `images/training-plans/training-plan-banner-${req.body.slug}.${type}`
    }

    return FCT.createOne({
      req,
      res,
      model: TrainingPlan,
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

  async getTrainingPlanPDF(req: RequestWithUser, res: Response): Promise<void> {

    try {
      const plan: any = await TrainingPlan.findOne({ slug: req.params.slug }).populate([{
        path: "exercises",
        model: "TrainingPlanExercise"
      }])

      if (!plan) throw new AppError("This diet doesn't exist. Please, provide a existing diet.", 400)

      const SPM = new SkunkyPDFMaker()

      SPM.createTrainingPlanPDF(plan, res)
    }
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to create your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }
}