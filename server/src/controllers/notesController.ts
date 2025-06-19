import { Request, Response } from 'express';
import Note from '../models/Notes';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const note = await Note.create({ text });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
