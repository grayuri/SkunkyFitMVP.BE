export default function getTimeFormatedDate(receivedTime: string): Date {
  const hours = Number(receivedTime.split(":")[0])
  const minutes = Number(receivedTime.split(":")[1])
  return new Date(2001, 0, 1, hours, minutes)
}