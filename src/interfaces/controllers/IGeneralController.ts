import { Request, Response } from "express"

export interface RequestWithUser extends Request {
  user?: any
}

export interface IGeneralController {
  getAll(req: RequestWithUser, res: Response): Promise<void> 
  getOne(req: RequestWithUser, res: Response): Promise<void> 
  updateAll(req: RequestWithUser, res: Response): Promise<void> 
  updateOne(req: RequestWithUser, res: Response): Promise<void> 
  deleteAll(req: RequestWithUser, res: Response): Promise<void> 
  deleteOne(req: RequestWithUser, res: Response): Promise<void> 
  createOne(req: RequestWithUser, res: Response): Promise<void> 
}