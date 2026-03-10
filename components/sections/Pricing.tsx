"use client";

import useAppTranslation from "@/hooks/useAppTranslation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import DemoButton from "../ui/DemoButton";

const Pricing = () => {
  const { t } = useAppTranslation();

  const tiers = [
    {
      key: "starter",
      highlight: false,
    },
    {
      key: "growth",
      highlight: true,
      badge: "⭐",
    },
    {
      key: "enterprise",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-primary mb-6"
          >
            {t("pricing.title")}
          </motion.h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl bg-white flex flex-col ${
                tier.highlight
                  ? "ring-4 ring-accent shadow-2xl scale-105 z-10"
                  : "border border-gray-100 shadow-xl"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  {t("pricing.popular")}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {t(`pricing.tiers.${tier.key}.name`)}
                </h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-extrabold text-primary">
                    {t(`pricing.tiers.${tier.key}.price`)}
                  </span>
                  {tier.key !== "enterprise" && (
                    <span className="text-gray-500">/mo</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {[
                  "minutes",
                  "mcp",
                  "concurrent",
                  "analytics",
                  "support"
                ].map((feature) => (
                  <div key={feature} className="flex items-start space-x-3">
                    <Check size={18} className="text-success mt-1 shrink-0" />
                    <span className="text-gray-600">
                      {t(`pricing.tiers.${tier.key}.${feature}`)}
                    </span>
                  </div>
                ))}
              </div>

              <DemoButton
                variant={tier.highlight ? "primary" : "secondary"}
                className={`w-full ${!tier.highlight ? "border border-gray-200" : ""}`}
              >
                {t(`pricing.tiers.${tier.key}.cta`)}
              </DemoButton>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto">
          {t("pricing.disclaimer")}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
