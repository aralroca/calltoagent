"use client";

import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const SocialProof = () => {
  const { t } = useTranslation("common");

  const testimonials = t("socialProof.testimonials", {}, { returnObjects: true });

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-primary mb-6"
          >
            {t("socialProof.title")}
          </motion.h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {Array.isArray(testimonials) && testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-background-alt border border-gray-100 relative"
            >
              <Quote className="text-accent/20 absolute top-6 right-8" size={48} />
              <p className="text-gray-600 text-lg mb-6 relative z-10 italic">
                "{testimonial.quote}"
              </p>
              <div className="font-bold text-primary">{testimonial.author}</div>
            </motion.div>
          ))}
        </div>

        <div className="pt-12 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 items-center opacity-30 grayscale">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="px-6 py-4 border-2 border-dashed border-gray-400 rounded-lg text-sm font-bold text-gray-500 uppercase tracking-widest"
              >
                {t("socialProof.companyPlaceholder")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
