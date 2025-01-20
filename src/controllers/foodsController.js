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
var AppError_1 = require("../utils/AppError");
var LocalApiServices_1 = require("../services/LocalApiServices");
var LocalDatabase_1 = require("../lib/LocalDatabase");
var AwsS3_1 = require("../lib/AwsS3");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var S3 = new AwsS3_1.default(process.env.AWS_BUCKET_NAME, process.env.AWS_BUCKET_REGION);
var mockedFood = {
    name: "",
    category: "",
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    servingSizeGrams: 0,
    slug: "",
    categorySlug: "",
    pictureUrl: ""
};
var db = new LocalDatabase_1.default("foods");
var FoodsController = /** @class */ (function () {
    function FoodsController() {
    }
    FoodsController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var foodsJson, foods, LAS, datas, _i, datas_1, food, _a, error_1, statusCode, message, e;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, db.getDatas()];
                    case 1:
                        foodsJson = _b.sent();
                        foods = JSON.parse(foodsJson);
                        LAS = new LocalApiServices_1.default(foods, req.query)
                            .filterUnwishedFields(mockedFood)
                            .filter()
                            .sort(mockedFood)
                            .paginate();
                        datas = LAS.query;
                        _i = 0, datas_1 = datas;
                        _b.label = 2;
                    case 2:
                        if (!(_i < datas_1.length)) return [3 /*break*/, 5];
                        food = datas_1[_i];
                        _a = food;
                        return [4 /*yield*/, S3.getFile(food.pictureUrl)];
                    case 3:
                        _a.pictureUrl = _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        res.status(200).json({
                            results: datas.length,
                            total: LAS.total,
                            page: parseInt(req.query.page) || 1,
                            pages: LAS.pages,
                            datas: datas
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        statusCode = error_1.statusCode || 400;
                        message = error_1.message || "It was not possible to fetch your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FoodsController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var foodJson, food, _a, error_2, statusCode, message, e;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db.getData(req.params)];
                    case 1:
                        foodJson = _b.sent();
                        food = JSON.parse(foodJson);
                        _a = food;
                        return [4 /*yield*/, S3.getFile(food.pictureUrl)];
                    case 2:
                        _a.pictureUrl = _b.sent();
                        res.status(200).json(food);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        statusCode = error_2.statusCode || 400;
                        message = error_2.message || "It was not possible to fetch your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FoodsController;
}());
exports.default = FoodsController;
