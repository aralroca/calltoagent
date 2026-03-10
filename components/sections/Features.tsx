"use client";

import useAppTranslation from "@/hooks/useAppTranslation";
import { motion } from "framer-motion";
import {
  Plug,
  Zap,
  Mic,
  Layers,
  BarChart3,
  ShieldCheck
} from "lucide-react";

const Features = () => {
  const { t } = useAppTranslation();

  const features = [
    {
      icon: <Plug size={24} />,
      title: t("features.mcp.title"),
      description: t("features.mcp.description"),
    },
    {
      icon: <Zap size={24} />,
      title: t("features.latency.title"),
      description: t("features.latency.description"),
    },
    {
      icon: <Mic size={24} />,
      title: t("features.voice.title"),
      description: t("features.voice.description"),
    },
    {
      icon: <Layers size={24} />,
      title: t("features.concurrent.title"),
      description: t("features.concurrent.description"),
    },
    {
      icon: <BarChart3 size={24} />,
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
    },
    {
      icon: <ShieldCheck size={24} />,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-primary mb-6"
          >
            {t("features.title")}
          </motion.h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              className="p-8 rounded-2xl bg-background-alt border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
