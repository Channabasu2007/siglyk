import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    username: { type: String, required: true },
    nationality: { type: String },
    preference: { 
        type: String, 
        lowercase: true, // Automatically converts "Sign" to "sign"
        enum: ['speech', 'sign'], // Match the case you send from the UI
        default: 'sign'
    },
    preferredSignLanguage: { type: String },
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);