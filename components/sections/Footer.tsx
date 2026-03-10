"use client";

import Link from "next/link";
import { Phone, Twitter, Linkedin, Github } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const Footer = () => {
  const { t } = useTranslation("common");

  const links = [
    { label: t("footer.links.product"), href: "#" },
    { label: t("footer.links.pricing"), href: "#pricing" },
    { label: t("footer.links.useCases"), href: "#use-cases" },
    { label: t("footer.links.blog"), href: "#" },
    { label: t("footer.links.docs"), href: "#" },
    { label: t("footer.links.privacy"), href: "#" },
    { label: t("footer.links.terms"), href: "#" },
  ];

  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-accent p-1.5 rounded-lg">
                <Phone size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                CallToAgent
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Platform</h4>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.product")}</Link>
                <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.pricing")}</Link>
                <Link href="#use-cases" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.useCases")}</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Resources</h4>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.blog")}</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.docs")}</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Legal</h4>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.privacy")}</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.links.terms")}</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Support</h4>
                <a href="mailto:support@calltoagent.com" className="text-gray-400 hover:text-white transition-colors text-sm">support@calltoagent.com</a>
                <div className="pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            {t("footer.rights")}
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <span>Made with ❤️ for modern businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
