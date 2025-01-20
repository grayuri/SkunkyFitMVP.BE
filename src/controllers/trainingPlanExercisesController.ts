import { ITrainingPlanExercise } from "../interfaces/entities/ITrainingPlanExercise";
import { Response } from "express";
import { RequestWithUser } from "../interfaces/controllers/IGeneralController";
import { TrainingPlanExercise } from "../models/TrainingPlanExercise";
import FactoryControllerTemplate from "./factoryControllerTemplate";
import { IBasicController } from "../interfaces/controllers/IBasicController";
import { TrainingPlan } from "../models/TrainingPlan";
import { AppError } from "../utils/AppError";

const FCT = new FactoryControllerTemplate()

const mockedTrainingPlanExercise: ITrainingPlanExercise = {
  _id: "",
  reps: 0,
  sets: 0,
  restTime: 0,
  caloriesBurned: 0,
  trainingPlanSlug: "",
  slug: "",
  userId: "",
  name: "",
  equipmentType: "",
  equipmentTypeSlug: "",
  muscleTargeted: "",
  muscleTargetedSlug: "",
  pictureUrl: ""
}

export default class TrainingPlanExercisesController implements IBasicController {
  async getAll(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getAll({
      req,
      res,
      model: TrainingPlanExercise,
      mockedObject: mockedTrainingPlanExercise
    })
  }

  async getOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getOne({
      req,
      res,
      model: TrainingPlanExercise,
      mockedObject: mockedTrainingPlanExercise
    })
  }

  async updateOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.updateOne({
      req,
      res,
      model: TrainingPlanExercise,
      mockedObject: mockedTrainingPlanExercise,
      integrateModels: async (oldExercise: ITrainingPlanExercise) => {
        const plan = await TrainingPlan.findOne({ slug: oldExercise.trainingPlanSlug }).populate([{
          path: "exercises",
          model: "TrainingPlanExercise"
        }])

        if (!plan) throw new AppError("The plan of this food doesn't exist.", 400)

        const currentTotalSetTimeInMinutes = ((req.body.reps * 4) * req.body.sets + req.body.restTime) / 60
        const oldTotalSetTimeInMinutes = ((oldExercise.reps * 4) * oldExercise.sets + oldExercise.restTime) / 60

        const planChangings = {
          timeTotal: plan.timeTotal - oldTotalSetTimeInMinutes + currentTotalSetTimeInMinutes,
          burnedCaloriesTotal: plan.burnedCaloriesTotal - oldExercise.caloriesBurned + req.body.caloriesBurned,
          setsTotal: plan.setsTotal - oldExercise.sets + req.body.sets
        }

        await TrainingPlan.updateOne({ slug: oldExercise.trainingPlanSlug }, planChangings)
      }
    })
  }

  async deleteOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.deleteOne({
      req,
      res,
      model: TrainingPlanExercise,
      mockedObject: mockedTrainingPlanExercise,
      integrateModels: async (exercise: ITrainingPlanExercise) => {
        const plan: any = await TrainingPlan.findOne({ slug: exercise.trainingPlanSlug }).populate([{
          path: "exercises",
          model: "TrainingPlanExercise"
        }])

        if (!plan) throw new AppError("The plan of this food doesn't exist.", 400)

        const totalSetTimeInMinutes = ((exercise.reps * 4) * exercise.sets + exercise.restTime) / 60
        let currentTargetedMuscles = plan.targetedMuscles
        let quantityOfSameTargetedMuscles = 1

        if (plan.exercises.length > 0) {
          plan.exercises.forEach((ex: any) => {
            if (ex.muscleTargeted === exercise.muscleTargeted) quantityOfSameTargetedMuscles++
          })
        }

        if (quantityOfSameTargetedMuscles === 1) {
          currentTargetedMuscles = currentTargetedMuscles.filter((targetedMuscle: any) => targetedMuscle !== exercise.muscleTargeted)
        }

        const planChangings: any = {
          exercisesTotal: plan.exercisesTotal - 1,
          setsTotal: plan.setsTotal - exercise.sets,
          timeTotal: plan.timeTotal - totalSetTimeInMinutes,
          targetedMuscles: currentTargetedMuscles,
          burnedCaloriesTotal: plan.burnedCaloriesTotal - exercise.caloriesBurned,
          $pull: { exercises: exercise._id }
        }

        await TrainingPlan.updateOne({ slug: exercise.trainingPlanSlug }, planChangings)
      }
    })
  }

  async createOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.createOne({
      req,
      res,
      model: TrainingPlanExercise,
      integrateModels: async (exercise: ITrainingPlanExercise) => {
        const plan = await TrainingPlan.findOne({ slug: exercise.trainingPlanSlug }).populate([{
          path: "exercises",
          model: "TrainingPlanExercise"
        }])

        if (!plan) throw new AppError("The plan of this food doesn't exist.", 400)

        const totalSetTimeInMinutes = ((exercise.reps * 4) * exercise.sets + exercise.restTime) / 60
        const currentTargetedMuscles = [...plan.targetedMuscles]

        if (!plan.targetedMuscles.includes(exercise.muscleTargeted)) currentTargetedMuscles.push(exercise.muscleTargeted)

        const planChangings = {
          exercisesTotal: plan.exercisesTotal + 1,
          setsTotal: plan.setsTotal + exercise.sets,
          timeTotal: plan.timeTotal + totalSetTimeInMinutes,
          burnedCaloriesTotal: plan.burnedCaloriesTotal + exercise.caloriesBurned,
          targetedMuscles: currentTargetedMuscles,
          $push: { exercises: exercise._id }
        }

        await TrainingPlan.updateOne({ slug: exercise.trainingPlanSlug }, planChangings)
      }
    })
  }
} 