"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptServices = void 0;
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const tenant_model_1 = require("../tenent/tenant.model");
const sendEmail_1 = require("../../utils/sendEmail");
const fs_1 = __importDefault(require("fs"));
const receipt_utils_1 = require("./receipt.utils");
const receipt_model_1 = require("./receipt.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const unit_model_1 = __importDefault(require("../unit/unit.model"));
const createReceiptIntoDB = async (payload) => {
    const today = new Date();
    const generatedReceiptDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(today);
    const rentMonth = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
    }).format(today);
    const { tenantId, rentAmountPaid } = payload;
    const searchExistingReceipt = await receipt_model_1.Receipt.findOne({
        tenantId,
        rentMonth,
    });
    if (searchExistingReceipt) {
        return searchExistingReceipt.populate(['unitId', 'tenantId']);
    }
    const tenantInfo = await tenant_model_1.Tenant.findOne({
        _id: tenantId,
    });
    if (!tenantInfo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Tenant not found');
    }
    const unitInfo = await unit_model_1.default.findOne({
        _id: tenantInfo.rentedUnit,
    });
    if (!unitInfo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Unit not found');
    }
    const { monthlyRent, gasBill, waterBill, others } = unitInfo;
    const totalAmount = Number(monthlyRent) + Number(gasBill) + Number(waterBill) + Number(others);
    const balanceDue = totalAmount - Number(rentAmountPaid);
    const receiptId = await receipt_utils_1.ReceiptUtils.generateReceiptNumber();
    const result = await receipt_model_1.Receipt.create({
        ...payload,
        receiptId,
        generatedReceiptDate,
        rentMonth,
        unitId: tenantInfo.rentedUnit,
        balanceDue,
        totalAmount,
    });
    return result.populate(['unitId', 'tenantId']);
};
const getAllReceiptsFromDB = async (query) => {
    const receiptData = new QueryBuilder_1.default(receipt_model_1.Receipt.find()
        .populate({
        path: 'unitId',
    })
        .populate({
        path: 'tenantId',
    }), query)
        .search(['receiptId'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await receiptData.modelQuery;
    return result;
};
const getSingleReceiptsFromDB = async (id) => {
    const receipt = await receipt_model_1.Receipt.findOne({ _id: id });
    if (!receipt) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No receipt found!!');
    }
    return receipt;
};
const sendReceiptToTenant = async (req) => {
    if (!req.file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No file found!!');
    }
    const tenantInfo = await tenant_model_1.Tenant.findOne({
        _id: req.body.tenantId,
    });
    if (!tenantInfo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Tenant not found');
    }
    if (tenantInfo.status === 'former') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This tenant is no longer renting a unit!');
    }
    // sending email to the tenant
    await (0, sendEmail_1.sendEmail)(tenantInfo.email, [
        {
            filename: `receipt.pdf`,
            path: req.file.path,
            contentType: 'application/pdf',
        },
    ]);
    fs_1.default.unlinkSync(req.file.path);
    // await sendEmail(tenantInfo.email, [
    //   {
    //     filename: `receipt.pdf`,
    //     content: req.file.buffer, // Buffer from memoryStorage
    //     contentType: 'application/pdf',
    //   },
    // ]);
};
exports.ReceiptServices = {
    sendReceiptToTenant,
    createReceiptIntoDB,
    getAllReceiptsFromDB,
    getSingleReceiptsFromDB,
};
//# sourceMappingURL=receipt.service.js.map