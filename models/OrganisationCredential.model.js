import mongoose from "mongoose";

const organisationCredentialSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },
    assignedPasswordHash: { type: String, required: true },
    allowedMinutes: { type: Number, default: 0 },
},{ timestamps: true });

export default mongoose.models.OrganisationCredential || mongoose.model("OrganisationCredential", organisationCredentialSchema);