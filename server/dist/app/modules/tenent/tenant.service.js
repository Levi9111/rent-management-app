"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const unit_model_1 = __importDefault(require("../unit/unit.model"));
const tenant_model_1 = require("./tenant.model");
const createTenantIntoDB = async (payload) => {
    const unit = await unit_model_1.default.findOne({ _id: payload.rentedUnit });
    if (!unit) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Unit not found');
    }
    if (unit.occupied) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Unit is already occupied');
    }
    payload.advancedAmount = Number(payload.advancedAmount);
    const result = await tenant_model_1.Tenant.create(payload);
    unit.occupied = true;
    await unit.save();
    return result;
};
const updateTenantIntoDB = async (id, payload) => {
    const result = await tenant_model_1.Tenant.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Tenant not found');
    }
    if (payload.status === 'former') {
        result.rentEndDate = new Date();
        // Mark the unit as not occupied
        const unit = await unit_model_1.default.findOneAndUpdate({ _id: result.rentedUnit }, {
            occupied: false,
        }, {
            new: true,
            runValidators: true,
        });
        if (!unit) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Unit not found');
        }
        await unit.save();
        // Save the updated tenant status and rentEndDate
        await result.save();
    }
    return result;
};
const getCurrentTenantFromDB = async () => {
    const result = await tenant_model_1.Tenant.find({ status: 'current' }).populate('rentedUnit');
    return result;
};
const getAllTenantFromDB = async () => {
    const result = await tenant_model_1.Tenant.find().populate('rentedUnit');
    return result;
};
const getSingleTenantFromDB = async (id) => {
    const result = await tenant_model_1.Tenant.findOne({ _id: id }).populate('rentedUnit');
    return result;
};
exports.TenantServices = {
    createTenantIntoDB,
    updateTenantIntoDB,
    getAllTenantFromDB,
    getCurrentTenantFromDB,
    getSingleTenantFromDB,
};
//# sourceMappingURL=tenant.service.js.map