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
    // 1️⃣ state update
    setLangState(newLang);

    // 2️⃣ cookie update
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;

    // 3️⃣ server re-sync (NO reload, smooth)
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