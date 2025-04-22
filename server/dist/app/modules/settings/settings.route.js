"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = require("express");
const fileUploader_1 = require("../../utils/fileUploader");
const settings_controller_1 = require("./settings.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const settings_validation_1 = require("./settings.validation");
const router = (0, express_1.Router)();
router.get('/', settings_controller_1.SettingsController.getSettingsInfo);
router.post('/manage-settings', fileUploader_1.fileUploader.upload.single('file'), (req, _res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(settings_validation_1.SettingsValidation.settingsValidationSchema), settings_controller_1.SettingsController.manangeSettingsInfo);
exports.SettingsRoutes = router;
//# sourceMappingURL=settings.route.js.map