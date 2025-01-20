import { Response, Request } from "express";
import DietLogic from "../logic/DietLogic";
import UserLogic from "../logic/UserLogic";
import TrainingPlanExerciseLogic from "../logic/TrainingPlanExerciseLogic";
import { SimpleUniqueUser } from "../models/SimpleUniqueUser";
import { AppError } from "../utils/AppError";

export default class StatsController {
  async getDietStats(req: Request, res: Response) {
    const simpleUser = await SimpleUniqueUser.findOne({ slug: "simple-unique-user" })

    if (!simpleUser) throw new AppError("This user doesn't exists in our database.", 404)

    const dietLogic = new DietLogic(req.body.dietObjective, simpleUser)

    res.json(dietLogic.getDietMeasures())
  }

  async getUserStats(_: Request, res: Response) {
    const simpleUser = await SimpleUniqueUser.findOne({ slug: "simple-unique-user" })

    if (!simpleUser) throw new AppError("This user doesn't exists in our database.", 404)

    const userLogic = new UserLogic(simpleUser)

    res.json(userLogic.getAllUserLogic())
  }

  async getBurnedCalories(req: Request, res: Response) {
    const simpleUser = await SimpleUniqueUser.findOne({ slug: "simple-unique-user" })

    if (!simpleUser) throw new AppError("This user doesn't exists in our database.", 404)

    const TPEL = new TrainingPlanExerciseLogic(simpleUser.weight)

    res.json({ burnedCalories: TPEL.getBurnedCalories(req.body)})
  }
}