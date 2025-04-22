import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { TNote } from './notes.interface';
import { Notes } from './notes.model';

const createNoteIntoDB = async (payload: TNote) => {
  const note = await Notes.create(payload);
  return note;
};

const getAllNotesFromDB = async () => {
  const result = await Notes.find().sort({ createdAt: -1 });
  return result;
};

const getSingleNoteFromDB = async (id: string) => {
  const note = await Notes.findById(id);

  if (!note) {
    throw new AppError(httpStatus.NOT_FOUND, 'Note not found!');
  }

  return note;
};

const updateNoteIntoDB = async (id: string, payload: Partial<TNote>) => {
  const updatedNote = await Notes.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedNote) {
    throw new AppError(httpStatus.NOT_FOUND, 'Note not found for update!');
  }

  return updatedNote;
};

const deleteNoteFromDB = async (id: string) => {
  const deletedNote = await Notes.findByIdAndDelete(id);

  if (!deletedNote) {
    throw new AppError(httpStatus.NOT_FOUND, 'Note not found for deletion!');
  }

  return deletedNote;
};

export const NotesServices = {
  createNoteIntoDB,
  getAllNotesFromDB,
  getSingleNoteFromDB,
  updateNoteIntoDB,
  deleteNoteFromDB,
};
