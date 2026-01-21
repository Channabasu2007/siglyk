import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['INDIVIDUAL', 'ORG_ADMIN', 'ORG_EMPLOYEE'], default: 'INDIVIDUAL' },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', default: null },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);