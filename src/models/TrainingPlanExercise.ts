import mongoose from "mongoose";

const Schema = mongoose.Schema

const trainingPlanExerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "A training plan exercise needs a name."]
  },

  muscleTargeted: {
    type: String,
    required: [true, "A training plan exercise needs a muscle targeted."]
  },

  equipmentType: {
    type: String,
    required: [true, "A training plan exercise needs an equipment type."]
  },

  pictureUrl: {
    type: String,
    required: [true, "A training plan exercise needs a picture url."]
  },

  slug: {
    type: String,
    required: [true, "A training plan exercise needs a slug."],
    lowercase: true
  },

  muscleTargetedSlug: {
    type: String,
    required: [true, "A training plan exercise needs a muscle targeted slug."]
  },

  equipmentTypeSlug: {
    type: String,
    required: [true, "A training plan exercise needs a equipment type slug."]
  },

  reps: {
    type: Number,
    required: [true, "A training plan exercise needs reps."]
  },

  sets: {
    type: Number,
    required: [true, "A training plan exercise needs sets."]
  },

  restTime: {
    type: Number,
    required: [true, "A training plan exercise needs a rest time."]
  },

  caloriesBurned: {
    type: Number,
    required: [true, "A training plan exercise needs calories burned."]
  },

  trainingPlanSlug: {
    type: String,
    required: [true, "A training plan exercise needs a trainning plan."],
    lowercase: true
  },

  userId: {
    type: String,
    required: [true, "A training plan exercise needs an user."]
  }
})

trainingPlanExerciseSchema.index({ slug: 1 })

export const TrainingPlanExercise = mongoose.model("TrainingPlanExercise", trainingPlanExerciseSchema)