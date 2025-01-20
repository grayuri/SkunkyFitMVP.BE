import mongoose from "mongoose";
import validator from "validator"

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "An user needs an email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please, provide a valid email."]
  },

  password: {
    type: String,
    required: [true, "An user needs a password."]
  },

  passwordResetToken: {
    type: String,
    required: false
  },

  resetTokenExpires: {
    type: Date,
    required: false
  },

  profilePictureUrl: {
    type: String,
    required: [true, "An user needs a profile picture."],
    default: "/images/default-profile-picture.jpg"
  },

  name: {
    type: String,
    required: [true, "An user needs a name."]
  },

  lastName: {
    type: String,
    required: [true, "An user needs a last name."]
  },

  height: {
    type: Number,
    required: [true, "An user needs a height."]
  },

  weight: {
    type: Number,
    required: [true, "An user needs a weight."]
  },

  birthdate: {
    type: Date,
    required: [true, "An user needs a birthdate."]
  },

  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
    required: [true, "An user needs a gender."]
  },

  role: {
    type: String,
    require: [true, "An user needs a role."],
    default: "BASIC_USER"
  },

  activityLevel: {
    type: String,
    required: [true, "An user needs a activity level."],
    enum: [
      "SEDENTARY",
      "LIGHT_EXERCISE",
      "MODERATE_EXERCISE",
      "HEAVY_EXERCISE",
      "ATHLETE"
    ]
  }
})

export const User = mongoose.model("User", userSchema)