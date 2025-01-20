import mongoose from "mongoose";

const Schema = mongoose.Schema

const trainingPlanSchema = new Schema({
  name: {
    type: String,
    required: [true, "A training plan needs a name."]
  },

  exercisesTotal: {
    type: Number,
    required: [true, "A training plan needs exercises."],
    default: 0
  },

  setsTotal: {
    type: Number,
    required: [true, "A training plan needs sets."],
    default: 0
  },

  timeTotal: {
    type: Number,
    required: [true, "A training plan needs a time."],
    default: 0
  },

  burnedCaloriesTotal: {
    type: Number,
    required: [true, "A training plan needs burned calories."],
    default: 0
  },

  targetedMuscles: {
    type: [String]
  },

  exercises: [{
    type: Schema.ObjectId,
    ref: "TrainingPlanExercise"
  }],

  bannerUrl: {
    type: String,
    required: [true, "A training plan needs a banner."],
    default: "/images/default-training-plan-banner.jpg"
  },

  userId: {
    type: String,
    required: [true, "A training plan needs a user."]
  },

  slug: {
    type: String,
    required: [true, "A training plan needs a slug."],
    unique: true,
    lowercase: true
  }
}, { timestamps: true })

trainingPlanSchema.index({ slug: 1 })

export const TrainingPlan = mongoose.model("TrainingPlan", trainingPlanSchema)