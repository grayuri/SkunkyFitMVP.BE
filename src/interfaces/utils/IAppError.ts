export interface IAppError {
  statusCode: number
  message: string
  status: string
  getStatus(): string
}