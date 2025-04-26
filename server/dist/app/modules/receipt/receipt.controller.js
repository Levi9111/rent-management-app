"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptController = void 0;
const catrchAsync_1 = require("../../utils/catrchAsync");
const receipt_service_1 = require("./receipt.service");
const createReceipt = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await receipt_service_1.ReceiptServices.createReceiptIntoDB(req.body.receipt);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Receipt created successfully',
        data: result,
    });
});
const getAllReceipts = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await receipt_service_1.ReceiptServices.getAllReceiptsFromDB(req.query);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'All receipts fetched successfully',
        data: result,
    });
});
const getSingleReceipt = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await receipt_service_1.ReceiptServices.getSingleReceiptsFromDB(req.params.id);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Receipt fetched successfully',
        data: result,
    });
});
const getSingleReceiptByTenantId = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await receipt_service_1.ReceiptServices.getSingleReceiptByTenantIdFromDB(req.params.id);
    console.log(req.params.id);
    console.log(result);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Receipt fetched successfully',
        data: result,
    });
});
const sendReceiptToTenant = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    await receipt_service_1.ReceiptServices.sendReceiptToTenant(req);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Receipt send to tenant successfully',
    });
});
exports.ReceiptController = {
    sendReceiptToTenant,
    createReceipt,
    getAllReceipts,
    getSingleReceipt,
    getSingleReceiptByTenantId,
};
//# sourceMappingURL=receipt.controller.js.map