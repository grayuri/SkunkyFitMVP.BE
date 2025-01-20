import UserLogic from "./UserLogic";

export default class DietLogic {
  dietObjective: string
  userLogic: any

  constructor(dietObjective: string, user: any) {
    this.dietObjective = dietObjective
    this.userLogic = new UserLogic(user)
  }

  getDietMeasures() {
    let totalOfCalories = this.userLogic.getBMI()

    if (this.dietObjective === "BULKING") totalOfCalories += 500
    else if (this.dietObjective === "CUTTING") totalOfCalories -= 500

    const carbs = Number(((totalOfCalories * 0.35) / 4).toFixed(2))
    const fat = Number(((totalOfCalories * 0.35) / 9).toFixed(2))
    const protein = Number(((totalOfCalories * 0.3) / 4).toFixed(2))

    return {
      calories: Number(totalOfCalories.toFixed(2)),
      carbs,
      fat,
      protein
    }
  }
}