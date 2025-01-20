import mongoose from "mongoose"

const Schema = mongoose.Schema

const mealSchema = new Schema({
  name: {
    type: String,
    required: [true, "A meal needs a name."]
  },

  carbs: {
    type: Number,
    required: [true, "A meal needs carbs."],
    default: 0
  },

  protein: {
    type: Number,
    required: [true, "A meal needs protein."],
    default: 0
  },

  fat: {
    type: Number,
    required: [true, "A meal needs fat."],
    default: 0
  },

  calories: {
    type: Number,
    required: [true, "A meal needs calories."],
    default: 0
  },

  slug: {
    type: String,
    required: [true, "A meal needs a slug."],
    lowercase: true
  },

  time: {
    type: Date,
    required: [true, "A meal needs a time."]
  },

  dietSlug: {
    type: String,
    required: [true, "A meal needs a diet."],
    lowercase: true
  },

  userId: {
    type: String,
    required: [true, "A meal needs an user."]
  },

  foods: [{
    type: Schema.ObjectId,
    ref: "MealFood"
  }],
})

mealSchema.index({ slug: 1 })

export const Meal = mongoose.model("Meal", mealSchema)