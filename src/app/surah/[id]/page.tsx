/* eslint-disable @typescript-eslint/no-explicit-any */
import SurahDetails from "@/components/customcomponent/surah/surahDetails";
import { surahService } from "@/service/surah";
export default async function SurahDetailsPage({ params }: any) {
  const { id } = await params;
  const response = await surahService.getSurahDetails(id);

  if (response.error || !response.data) {
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load Surah details.
      </div>
    );
  }

  const { arabic, english } = response.data;

  return (
    <div className="mt-16 global_weidth p-4">


      <SurahDetails araData={arabic} engData={english} />
    </div>
  );
}
