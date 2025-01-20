export default class TrainingPlanExerciseLogic {
  userWeight: number

  constructor(userWeight: number) {
    this.userWeight = userWeight
  }

  getBurnedCalories(exercise: any): number {
    const totalTime = ((exercise.reps * 4) * exercise.sets) / 60

    let MET = 3.5

    switch (exercise.muscleTargeted) {
      case (exercise.muscleTargeted === "Chest"):
        MET = 3.8
        break
      case (exercise.muscleTargeted === "Lats"):
        MET = 3.8
        break
      case (exercise.muscleTargeted === "Quadriceps"):
        MET = 3.8
        break
      case (exercise.muscleTargeted === "Hamstrings"):
        MET = 3.8
        break
    }

    return totalTime * (3.5 * MET * this.userWeight) / 200
  }
}