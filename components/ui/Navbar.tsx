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
    { name: t("navbar.comparison"), href: "#comparison" },
    { name: t("navbar.pricing"), href: "#pricing" },
    { name: t("navbar.faq"), href: "#faq" },
    { name: t("navbar.blog"), href: `/${lang}/blog` },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group shrink-0">
          <div className="bg-accent p-1 rounded-md group-hover:scale-110 transition-transform flex items-center">
            <PhoneCall size={15} className="text-white" />
            <Waves size={11} className="text-cyan-300 -ml-0.5" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">CallToAgent</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors text-[13px] font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <LanguageSwitcher />
          <DemoButton variant="primary" className="!py-1.5 !px-4 !text-xs !rounded-md" href="tel:+34930485418">
            {t("navbar.requestDemo")}
          </DemoButton>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-5 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{t("navbar.language")}</span>
                  <LanguageSwitcher />
                </div>
                <DemoButton variant="primary" className="w-full" href="tel:+34930485418">
                  {t("navbar.requestDemo")}
                </DemoButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
