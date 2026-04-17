/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLanguage } from "@/app/helper/languageContext";
import { useSettings } from "@/app/helper/settingsContext";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | any;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
    direction: string;
  };
}

interface SurahDetailsProps {
  engData: any;
  araData: any;
}

export default function SurahDetails({ engData, araData }: SurahDetailsProps) {
  const { lang } = useLanguage();
  const { settings } = useSettings();
  const [query, setQuery] = useState("");

  const filteredAyahs = useMemo(() => {
    if (!query) return araData?.ayahs;

    return araData?.ayahs.filter((ayah: Ayah, index: number) => {
      const engText = engData?.ayahs[index]?.text?.toLowerCase() || "";
      const araText = ayah.text || "";

      return engText.includes(query.toLowerCase()) || araText.includes(query);
    });
  }, [query, araData, engData]);

  return (
    <div>
      <div className="text-center mb-4  pb-4">
        <h1 className="md:text-4xl text-2xl font-bold">
          {lang === "ar" ? araData.name : araData.englishName}
        </h1>

        <h2 className="text-xl text-muted-foreground">
          {engData.englishNameTranslation}
        </h2>

        <div className="flex justify-center gap-4">
          <Badge className="bg-cyan-500">{engData.numberOfAyahs} Ayahs</Badge>
          <Badge className="bg-cyan-500"> {engData.revelationType}</Badge>
        </div>
      </div>
      <div className="relative max-w-sm md:max-w-lg mx-auto mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search surah (e.g, ayah, translation)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-5 pl-12 bg-white focus-visible:ring-cyan-500 shadow-sm rounded-4xl"
        />
      </div>

      {/* AYAHS */}
      {filteredAyahs?.length === 0 ? (
        <p className="text-center text-gray-500">No ayah found</p>
      ) : (
        filteredAyahs?.map((ayah: Ayah) => {
          const index = araData.ayahs.findIndex(
            (a: any) => a.number === ayah.number,
          );

          return (
            <div
              key={ayah.number}
              className="border-b border-slate-100 hover:bg-slate-50 p-2 transition-colors"
            >
              {lang === "ar" ? (
                <>
                  <p
                    className={`${settings.arabicFont} md:text-3xl text-xl font-arabic text-right leading-[2rem] md:leading-10`}
                    dir="rtl"
                    style={{ fontSize: settings.arabicSize }}
                  >
                    {ayah.text}
                    <span className="inline-flex w-10 h-10 border border-slate-200 rounded-full items-center justify-center mx-1 text-sm">
                      {ayah.numberInSurah}
                    </span>
                  </p>

                  <p
                    style={{ fontSize: settings.translationSize }}
                    className="text-lg text-muted-foreground text-left"
                  >
                    {engData?.ayahs[index]?.text}
                  </p>
                </>
              ) : (
                <>
                  <p
                    className={`${settings.arabicFont} text-xl`}
                    style={{ fontSize: settings.arabicSize }}
                  >
                    {engData?.ayahs[index]?.text}
                  </p>

                  <p
                    className="text-2xl font-arabic text-right text-slate-500"
                    dir="rtl"
                    style={{ fontSize: settings.translationSize }}
                  >
                    {ayah.text}
                  </p>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
