/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function AllSurahList(surahs: any) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  let data = [...(surahs?.surahs || [])];

  if (search) {
    const searchTerm = search.toLowerCase().replace(/[-\s]/g, "");

    data = data.filter((item) => {
      return Object.keys(item).some((key) => {
        if (key === "number") {
          return false;
        }

        const value = String(item[key]).toLowerCase().replace(/[-\s]/g, "");

        return value.includes(searchTerm);
      });
    });
  }

  data.sort((a, b) => {
    if (sort === "asc") {
      return a.number - b.number;
    } else {
      return b.number - a.number;
    }
  });

  const toggleSort = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <section className="global_weidth mt-16">
      <div className="flex justify-between items-center gap-3 mb-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search surah (e.g. Al Fatihah or 1)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white focus-visible:ring-cyan-500 shadow-sm"
          />
        </div>

        <p
          onClick={toggleSort}
          className="w-max text-nowrap  md:w-auto flex items-center gap-2 transition-all duration-200 active:scale-95 hover:cursor-pointer hover:text-cyan-500"
        >
          {sort === "asc" ? (
            <>
              <ArrowUpNarrowWide className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Ascending (1-114)</span>
            </>
          ) : (
            <>
              <ArrowDownWideNarrow className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Descending (114-1)</span>
            </>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((surah: any) => (
          <Link href={`/surah/${surah.number}`} key={surah.number}>
            <Card className="p-3 group rounded-sm border border-gray-200 hover:border-cyan-500 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <p className="bg-gray-50 group-hover:bg-cyan-500 border w-10 h-10 flex justify-center items-center rounded-md rotate-45 transition-all duration-300">
                    <span className="-rotate-45 font-semibold group-hover:text-white transition-all duration-300">
                      {surah.number}
                    </span>
                  </p>
                  <div>
                    <h3 className="text-lg font-bold text-gray-700">
                      {surah.englishName}
                    </h3>
                    <p className="text-gray-600">
                      {surah.englishNameTranslation}
                    </p>
                  </div>
                </div>

                <div className="font-semibold text-gray-500">
                  <p>{surah.name}</p>
                  <p className="group-hover:text-cyan-500 text-sm">
                    {surah.numberOfAyahs} Ayah
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
