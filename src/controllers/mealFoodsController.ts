import dotenv from "dotenv"
import { IMealFood } from "../interfaces/entities/IMealFood";
import { Response } from "express";
import { RequestWithUser } from "../interfaces/controllers/IGeneralController";

import { MealFood } from "../models/MealFood";
import FactoryControllerTemplate from "./factoryControllerTemplate";
import { IBasicController } from "../interfaces/controllers/IBasicController";
import { Meal } from "../models/Meal";
import { Diet } from "../models/Diet";
import { AppError } from "../utils/AppError";
import AwsS3 from "../lib/AwsS3";

dotenv.config()

const FCT = new FactoryControllerTemplate()
const S3 = new AwsS3(
  process.env.AWS_BUCKET_NAME as string, 
  process.env.AWS_BUCKET_REGION as string
)

const mockedMealFood: IMealFood = {
  _id: "",
  name: "",
  category: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  servingSizeGrams: 0,
  slug: "",
  mealSlug: "",
  dietSlug: "",
  userId: "",
  categorySlug: "",
  pictureUrl: ""
}

export default class MealFoodsController implements IBasicController {
  async getAll(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getAll({
      req,
      res,
      model: MealFood,
      mockedObject: mockedMealFood,
      manageFiles: async (foods) => {
        for (let food of foods) {
          food.pictureUrl = await S3.getFile(food.pictureUrl)
        }
      }
    })
  }

  async getOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getOne({
      req,
      res,
      model: MealFood,
      mockedObject: mockedMealFood,
      manageFiles: async (food) => {
        food.pictureUrl = await S3.getFile(food.pictureUrl)
      }
    })
  }

  async updateOne(req: RequestWithUser, res: Response): Promise<void> {
    req.body.pictureUrl = `images/foods/${req.body.slug}.png`

    return FCT.updateOne({
      req,
      res,
      model: MealFood,
      mockedObject: mockedMealFood,
      integrateModels: async (oldFood: IMealFood) => {
        const diet = await Diet.findOne({ slug: oldFood.dietSlug })
        const meal = await Meal.findOne({ slug: oldFood.mealSlug, dietSlug: oldFood.dietSlug })

        if (!diet) throw new AppError("The diet of this food doesn't exist.", 400)
        if (!meal) throw new AppError("The meal of this food doesn't exist.", 400)

        const dietChangings = {
          carbs: diet.carbs - oldFood.carbs + req.body.carbs,
          protein: diet.protein - oldFood.protein + req.body.protein,
          fat: diet.fat - oldFood.fat + req.body.fat,
          calories: diet.calories - oldFood.calories + req.body.calories
        }

        const mealChangings = {
          carbs: meal.carbs - oldFood.carbs + req.body.carbs,
          protein: meal.protein - oldFood.protein + req.body.protein,
          fat: meal.fat - oldFood.fat + req.body.fat,
          calories: meal.calories - oldFood.calories + req.body.calories
        }

        await Diet.updateOne({ slug: oldFood.dietSlug }, dietChangings)
        await Meal.updateOne({ slug: oldFood.mealSlug, dietSlug: oldFood.dietSlug }, mealChangings)
      }
    })
  }

  async deleteOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.deleteOne({
      req,
      res,
      model: MealFood,
      mockedObject: mockedMealFood,
      integrateModels: async (food: IMealFood) => {
        const diet = await Diet.findOne({ slug: food.dietSlug })
        const meal = await Meal.findOne({ slug: food.mealSlug, dietSlug: food.dietSlug })

        if (!diet) throw new AppError("The diet of this food doesn't exist.", 400)
        if (!meal) throw new AppError("The meal of this food doesn't exist.", 400)

        const dietChangings = {
          carbs: diet.carbs - food.carbs,
          protein: diet.protein - food.protein,
          fat: diet.fat - food.fat,
          calories: diet.calories - food.calories,
        }

        const mealChangings = {
          carbs: meal.carbs - food.carbs,
          protein: meal.protein - food.protein,
          fat: meal.fat - food.fat,
          calories: meal.calories - food.calories,
          $pull: { foods: food._id }
        }

        await Diet.updateOne({ slug: food.dietSlug }, dietChangings)
        await Meal.updateOne({ slug: food.mealSlug, dietSlug: food.dietSlug }, mealChangings)
      }
    })
  }

  async createOne(req: RequestWithUser, res: Response): Promise<void> {
    req.body.pictureUrl = `images/foods/${req.body.slug}.png`

    return FCT.createOne({
      req,
      res,
      model: MealFood,
      integrateModels: async (food: IMealFood) => {
        const diet = await Diet.findOne({ slug: food.dietSlug })
        const meal = await Meal.findOne({ slug: food.mealSlug, dietSlug: food.dietSlug })

        if (!diet) throw new AppError("The diet of this food doesn't exist.", 400)
        if (!meal) throw new AppError("The meal of this food doesn't exist.", 400)

        const dietChangings = {
          carbs: diet.carbs + food.carbs,
          protein: diet.protein + food.protein,
          fat: diet.fat + food.fat,
          calories: diet.calories + food.calories,
        }

        const mealChangings = {
          carbs: meal.carbs + food.carbs,
          protein: meal.protein + food.protein,
          fat: meal.fat + food.fat,
          calories: meal.calories + food.calories,
          $push: { foods: food._id }
        }

        await Diet.updateOne({ slug: food.dietSlug }, dietChangings)
        await Meal.updateOne({ slug: food.mealSlug, dietSlug: food.dietSlug }, mealChangings)
      }
    })
  }
}