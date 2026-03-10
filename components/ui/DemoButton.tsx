"use client";

import React from "react";

interface DemoButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}

const DemoButton: React.FC<DemoButtonProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-center inline-block cursor-pointer";

  const variants = {
    primary: "bg-accent text-white hover:bg-indigo-700",
    secondary: "bg-white text-primary hover:bg-gray-100",
    outline: "border-2 border-white text-white hover:bg-white hover:text-primary",
    ghost: "text-white hover:bg-white/10",
  };

  const handleClick = () => {
    alert("AVAILABLE SOON");
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default DemoButton;
