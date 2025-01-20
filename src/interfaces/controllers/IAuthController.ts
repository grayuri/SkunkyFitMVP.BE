import { Request, Response } from "express"

export interface PasswordResetToken {
  token: string
  expirationTime: number
}

export interface IAuthController {
  signup(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
  logout(req: Request, res: Response): Promise<void>
  forgotPassword(req: Request, res: Response): Promise<void>
  resetPassword(req: Request, res: Response): Promise<void>
  updatePassword(req: Request, res: Response): Promise<void>
  createToken(id: string): Promise<string>
  sendTokenResponse(user: any, statusCode: number, req: Request, res: Response): Promise<void>
  getPasswordResetToken(): PasswordResetToken
}