"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptRoutes = void 0;
const express_1 = require("express");
const receipt_controller_1 = require("./receipt.controller");
const fileUploader_1 = require("../../utils/fileUploader");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const receipt_validation_1 = require("./receipt.validation");
const router = (0, express_1.Router)();
router.post('/send-receipt-to-tenant', fileUploader_1.fileUploader.upload.single('file'), receipt_controller_1.ReceiptController.sendReceiptToTenant);
router.post('/create-receipt', (0, validateRequest_1.default)(receipt_validation_1.ReceiptValidation.createReceiptValidationSchema), receipt_controller_1.ReceiptController.createReceipt);
router.get('/', receipt_controller_1.ReceiptController.getAllReceipts);
router.get('/:id', receipt_controller_1.ReceiptController.getSingleReceipt);
exports.ReceiptRoutes = router;
//# sourceMappingURL=receipt.route.js.map