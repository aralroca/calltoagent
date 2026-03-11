"use client";

import { useState } from "react";
import useAppTranslation from "@/hooks/useAppTranslation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Home,
  Scale,
  ShoppingCart,
  Hotel,
  CarFront,
  Plane,
  AlertCircle,
  Lightbulb
} from "lucide-react";

const UseCases = () => {
  const { t } = useAppTranslation();

  const sectors = [
    { id: "healthcare", icon: <Stethoscope />, key: "healthcare" },
    { id: "realEstate", icon: <Home />, key: "realEstate" },
    { id: "legal", icon: <Scale />, key: "legal" },
    { id: "ecommerce", icon: <ShoppingCart />, key: "ecommerce" },
    { id: "hospitality", icon: <Hotel />, key: "hospitality" },
    { id: "automotive", icon: <CarFront />, key: "automotive" },
    { id: "tourism", icon: <Plane />, key: "tourism" },
  ];

  const [activeSector, setActiveSector] = useState(sectors[0].id);

  return (
    <section id="use-cases" className="py-24 bg-background-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-primary mb-6"
          >
            {t("useCases.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t("useCases.subtitle")}
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveSector(sector.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeSector === sector.id
                  ? "bg-accent text-white shadow-lg"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              <span className={activeSector === sector.id ? "text-white" : "text-accent"}>
                {sector.icon}
              </span>
              <span>{t(`useCases.sectors.${sector.key}.name`)}</span>
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100"
            >
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-start space-x-4 mb-8">
                    <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1 uppercase text-sm tracking-wider">{t("useCases.labels.pain")}</h4>
                      <p className="text-gray-600 text-lg">
                        {t(`useCases.sectors.${activeSector}.pain`)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                      <Lightbulb size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1 uppercase text-sm tracking-wider">{t("useCases.labels.solution")}</h4>
                      <p className="text-gray-600 text-lg">
                        {t(`useCases.sectors.${activeSector}.solution`)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 lg:p-8">
                  <h4 className="font-bold text-primary mb-6 uppercase text-sm tracking-wider flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2" />
                    {t("useCases.labels.mcp")}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {/* Hardcoding from translation keys structure since it's an array */}
                    {(() => {
                      const mcps = t(`useCases.sectors.${activeSector}.mcp`, {}, { returnObjects: true });
                      return Array.isArray(mcps) ? mcps.map((mcp: string, idx: number) => (
                        <div key={idx} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                          {mcp}
                        </div>
                      )) : null;
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
