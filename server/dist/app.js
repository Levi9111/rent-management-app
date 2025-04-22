"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const norFound_1 = require("./app/middlewares/norFound");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
const test = (req, res) => {
    const message = `Patwari villa tenent managing server ${req.url}`;
    res.send(message);
};
app.get('/', test);
app.use(norFound_1.notFound);
exports.default = app;
//# sourceMappingURL=app.js.map