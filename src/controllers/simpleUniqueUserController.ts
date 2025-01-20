import dotenv from "dotenv";
import { Response } from "express";
import { RequestWithUser } from "../interfaces/controllers/IGeneralController";
import { SimpleUniqueUser } from "../models/SimpleUniqueUser";
import { IBasicController } from "../interfaces/controllers/IBasicController";
import FactoryControllerTemplate from "./factoryControllerTemplate";
import { ISimpleUniqueUser } from "../interfaces/entities/ISimpleUniqueUser";

dotenv.config()

const FCT = new FactoryControllerTemplate()

const mockedSimpleUniqueUser: ISimpleUniqueUser = {
  _id: "",
  gender: "",
  weight: 0,
  height: 0,
  age: 0,
  activityLevel: "",
  slug: ""
}

export default class SimpleUniqueUsersController implements IBasicController {
  async getAll(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getAll({
      req,
      res,
      model: SimpleUniqueUser,
      mockedObject: mockedSimpleUniqueUser,
    })
  }

  async getOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.getOne({
      req,
      res,
      model: SimpleUniqueUser,
      mockedObject: mockedSimpleUniqueUser,
    })
  }

  async updateOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.updateOne({
      req,
      res,
      model: SimpleUniqueUser,
      mockedObject: mockedSimpleUniqueUser,
    })
  }

  async deleteOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.deleteOne({
      req,
      res,
      model: SimpleUniqueUser,
      mockedObject: mockedSimpleUniqueUser
    })
  }

  async createOne(req: RequestWithUser, res: Response): Promise<void> {
    return FCT.createOne({
      req,
      res,
      model: SimpleUniqueUser,
    })
  }
}