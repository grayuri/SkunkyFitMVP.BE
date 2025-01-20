export default function getAge(initialDate: Date) {
  return new Date().getFullYear() - initialDate.getFullYear()
}