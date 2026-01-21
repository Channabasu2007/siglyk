"use client"
import React from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";

const Navbar = () => {
  const handleScroll = (id) => {
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
        <span className="text-3xl font-extrabold tracking-tight">
          <span className="text-light-secondary">Sig</span>
          <span className="text-light-secondary">lyk</span>
        </span>
      </div>


      {/* Links */}
      <ul className="flex items-center gap-8 font-medium">
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
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <PrimaryButton label="Sign Up" />
        <SecondaryButton label="Sign In" />
      </div>
    </nav>
  );
};

export default Navbar;
