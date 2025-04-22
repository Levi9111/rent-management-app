"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitRoutes = void 0;
const express_1 = require("express");
const unit_controller_1 = require("./unit.controller");
const unit_validation_1 = require("./unit.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.get('/', unit_controller_1.UnitControllers.getAllUnits);
router.get('/:id', unit_controller_1.UnitControllers.getSingleUnit);
router.post('/create-unit', (0, validateRequest_1.default)(unit_validation_1.UnitValidations.createUnitValidationSchema), unit_controller_1.UnitControllers.createUnit);
router.patch('/update-unit/:id', (0, validateRequest_1.default)(unit_validation_1.UnitValidations.updateUnitValidationSchema), unit_controller_1.UnitControllers.updateUnit);
exports.UnitRoutes = router;
//# sourceMappingURL=unit.route.js.map