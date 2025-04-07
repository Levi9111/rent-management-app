import { Router } from 'express';
import { UnitRoutes } from '../modules/unit/unit.route';
import { TenantRoutes } from '../modules/tenent/tenant.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/unit',
    route: UnitRoutes,
  },
  {
    path: '/tenant',
    route: TenantRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
