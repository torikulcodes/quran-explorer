"use client";
import { useSettings } from "@/app/helper/settingsContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPanel() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      {/* Font Family */}
      <div>
        <p className="mb-2 font-semibold">Arabic Font</p>
        <Select
          value={settings.arabicFont}
          onValueChange={(value) => updateSettings({ arabicFont: value })}
    
        >
          <SelectTrigger className="w-full border-cyan-500 p-4">
            <SelectValue placeholder="Select Font" />
          </SelectTrigger>

          <SelectContent >
            <SelectItem
              value="font-arabic-1"
              className="hover:bg-cyan-500 hover:text-white text-lg px-3 pt-2"
            >
              Amiri
            </SelectItem>

            <SelectItem
              value="font-arabic-2"
              className="hover:bg-cyan-500 hover:text-white text-lg px-3 pb-2"
            >
              Scheherazade
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Arabic Font Size */}
      <div>
        <p>Arabic Size: {settings.arabicSize}px</p>
        <input
          type="range"
          min="20"
          max="50"
          value={settings.arabicSize}
          onChange={(e) =>
            updateSettings({ arabicSize: Number(e.target.value) })
          }
        />
      </div>

      {/* Translation Size */}
      <div>
        <p>Translation Size: {settings.translationSize}px</p>
        <input
          type="range"
          min="14"
          max="30"
          value={settings.translationSize}
          onChange={(e) =>
            updateSettings({ translationSize: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
