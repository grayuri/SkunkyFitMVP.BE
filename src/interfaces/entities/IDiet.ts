import { IMeal } from "./IMeal"

export interface IDiet {
  _id: string
  name: string
  carbs: number
  protein: number
  fat: number
  calories: number
  bannerUrl: string
  meals: IMeal[]
  userId: string
  planId?: string
  dietObjective: "CUTTING" | "MAINTEANENCE" | "BULKING"
  slug: string
}