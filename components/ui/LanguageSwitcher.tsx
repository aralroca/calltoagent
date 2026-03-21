"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAppTranslation from "@/hooks/useAppTranslation";
import { trackEvent } from "@/lib/analytics";
import { translationMap } from "@/lib/blog-translations";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const { lang } = useAppTranslation();

  const getPathForLocale = (targetLocale: string) => {
    const segments = pathname.split("/");
    const currentLocale = segments[1];

    // Check if this is a blog post page: /[locale]/blog/[slug]
    if (segments[2] === "blog" && segments[3] && targetLocale !== currentLocale) {
      const currentSlug = segments[3];
      const translatedSlug = translationMap[currentLocale]?.[currentSlug];
      if (translatedSlug) {
        return `/${targetLocale}/blog/${translatedSlug}`;
      }
    }

    // Default: just swap the locale segment
    segments[1] = targetLocale;
    return segments.join("/");
  };

  const handleSwitch = (locale: string) => {
    trackEvent("select_content", { content_type: "language_switch", item_id: locale });
  };

  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      <Link
        href={getPathForLocale("en")}
        onClick={() => handleSwitch("en")}
        className={`${
          lang === "en" ? "text-accent" : "text-gray-400 hover:text-white"
        } transition-colors uppercase`}
      >
        EN
      </Link>
      <span className="text-gray-600">|</span>
      <Link
        href={getPathForLocale("es")}
        onClick={() => handleSwitch("es")}
        className={`${
          lang === "es" ? "text-accent" : "text-gray-400 hover:text-white"
        } transition-colors uppercase`}
      >
        ES
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
