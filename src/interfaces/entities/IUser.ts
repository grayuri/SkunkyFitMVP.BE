import { IActivityLevelType } from "./IActivityLevel"

export interface IUser {
  _id: any,
  email: string
  password: string,
  passwordResetToken: string | null | undefined 
  resetTokenExpires: Date | null | undefined 
  role: string
  profilePictureUrl: string
  name: string
  lastName: string
  height: number
  weight: number
  birthdate: Date
  gender: "MALE" | "FEMALE"
  activityLevel: IActivityLevelType
}