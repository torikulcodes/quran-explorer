export const surahService = {
  // All Surah List
  getAllSurah: async () => {
    try {
      const res = await fetch("https://api.alquran.cloud/v1/surah", {
        cache: "force-cache",
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: data.message };
      }

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: "Something went wrong" };
    }
  },

  // Get Surah Details
  getSurahDetails: async (id:string) => {
    try {
      const [arabicRes, englishRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${id}/quran-uthmani`, {
          cache: "force-cache",
        }),
        fetch(`https://api.alquran.cloud/v1/surah/${id}/en.asad`, {
          cache: "force-cache",
        }),
      ]);

      const arabicData = await arabicRes.json();
      const englishData = await englishRes.json();

      if (!arabicRes.ok || !englishRes.ok) {
        return { data: null, error: "Failed to fetch surah details" };
      }

      return {
        data: {
          arabic: arabicData.data,
          english: englishData.data,
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error: "Something went wrong" };
    }
  },
};