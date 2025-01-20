"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var MealFood_1 = require("../models/MealFood");
var factoryControllerTemplate_1 = require("./factoryControllerTemplate");
var Meal_1 = require("../models/Meal");
var Diet_1 = require("../models/Diet");
var AppError_1 = require("../utils/AppError");
var AwsS3_1 = require("../lib/AwsS3");
dotenv_1.default.config();
var FCT = new factoryControllerTemplate_1.default();
var S3 = new AwsS3_1.default(process.env.AWS_BUCKET_NAME, process.env.AWS_BUCKET_REGION);
var mockedMealFood = {
    _id: "",
    name: "",
    category: "",
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    servingSizeGrams: 0,
    slug: "",
    mealSlug: "",
    dietSlug: "",
    userId: "",
    categorySlug: "",
    pictureUrl: ""
};
var MealFoodsController = /** @class */ (function () {
    function MealFoodsController() {
    }
    MealFoodsController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getAll({
                        req: req,
                        res: res,
                        model: MealFood_1.MealFood,
                        mockedObject: mockedMealFood,
                        manageFiles: function (foods) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, foods_1, food, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _i = 0, foods_1 = foods;
                                        _b.label = 1;
                                    case 1:
                                        if (!(_i < foods_1.length)) return [3 /*break*/, 4];
                                        food = foods_1[_i];
                                        _a = food;
                                        return [4 /*yield*/, S3.getFile(food.pictureUrl)];
                                    case 2:
                                        _a.pictureUrl = _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    MealFoodsController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getOne({
                        req: req,
                        res: res,
                        model: MealFood_1.MealFood,
                        mockedObject: mockedMealFood,
                        manageFiles: function (food) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = food;
                                        return [4 /*yield*/, S3.getFile(food.pictureUrl)];
                                    case 1:
                                        _a.pictureUrl = _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    MealFoodsController.prototype.updateOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                req.body.pictureUrl = "images/foods/".concat(req.body.slug, ".png");
                return [2 /*return*/, FCT.updateOne({
                        req: req,
                        res: res,
                        model: MealFood_1.MealFood,
                        mockedObject: mockedMealFood,
                        integrateModels: function (oldFood) { return __awaiter(_this, void 0, void 0, function () {
                            var diet, meal, dietChangings, mealChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Diet_1.Diet.findOne({ slug: oldFood.dietSlug })];
                                    case 1:
                                        diet = _a.sent();
                                        return [4 /*yield*/, Meal_1.Meal.findOne({ slug: oldFood.mealSlug, dietSlug: oldFood.dietSlug })];
                                    case 2:
                                        meal = _a.sent();
                                        if (!diet)
                                            throw new AppError_1.AppError("The diet of this food doesn't exist.", 400);
                                        if (!meal)
                                            throw new AppError_1.AppError("The meal of this food doesn't exist.", 400);
                                        dietChangings = {
                                            carbs: diet.carbs - oldFood.carbs + req.body.carbs,
                                            protein: diet.protein - oldFood.protein + req.body.protein,
                                            fat: diet.fat - oldFood.fat + req.body.fat,
                                            calories: diet.calories - oldFood.calories + req.body.calories
                                        };
                                        mealChangings = {
                                            carbs: meal.carbs - oldFood.carbs + req.body.carbs,
                                            protein: meal.protein - oldFood.protein + req.body.protein,
                                            fat: meal.fat - oldFood.fat + req.body.fat,
                                            calories: meal.calories - oldFood.calories + req.body.calories
                                        };
                                        return [4 /*yield*/, Diet_1.Diet.updateOne({ slug: oldFood.dietSlug }, dietChangings)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, Meal_1.Meal.updateOne({ slug: oldFood.mealSlug, dietSlug: oldFood.dietSlug }, mealChangings)];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    MealFoodsController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.deleteOne({
                        req: req,
                        res: res,
                        model: MealFood_1.MealFood,
                        mockedObject: mockedMealFood,
                        integrateModels: function (food) { return __awaiter(_this, void 0, void 0, function () {
                            var diet, meal, dietChangings, mealChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Diet_1.Diet.findOne({ slug: food.dietSlug })];
                                    case 1:
                                        diet = _a.sent();
                                        return [4 /*yield*/, Meal_1.Meal.findOne({ slug: food.mealSlug, dietSlug: food.dietSlug })];
                                    case 2:
                                        meal = _a.sent();
                                        if (!diet)
                                            throw new AppError_1.AppError("The diet of this food doesn't exist.", 400);
                                        if (!meal)
                                            throw new AppError_1.AppError("The meal of this food doesn't exist.", 400);
                                        dietChangings = {
                                            carbs: diet.carbs - food.carbs,
                                            protein: diet.protein - food.protein,
                                            fat: diet.fat - food.fat,
                                            calories: diet.calories - food.calories,
                                        };
                                        mealChangings = {
                                            carbs: meal.carbs - food.carbs,
                                            protein: meal.protein - food.protein,
                                            fat: meal.fat - food.fat,
                                            calories: meal.calories - food.calories,
                                            $pull: { foods: food._id }
                                        };
                                        return [4 /*yield*/, Diet_1.Diet.updateOne({ slug: food.dietSlug }, dietChangings)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, Meal_1.Meal.updateOne({ slug: food.mealSlug, dietSlug: food.dietSlug }, mealChangings)];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    MealFoodsController.prototype.createOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                req.body.pictureUrl = "images/foods/".concat(req.body.slug, ".png");
                return [2 /*return*/, FCT.createOne({
                        req: req,
                        res: res,
                        model: MealFood_1.MealFood,
                        integrateModels: function (food) { return __awaiter(_this, void 0, void 0, function () {
                            var diet, meal, dietChangings, mealChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Diet_1.Diet.findOne({ slug: food.dietSlug })];
                                    case 1:
                                        diet = _a.sent();
                                        return [4 /*yield*/, Meal_1.Meal.findOne({ slug: food.mealSlug, dietSlug: food.dietSlug })];
                                    case 2:
                                        meal = _a.sent();
                                        if (!diet)
                                            throw new AppError_1.AppError("The diet of this food doesn't exist.", 400);
                                        if (!meal)
                                            throw new AppError_1.AppError("The meal of this food doesn't exist.", 400);
                                        dietChangings = {
                                            carbs: diet.carbs + food.carbs,
                                            protein: diet.protein + food.protein,
                                            fat: diet.fat + food.fat,
                                            calories: diet.calories + food.calories,
                                        };
                                        mealChangings = {
                                            carbs: meal.carbs + food.carbs,
                                            protein: meal.protein + food.protein,
                                            fat: meal.fat + food.fat,
                                            calories: meal.calories + food.calories,
                                            $push: { foods: food._id }
                                        };
                                        return [4 /*yield*/, Diet_1.Diet.updateOne({ slug: food.dietSlug }, dietChangings)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, Meal_1.Meal.updateOne({ slug: food.mealSlug, dietSlug: food.dietSlug }, mealChangings)];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    return MealFoodsController;
}());
exports.default = MealFoodsController;
