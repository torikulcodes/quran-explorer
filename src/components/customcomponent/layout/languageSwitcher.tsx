"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/app/helper/languageContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-2 py-2 rounded-full hover:bg-gray-100 transition cursor-pointer hover:text-cyan-500 w-max">
            <Globe size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => setLang("en")}>
            English {lang === "en" && "✓"}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setLang("ar")}>
            Arabic {lang === "ar" && "✓"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}