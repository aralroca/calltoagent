"use client";

import useAppTranslation from "@/hooks/useAppTranslation";
import { Check, X } from "lucide-react";

export default function Comparison() {
  const { t } = useAppTranslation();

  const rows = [
    "mcp",
    "audience",
    "speed",
    "latency",
    "pricing",
    "compliance",
    "results",
  ];

  return (
    <section id="comparison" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("comparison.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("comparison.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="px-6 py-4 font-medium">{t("comparison.columns.feature")}</th>
                <th className="px-6 py-4 font-medium">{t("comparison.columns.others")}</th>
                <th className="px-6 py-4 font-medium text-accent">{t("comparison.columns.cta")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                  <td className="px-6 py-5 text-white font-medium border-l-2 border-transparent">
                    {t(`comparison.rows.${row}.name`)}
                  </td>
                  <td className="px-6 py-5 text-gray-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500/50" />
                    {t(`comparison.rows.${row}.others`)}
                  </td>
                  <td className="px-6 py-5 text-white font-semibold bg-accent/10 border-r-2 border-accent/20">
                    <div className="flex items-center gap-2 text-accent">
                      <Check className="w-5 h-5" />
                      {t(`comparison.rows.${row}.cta`)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
                * Based on internal benchmarks vs. standard API implementations.
            </p>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>
    </section>
  );
}
