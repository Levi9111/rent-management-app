"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unit_route_1 = require("../modules/unit/unit.route");
const tenant_route_1 = require("../modules/tenent/tenant.route");
const receipt_route_1 = require("../modules/receipt/receipt.route");
const settings_route_1 = require("../modules/settings/settings.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/unit',
        route: unit_route_1.UnitRoutes,
    },
    {
        path: '/tenant',
        route: tenant_route_1.TenantRoutes,
    },
    {
        path: '/receipt',
        route: receipt_route_1.ReceiptRoutes,
    },
    {
        path: '/settings',
        route: settings_route_1.SettingsRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map