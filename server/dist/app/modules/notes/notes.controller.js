"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const catrchAsync_1 = require("../../utils/catrchAsync");
const notes_service_1 = require("./notes.service");
const createNote = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await notes_service_1.NotesServices.createNoteIntoDB(req.body.note);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Note created successfully',
        data: result,
    });
});
const getAllNotes = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await notes_service_1.NotesServices.getAllNotesFromDB();
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'All notes fetched successfully',
        data: result,
    });
});
const getSingleNote = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await notes_service_1.NotesServices.getSingleNoteFromDB(req.params.id);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Note fetched successfully',
        data: result,
    });
});
const updateNote = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await notes_service_1.NotesServices.updateNoteIntoDB(req.params.id, req.body.note);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Note updated successfully',
        data: result,
    });
});
const deleteNote = (0, catrchAsync_1.catchAsync)(async (req, res) => {
    const result = await notes_service_1.NotesServices.deleteNoteFromDB(req.params.id);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Note deleted successfully',
        data: result,
    });
});
exports.NotesController = {
    createNote,
    getAllNotes,
    getSingleNote,
    updateNote,
    deleteNote,
};
//# sourceMappingURL=notes.controller.js.map