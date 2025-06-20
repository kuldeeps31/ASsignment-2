import express from 'express';
import { createNote, getNotes, deleteNote } from '../controllers/notesController';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.get('/', protect, getNotes);
router.post('/', protect, createNote);
router.delete('/:id', protect, deleteNote);

export default router;
