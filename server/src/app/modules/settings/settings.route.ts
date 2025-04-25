import { NextFunction, Request, Response, Router } from 'express';
import { fileUploader } from '../../utils/fileUploader';
import { SettingsController } from './settings.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SettingsValidation } from './settings.validation';

const router = Router();

router.get('/', SettingsController.getSettingsInfo);

router.post(
  '/manage-settings',
  fileUploader.upload.single('file'),
  (req: Request, _res: Response, next: NextFunction) => {
    console.log(req.body.data);
    console.log(req.body.file);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(SettingsValidation.settingsValidationSchema),
  SettingsController.manangeSettingsInfo,
);

export const SettingsRoutes = router;
