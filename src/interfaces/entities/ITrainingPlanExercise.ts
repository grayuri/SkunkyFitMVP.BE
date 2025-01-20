import { IExercise } from "./IExercise";

export interface ITrainingPlanExercise extends IExercise {
  _id: string
  reps: number
  sets: number
  restTime: number
  caloriesBurned: number
  trainingPlanSlug: string
  slug: string
  userId: string
}