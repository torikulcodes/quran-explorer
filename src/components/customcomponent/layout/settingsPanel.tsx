"use client";
import { useSettings } from "@/app/helper/settingsContext";

export default function SettingsPanel() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">

      {/* Font Family */}
      <div>
        <p className="font-medium mb-2">Arabic Font</p>
        <select
          value={settings.arabicFont}
          onChange={(e) =>
            updateSettings({ arabicFont: e.target.value })
          }
          className="border p-2 rounded w-full"
        >
          <option value="font-arabic-1">Amiri</option>
          <option value="font-arabic-2">Scheherazade</option>
        </select>
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