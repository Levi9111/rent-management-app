"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantRoutes = void 0;
const express_1 = require("express");
const tenant_controller_1 = require("./tenant.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const tenant_validation_1 = require("./tenant.validation");
const router = (0, express_1.Router)();
router.get('/', tenant_controller_1.TenantControllers.getAllTenants);
router.get('/current', tenant_controller_1.TenantControllers.getCurrentTenants);
router.get('/:id', tenant_controller_1.TenantControllers.getSingleTenant);
router.post('/create-tenant', (0, validateRequest_1.default)(tenant_validation_1.TenantValidations.createTenantValidationSchema), tenant_controller_1.TenantControllers.createTenant);
router.patch('/update-tenant/:id', (0, validateRequest_1.default)(tenant_validation_1.TenantValidations.updateTenantValidationSchema), tenant_controller_1.TenantControllers.updateTenant);
exports.TenantRoutes = router;
//# sourceMappingURL=tenant.route.js.map