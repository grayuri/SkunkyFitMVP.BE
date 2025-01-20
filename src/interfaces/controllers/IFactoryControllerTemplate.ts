import { Response } from "express"
import { RequestWithUser } from "./IGeneralController"

export interface IMongoosePopulate {
  path: string
  model: string
  populate?: IMongoosePopulate[]
}

export interface PropsWithoutMock {
  req: RequestWithUser
  res: Response
  model: any
  populate?: IMongoosePopulate[]
  aggregate?: any[]
  manageFiles?(data?: any): any
  integrateModels?(data: any): void
}

export interface PropsWithMock extends PropsWithoutMock {
  mockedObject: any
}

export interface IFactoryControllerTemplate {
  getAll(props: PropsWithMock): Promise<void> 
  getOne(props: PropsWithMock): Promise<void> 
  updateOne(props: PropsWithMock): Promise<void> 
  deleteOne(props: PropsWithMock): Promise<void> 
  createOne(props: PropsWithoutMock): Promise<void> 
}