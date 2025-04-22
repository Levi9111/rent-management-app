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
    const settings = await settings_model_1.Settings.findById(settings_utils_1.settingsId);
    // Upload and replace image if new file is provided
    if (req.file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.settings.ownerSignatureUrl = uploadToCloudinary.secure_url;
    }
    const { settings: newSettingsData } = req.body;
    for (const [key, value] of Object.entries(newSettingsData)) {
        settings[key] = value;
    }
    const result = await settings.save();
    return result;
};
exports.SettingsServices = {
    getSettingsInfoFromDB,
    createSettingsInfoIntoDB,
    updateSettingsInfoIntoDB,
};
//# sourceMappingURL=settings.service.js.map