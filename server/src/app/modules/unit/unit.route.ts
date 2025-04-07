import { Router } from 'express';
import { UnitControllers } from './unit.controller';
import { UnitValidations } from './unit.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.get('/', UnitControllers.getAllUnits);

router.get('/:id', UnitControllers.getSingleUnit);

router.post(
  '/create-unit',
  validateRequest(UnitValidations.createUnitValidationSchema),
  UnitControllers.createUnit,
);

router.patch(
  '/update-unit/:id',
  validateRequest(UnitValidations.updateUnitValidationSchema),
  UnitControllers.updateUnit,
);

export const UnitRoutes = router;
