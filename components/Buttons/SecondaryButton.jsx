"use client";
import React from "react";

const SecondaryButton = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex h-10 min-w-21 items-center justify-center
        rounded-lg px-4
        bg-gray-200 text-light-secondary
        text-sm font-bold tracking-[0.015em]
        transition-all
        hover:bg-gray-300
        active:scale-95
        border border-light-secondary
        ${className}`}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
