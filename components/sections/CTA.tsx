"use client";

import useAppTranslation from "@/hooks/useAppTranslation";
import { motion } from "framer-motion";
import DemoButton from "../ui/DemoButton";

const CTA = () => {
  const { t } = useAppTranslation();

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-cyan-400/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {t("finalCTA.headline")}
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {t("finalCTA.subheadline")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <DemoButton variant="primary" className="text-lg px-10 w-full sm:w-auto">
              {t("finalCTA.primaryCTA")}
            </DemoButton>
            <DemoButton variant="outline" className="text-lg px-10 w-full sm:w-auto">
              {t("finalCTA.secondaryCTA")}
            </DemoButton>
          </div>

          <p className="text-gray-400 text-sm italic">
            {t("finalCTA.footerText")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
