import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import Otp from "@/models/Otp.model";
import sendEmailVerification from "@/controllers/emailVerification.controller";

export async function POST(req) {
    try {
        const { email } = await req.json();
        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "No account found with this email." }, { status: 404 });
        }

        // Check if OTP already exists and is less than 5 minutes old
        const existingOtp = await Otp.findOne({ email });
        
        if (existingOtp) {
            const otpTimestamp = existingOtp.updatedAt || existingOtp.createdAt;
            const timeDiff = (new Date() - new Date(otpTimestamp)) / 1000 / 60;

            if (timeDiff < 5) {
                // OTP still valid, don't send new one
                return NextResponse.json({ 
                    success: true, 
                    message: "Reset code already sent. Please check your email." 
                });
            }
        }

        // Generate new OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save/Update OTP in DB
        await Otp.findOneAndUpdate(
            { email },
            { code: otpCode },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const emailResponse = await sendEmailVerification(email, otpCode, "User", "verify");
        if (!emailResponse.success) {
            return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Reset code sent." });
    } catch (error) {
        console.error("Send OTP error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}