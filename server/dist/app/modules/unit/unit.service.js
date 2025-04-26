"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniteServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const parseNumberStrings_1 = require("../../helpers/parseNumberStrings");
const unit_model_1 = __importDefault(require("./unit.model"));
const createUnitIntoDB = async (payload) => {
    const processedPayload = (0, parseNumberStrings_1.parseNumberStrings)(payload);
    const existingUnit = await unit_model_1.default.findOne({
        name: processedPayload.name,
    });
    if (existingUnit) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This Unit already exists');
    }
    const result = await unit_model_1.default.create(processedPayload);
    return result;
};
const updateUnitIntoDB = async (id, payload) => {
    const processedPayload = (0, parseNumberStrings_1.parseNumberStrings)(payload);
    const result = await unit_model_1.default.findOneAndUpdate({ _id: id }, processedPayload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error('Unit not found');
    }
    return result;
};
const getAllUnitsFromDB = async (query) => {
    const unitQuery = new QueryBuilder_1.default(unit_model_1.default.find(), query)
        .search([''])
        .filter()
        .sort()
        .fields()
        .paginate();
    const result = await unitQuery.modelQuery;
    return result;
};
const getSingleUnitFromDB = async (id) => {
    const result = await unit_model_1.default.findOne({ _id: id });
    return result;
};
exports.UniteServices = {
    createUnitIntoDB,
    updateUnitIntoDB,
    getAllUnitsFromDB,
    getSingleUnitFromDB,
};
//# sourceMappingURL=unit.service.js.map