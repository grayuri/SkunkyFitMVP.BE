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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var TrainingPlanExercise_1 = require("../models/TrainingPlanExercise");
var factoryControllerTemplate_1 = require("./factoryControllerTemplate");
var TrainingPlan_1 = require("../models/TrainingPlan");
var AppError_1 = require("../utils/AppError");
var FCT = new factoryControllerTemplate_1.default();
var mockedTrainingPlanExercise = {
    _id: "",
    reps: 0,
    sets: 0,
    restTime: 0,
    caloriesBurned: 0,
    trainingPlanSlug: "",
    slug: "",
    userId: "",
    name: "",
    equipmentType: "",
    equipmentTypeSlug: "",
    muscleTargeted: "",
    muscleTargetedSlug: "",
    pictureUrl: ""
};
var TrainingPlanExercisesController = /** @class */ (function () {
    function TrainingPlanExercisesController() {
    }
    TrainingPlanExercisesController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getAll({
                        req: req,
                        res: res,
                        model: TrainingPlanExercise_1.TrainingPlanExercise,
                        mockedObject: mockedTrainingPlanExercise
                    })];
            });
        });
    };
    TrainingPlanExercisesController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getOne({
                        req: req,
                        res: res,
                        model: TrainingPlanExercise_1.TrainingPlanExercise,
                        mockedObject: mockedTrainingPlanExercise
                    })];
            });
        });
    };
    TrainingPlanExercisesController.prototype.updateOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.updateOne({
                        req: req,
                        res: res,
                        model: TrainingPlanExercise_1.TrainingPlanExercise,
                        mockedObject: mockedTrainingPlanExercise,
                        integrateModels: function (oldExercise) { return __awaiter(_this, void 0, void 0, function () {
                            var plan, currentTotalSetTimeInMinutes, oldTotalSetTimeInMinutes, planChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, TrainingPlan_1.TrainingPlan.findOne({ slug: oldExercise.trainingPlanSlug }).populate([{
                                                path: "exercises",
                                                model: "TrainingPlanExercise"
                                            }])];
                                    case 1:
                                        plan = _a.sent();
                                        if (!plan)
                                            throw new AppError_1.AppError("The plan of this food doesn't exist.", 400);
                                        currentTotalSetTimeInMinutes = ((req.body.reps * 4) * req.body.sets + req.body.restTime) / 60;
                                        oldTotalSetTimeInMinutes = ((oldExercise.reps * 4) * oldExercise.sets + oldExercise.restTime) / 60;
                                        planChangings = {
                                            timeTotal: plan.timeTotal - oldTotalSetTimeInMinutes + currentTotalSetTimeInMinutes,
                                            burnedCaloriesTotal: plan.burnedCaloriesTotal - oldExercise.caloriesBurned + req.body.caloriesBurned,
                                            setsTotal: plan.setsTotal - oldExercise.sets + req.body.sets
                                        };
                                        return [4 /*yield*/, TrainingPlan_1.TrainingPlan.updateOne({ slug: oldExercise.trainingPlanSlug }, planChangings)];
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
    TrainingPlanExercisesController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.deleteOne({
                        req: req,
                        res: res,
                        model: TrainingPlanExercise_1.TrainingPlanExercise,
                        mockedObject: mockedTrainingPlanExercise,
                        integrateModels: function (exercise) { return __awaiter(_this, void 0, void 0, function () {
                            var plan, totalSetTimeInMinutes, currentTargetedMuscles, quantityOfSameTargetedMuscles, planChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, TrainingPlan_1.TrainingPlan.findOne({ slug: exercise.trainingPlanSlug }).populate([{
                                                path: "exercises",
                                                model: "TrainingPlanExercise"
                                            }])];
                                    case 1:
                                        plan = _a.sent();
                                        if (!plan)
                                            throw new AppError_1.AppError("The plan of this food doesn't exist.", 400);
                                        totalSetTimeInMinutes = ((exercise.reps * 4) * exercise.sets + exercise.restTime) / 60;
                                        currentTargetedMuscles = plan.targetedMuscles;
                                        quantityOfSameTargetedMuscles = 1;
                                        if (plan.exercises.length > 0) {
                                            plan.exercises.forEach(function (ex) {
                                                if (ex.muscleTargeted === exercise.muscleTargeted)
                                                    quantityOfSameTargetedMuscles++;
                                            });
                                        }
                                        if (quantityOfSameTargetedMuscles === 1) {
                                            currentTargetedMuscles = currentTargetedMuscles.filter(function (targetedMuscle) { return targetedMuscle !== exercise.muscleTargeted; });
                                        }
                                        planChangings = {
                                            exercisesTotal: plan.exercisesTotal - 1,
                                            setsTotal: plan.setsTotal - exercise.sets,
                                            timeTotal: plan.timeTotal - totalSetTimeInMinutes,
                                            targetedMuscles: currentTargetedMuscles,
                                            burnedCaloriesTotal: plan.burnedCaloriesTotal - exercise.caloriesBurned,
                                            $pull: { exercises: exercise._id }
                                        };
                                        return [4 /*yield*/, TrainingPlan_1.TrainingPlan.updateOne({ slug: exercise.trainingPlanSlug }, planChangings)];
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
    TrainingPlanExercisesController.prototype.createOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.createOne({
                        req: req,
                        res: res,
                        model: TrainingPlanExercise_1.TrainingPlanExercise,
                        integrateModels: function (exercise) { return __awaiter(_this, void 0, void 0, function () {
                            var plan, totalSetTimeInMinutes, currentTargetedMuscles, planChangings;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, TrainingPlan_1.TrainingPlan.findOne({ slug: exercise.trainingPlanSlug }).populate([{
                                                path: "exercises",
                                                model: "TrainingPlanExercise"
                                            }])];
                                    case 1:
                                        plan = _a.sent();
                                        if (!plan)
                                            throw new AppError_1.AppError("The plan of this food doesn't exist.", 400);
                                        totalSetTimeInMinutes = ((exercise.reps * 4) * exercise.sets + exercise.restTime) / 60;
                                        currentTargetedMuscles = __spreadArray([], plan.targetedMuscles, true);
                                        if (!plan.targetedMuscles.includes(exercise.muscleTargeted))
                                            currentTargetedMuscles.push(exercise.muscleTargeted);
                                        planChangings = {
                                            exercisesTotal: plan.exercisesTotal + 1,
                                            setsTotal: plan.setsTotal + exercise.sets,
                                            timeTotal: plan.timeTotal + totalSetTimeInMinutes,
                                            burnedCaloriesTotal: plan.burnedCaloriesTotal + exercise.caloriesBurned,
                                            targetedMuscles: currentTargetedMuscles,
                                            $push: { exercises: exercise._id }
                                        };
                                        return [4 /*yield*/, TrainingPlan_1.TrainingPlan.updateOne({ slug: exercise.trainingPlanSlug }, planChangings)];
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
    return TrainingPlanExercisesController;
}());
exports.default = TrainingPlanExercisesController;
