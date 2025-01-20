import mongoose from "mongoose";

const Schema = mongoose.Schema

const mealFoodSchema = new Schema({
  name: {
    type: String,
    required: [true, "A meal food needs a name."]
  },

  category: {
    type: String,
    required: [true, "A meal food needs category."]
  },

  calories: {
    type: Number,
    required: [true, "A meal food needs calories."]
  },

  fat: {
    type: Number,
    required: [true, "A meal food needs fat."]
  },

  carbs: {
    type: Number,
    required: [true, "A meal food needs carbs."]
  },

  protein: {
    type: Number,
    required: [true, "A meal food needs protein."]
  },

  servingSizeGrams: {
    type: Number,
    required: [true, "A meal food needs a base serving size."],
    default: 100
  },

  pictureUrl: {
    type: String,
    required: [true, "A meal food needs a picture."]
  },

  slug: {
    type: String,
    required: [true, "A meal food needs a slug."],
    lowercase: true
  },

  categorySlug: {
    type: String,
    required: [true, "A meal food needs a category slug."]
  },

  dietSlug: {
    type: String,
    required: [true, "A meal food needs a diet."],
    lowercase: true
  },

  mealSlug: {
    type: String,
    required: [true, "A meal food needs a meal."],
    lowercase: true
  },

  userId: {
    type: String,
    required: [true, "A meal food needs an user."],
    lowercase: true
  },
})

mealFoodSchema.index({ slug: 1 })

export const MealFood = mongoose.model("MealFood", mealFoodSchema)