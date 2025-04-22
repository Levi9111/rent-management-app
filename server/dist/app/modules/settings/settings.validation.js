"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidation = void 0;
const zod_1 = require("zod");
// const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
const settingsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        settings: zod_1.z.object({
            ownerName: zod_1.z.string().optional(),
            villaName: zod_1.z.string().optional(),
            streetAddress: zod_1.z.string().optional(),
            // phoneNumber: z
            //   .string()
            //   .regex(phoneRegex, 'Invalid phone number format')
            //   .optional(),
            phoneNumber: zod_1.z.string().optional(),
        }),
    }),
});
exports.SettingsValidation = {
    settingsValidationSchema,
};
//# sourceMappingURL=settings.validation.js.map