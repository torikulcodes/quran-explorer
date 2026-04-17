import AllSurahList from "@/components/customcomponent/surah/allSurahList";
import { surahService } from "@/service/surah";
import React from "react";

export default async function Home() {
  const surahs = await surahService.getAllSurah();
  return (
    <div>
      <AllSurahList surahs={surahs.data} />
    </div>
  );
}
