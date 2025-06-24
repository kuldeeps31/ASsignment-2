import { AuthenticatedRequest } from '../middlewares/auth';
import { Response } from 'express';
import Note from '../models/Notes';

// ✅ GET /api/notes - Fetch notes of logged-in user
export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.user!._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ POST /api/notes - Create a note for logged-in user
export const createNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const note = await Note.create({
      text,
      user: req.user!._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ DELETE /api/notes/:id - Delete user's own note
export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user!._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne(); // 🔥 This line was missing

    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
