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
var Meal_1 = require("../models/Meal");
var factoryControllerTemplate_1 = require("./factoryControllerTemplate");
var Diet_1 = require("../models/Diet");
var slugify_1 = require("../utils/slugify");
var getTimeFormatedDate_1 = require("../utils/getTimeFormatedDate");
var AppError_1 = require("../utils/AppError");
var MealFood_1 = require("../models/MealFood");
var FCT = new factoryControllerTemplate_1.default();
var mockedMeal = {};
var MealsController = /** @class */ (function () {
    function MealsController() {
    }
    MealsController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getAll({
                        req: req,
                        res: res,
                        model: Meal_1.Meal,
                        mockedObject: mockedMeal,
                        populate: [{
                                path: "foods",
                                model: "MealFood"
                            }]
                    })];
            });
        });
    };
    MealsController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getOne({
                        req: req,
                        res: res,
                        model: Meal_1.Meal,
                        mockedObject: mockedMeal,
                        populate: [{
                                path: "foods",
                                model: "MealFood"
                            }]
                    })];
            });
        });
    };
    MealsController.prototype.updateOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.name)
                    req.body.slug = (0, slugify_1.default)(req.body.name);
                if (req.body.time)
                    req.body.time = (0, getTimeFormatedDate_1.default)(req.body.time);
                return [2 /*return*/, FCT.updateOne({
                        req: req,
                        res: res,
                        model: Meal_1.Meal,
                        mockedObject: mockedMeal,
                        integrateModels: function (oldMeal) { return __awaiter(_this, void 0, void 0, function () {
                            var currentCarbs, currentProtein, currentFat, currentCalories, diet, dietChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        currentCarbs = req.body.carbs - oldMeal.carbs;
                                        currentProtein = req.body.protein - oldMeal.protein;
                                        currentFat = req.body.fat - oldMeal.fat;
                                        currentCalories = req.body.calories - oldMeal.calories;
                                        return [4 /*yield*/, Diet_1.Diet.findOne({ slug: oldMeal.dietSlug })];
                                    case 1:
                                        diet = _a.sent();
                                        if (!diet)
                                            throw new AppError_1.AppError("The diet of this food doesn't exist.", 400);
                                        dietChangings = {
                                            carbs: diet.carbs + currentCarbs,
                                            protein: diet.protein + currentProtein,
                                            fat: diet.fat + currentFat,
                                            calories: diet.calories + currentCalories,
                                        };
                                        if (!(oldMeal.slug !== req.body.slug)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, MealFood_1.MealFood.updateMany({ mealSlug: oldMeal.slug }, { mealSlug: req.body.slug })];
                                    case 2:
                                        _a.sent();
                                        dietChangings.mealSlug = req.body.slug;
                                        _a.label = 3;
                                    case 3: return [4 /*yield*/, Diet_1.Diet.updateOne({ slug: oldMeal.dietSlug }, dietChangings)];
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
    MealsController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.deleteOne({
                        req: req,
                        res: res,
                        model: Meal_1.Meal,
                        mockedObject: mockedMeal,
                        integrateModels: function (meal) { return __awaiter(_this, void 0, void 0, function () {
                            var diet, dietChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Diet_1.Diet.findOne({ slug: meal.dietSlug })];
                                    case 1:
                                        diet = _a.sent();
                                        if (!diet)
                                            throw new AppError_1.AppError("The diet of this food doesn't exist.", 400);
                                        dietChangings = {
                                            carbs: diet.carbs - meal.carbs,
                                            protein: diet.protein - meal.protein,
                                            fat: diet.fat - meal.fat,
                                            calories: diet.calories - meal.calories,
                                            $pull: { meals: meal._id }
                                        };
                                        return [4 /*yield*/, Diet_1.Diet.updateOne({ slug: meal.dietSlug }, dietChangings)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    MealsController.prototype.createOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                req.body.slug = (0, slugify_1.default)(req.body.name);
                req.body.time = (0, getTimeFormatedDate_1.default)(req.body.time);
                return [2 /*return*/, FCT.createOne({
                        req: req,
                        res: res,
                        model: Meal_1.Meal,
                        integrateModels: function (meal) { return __awaiter(_this, void 0, void 0, function () {
                            var diet;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Diet_1.Diet.findOne({ slug: meal.dietSlug })];
                                    case 1:
                                        diet = _a.sent();
                                        if (!diet)
                                            throw new AppError_1.AppError("The diet of this food doesn't exist.", 400);
                                        return [4 /*yield*/, Diet_1.Diet.updateOne({ slug: meal.dietSlug }, { $push: { meals: meal._id } })];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    return MealsController;
}());
exports.default = MealsController;
