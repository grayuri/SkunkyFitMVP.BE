"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ApiServices_1 = require("../services/ApiServices");
var AppError_1 = require("../utils/AppError");
var getFilteredObject_1 = require("../utils/getFilteredObject");
var FactoryControllerTemplate = /** @class */ (function () {
    function FactoryControllerTemplate() {
    }
    FactoryControllerTemplate.prototype.getAll = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var modelQuery, AS, datas, error_1, statusCode, message, e;
            var req = _b.req, res = _b.res, model = _b.model, mockedObject = _b.mockedObject, populate = _b.populate, manageFiles = _b.manageFiles, integrateModels = _b.integrateModels;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!populate || populate.length === 0)
                            populate = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        modelQuery = model.find().populate(populate);
                        AS = new ApiServices_1.default(modelQuery, req.query).filterUnwishedFields(mockedObject);
                        return [4 /*yield*/, AS.filter()];
                    case 2:
                        _c.sent();
                        AS.sort(mockedObject);
                        AS.paginate();
                        return [4 /*yield*/, AS.query];
                    case 3:
                        datas = _c.sent();
                        if (!manageFiles) return [3 /*break*/, 5];
                        return [4 /*yield*/, manageFiles(datas)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        if (!integrateModels) return [3 /*break*/, 7];
                        return [4 /*yield*/, integrateModels(datas)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        res.status(200).json({
                            total: AS.total,
                            results: datas.length,
                            page: req.query.page || 1,
                            pages: AS.pages,
                            datas: datas
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _c.sent();
                        statusCode = error_1.statusCode || 400;
                        message = error_1.message || "It was not possible to fetch your datas.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FactoryControllerTemplate.prototype.getOne = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var query, data, error_2, statusCode, message, e;
            var req = _b.req, res = _b.res, model = _b.model, populate = _b.populate, manageFiles = _b.manageFiles, mockedObject = _b.mockedObject, integrateModels = _b.integrateModels;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!populate || populate.length === 0)
                            populate = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        query = (0, getFilteredObject_1.default)(mockedObject, req.query);
                        return [4 /*yield*/, model.findOne(__assign({ slug: req.params.slug }, query)).populate(populate)];
                    case 2:
                        data = _c.sent();
                        if (!data)
                            throw new AppError_1.AppError("This data doesn't exist.", 400);
                        if (!manageFiles) return [3 /*break*/, 4];
                        return [4 /*yield*/, manageFiles(data)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!integrateModels) return [3 /*break*/, 6];
                        return [4 /*yield*/, integrateModels(data)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        res.status(200).json(data);
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _c.sent();
                        statusCode = error_2.statusCode || 400;
                        message = error_2.message || "It was not possible to fetch your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FactoryControllerTemplate.prototype.updateOne = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var query, oldData, error_3, statusCode, message, e;
            var req = _b.req, res = _b.res, model = _b.model, mockedObject = _b.mockedObject, manageFiles = _b.manageFiles, integrateModels = _b.integrateModels;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        query = (0, getFilteredObject_1.default)(mockedObject, req.query);
                        return [4 /*yield*/, model.findOne(__assign({ slug: req.params.slug }, query /* userId */))];
                    case 1:
                        oldData = _c.sent();
                        if (!oldData)
                            throw new AppError_1.AppError("This data doesn't exist.", 400);
                        return [4 /*yield*/, model.findOneAndUpdate(__assign({ slug: req.params.slug }, query /* userId */), req.body)];
                    case 2:
                        _c.sent();
                        if (!manageFiles) return [3 /*break*/, 4];
                        return [4 /*yield*/, manageFiles(oldData)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!integrateModels) return [3 /*break*/, 6];
                        return [4 /*yield*/, integrateModels(oldData)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        res.status(200).json({
                            status: "Success",
                            message: "The data was updated successfully."
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _c.sent();
                        statusCode = error_3.statusCode || 400;
                        message = error_3.message || "It was not possible to update your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FactoryControllerTemplate.prototype.deleteOne = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var query, data, error_4, statusCode, message, e;
            var req = _b.req, res = _b.res, model = _b.model, mockedObject = _b.mockedObject, manageFiles = _b.manageFiles, integrateModels = _b.integrateModels;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        query = (0, getFilteredObject_1.default)(mockedObject, req.query);
                        return [4 /*yield*/, model.findOne(__assign({ slug: req.params.slug }, req.query /* userId */))];
                    case 1:
                        data = _c.sent();
                        if (!data)
                            throw new AppError_1.AppError("This data doesn't exist.", 400);
                        return [4 /*yield*/, model.deleteOne(__assign({ slug: req.params.slug }, query /* userId */))];
                    case 2:
                        _c.sent();
                        if (!manageFiles) return [3 /*break*/, 4];
                        return [4 /*yield*/, manageFiles(data)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!integrateModels) return [3 /*break*/, 6];
                        return [4 /*yield*/, integrateModels(data)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        res.status(200).json({
                            status: "Success",
                            message: "The data was deleted successfully."
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_4 = _c.sent();
                        statusCode = error_4.statusCode || 400;
                        message = error_4.message || "It was not possible to delete your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FactoryControllerTemplate.prototype.createOne = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var data, error_5, statusCode, message, e;
            var req = _b.req, res = _b.res, model = _b.model, manageFiles = _b.manageFiles, integrateModels = _b.integrateModels;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, model.create(req.body)];
                    case 1:
                        data = _c.sent();
                        if (!data)
                            throw new AppError_1.AppError("It was not possible to create your data.", 400);
                        if (!manageFiles) return [3 /*break*/, 3];
                        return [4 /*yield*/, manageFiles()];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!integrateModels) return [3 /*break*/, 5];
                        return [4 /*yield*/, integrateModels(data)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        res.status(200).json(data);
                        return [3 /*break*/, 7];
                    case 6:
                        error_5 = _c.sent();
                        statusCode = error_5.statusCode || 400;
                        message = error_5.message || "It was not possible to create your data.";
                        e = new AppError_1.AppError(message, statusCode);
                        res.status(statusCode).json(e);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return FactoryControllerTemplate;
}());
exports.default = FactoryControllerTemplate;
