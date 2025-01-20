import { IAppError } from "../interfaces/utils/IAppError";

export class AppError implements IAppError {
  public message: string
  public statusCode: number
  public status: string

  constructor(message: string, statusCode: number) {
    this.message = message
    this.statusCode = statusCode
    this.status = this.getStatus()
  }

  getStatus(): string {
    const sc: string = String(this.statusCode)
    
    if (sc.startsWith("4")) return "Error"
    if (sc.startsWith("3")) return "Redirected"
    if (sc.startsWith("5")) return "Success"

    return "Fail"
  }
}