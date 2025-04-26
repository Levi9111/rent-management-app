"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const catrchAsync_1 = require("../../utils/catrchAsync");
const settings_service_1 = require("./settings.service");
const getSettingsInfo = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await settings_service_1.SettingsServices.getSettingsInfoFromDB();
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Informations fetched successfully',
        data: result,
    });
});
const manangeSettingsInfo = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await settings_service_1.SettingsServices.updateSettingsInfoIntoDB(req);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Settings informations updated successfully',
        data: result,
    });
});
exports.SettingsController = {
    getSettingsInfo,
    manangeSettingsInfo,
};
//# sourceMappingURL=settings.controller.js.map