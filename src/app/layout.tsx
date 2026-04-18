import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/customcomponent/layout/navbar";
import { LanguageProvider } from "./helper/languageContext";
import { SettingsProvider } from "./helper/settingsContext";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quran Explorer",
  description: "Quran Explorer - A Quran App",
};

type Lang = "en" | "ar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies(); 

  const lang = cookieStore.get("lang")?.value || "en";


  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLang={lang as Lang}>
          <SettingsProvider>
            <Navbar />

            {children}
          </SettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
