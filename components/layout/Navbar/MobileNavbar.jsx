"use client";
import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";

const MobileNavbar = () => {
  return (
    <nav className="flex md:hidden items-center justify-between h-14 px-4 bg-light-primary text-dark-primary border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-tight">
          <span className="text-light-secondary">Sig</span>
          <span className="text-light-secondary">lyk</span>
        </span>
      </div>


      {/* Actions */}
      <div className="flex items-center gap-2">
        <PrimaryButton label="Sign Up" />
        <SecondaryButton label="Sign In" />
      </div>
    </nav>
  );
};

export default MobileNavbar;
