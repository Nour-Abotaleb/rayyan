"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import UploadCloudIcon from "@/icons/UploadCloudIcon";

interface DatabaseUploadSectionProps {
  label?: string;
  onUpload?: (files: File[]) => Promise<unknown>;
}

export default function DatabaseUploadSection({ label, onUpload }: DatabaseUploadSectionProps) {
  const { t } = useLanguage();
  const db = t.dashboard.database;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const displayLabel = label ?? db.uploadLabel;

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !onUpload) return;
    setUploading(true);
    await onUpload(Array.from(files));
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm lg:text-[15px] font-medium text-black dark:text-white">
        {displayLabel}
        <span className="text-black">{db.uploadRequired}</span>
      </p>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        className="relative flex flex-col items-center justify-center gap-2 rounded-xl py-5 text-center cursor-pointer"
        style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full text-primary" style={{ overflow: "visible" }}>
          <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
        </svg>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50">
          {uploading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <UploadCloudIcon size={22} />
          )}
        </span>
        <p className="text-sm text-black/60 dark:text-white/50">
          {db.dragDropLabel}
        </p>
        <button
          type="button"
          disabled={uploading}
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          className="rounded-full bg-primary px-5 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {db.browseFiles}
        </button>
        <p className="text-[11px] text-black/40 dark:text-white/30">
          {db.fileTypes}
        </p>
      </div>
    </div>
  );
}
