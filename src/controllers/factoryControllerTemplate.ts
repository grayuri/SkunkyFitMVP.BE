import ApiServices from "../services/ApiServices"
import { AppError } from "../utils/AppError"
import { 
  IFactoryControllerTemplate,
  PropsWithMock,
  PropsWithoutMock
} from "../interfaces/controllers/IFactoryControllerTemplate"
import getFilteredObject from "../utils/getFilteredObject"

export default class FactoryControllerTemplate implements IFactoryControllerTemplate{
  async getAll({ req, res, model, mockedObject, populate, manageFiles, integrateModels }: PropsWithMock) {
    if (!populate || populate.length === 0) populate = []

    try {
      const modelQuery = model.find().populate(populate)
      const AS = new ApiServices(modelQuery, req.query).filterUnwishedFields(mockedObject)
      await AS.filter()
      AS.sort(mockedObject)
      AS.paginate()

      const datas = await AS.query

      if (manageFiles) await manageFiles(datas)
      if (integrateModels) await integrateModels(datas)

      res.status(200).json({
        total: AS.total,
        results: datas.length,
        page: req.query.page || 1,
        pages: AS.pages,
        datas
      })
    }
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to fetch your datas."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }

  async getOne({ req, res, model, populate, manageFiles, mockedObject, integrateModels }: PropsWithMock) {
    if (!populate || populate.length === 0) populate = []

    try {
      const query = getFilteredObject(mockedObject, req.query)
      const data = await model.findOne({ slug: req.params.slug, ...query, /* userId */ }).populate(populate)
      
      if (!data) throw new AppError("This data doesn't exist.", 400)
      if (manageFiles) await manageFiles(data)
      if (integrateModels) await integrateModels(data)

      res.status(200).json(data)
    }
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to fetch your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }

  async updateOne({ req, res, model, mockedObject, manageFiles, integrateModels }: PropsWithMock) {
    try {
      const query = getFilteredObject(mockedObject, req.query)
      const oldData = await model.findOne({ slug: req.params.slug, ...query /* userId */ })

      if (!oldData) throw new AppError("This data doesn't exist.", 400)

      await model.findOneAndUpdate({ slug: req.params.slug, ...query /* userId */ }, req.body)

      if (manageFiles) await manageFiles(oldData)
      if (integrateModels) await integrateModels(oldData)

      res.status(200).json({
        status: "Success",
        message: "The data was updated successfully."
      })
    }
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to update your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }

  async deleteOne({ req, res, model, mockedObject, manageFiles, integrateModels }: PropsWithMock) {
    try {
      const query = getFilteredObject(mockedObject, req.query)
      const data = await model.findOne({ slug: req.params.slug, ...req.query /* userId */ })

      if (!data) throw new AppError("This data doesn't exist.", 400)

      await model.deleteOne({ slug: req.params.slug, ...query /* userId */ })

      if (manageFiles) await manageFiles(data)
      if (integrateModels) await integrateModels(data)

      res.status(200).json({
        status: "Success",
        message: "The data was deleted successfully."
      })
    }
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to delete your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }

  async createOne({ req, res, model, manageFiles, integrateModels }: PropsWithoutMock) {
    try {
      const data = await model.create(req.body)

      if (!data) throw new AppError("It was not possible to create your data.", 400)
      if (manageFiles) await manageFiles()
      if (integrateModels) await integrateModels(data)

      res.status(200).json(data)
    }
    catch (error: any) {
      const statusCode = error.statusCode || 400
      const message = error.message || "It was not possible to create your data."
      const e = new AppError(message, statusCode)

      res.status(statusCode).json(e)
    }
  }
}
