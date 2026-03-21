"use client";

import useAppTranslation from "@/hooks/useAppTranslation";
import { motion } from "framer-motion";
import { Check, Calendar, Rocket, Users } from "lucide-react";
import DemoButton from "../ui/DemoButton";
import { trackEvent } from "@/lib/analytics";

const Pricing = () => {
  const { t } = useAppTranslation();

  const tiers = [
    { key: "starter", highlight: false },
    { key: "growth", highlight: true, badge: true },
    { key: "enterprise", highlight: false },
  ];

  const consultancyIcons = [Calendar, Rocket, Users];

  const consultancyServices: Array<{ name: string; description: string; price: string; duration: string }> =
    t("pricing.consultancy.services") as unknown as Array<{
      name: string;
      description: string;
      price: string;
      duration: string;
    }>;

  return (
    <section id="pricing" className="py-24 bg-background-alt">
      <div className="container mx-auto px-6">
        {/* Header */}
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

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-6">
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

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-1">
                  {t(`pricing.tiers.${tier.key}.name`)}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {t(`pricing.tiers.${tier.key}.tagline`)}
                </p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-extrabold text-primary">
                    {t(`pricing.tiers.${tier.key}.price`)}
                  </span>
                  {tier.key !== "enterprise" && (
                    <span className="text-gray-500">{t("pricing.perMonth")}</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                {(["minutes", "mcp", "concurrent", "phone", "analytics", "support"] as const).map(
                  (feature) => (
                    <div key={feature} className="flex items-start space-x-3">
                      <Check size={18} className="text-success mt-0.5 shrink-0" />
                      <span className="text-gray-600 text-sm">
                        {t(`pricing.tiers.${tier.key}.${feature}`)}
                      </span>
                    </div>
                  )
                )}
              </div>

              <DemoButton
                variant={tier.highlight ? "primary" : "secondary"}
                className="w-full"
                gaEvent="select_item"
                gaParams={{ content_type: "pricing", item_id: tier.key }}
                href={tier.key === "enterprise" ? "mailto:support@calltoagent.com" : undefined}
              >
                {t(`pricing.tiers.${tier.key}.cta`)}
              </DemoButton>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer + KYC */}
        <div className="text-center text-gray-500 text-sm max-w-2xl mx-auto mb-24 space-y-1">
          <p>{t("pricing.disclaimer")}</p>
          <p>{t("pricing.kycNote")}</p>
        </div>

        {/* Consultancy section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
              {t("pricing.consultancy.title")}
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm lg:text-base">
              {t("pricing.consultancy.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Array.isArray(consultancyServices) &&
              consultancyServices.map((service, i) => {
                const Icon = consultancyIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md flex flex-col"
                    onClick={() =>
                      trackEvent("view_item", {
                        content_type: "consultancy",
                        item_id: `consultancy_${i}`,
                      })
                    }
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h4 className="font-bold text-primary mb-2">{service.name}</h4>
                    <p className="text-gray-500 text-sm flex-grow mb-4">{service.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-2xl font-extrabold text-primary">{service.price}</span>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                        {service.duration}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          <div className="text-center">
            <DemoButton
              variant="accent-outline"
              gaEvent="generate_lead"
              gaParams={{ content_type: "consultancy", item_id: "book_call" }}
              href="mailto:support@calltoagent.com"
            >
              {t("pricing.consultancy.cta")}
            </DemoButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
