"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumberStrings = void 0;
const parseNumberStrings = (payload) => Object.fromEntries(Object.entries(payload).map(([key, value]) => {
    if (typeof value === 'string' && !isNaN(Number(value))) {
        return [key, Number(value)];
    }
    else {
        return [key, value];
    }
}));
exports.parseNumberStrings = parseNumberStrings;
//# sourceMappingURL=parseNumberStrings.js.map