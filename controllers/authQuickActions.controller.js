import { signIn, signOut } from "next-auth/react";

/**
 * 1. Handle Google Sign-In
 * Triggers the OAuth flow (always redirects).
 * Returns void - no response to await.
 */
export const handleGoogleSignIn = (callbackUrl = "/translation") => {
  try {
    console.log("Initiating Google Sign-In...");
    // Don't use await - this redirects immediately
    signIn("google", { 
      callbackUrl,
      redirect: true 
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
  }
};

/**
 * 2. Handle Email Sign-In
 * Does NOT auto-redirect.
 */
export const handleEmailSignIn = async (
  email,
  password,
  callbackUrl = "/translation"
) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (!result) {
      return { success: false, error: "No response from server" };
    }

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { 
      success: true, 
      url: result.url || callbackUrl 
    };
  } catch (error) {
    console.error("Email Auth Error:", error);
    return {
      success: false,
      error: "Authentication failed. Please try again.",
    };
  }
};

/**
 * 3. Handle Sign-Out
 */
export const handleSignOut = async (callbackUrl = "/signin") => {
  try {
    await signOut({
      callbackUrl,
      redirect: true,
    });
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};
