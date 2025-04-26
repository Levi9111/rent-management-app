"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesServices = void 0;
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const notes_model_1 = require("./notes.model");
const createNoteIntoDB = async (payload) => {
    const note = await notes_model_1.Notes.create(payload);
    return note;
};
const getAllNotesFromDB = async () => {
    const result = await notes_model_1.Notes.find().sort({ createdAt: -1 });
    return result;
};
const getSingleNoteFromDB = async (id) => {
    const note = await notes_model_1.Notes.findById(id);
    if (!note) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Note not found!');
    }
    return note;
};
const updateNoteIntoDB = async (id, payload) => {
    const updatedNote = await notes_model_1.Notes.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedNote) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Note not found for update!');
    }
    return updatedNote;
};
const deleteNoteFromDB = async (id) => {
    const deletedNote = await notes_model_1.Notes.findByIdAndDelete(id);
    if (!deletedNote) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Note not found for deletion!');
    }
    return deletedNote;
};
exports.NotesServices = {
    createNoteIntoDB,
    getAllNotesFromDB,
    getSingleNoteFromDB,
    updateNoteIntoDB,
    deleteNoteFromDB,
};
//# sourceMappingURL=notes.service.js.map