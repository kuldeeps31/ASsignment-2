import express from 'express';
import { createNote, getNotes, deleteNote } from '../controllers/notesController';
import { auth } from '../middlewares/auth';
import { IUser } from '../interfaces/IUser';
import { HydratedDocument } from 'mongoose';

const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.delete('/:id', auth, deleteNote);

export default router;

