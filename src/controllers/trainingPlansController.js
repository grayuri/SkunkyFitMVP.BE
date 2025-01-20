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
var TrainingPlan_1 = require("../models/TrainingPlan");
var factoryControllerTemplate_1 = require("./factoryControllerTemplate");
var sharp_1 = require("sharp");
var TrainingPlanExercise_1 = require("../models/TrainingPlanExercise");
var slugify_1 = require("../utils/slugify");
var getFileType_1 = require("../interfaces/utils/getFileType");
var AwsS3_1 = require("../lib/AwsS3");
var SkunkyPDFMaker_1 = require("../lib/SkunkyPDFMaker");
var AppError_1 = require("../utils/AppError");
dotenv_1.default.config();
var FCT = new factoryControllerTemplate_1.default();
var S3 = new AwsS3_1.default(process.env.AWS_BUCKET_NAME, process.env.AWS_BUCKET_REGION);
var mockedTrainingPlan = {
    _id: "",
    name: "",
    exercisesTotal: 0,
    setsTotal: 0,
    timeTotal: 0,
    burnedCaloriesTotal: 0,
    targetedMuscles: [],
    exercises: [],
    bannerUrl: "",
    userId: "",
    slug: ""
};
var TrainingPlansController = /** @class */ (function () {
    function TrainingPlansController() {
    }
    TrainingPlansController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getAll({
                        req: req,
                        res: res,
                        model: TrainingPlan_1.TrainingPlan,
                        mockedObject: mockedTrainingPlan,
                        populate: [{
                                path: "exercises",
                                model: "TrainingPlanExercise"
                            }],
                        manageFiles: function (plans) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, plans_1, plan, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _i = 0, plans_1 = plans;
                                        _b.label = 1;
                                    case 1:
                                        if (!(_i < plans_1.length)) return [3 /*break*/, 4];
                                        plan = plans_1[_i];
                                        _a = plan;
                                        return [4 /*yield*/, S3.getFile(plan.bannerUrl)];
                                    case 2:
                                        _a.bannerUrl = _b.sent();
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
    TrainingPlansController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.getOne({
                        req: req,
                        res: res,
                        model: TrainingPlan_1.TrainingPlan,
                        mockedObject: mockedTrainingPlan,
                        populate: [{
                                path: "exercises",
                                model: "TrainingPlanExercise"
                            }],
                        manageFiles: function (plan) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = plan;
                                        return [4 /*yield*/, S3.getFile(plan.bannerUrl)];
                                    case 1:
                                        _a.bannerUrl = _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    TrainingPlansController.prototype.updateOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var type;
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.name)
                    req.body.slug = (0, slugify_1.default)(req.body.name);
                if (req.file) {
                    type = (0, getFileType_1.default)(req.file);
                    req.body.bannerUrl = "images/training-plans/training-plan-banner-".concat(req.body.slug, ".").concat(type);
                }
                req.user = "123";
                return [2 /*return*/, FCT.updateOne({
                        req: req,
                        res: res,
                        model: TrainingPlan_1.TrainingPlan,
                        mockedObject: mockedTrainingPlan,
                        manageFiles: function (oldPlan) { return __awaiter(_this, void 0, void 0, function () {
                            var fileBuffer;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!req.file) return [3 /*break*/, 4];
                                        return [4 /*yield*/, (0, sharp_1.default)(req.file.buffer)
                                                .resize(800, 800)
                                                .toBuffer()];
                                    case 1:
                                        fileBuffer = _a.sent();
                                        return [4 /*yield*/, S3.deleteFile(oldPlan.bannerUrl)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, S3.createFile(req.file, fileBuffer, req.body.bannerUrl)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                        integrateModels: function (oldPlan) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(oldPlan.slug !== req.body.slug)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, TrainingPlanExercise_1.TrainingPlanExercise.updateMany({ trainingPlanSlug: oldPlan.slug }, { trainingPlanSlug: req.body.slug })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    TrainingPlansController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, FCT.deleteOne({
                        req: req,
                        res: res,
                        model: TrainingPlan_1.TrainingPlan,
                        mockedObject: mockedTrainingPlan,
                        manageFiles: function (plan) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, S3.deleteFile(plan.bannerUrl)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        integrateModels: function (plan) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, TrainingPlanExercise_1.TrainingPlanExercise.deleteMany({ trainingPlanSlug: plan.slug })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    TrainingPlansController.prototype.createOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var type;
            var _this = this;
            return __generator(this, function (_a) {
                req.body.slug = (0, slugify_1.default)(req.body.name);
                if (req.file) {
                    type = (0, getFileType_1.default)(req.file);
                    req.body.bannerUrl = "images/training-plans/training-plan-banner-".concat(req.body.slug, ".").concat(type);
                }
                return [2 /*return*/, FCT.createOne({
                        req: req,
                        res: res,
                        model: TrainingPlan_1.TrainingPlan,
                        manageFiles: function () { return __awaiter(_this, void 0, void 0, function () {
                            var fileBuffer;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        req.user = "123";
                                        if (!req.file) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, sharp_1.default)(req.file.buffer)
                                                .resize(800, 800)
                                                .toBuffer()];
                                    case 1:
                                        fileBuffer = _a.sent();
                                        return [4 /*yield*/, S3.createFile(req.file, fileBuffer, req.body.bannerUrl)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }
                    })];
            });
        });
    };
    TrainingPlansController.prototype.getTrainingPlanPDF = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var plan, SPM, error_1, statusCode, message, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TrainingPlan_1.TrainingPlan.findOne({ slug: req.params.slug }).populate([{
                                    path: "exercises",
                                    model: "TrainingPlanExercise"
                                }])];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new AppError_1.AppError("This diet doesn't exist. Please, provide a existing diet.", 400);
                        SPM = new SkunkyPDFMaker_1.default();
                        SPM.createTrainingPlanPDF(plan, res);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        statusCode = error_1.statusCode || 400;
                        message = error_1.message || "It was not possible to create your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TrainingPlansController;
}());
exports.default = TrainingPlansController;
