import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Your auth configuration
import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Profile.model";
import User from "@/models/User.model";

// GET: Fetch current user settings for preloading
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // 1. Find user to get the consistent _id
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Fetch profile; if none exists, return defaults for the UI
    const profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
      return NextResponse.json({
        username: user.name || "",
        preference: "sign", // Default to 'sign' for Siglyk users
        nationality: "",
        preferredSignLanguage: "",
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("GET Settings Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Update or create user settings
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { username, nationality, preference, preferredSignLanguage } = body;

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Normalized update to fix case-sensitivity issues
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id, // Required for upserts
        username,
        nationality,
        // Match schema enum by converting input to Title Case if needed
        preference: preference.charAt(0).toUpperCase() + preference.slice(1).toLowerCase(), 
        preferredSignLanguage: preference.toLowerCase() === "sign" ? preferredSignLanguage : null,
      },
      { 
        new: true,         // Return the modified document
        upsert: true,      // Create if it doesn't exist
        runValidators: true // Ensure enum validation triggers
      }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Settings stored successfully", 
      profile: updatedProfile 
    });
  } catch (error) {
    console.error("POST Settings Error:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to update settings" 
    }, { status: 500 });
  }
}