import { catchAsync } from '../../utils/catrchAsync';
import { NotesServices } from './notes.service';

const createNote = catchAsync(async (req, res) => {
  const result = await NotesServices.createNoteIntoDB(req.body.note);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Note created successfully',
    data: result,
  });
});

const getAllNotes = catchAsync(async (req, res) => {
  const result = await NotesServices.getAllNotesFromDB();
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'All notes fetched successfully',
    data: result,
  });
});

const getSingleNote = catchAsync(async (req, res) => {
  const result = await NotesServices.getSingleNoteFromDB(req.params.id);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Note fetched successfully',
    data: result,
  });
});

const updateNote = catchAsync(async (req, res) => {
  const result = await NotesServices.updateNoteIntoDB(
    req.params.id,
    req.body.note,
  );
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Note updated successfully',
    data: result,
  });
});

const deleteNote = catchAsync(async (req, res) => {
  const result = await NotesServices.deleteNoteFromDB(req.params.id);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Note deleted successfully',
    data: result,
  });
});

export const NotesController = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
