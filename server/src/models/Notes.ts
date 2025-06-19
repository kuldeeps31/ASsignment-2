import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  text: string;
  user: mongoose.Schema.Types.ObjectId; // 🔥 Add this
  createdAt?: Date;
  updatedAt?: Date;
}

const noteSchema = new Schema<INote>(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 🔥 Add this
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>('Note', noteSchema);
export default Note;
