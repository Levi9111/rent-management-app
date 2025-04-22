"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantControllers = void 0;
const catrchAsync_1 = require("../../utils/catrchAsync");
const tenant_service_1 = require("./tenant.service");
const createTenant = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await tenant_service_1.TenantServices.createTenantIntoDB(req.body.tenant);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Tenant created successfully',
        data: result,
    });
});
const updateTenant = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await tenant_service_1.TenantServices.updateTenantIntoDB(req.params.id, req.body.tenant);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Tenant updated successfully',
        data: result,
    });
});
const getAllTenants = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await tenant_service_1.TenantServices.getAllTenantFromDB();
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'All Tenants fetched successfully',
        data: result,
    });
});
const getCurrentTenants = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await tenant_service_1.TenantServices.getCurrentTenantFromDB();
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'All Current Tenants fetched successfully',
        data: result,
    });
});
const getSingleTenant = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await tenant_service_1.TenantServices.getSingleTenantFromDB(req.params.id);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Tenant fetched successfully',
        data: result,
    });
});
exports.TenantControllers = {
    createTenant,
    updateTenant,
    getAllTenants,
    getCurrentTenants,
    getSingleTenant,
};
//# sourceMappingURL=tenant.controller.js.map