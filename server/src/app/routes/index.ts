import { Router } from 'express';
import { UnitRoutes } from '../modules/unit/unit.route';
import { TenantRoutes } from '../modules/tenent/tenant.route';
import { ReceiptRoutes } from '../modules/receipt/receipt.route';
import { SettingsRoutes } from '../modules/settings/settings.route';

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
  {
    path: '/receipt',
    route: ReceiptRoutes,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
