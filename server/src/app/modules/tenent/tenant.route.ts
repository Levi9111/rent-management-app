import { Router } from 'express';
import { TenantControllers } from './tenant.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TenantValidations } from './tenant.validation';

const router = Router();

router.get('/', TenantControllers.getAllTenants);

router.get('/current', TenantControllers.getCurrentTenants);

router.get('/:id', TenantControllers.getSingleTenant);

router.post(
  '/create-tenant',
  validateRequest(TenantValidations.createTenantValidationSchema),
  TenantControllers.createTenant,
);

router.patch(
  '/update-tenant/:id',
  validateRequest(TenantValidations.updateTenantValidationSchema),
  TenantControllers.updateTenant,
);

export const TenantRoutes = router;
