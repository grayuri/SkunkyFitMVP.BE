export interface IApiServices<T> {
  query: T[] | any
  queryString: any
  total: number
  pages: number
  filterUnwishedFields(mockedObject: any): void
  filter(): IApiServices<T> | Promise<IApiServices<T>>
  sort(mockedObject?: any): IApiServices<T>
  paginate(): IApiServices<T>
}