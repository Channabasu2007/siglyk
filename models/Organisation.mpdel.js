import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseKey: { type: String, unique: true },
    adminId: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        index : true
    }],
    subscription: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Subscription'
    },
    speakingEmployees: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        index : true
    }],
    signLanguageEmployees: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        index : true
    }],
    nationality: { type: String },
    industry: { type: String },
    organisationSize: { type: String },
    purposeOfUse: { type: String },
    orgbio: { type: String },
}, { timestamps: true });

export default mongoose.models.Organisation || mongoose.model('Organisation', organisationSchema);