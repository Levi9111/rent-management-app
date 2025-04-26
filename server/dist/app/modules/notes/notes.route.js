"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const notes_controller_1 = require("./notes.controller");
const notes_validation_1 = require("./notes.validation");
const router = (0, express_1.Router)();
router.get('/', notes_controller_1.NotesController.getAllNotes);
router.get('/:id', notes_controller_1.NotesController.getSingleNote);
router.post('/create-note', (0, validateRequest_1.default)(notes_validation_1.NotesValidations.createNoteValidationSchema), notes_controller_1.NotesController.createNote);
router.patch('/update-note/:id', (0, validateRequest_1.default)(notes_validation_1.NotesValidations.updateNoteValidationSchema), notes_controller_1.NotesController.updateNote);
router.delete('/delete-note/:id', notes_controller_1.NotesController.deleteNote);
exports.NotesRoutes = router;
//# sourceMappingURL=notes.route.js.map