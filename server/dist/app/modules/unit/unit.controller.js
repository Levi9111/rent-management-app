"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitControllers = void 0;
const unit_service_1 = require("./unit.service");
const catrchAsync_1 = require("../../utils/catrchAsync");
const createUnit = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await unit_service_1.UniteServices.createUnitIntoDB(req.body.unit);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Unit created successfully',
        data: result,
    });
});
const updateUnit = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await unit_service_1.UniteServices.updateUnitIntoDB(req.params.id, req.body.unit);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Unit updated successfully',
        data: result,
    });
});
const getAllUnits = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await unit_service_1.UniteServices.getAllUnitsFromDB(req.query);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'All Units fetched successfully',
        data: result,
    });
});
const getSingleUnit = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await unit_service_1.UniteServices.getSingleUnitFromDB(req.params.id);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Unit fetched successfully',
        data: result,
    });
});
exports.UnitControllers = {
    createUnit,
    updateUnit,
    getAllUnits,
    getSingleUnit,
};
//# sourceMappingURL=unit.controller.js.map