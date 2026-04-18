"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "en" | "ar";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
} | null>(null);

export const LanguageProvider = ({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) => {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const router = useRouter();

  const setLang = (newLang: Lang) => {
    setLangState(newLang);

    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;

    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("Wrap app with LanguageProvider");
  return context;
};