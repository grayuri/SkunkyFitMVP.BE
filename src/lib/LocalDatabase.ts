import path from "path"
import syncFs from "fs"
import fs from "fs/promises"
import { ILocalDatabase } from "../interfaces/lib/ILocalDatabase"

export default class LocalDatabase implements ILocalDatabase {
  databasePath: string
  
  constructor(databaseName: string) {
    this.databasePath = path.join(process.cwd(), "databases", `${databaseName}.json`)
    this.createDatabaseIfNotExists()
  }

  private createDatabaseIfNotExists() {
    const directoryPath = path.join(process.cwd(), "databases")

    if (!syncFs.existsSync(directoryPath)) {
      syncFs.mkdirSync(directoryPath)
      syncFs.writeFileSync(this.databasePath, "[]")
    }
  }

  async getDatas(): Promise<any[]> {
    let datas

    try {
      const datasJson: any = await fs.readFile(this.databasePath, "utf-8")
      const stringfiedDatasJson: string = JSON.stringify(datasJson)
      datas = await JSON.parse(stringfiedDatasJson)

      if (!datas) datas = "[]"
    } 
    catch (error) {
      console.log("It was not possible to get your data.")
    }

    return datas
  }

  async getData(filter: string): Promise<any> {
    let data
    let filterObject = Object.entries(filter)[0]
    let filterKey = filterObject[0]
    let filterValue = filterObject[1]

    try {
      const datasJson: any = await fs.readFile(this.databasePath, "utf-8")
      const datas = await JSON.parse(datasJson)
      data = JSON.stringify(datas.find((data: any) => data[filterKey] === filterValue))

      if (!data) data = "{}"
    } 
    catch (error) {
      console.log("It was not possible to get your data.")
    }

    return data
  }

  async writeData(data: any) {
    try {
      await fs.writeFile(this.databasePath, JSON.stringify(data), "utf-8")
      console.log("Your data was written succefully!")
    } 
    catch (error) {
      console.log("It was not possible to write your data.")
    }
  }

  async appendData(singleData: any) {
    const datasJson: any = await this.getDatas()
    let datas = JSON.parse(datasJson)

    if (!datas) datas = []

    try {
      datas.push(singleData)
      await fs.writeFile(this.databasePath, JSON.stringify(datas), "utf-8")
      console.log("Your data was written succefully!")
    } 
    catch (error) {
      console.log("It was not possible to write your data.")
    }
  }
}