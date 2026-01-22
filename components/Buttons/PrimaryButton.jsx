"use client";
import React from "react";

const PrimaryButton = ({ label, icon, onClick, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex h-10 min-w-21 items-center justify-center gap-2
        rounded-lg px-4
        bg-light-secondary text-light-primary
        text-sm font-bold tracking-[0.015em]
        transition-all
        hover:brightness-110
        active:scale-95
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default PrimaryButton;