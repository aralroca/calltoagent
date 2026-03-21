"use client";

import React from "react";
import { trackEvent } from "@/lib/analytics";

interface DemoButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "accent-outline" | "ghost";
  className?: string;
  gaEvent?: string;
  gaParams?: Record<string, string>;
  href?: string;
}

const DemoButton: React.FC<DemoButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  gaEvent = "generate_lead",
  gaParams,
  href,
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-center inline-block cursor-pointer";

  const variants = {
    primary: "bg-accent text-white hover:bg-indigo-700",
    secondary: "bg-white text-primary border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400",
    outline: "border-2 border-white text-white hover:bg-white hover:text-primary",
    "accent-outline": "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white",
    ghost: "text-white hover:bg-white/10",
  };

  const handleClick = () => {
    trackEvent(gaEvent, {
      event_category: "CTA",
      event_label: typeof children === "string" ? children : "",
      ...gaParams,
    });
    
    if (!href) {
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

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
