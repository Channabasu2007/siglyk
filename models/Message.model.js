import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'sign_video', 'voice_note'] },
  metadata: { accuracy: Number },
}, { timestamps: true });


export default mongoose.models.Message || mongoose.model('Message', messageSchema);