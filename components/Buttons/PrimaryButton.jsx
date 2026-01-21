"use client";
import React from "react";

const PrimaryButton = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex h-10 min-w-21 items-center justify-center
        rounded-lg px-4
        bg-light-secondary text-light-primary
        text-sm font-bold tracking-[0.015em]
        transition-all
        hover:brightness-110
        active:scale-95
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
