import { NextResponse } from "next/server";
import { profileCompletionSchema } from "@/schemas/auth.schema";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import Profile from "@/models/Profile.model";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "@/lib/auth.constants";
import { encode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const body = await req.json();
        
        const validation = profileCompletionSchema.safeParse(body);
        if (!validation.success) {
            console.log("Validation errors:", validation.error); // ✅ Debug log
            
            return NextResponse.json(
                { 
                    error: validation.error.errors?.[0]?.message || 
                           validation.error.message || 
                           "Validation failed" 
                },
                { status: 400 }
            );
        }
        
        const { 
            email, 
            username,
            password, 
            role, 
            nationality, 
            preference, 
            preferredSignLanguage 
        } = validation.data;

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        user.passwordHash = hashedPassword;
        user.profileCompleted = true; 
        user.role = role || 'individual';
        await user.save();

        await Profile.findOneAndUpdate(
            { userId: user._id },
            {
                userId: user._id,
                username,
                nationality,
                preference,
                preferredSignLanguage: preferredSignLanguage || null, // ✅ Convert empty string to null
            },
            { upsert: true, new: true }
        );

        const sessionToken = await encode({
            token: {
                id: user._id.toString(),
                sub: user._id.toString(),
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                profileCompleted: true, 
            },
            secret: process.env.NEXTAUTH_SECRET,
            maxAge: 30 * 24 * 60 * 60,
        });

        const cookieStore = await cookies();
        const isProd = process.env.NODE_ENV === "production";
        const cookieName = isProd ? "__Secure-next-auth.session-token" : "next-auth.session-token";

        cookieStore.set(cookieName, sessionToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
        });

        return NextResponse.json({ 
            success: true, 
            message: "Profile completed successfully"
        });

    } catch (error) {
        console.error("Profile completion error:", error);
        return NextResponse.json({ 
            error: "Internal Server Error" 
        }, { status: 500 });
    }
}