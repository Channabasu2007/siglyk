"use client";
import React from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { usePageName } from "@/hooks/usePageName";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/controllers/authQuickActions.controller";

const MobileNavbar = () => {
  const { data: session, status } = useSession();
  const pageName = usePageName();
  const router = useRouter();
  const isAuthPage = pageName === "signin" || pageName === "signup" || pageName === "forgotPassword";

  return (
    <nav className="flex md:hidden items-center justify-between h-14 px-4 bg-light-primary text-dark-primary border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-tight cursor-pointer" onClick={() => (router.push("/"))} >
          <span className="text-light-secondary">Sig</span>
          <span className="text-light-secondary">lyk</span>
        </span>
      </div>


      {/* Actions */}
      <div className="flex items-center gap-2">
        {!isAuthPage ? (
          status === "authenticated" ? (
            <>
              <SecondaryButton label="Sign Out" onClick={() => handleSignOut()} />
            </>
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
  );
};

export default MobileNavbar;
