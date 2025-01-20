import { ISimpleUniqueUser } from "../interfaces/entities/ISimpleUniqueUser"

export default class UserLogic {
  user: ISimpleUniqueUser

  constructor(user: any) {
    this.user = user
  }

  getAllUserLogic() {
    return {
      BMR: this.getBMR(),
      BMI: this.getBMI(),
      BMIStatus: this.getBMIStatus(),
      idealWeight: this.getIdealWeightRange()
    }
  }

  getBMR(): number {
    if (this.user.gender === "MALE") {
      return (10 * this.user.weight) + (6.25 * this.user.height) - (5 * this.user.age) + 5
    }
    else  {
      return (10 * this.user.weight) + (6.25 * this.user.height) - (5 * this.user.age) - 161
    }
  }

  getBMI(): number {
    const BMR = this.getBMR()

    if (this.user.activityLevel === "SEDENTARY") return BMR * 1.2
    else if (this.user.activityLevel === "LIGHT_EXERCISE") return BMR * 1.375
    else if (this.user.activityLevel === "MODERATE_EXERCISE") return BMR * 1.55
    else if (this.user.activityLevel === "HEAVY_EXERCISE") return BMR * 1.725
    else return BMR * 1.9
  }

  getHamwiFormulaResult(): number {
    let userInches = this.user.height * 0.034
    let idealInches = (userInches - 5) * 10
    
    if (this.user.gender === "MALE") return Math.ceil(48 + (2.7 * idealInches))
    else return Math.ceil(45.5 + (2.2 * idealInches))
  }

  getMillerFormulaResult(): number {
    let userInches = this.user.height * 0.034
    let idealInches = (userInches - 5) * 10
    
    if (this.user.gender === "MALE") return Math.ceil(56.2 + (1.41 * idealInches))
    else return Math.ceil(53.1 + (1.36 * idealInches))
  }

  getIdealWeightRange(): { min: number, max: number } {
    return {
      min: this.getMillerFormulaResult(),
      max: this.getHamwiFormulaResult()
    }
  }

  getBMIStatus(): string {
    const score = this.getBMI()

    if (score < 18.5) return "Underweight"
    else if (score >= 18.5 && score <= 24.99) return "Normal Weight"
    else if (score >= 25 && score >= 29.99) return "Overweight"
    else return "Obese"
  }
}