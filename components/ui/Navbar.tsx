"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PhoneCall, Waves, Menu, X } from "lucide-react";
import useAppTranslation from "@/hooks/useAppTranslation";
import DemoButton from "./DemoButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { t, lang } = useAppTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navbar.howItWorks"), href: "#how-it-works" },
    { name: t("navbar.useCases"), href: "#use-cases" },
    { name: t("navbar.features"), href: "#features" },
    { name: t("navbar.pricing"), href: "#pricing" },
    { name: t("navbar.faq"), href: "#faq" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-primary/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center space-x-2 group">
          <div className="bg-accent p-1.5 rounded-lg group-hover:scale-110 transition-transform flex items-center">
            <PhoneCall size={18} className="text-white" />
            <Waves size={14} className="text-cyan-300 -ml-0.5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">CallToAgent</span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <LanguageSwitcher />
          <DemoButton variant="primary" className="py-2 px-4 text-sm">{t("navbar.requestDemo")}</DemoButton>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-primary border-t border-white/10 overflow-hidden">
            <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{t("navbar.language")}</span>
                  <LanguageSwitcher />
                </div>
                <DemoButton variant="primary" className="w-full">{t("navbar.requestDemo")}</DemoButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
