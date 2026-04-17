"use client";
import { Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import LanguageSwitcher from "./languageSwitcher";
import SettingsPanel from "./settingsPanel";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-4 py-3 flex items-center justify-between fixed z-50 top-0 right-0 left-0 backdrop-blur-xl bg-cyan-50">
      {/* Logo */}
      <div className="text-xl font-bold">Quran Explorer</div>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-6 items-center">
        <Link className="text-cyan-600 font-semibold" href="/">Surahs</Link>
      </div>
      {/* Mobile menu */}
      <div className="flex gap-2 bg-cyan-50">
        <LanguageSwitcher />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg" className="border-0 hover:rounded-full hover:text-cyan-500 transition-colors duration-500 hover:cursor-pointer bg-cyan-50 hover:bg-white">
              <Settings />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-3 bg-cyan-50">
            <div className="flex flex-col gap-2 mt-6">
              <Link className="md:hidden" href="/">
                Surahs
              </Link>
              <hr  className="md:hidden"/>
              <SettingsPanel />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
