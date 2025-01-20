import { ITrainingPlanExercise } from "./ITrainingPlanExercise"

export interface ITrainingPlan {
  _id: string
  name: string
  exercisesTotal: number
  setsTotal: number
  timeTotal: number
  burnedCaloriesTotal: number
  targetedMuscles: string[]
  exercises: ITrainingPlanExercise[]
  bannerUrl: string
  userId: string
  slug: string
}