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
var LocalApiServices_1 = require("../services/LocalApiServices");
var LocalDatabase_1 = require("../lib/LocalDatabase");
var AppError_1 = require("../utils/AppError");
var mockedExercise = {
    name: "",
    muscleTargeted: "",
    equipmentType: "",
    pictureUrl: "",
    slug: "",
    muscleTargetedSlug: "",
    equipmentTypeSlug: ""
};
var db = new LocalDatabase_1.default("exercises");
var ExercisesController = /** @class */ (function () {
    function ExercisesController() {
    }
    ExercisesController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var exercisesJson, exercises, LAF, datas, error_1, statusCode, message, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.getDatas()];
                    case 1:
                        exercisesJson = _a.sent();
                        exercises = JSON.parse(exercisesJson);
                        LAF = new LocalApiServices_1.default(exercises, req.query)
                            .filterUnwishedFields(mockedExercise)
                            .filter()
                            .sort(mockedExercise)
                            .paginate();
                        datas = LAF.query;
                        res.status(200).json({
                            results: datas.length,
                            total: LAF.total,
                            page: req.query.page || 1,
                            pages: LAF.pages,
                            datas: datas
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        statusCode = error_1.statusCode || 400;
                        message = error_1.message || "It was not possible to fetch your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExercisesController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var exerciseJson, exercise, error_2, statusCode, message, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.getData(req.params)];
                    case 1:
                        exerciseJson = _a.sent();
                        exercise = JSON.parse(exerciseJson);
                        res.status(200).json(exercise);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        statusCode = error_2.statusCode || 400;
                        message = error_2.message || "It was not possible to fetch your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ExercisesController;
}());
exports.default = ExercisesController;
