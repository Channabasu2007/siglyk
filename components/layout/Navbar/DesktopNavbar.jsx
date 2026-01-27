"use client"
import React, { useState } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import ProfileSettings from "@/components/translation/ProfileSettings";
import { usePageName } from "@/hooks/usePageName";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/controllers/authQuickActions.controller";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pageName = usePageName();
  const router = useRouter();
  
  const isAuthPage = pageName === "signin" || pageName === "signup" || pageName === "forgotPassword";
  const isTranslationPage = pageName === "translation";

  const handleScroll = (id) => {
    if (pageName !== "home") {
      router.push(`/`);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav className="relative z-60 hidden md:flex items-center justify-between h-16 px-8 lg:px-10 lg:w-[80vw] mx-auto bg-light-primary text-dark-primary border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-tight cursor-pointer" onClick={() => (router.push("/"))} >
            <span className="text-light-secondary">Sig</span>
            <span className="text-light-secondary">lyk</span>
          </span>
        </div>

        {/* Links */}
        {!isAuthPage && (
          <ul className="flex items-center gap-8 font-medium">
            {isTranslationPage ? (
              <>
                <li onClick={() => router.push("/conversations")} className="cursor-pointer hover:text-light-secondary transition-colors">Conversations</li>
                <li onClick={() => router.push("/videocall")} className="cursor-pointer hover:text-light-secondary transition-colors">Video Call</li>
              </>
            ) : (
              <>
                <li onClick={() => handleScroll('highlights')} className="cursor-pointer hover:text-light-secondary transition-colors">Features</li>
                <li onClick={() => handleScroll('testimonials')} className="cursor-pointer hover:text-light-secondary transition-colors">Testimonials</li>
                <li className="cursor-pointer hover:text-light-secondary">Support</li>
              </>
            )}
          </ul>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 relative"> {/* Ensure relative for absolute child */}
          {isTranslationPage ? (
            <div className="relative">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-light-secondary flex items-center justify-center text-light-primary font-bold cursor-pointer hover:opacity-90 transition-opacity border-2 border-light-primary shadow-sm"
              >
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Toggled Profile Component - Positioned to fix overlap issues */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 z-70">
                  <ProfileSettings 
                    onClose={() => setIsProfileOpen(false)}
                    onCreateOrg={() => router.push("/create-org")}
                  />
                </div>
              )}
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
              <span className="opacity-70 hidden sm:inline">Need Help?</span>
              <SecondaryButton label="Contact Support" onClick={() => (router.push("/support"))} />
            </>
          )}
        </div>
      </nav>

      {/* Background Overlay */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-55 bg-black/5" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;