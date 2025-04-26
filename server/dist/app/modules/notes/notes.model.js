"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const mongoose_1 = require("mongoose");
const notesSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Notes = (0, mongoose_1.model)('Notes', notesSchema);
//# sourceMappingURL=notes.model.js.map