export default function getFormatedTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = Math.floor(minutes - (hours * 60))

  if (hours === 0) return `${mins} minutes`
  else return `${hours}h and ${mins} minutes`
}