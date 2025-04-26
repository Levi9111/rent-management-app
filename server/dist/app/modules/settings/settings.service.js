"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsServices = void 0;
const fileUploader_1 = require("../../utils/fileUploader");
const settings_model_1 = require("./settings.model");
const settings_utils_1 = require("./settings.utils");
const getSettingsInfoFromDB = async () => {
    const result = await settings_model_1.Settings.findOne({ _id: settings_utils_1.settingsId });
    return result;
};
const createSettingsInfoIntoDB = async (req) => {
    if (req.file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.settings.ownerSignatureUrl = uploadToCloudinary.secure_url;
    }
    const { settings } = req.body;
    const result = await settings_model_1.Settings.create(settings);
    return result;
};
const updateSettingsInfoIntoDB = async (req) => {
    if (req.file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.settings.ownerSignatureUrl = uploadToCloudinary.secure_url;
    }
    const { settings: newSettingsData } = req.body;
    const cleanedData = Object.entries(newSettingsData).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});
    const result = await settings_model_1.Settings.findByIdAndUpdate(settings_utils_1.settingsId, cleanedData, {
        new: true,
        runValidators: true,
    });
    return result;
};
exports.SettingsServices = {
    getSettingsInfoFromDB,
    createSettingsInfoIntoDB,
    updateSettingsInfoIntoDB,
};
//# sourceMappingURL=settings.service.js.map