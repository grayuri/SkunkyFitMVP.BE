import { IMeal } from "../interfaces/entities/IMeal";
import { Response } from "express";
import { RequestWithUser } from "../interfaces/controllers/IGeneralController";

import { Meal } from "../models/Meal";
import FactoryControllerTemplate from "./factoryControllerTemplate";
import { IBasicController } from "../interfaces/controllers/IBasicController";
import { Diet } from "../models/Diet";
import slugify from "../utils/slugify";
import getTimeFormatedDate from "../utils/getTimeFormatedDate";
import { AppError } from "../utils/AppError";
import { MealFood } from "../models/MealFood";

const FCT = new FactoryControllerTemplate()

const mockedMeal: IMeal = {} as IMeal

export default class MealsController implements IBasicController {
  async getAll(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getAll({
      req,
      res,
      model: Meal,
      mockedObject: mockedMeal,
      populate: [{
        path: "foods",
        model: "MealFood"
      }]
    })
  }

  async getOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getOne({
      req,
      res,
      model: Meal,
      mockedObject: mockedMeal,
      populate: [{
        path: "foods",
        model: "MealFood"
      }]
    })
  }

  async updateOne(req: RequestWithUser, res: Response): Promise<void> {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.body.time) req.body.time = getTimeFormatedDate(req.body.time)

    return FCT.updateOne({
      req,
      res,
      model: Meal,
      mockedObject: mockedMeal,
      integrateModels: async (oldMeal: IMeal) => {
        const currentCarbs = req.body.carbs - oldMeal.carbs
        const currentProtein = req.body.protein - oldMeal.protein
        const currentFat = req.body.fat - oldMeal.fat
        const currentCalories = req.body.calories - oldMeal.calories

        const diet = await Diet.findOne({ slug: oldMeal.dietSlug })

        if (!diet) throw new AppError("The diet of this food doesn't exist.", 400)

        const dietChangings: any = {
          carbs: diet.carbs + currentCarbs,
          protein: diet.protein + currentProtein,
          fat: diet.fat + currentFat,
          calories: diet.calories + currentCalories,
        }

        if (oldMeal.slug !== req.body.slug) {
          await MealFood.updateMany({ mealSlug: oldMeal.slug }, { mealSlug: req.body.slug })
          dietChangings.mealSlug = req.body.slug
        }

        await Diet.updateOne({ slug: oldMeal.dietSlug }, dietChangings)
      }
    })
  }

  async deleteOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.deleteOne({
      req,
      res,
      model: Meal,
      mockedObject: mockedMeal,
      integrateModels: async (meal: IMeal) => {
        const diet = await Diet.findOne({ slug: meal.dietSlug })

        if (!diet) throw new AppError("The diet of this food doesn't exist.", 400)

        const dietChangings = {
          carbs: diet.carbs - meal.carbs,
          protein: diet.protein - meal.protein,
          fat: diet.fat - meal.fat,
          calories: diet.calories - meal.calories,
          $pull: { meals: meal._id }
        }

        await Diet.updateOne({ slug: meal.dietSlug }, dietChangings)
      }
    })
  }

  async createOne(req: RequestWithUser, res: Response): Promise<void> {
    req.body.slug = slugify(req.body.name)
    req.body.time = getTimeFormatedDate(req.body.time)

    return FCT.createOne({
      req,
      res,
      model: Meal,
      integrateModels: async (meal: IMeal) => {
        const diet = await Diet.findOne({ slug: meal.dietSlug })

        if (!diet) throw new AppError("The diet of this food doesn't exist.", 400)

        await Diet.updateOne({ slug: meal.dietSlug }, { $push: { meals: meal._id } })
      }
    })
  }
}