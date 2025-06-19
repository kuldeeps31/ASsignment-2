import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const noteSchema = new Schema<INote>(
  {
    text: { type: String, required: true }
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>('Note', noteSchema);
export default Note;
