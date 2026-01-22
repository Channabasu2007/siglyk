"use client"
import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { usePageName } from "@/hooks/usePageName";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pageName = usePageName();
  const router = useRouter();
  const isAuthPage = pageName === "signin" || pageName === "signup" || pageName === "forgotPassword";

  const handleScroll = (id) => {
    if (pageName !== "home") {
      router.push(`/`);
    };
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="hidden md:flex items-center justify-between h-16 px-8 lg:px-10  lg:w-[80vw] mx-auto bg-light-primary text-dark-primary border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-3xl font-extrabold tracking-tight cursor-pointer" onClick={() => (router.push("/"))} >
          <span className="text-light-secondary">Sig</span>
          <span className="text-light-secondary">lyk</span>
        </span>
      </div>

      {/* Links */}
      {isAuthPage ? null : (<ul className="flex items-center gap-8 font-medium">
        <li
          onClick={() => handleScroll('highlights')}
          className="cursor-pointer hover:text-light-secondary transition-colors"
        >
          Features
        </li>
        <li
          onClick={() => handleScroll('testimonials')}
          className="cursor-pointer hover:text-light-secondary transition-colors"
        >
          Testimonials
        </li>
        <li className="cursor-pointer hover:text-light-secondary">Support</li>
      </ul>)}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {isAuthPage ? (
          <><span className="opacity-70 ">Need Help?</span><SecondaryButton label="Contact Support" onClick={() => router.push("/support")} /></>
        ) : (
          <>
            <PrimaryButton label="Sign Up" onClick={() => router.push("/signup")} />
            <SecondaryButton label="Sign In" onClick={() => router.push("/signin")} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
