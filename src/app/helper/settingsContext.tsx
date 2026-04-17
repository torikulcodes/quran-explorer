"use client";

import { createContext, useContext, useState } from "react";

type Settings = {
  arabicFont: string;
  arabicSize: number;
  translationSize: number;
};

const defaultSettings: Settings = {
  arabicFont: "font-arabic-1",
  arabicSize: 28,
  translationSize: 18,
};

const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
} | null>(null);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("settings");
      return stored ? JSON.parse(stored) : defaultSettings;
    }
    return defaultSettings;
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("settings", JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("Wrap with SettingsProvider");
  return ctx;
};
