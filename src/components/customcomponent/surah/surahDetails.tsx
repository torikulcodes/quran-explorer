/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLanguage } from "@/app/helper/languageContext";
import React from "react";

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

  return (
    <div className="space-y-6 mt-8">
      {/* HEADER */}
      <div className="text-center mb-10 border-b pb-6">
        <h1 className="text-4xl font-bold mb-2">
          {lang === "ar" ? araData.name : araData.englishName}
        </h1>

        <h2 className="text-xl text-muted-foreground">
          {engData.englishNameTranslation}
        </h2>

        <div className="flex justify-center gap-4 mt-4 text-sm font-medium">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
            {engData.revelationType}
          </span>

          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
            {engData.numberOfAyahs} Ayahs
          </span>
        </div>
      </div>

      {/* AYAHS */}
      {araData?.ayahs.map((ayah: Ayah, index: number) => (
        <div
          key={ayah.number}
          className="border-b border-slate-100 hover:bg-slate-50 p-2 transition-colors"
        >
          {lang === "ar" ? (
            <>
              <p
                className="md:text-3xl text-xl font-arabic text-right leading-[2rem] md:leading-10"
                dir="rtl"
              >
                {ayah.text}
                <span className="inline-flex w-10 h-10 border border-slate-200 rounded-full items-center justify-center mx-1 text-sm">
                  {ayah.numberInSurah}
                </span>
              </p>

              <p className="text-lg text-muted-foreground/80 text-left">
                {engData?.ayahs[index]?.text}
              </p>
            </>
          ) : (
            <>
              <p className="text-xl">{engData?.ayahs[index]?.text}</p>

              <p
                className="text-2xl font-arabic text-right text-slate-500"
                dir="rtl"
              >
                {ayah.text}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
