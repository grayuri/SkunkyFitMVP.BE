import { IApiServices } from "../interfaces/services/IApiServices";

export default class LocalApiServices<T> implements IApiServices<T> {
  public query: T[]
  public queryString: any
  public total: number
  public pages: number
  
  constructor(query: T[], queryString: any) {
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
  
  public filter(): IApiServices<T> {
    const excludeFields = ["sort", "page", "limit"]

    this.total = this.query.length

    Object.entries(this.queryString).forEach((entry: any[]) => {
      if (excludeFields.includes(entry[0])) return

      const field = entry[0]
      const value = entry[1]
      const operationExists = value.includes(":")

      if (operationExists) {
        const valueEntry: string[] = value.split(":")
        const operation = valueEntry[0]
        const operationValue = Number(valueEntry[1])
        
        switch(operation) {
          case "gt":
            this.query = this.query.filter((data: any) => data[field] > operationValue)
            break
          case "lt":
            this.query = this.query.filter((data: any) => data[field] < operationValue)
            break
          case "gte":
            this.query = this.query.filter((data: any) => data[field] >= operationValue)
            break
          case "lte":
            this.query = this.query.filter((data: any) => data[field] <= operationValue)
            break
          default:
            this.query = this.query.filter((data: any) => data[field] === operationValue)
        }
      }
      else {
        this.query = this.query.filter((data: any) => data[field].toLowerCase().includes(value.toLowerCase()))
      }

      this.total = this.query.length
    })

    return this
  }
  
  public sort(mockedObject: any): IApiServices<T> {
    if (this.queryStringIsEmpty()) return this
    if (!this.queryString.sort) return this

    const moreThanOneSort = this.queryString.sort.includes(",")
  
    let wishedFieldsToSort = []
    
    if (moreThanOneSort) {
      wishedFieldsToSort = this.queryString.sort.split(",")
    }
    else {
      wishedFieldsToSort.push(this.queryString.sort)
    }


    wishedFieldsToSort.forEach((value: any) => {
      const fieldIncludesMinus = value.includes("-")
      let field = value

      if (fieldIncludesMinus) field = field.replace("-", "")

      const typeOfField = typeof mockedObject[field]

      switch (typeOfField) {
        case "string":
          if (!fieldIncludesMinus) this.query = this.query.sort((a: any, b: any) => (a[field] > b[field] ? 1 : -1))
          else this.query = this.query.sort((a: any, b: any) => (a[field] > b[field] ? -1 : 1))
          break

        case "number":
          if (!fieldIncludesMinus) this.query = this.query.sort((a: any, b: any) => a[field] - b[field])
          else this.query = this.query.sort((a: any, b: any) => b[field] - a[field])
          break

        default:
          this.query
      }
    })

    return this
  }
  
  public paginate(): IApiServices<T> {
    let page = this.queryString.page ? JSON.parse(this.queryString.page) : 1
    let limit = this.queryString.limit ? JSON.parse(this.queryString.limit) : 18
    let skip = (page - 1) * limit

    this.pages = Math.ceil(this.total / limit) 
    this.query = this.query.splice(skip, limit)

    return this
  }
}