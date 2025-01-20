import { Request, Response } from "express"

export interface IGetterController {
  getAll(req: Request, res: Response): void
  getOne(req: Request, res: Response): void
}