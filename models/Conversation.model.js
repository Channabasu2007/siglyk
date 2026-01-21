import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }],
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', default: null },
    durationMinutes: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    maxMinutesLeft: { type: Number, default: 0 },
    messages: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Message',
        index: true
    }]
}, { timestamps: true });

export default mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);