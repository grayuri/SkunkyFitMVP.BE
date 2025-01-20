export default function enumerateValues(values: string[]): string {
  const maxIndex = values.length - 1
  let stringifiedValues = ""

  values.forEach((value: any, index: number) => {
    if (index < maxIndex) {
      if (index === maxIndex - 1) {
        stringifiedValues += `${value} and `
      }
      else {
        stringifiedValues += `${value}, `
      }
    }
    else if (index === maxIndex) {
      stringifiedValues += value
    }
  })

  return stringifiedValues
}