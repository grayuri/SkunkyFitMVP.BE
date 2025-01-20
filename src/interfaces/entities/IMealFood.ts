import { IFood } from "./IFood";

export interface IMealFood extends IFood {
  _id: string
  dietSlug: string
  mealSlug: string
  userId: string
}