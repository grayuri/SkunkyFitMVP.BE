import { IApiServices } from "../interfaces/services/IApiServices";

export default class ApiServices<T> implements IApiServices<T> {
  public query: T[] | any
  public queryString: any
  public total: number
  public pages: number
  
  constructor(query: T[] | any, queryString: any) {
    this.query = query
    this.queryString = queryString
    this.total = 0
    this.pages = 0
  }

  private queryStringIsEmpty() {
    return Object.keys(this.queryString).length === 0
  }

  public filterUnwishedFields(mockedObject: any) {
    if (this.queryStringIsEmpty()) return this

    const wishedFields: string[] = Object.keys(mockedObject)
    const excludeFields = ["sort", "page", "limit"]
    let newQueryString: any = {}

    Object.keys(this.queryString).forEach(key => {
      if (excludeFields.includes(key)) newQueryString[key] = this.queryString[key]
      if (wishedFields.includes(key)) newQueryString[key] = this.queryString[key]
    })

    this.queryString = newQueryString

    return this
  }
  
  public async filter(): Promise<IApiServices<T>> {
    const filterQuery: any = {}
    const excludeFields = ["sort", "page", "limit"]
    
    if (this.queryStringIsEmpty()) {
      this.total = await this.query.clone().countDocuments(filterQuery)
      return this
    }
    
    Object.entries(this.queryString).forEach((entry: any[]) => {
      if (excludeFields.includes(entry[0])) return

      const field = entry[0]
      const value = entry[1]
      const operationExists = value.includes(":")

      if (operationExists) {
        const valueEntry: string[] = value.split(":")
        const operation = `$${valueEntry[0]}`
        const operationValue = Number(valueEntry[1])
        
        filterQuery[field] = {
          [operation]: operationValue
        }
      }
      else {
        filterQuery[field] = value
      }
    })

    this.query = this.query.find(filterQuery)
    this.total = this.query.clone().countDocuments(filterQuery)

    return this
  }
  
  public sort(mockedObject: any): IApiServices<T> {
    if (this.queryStringIsEmpty()) return this
    if (!this.queryString.sort) return this

    const validFieldsToSort = Object.keys(mockedObject)
    const actualFieldsToSort = this.queryString.sort.split(",")
    const wishedFieldsToSort: string[] = []

    actualFieldsToSort.forEach((field: string) => {
      const fieldIncludesMinus = field.includes("-")
      let fieldName = field

      if (fieldIncludesMinus) fieldName = field.replace("-", "")
      if (validFieldsToSort.includes(fieldName)) wishedFieldsToSort.push(field)
    })

    const wishedFieldsToSortString = wishedFieldsToSort.join(" ")

    this.query = this.query.sort(wishedFieldsToSortString)

    return this
  }
  
  public paginate(): IApiServices<T> {
    let page = this.queryString.page ? JSON.parse(this.queryString.page) : 1
    let limit = this.queryString.limit ? JSON.parse(this.queryString.limit) : 18
    let skip = (page - 1) * limit

    this.pages = Math.ceil(this.total / limit)
    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}