"use client";

import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import DemoButton from "../ui/DemoButton";
import { Zap, Clock, PhoneIncoming, ShieldCheck } from "lucide-react";

const Waveform = () => (
  <div className="flex items-end space-x-1 h-12">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1.5 bg-accent rounded-full"
        animate={{
          height: [
            "20%",
            `${Math.random() * 80 + 20}%`,
            `${Math.random() * 80 + 20}%`,
            "20%",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.05,
        }}
      />
    ))}
  </div>
);

const Hero = () => {
  const { t } = useTranslation("common");

  const stats = [
    { label: t("hero.stats.latency"), icon: <Zap size={18} className="text-accent" /> },
    { label: t("hero.stats.availability"), icon: <Clock size={18} className="text-accent" /> },
    { label: t("hero.stats.concurrent"), icon: <PhoneIncoming size={18} className="text-accent" /> },
    { label: t("hero.stats.mcp"), icon: <ShieldCheck size={18} className="text-accent" /> },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CallToAgent",
    "applicationCategory": "BusinessApplication",
    "description": "AI voice agent infrastructure for customer service, connected to business MCP servers",
    "offers": { "@type": "Offer", "price": "99", "priceCurrency": "USD" }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 dark-hero-gradient overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              <span className="text-gradient">{t("hero.headline").split(".")[0]}.</span>
              <br />
              {t("hero.headline").split(".")[1]}.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              {t("hero.subheadline")}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <DemoButton variant="primary" className="text-lg px-8">
                {t("hero.primaryCTA")}
              </DemoButton>
              <a
                href="#how-it-works"
                className="px-8 py-3 rounded-lg font-semibold border-2 border-white/20 text-white hover:bg-white/10 transition-all text-center"
              >
                {t("hero.secondaryCTA")} ↓
              </a>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-semibold">
                {t("hero.socialProof")}
              </p>
              <div className="flex flex-wrap gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                {/* Sector Icons/Logos Placeholders */}
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">HEALTHCARE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">REAL ESTATE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">LEGAL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">E-COMMERCE</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-gray-400 font-mono">Incoming Call...</div>
              </div>

              <div className="flex flex-col items-center py-10">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-accent/10">
                  <PhoneIncoming size={32} className="text-accent" />
                </div>
                <Waveform />
                <div className="mt-8 text-center">
                  <div className="text-white font-medium text-lg mb-1">AI Agent Active</div>
                  <div className="text-accent text-sm font-mono animate-pulse">Processing intent...</div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-slate-700/50 p-3 rounded-lg border border-white/5 flex items-center space-x-3"
                >
                  <div className="bg-green-500/20 p-1 rounded text-green-500">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-xs text-gray-200">📅 Appointment booked</span>
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="bg-slate-700/50 p-3 rounded-lg border border-white/5 flex items-center space-x-3"
                >
                  <div className="bg-blue-500/20 p-1 rounded text-blue-500">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-xs text-gray-200">🗃️ Record found in CRM</span>
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="bg-accent/20 p-3 rounded-lg border border-accent/20 flex items-center space-x-3"
                >
                  <div className="bg-accent p-1 rounded text-white">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-xs text-white font-semibold">✅ Issue resolved</span>
                </motion.div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/20 blur-[120px] rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center space-x-3"
            >
              {stat.icon}
              <span className="text-sm font-semibold text-gray-300">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
