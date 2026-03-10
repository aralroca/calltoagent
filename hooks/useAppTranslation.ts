"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import enCommon from "@/locales/en/common.json";
import esCommon from "@/locales/es/common.json";

type TOptions = { returnObjects?: boolean };

const dictionaries = {
  en: enCommon,
  es: esCommon,
} as const;

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export default function useAppTranslation() {
  const pathname = usePathname();
  const lang = useMemo(() => {
    const locale = pathname?.split("/")[1];
    return locale === "es" ? "es" : "en";
  }, [pathname]);

  const dictionary = dictionaries[lang];

  const t = (key: string, _query?: Record<string, unknown>, options?: TOptions): any => {
    const value = getByPath(dictionary, key);

    if (value === undefined) return key;
    if (options?.returnObjects) return value;
    if (typeof value === "string") return value;

    return key;
  };

  return { t, lang };
}
