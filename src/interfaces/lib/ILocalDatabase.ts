export interface ILocalDatabase {
  databasePath: string
  getDatas(): Promise<any[]>
  getData(filter: any): Promise<any>
  writeData(data: any): void
  appendData(singleData: any): void
}