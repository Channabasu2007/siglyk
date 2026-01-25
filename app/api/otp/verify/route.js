import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import Otp from "@/models/Otp.model";
import { otpVerifySchema } from "@/schemas/auth.schema";
import { encode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const validation = otpVerifySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, otp } = validation.data;

    await dbConnect();

    const user = await User.findOne({ email });
    const otpRecord = await Otp.findOne({ email });

    if (!user || !otpRecord) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const createdAt = otpRecord.updatedAt || otpRecord.createdAt;
    const diffMinutes = (Date.now() - new Date(createdAt)) / 1000 / 60;

    if (diffMinutes > 5) {
      await Otp.deleteOne({ email });
      return NextResponse.json(
        { error: "OTP expired" },
        { status: 400 }
      );
    }

    if (otpRecord.code !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();
    await Otp.deleteOne({ email });

    // ✅ Create NextAuth session manually
    const token = {
      id: user._id.toString(),
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      isVerified: true,
      profileCompleted: user.profileCompleted,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
    };

    const encodedToken = await encode({
      token,
      secret: process.env.NEXTAUTH_SECRET,
      maxAge: 30 * 24 * 60 * 60,
    });

    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";
    const cookieName = isProd 
      ? "__Secure-next-auth.session-token" 
      : "next-auth.session-token";

    cookieStore.set(cookieName, encodedToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ 
      success: true,
      profileCompleted: user.profileCompleted
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "An error occurred during verification" },
      { status: 500 }
    );
  }
}