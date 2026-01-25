import { NextResponse } from "next/server";
import { signupRequestSchema } from "@/schemas/auth.schema";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import Otp from "@/models/Otp.model";
import { TEMP_PASSWORD } from "@/lib/auth.constants";
import sendEmailVerification from "@/controllers/emailVerification.controller";

export async function POST(req) {
    try {
        const body = await req.json();

        // 1. Zod Validation
        const validation = signupRequestSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message },
                { status: 400 }
            );
        }
        const { email } = validation.data;

        await dbConnect();

        // 2. Check User Status
        let user = await User.findOne({ email });
        if (user && user.isVerified) {
            return NextResponse.json(
                { error: "This email is already registered. Please sign in." },
                { status: 400 }
            );
        }

        // 3. Create placeholder user if doesn't exist
        if (!user) {
            user = await User.create({
                email,
                passwordHash: TEMP_PASSWORD,
                isVerified: false,
                profileCompleted: false
            });
        }

        // 4. CHECK FOR EXISTING VALID OTP (Less than 5 mins old)
        const existingOtp = await Otp.findOne({ email });
        if (existingOtp) {
            const timeDiff = (new Date() - new Date(existingOtp.updatedAt)) / 1000 / 60;
            
            if (timeDiff < 5) {
                // Return success immediately without sending a new mail
                return NextResponse.json({
                    success: true,
                    message: "A valid code was recently sent. Please check your inbox.",
                    alreadySent: true // Signal for frontend
                });
            }
        }

        // 5. Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 6. Store OTP (Upsert updates the updatedAt timestamp)
        await Otp.findOneAndUpdate(
            { email },
            { code: otpCode },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // 7. Send the Verification Email
        const emailResponse = await sendEmailVerification(email, otpCode, "User", "verify");

        if (!emailResponse.success) {
            return NextResponse.json(
                { error: "Failed to send email. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "A 6-digit OTP has been sent to your email."
        });

    } catch (error) {
        console.error("OTP Send Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}