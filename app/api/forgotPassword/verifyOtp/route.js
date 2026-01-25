import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Otp from "@/models/Otp.model";

const otpVerifySchema = z.object({
    email: z.string().email(),
    code: z.string().length(6).regex(/^\d{6}$/),
});

export async function POST(req) {
    try {
        const body = await req.json();
        if (!body) {
            return NextResponse.json({ message: "No body provided" }, { status: 400 });
        }

        const validation = otpVerifySchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ 
                message: validation.error.errors[0].message 
            }, { status: 400 });
        }

        const { email, code } = validation.data;
        await dbConnect();

        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord) {
            return NextResponse.json({ 
                message: "Invalid or expired OTP" 
            }, { status: 400 });
        }

        // 5-Minute Expiry Check
        const otpTimestamp = otpRecord.updatedAt || otpRecord.createdAt;
        const timeDiff = (new Date() - new Date(otpTimestamp)) / 1000 / 60;
        
        if (timeDiff > 5) {
            await Otp.deleteOne({ email });
            return NextResponse.json({ 
                message: "OTP expired. Please request a new one." 
            }, { status: 400 });
        }

        // Verify OTP code
        if (otpRecord.code.toString() !== code.toString()) {
            return NextResponse.json({ 
                message: "Incorrect OTP code" 
            }, { status: 400 });
        }

        // Success - Don't delete OTP yet (needed for password reset)
        return NextResponse.json({ 
            success: true,
            message: "OTP verified successfully" 
        });

    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json({ 
            message: "Internal Server Error" 
        }, { status: 500 });
    }
}