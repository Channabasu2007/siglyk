import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', unique: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    plan: { type: String, enum: ['FREE', 'BASIC', 'PREMIUM'], default: 'FREE' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
    usage: {
        totalMinutesAllowed: { type: Number, default: 10 },
        minutesUsed: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);