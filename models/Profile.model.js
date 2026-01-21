import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    username : { type: String, required: true },
    nationality: { type: String },
    preference : { type: String, enum: ['Speech', 'Sign'] },
}, { timestamps: true });


export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);