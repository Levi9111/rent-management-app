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
  const settings = await Settings.findById(settingsId);

  // Upload and replace image if new file is provided
  if (req.file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
    req.body.settings.ownerSignatureUrl = uploadToCloudinary.secure_url;
  }

  const { settings: newSettingsData } = req.body;

  console.log('New Settings');
  console.log(newSettingsData);

  // for (const [key, value] of Object.entries(newSettingsData)) {
  //   (settings as TSettings)[key] = value;
  // }

  const result = await Settings.findByIdAndUpdate(settingsId, newSettingsData, {
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
