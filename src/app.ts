import path from "path"
import express from "express"
import cors from "cors"
// import rateLimit from "express-rate-limit"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import hpp from "hpp"

import { foodRouter } from "./routes/foodRoutes"
import { exerciseRouter } from "./routes/exerciseRoutes"
import { dietRouter } from "./routes/dietRoutes"
import { mealRouter } from "./routes/mealRoutes"
import { mealFoodRouter } from "./routes/mealFoodRoutes"
import { trainingPlanRouter } from "./routes/trainingPlanRoutes"
import { trainingPlanExerciseRouter } from "./routes/trainingPlanExerciseRoutes"
import { statRouter } from "./routes/statRoutes"
import { simpleUniqueUserRouter } from "./routes/simpleUniqueUserRoutes"

export const app = express()

app.use(cors())

app.options("*", cors())

app.use(express.static(path.join(process.cwd(), "public")))

app.use(helmet())

// app.use(rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP. Please, try in a hour."
// }))

app.use(express.json({ limit: "10kb" }))

app.use(express.urlencoded({ extended: true, limit: "10kb" }))

app.use(cookieParser())

app.use(mongoSanitize())

app.use(hpp())

app.use("/api/v1/foods", foodRouter)
app.use("/api/v1/exercises", exerciseRouter)
app.use("/api/v1/simple-unique-users", simpleUniqueUserRouter)
app.use("/api/v1/diets", dietRouter)
app.use("/api/v1/training-plans", trainingPlanRouter)
app.use("/api/v1/meals", mealRouter)
app.use("/api/v1/meal-foods", mealFoodRouter)
app.use("/api/v1/training-plan-exercises", trainingPlanExerciseRouter)
app.use("/api/v1/stats", statRouter)