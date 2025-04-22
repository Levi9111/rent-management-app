import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { NotesController } from './notes.controller';
import { NotesValidations } from './notes.validation';

const router = Router();

router.get('/', NotesController.getAllNotes);

router.get('/:id', NotesController.getSingleNote);

router.post(
  '/create-note',
  validateRequest(NotesValidations.createNoteValidationSchema),
  NotesController.createNote,
);

router.patch(
  '/update-note/:id',
  validateRequest(NotesValidations.updateNoteValidationSchema),
  NotesController.updateNote,
);

router.delete('/delete-note/:id', NotesController.deleteNote);

export const NotesRoutes = router;
