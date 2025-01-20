import { Request, Response, NextFunction } from "express";

export interface IAuthMiddlewares {
  requireAuth(req: Request, res: Response, next: NextFunction): Promise<void>
  restrictTo(...roles: string[]): Promise<(req: Request, res: Response, next: NextFunction) => Promise<void>>
}