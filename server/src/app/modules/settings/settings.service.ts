import { Request } from 'express';
import { fileUploader } from '../../utils/fileUploader';
import { Settings } from './settings.model';
import { TSettings } from './settings.interface';
import { settingsId } from './settings.utils';

const getSettingsInfoFromDB = async () => {
  const result = await Settings.findOne({ _id: settingsId });
  return result;
};

const createSettingsInfoIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
    req.body.settings.ownerSignatureUrl = uploadToCloudinary.secure_url;
  }

  const { settings } = req.body;

  const result = await Settings.create(settings);
  return result;
};

const updateSettingsInfoIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
    req.body.settings.ownerSignatureUrl = uploadToCloudinary.secure_url;
  }

  const { settings: newSettingsData } = req.body;

  const cleanedData = Object.entries(newSettingsData).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const result = await Settings.findByIdAndUpdate(settingsId, cleanedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SettingsServices = {
  getSettingsInfoFromDB,
  createSettingsInfoIntoDB,
  updateSettingsInfoIntoDB,
};
