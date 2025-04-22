import { catchAsync } from '../../utils/catrchAsync';
import { Settings } from './settings.model';
import { SettingsServices } from './settings.service';
import { settingsId } from './settings.utils';

const getSettingsInfo = catchAsync(async (req, res) => {
  const result = await SettingsServices.getSettingsInfoFromDB();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Informations fetched successfully',
    data: result,
  });
});

const manangeSettingsInfo = catchAsync(async (req, res) => {
  let result;

  const settings = Settings.findOne({ _id: settingsId });

  if (!settings) {
    console.log('Settings not found');
    result = await SettingsServices.createSettingsInfoIntoDB(req);
  }
  result = await SettingsServices.updateSettingsInfoIntoDB(req);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Settings informations updated successfully',
    data: result,
  });
});

export const SettingsController = {
  getSettingsInfo,
  manangeSettingsInfo,
};
