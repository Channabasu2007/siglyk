"use client";
import React, { useState } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import ProfileSettings from "@/components/translation/ProfileSettings";
import { usePageName } from "@/hooks/usePageName";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/controllers/authQuickActions.controller";

const MobileNavbar = () => {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pageName = usePageName();
  const router = useRouter();

  const isAuthPage = pageName === "signin" || pageName === "signup" || pageName === "forgotPassword";
  const isTranslationPage = pageName === "translation";

  return (
    <>
      <nav className="flex md:hidden items-center justify-between h-14 px-4 bg-light-primary text-dark-primary border-b border-gray-200 relative z-60">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight cursor-pointer" onClick={() => (router.push("/"))} >
            <span className="text-light-secondary">Sig</span>
            <span className="text-light-secondary">lyk</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isTranslationPage ? (
            <div className="flex items-center gap-3">
               <button onClick={() => router.push("/videocall")} className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded">Video</button>
               <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded-full bg-light-secondary flex items-center justify-center text-light-primary text-sm font-bold cursor-pointer"
              >
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          ) : !isAuthPage ? (
            status === "authenticated" ? (
              <SecondaryButton label="Sign Out" onClick={() => handleSignOut()} />
            ) : (
              <>
                <PrimaryButton label="Sign Up" onClick={() => (router.push("/signup"))} />
                <SecondaryButton label="Sign In" onClick={() => (router.push("/signin"))} />
              </>
            )
          ) : (
            <>
              <span className="opacity-70 hidden sm:inline text-xs">Need Help?</span>
              <SecondaryButton label="Support" onClick={() => (router.push("/support"))} />
            </>
          )}
        </div>
      </nav>

      {/* Mobile Profile Overlay */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm">
            <button 
              onClick={() => setIsProfileOpen(false)}
              className="absolute -top-12 right-0 text-light-primary flex items-center gap-1"
            >
              <span className="material-symbols-outlined">close</span> Close
            </button>
            <ProfileSettings 
              onClose={() => setIsProfileOpen(false)}
              onCreateOrg={() => router.push("/create-org")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;