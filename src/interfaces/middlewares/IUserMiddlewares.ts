import { Request, Response, NextFunction } from "express";

export interface IUserMiddlewares {
  resizeUserAvatar(req: Request, res: Response, next: NextFunction): Promise<void>
}