import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Auto-deletes after 5 mins (300 seconds)
});

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);