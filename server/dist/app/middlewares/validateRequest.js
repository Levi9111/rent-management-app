"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catrchAsync_1 = require("../utils/catrchAsync");
const validateRequest = (schema) => {
    return (0, catrchAsync_1.catchAsync)(async (req, res, next) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        return next();
    });
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequest.js.map