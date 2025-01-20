import mongoose from "mongoose";

const Schema = mongoose.Schema

const simpleUniqueUserSchema = new Schema({
  weight: {
    type: Number,
    required: [true, "A simple unique user needs a weight."]
  },

  height: {
    type: Number,
    required: [true, "A simple unique user needs a height."]
  },
  
  age: {
    type: Number,
    required: [true, "A simple unique user needs an age."]
  },

  slug: {
    type: String,
    required: [true, "A simple unique user needs a slug."],
    default: "simple-unique-user"
  },

  activityLevel: {
    type: String,
    required: [true, "A simple unique user needs an activity level."],
    enum: [
      "SEDENTARY",
      "LIGHT_EXERCISE",
      "MODERATE_EXERCISE",
      "HEAVY_EXERCISE",
      "ATHLETE"
    ]
  }
})

simpleUniqueUserSchema.index({ slug: 1 })

export const SimpleUniqueUser = mongoose.model("SimpleUniqueUser", simpleUniqueUserSchema)