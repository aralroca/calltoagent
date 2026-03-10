"use client";

import Link from "next/link";
import { PhoneCall, Waves, Twitter, Linkedin, Github } from "lucide-react";
import useAppTranslation from "@/hooks/useAppTranslation";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const Footer = () => {
  const { t, lang } = useAppTranslation();

  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center space-x-2 mb-6">
              <div className="bg-accent p-1.5 rounded-lg flex items-center">
                <PhoneCall size={18} className="text-white" />
                <Waves size={14} className="text-cyan-300 -ml-0.5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CallToAgent</span>
            </Link>
            <p className="text-gray-400 mb-6">{t("footer.tagline")}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">{t("footer.columns.platform")}</h4>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.product")}</Link>
                <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.pricing")}</Link>
                <Link href="#use-cases" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.useCases")}</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">{t("footer.columns.resources")}</h4>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.blog")}</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.docs")}</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">{t("footer.columns.legal")}</h4>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.privacy")}</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.terms")}</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">{t("footer.columns.support")}</h4>
                <a href="mailto:support@calltoagent.com" className="text-gray-400 hover:text-white transition-colors text-sm">support@calltoagent.com</a>
                <div className="pt-2"><LanguageSwitcher /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex justify-center">
          <p className="text-gray-500 text-sm">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
