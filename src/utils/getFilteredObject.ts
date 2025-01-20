export default function getFilteredObject(mockedObject: any, filters: any, excludedFields?: string[]) {
  const filteredObject: any = {}
  
  if (filters) {
    const validKeys = Object.keys(mockedObject)
  
    Object.entries(filters).forEach((entry: any) => {
      const key = entry[0]
      const value = entry[1]
  
      if (validKeys.includes(key)) {
        if (
          !(
            excludedFields !== undefined && 
            excludedFields.length > 0 &&
            excludedFields.includes(key)
          )
        ) filteredObject[key] = value
      }
    })
  }

  return filteredObject
}