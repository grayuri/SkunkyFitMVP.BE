import { Request, Response } from "express"
import { IBasicController } from "./IBasicController"
import { RequestWithUser } from "./IGeneralController"

export interface IUserController extends IBasicController {
  uploadProfilePhotos(): void
  updateProfile(req: Request, res: Response): Promise<void> // /user/profile/:id
}