import mongoose from "mongoose";

const Schema = mongoose.Schema

const dietSchema = new Schema({
  name: {
    type: String,
    required: [true, "A diet needs a name."]
  },

  carbs: {
    type: Number,
    required: [true, "A diet needs carbs."],
    default: 0
  },

  protein: {
    type: Number,
    required: [true, "A diet needs protein."],
    default: 0
  },

  fat: {
    type: Number,
    required: [true, "A diet needs fat."],
    default: 0
  },

  calories: {
    type: Number,
    required: [true, "A diet needs calories."],
    default: 0
  },

  bannerUrl: {
    type: String,
    required: [true, "A diet needs a banner."],
    default: "/images/default-meal-banner.jpg"
  },

  meals: [{
    type: Schema.ObjectId,
    ref: "Meal"
  }],

  userId: {
    type: String,
    required: [true, "A diet needs a user."]
  },

  planId: {
    type: Schema.ObjectId,
    ref: "TrainingPlan"
  },

  dietObjective: {
    type: String,
    required: [true, "A diet needs an objective."],
    enum: [ "CUTTING", "MAINTEANENCE", "BULKING" ]
  },

  slug: {
    type: String,
    required: [true, "A diet needs a slug."],
    lowercase: true
  }
}, { timestamps: true })

dietSchema.index({ slug: 1 })

export const Diet = mongoose.model("Diet", dietSchema)