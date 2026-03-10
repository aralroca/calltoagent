"use client";

import useAppTranslation from "@/hooks/useAppTranslation";
import { motion } from "framer-motion";
import { PhoneCall, Cpu, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const { t } = useAppTranslation();

  const steps = [
    {
      icon: <PhoneCall size={32} className="text-accent" />,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
    },
    {
      icon: <Cpu size={32} className="text-accent" />,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
    },
    {
      icon: <CheckCircle size={32} className="text-accent" />,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            {t("howItWorks.title")}
          </h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-accent/5 rounded-2xl flex items-center justify-center mb-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-6 text-gray-200">
                  <ArrowRight size={40} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
