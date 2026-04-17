"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import LanguageSwitcher from "./languageSwitcher";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-4 py-3 flex items-center justify-between fixed z-50 top-0 right-0 left-0 backdrop-blur-xl">
      {/* Logo */}
      <div className="text-xl font-bold">Quran Explorer</div>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-6 items-center">
        <Link href="/">Surahs</Link>
        <Link href="/favorites">Favorites</Link>
          <LanguageSwitcher />
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-3">
            <div className="flex flex-col gap-4 mt-6">
              <Link href="/">Surahs</Link>
              <Link href="/favorites">Favorites</Link>
              <LanguageSwitcher />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
