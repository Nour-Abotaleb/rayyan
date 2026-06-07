"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import EyeIcon from "@/icons/EyeIcon";
import doc1 from "@src/assets/dashboard/doc-1.svg";
import doc2 from "@src/assets/dashboard/doc-2.svg";

interface DocumentCardProps {
  title: string;
  actionLabel: string;
  preview: typeof doc1;
  isDark: boolean;
  onView: () => void;
}

function DocumentCard({ title, actionLabel, preview, isDark, onView }: DocumentCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-[12px] bg-white p-4 dark:bg-[#0D0D0D]">
      <div className="flex items-center justify-between">
        <p className="text-base md:text-[20px] font-semibold text-black/80 dark:text-white/80">
          {title}
        </p>
        <button
          onClick={onView}
          className="flex items-center gap-1.5 text-nowrap rounded-full bg-primary dark:bg-[#519A91] px-4 py-2.5 text-xs cursor-pointer font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <EyeIcon size={14} />
          {actionLabel}
        </button>
      </div>
      <div className="w-full overflow-hidden rounded-xl">
        <Image
          src={preview}
          alt={title}
          className="h-auto w-full"
          style={isDark ? { filter: "brightness(0.2)" } : undefined}
        />
      </div>
    </div>
  );
}

export default function DocumentsSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <DocumentCard
        title={t.dashboard.documents.teamDocumentsTitle}
        actionLabel={t.dashboard.documents.view}
        preview={doc1}
        isDark={isDark}
        onView={() => router.push("/dashboard/settings?tab=company")}
      />
      <DocumentCard
        title={t.dashboard.documents.cvResumeTitle}
        actionLabel={t.dashboard.documents.view}
        preview={doc2}
        isDark={isDark}
        onView={() => router.push("/dashboard/database")}
      />
    </div>
  );
}
