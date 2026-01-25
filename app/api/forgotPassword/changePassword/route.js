import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import Otp from "@/models/Otp.model";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/lib/auth.constants";

export async function POST(req) {
    try {
        const { email, newPassword } = await req.json();
        await dbConnect();

        // Final safety check: ensure the OTP record still exists for this email
        // (Ensures they didn't skip the verify step)
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord) {
            return NextResponse.json({ message: "Unauthorized password change attempt." }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await User.findOneAndUpdate({ email }, { passwordHash: hashedPassword });

        // Cleanup: remove the OTP record now that the process is finished
        await Otp.deleteOne({ email });

        return NextResponse.json({ success: true, message: "Password updated." });
    } catch (error) {
        return NextResponse.json({ message: "Update failed." }, { status: 500 });
    }
}