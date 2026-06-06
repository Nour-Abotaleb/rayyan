import ProposalCalendarIcon from "@/icons/ProposalCalendarIcon";
import DownloadIcon from "@/icons/DownloadIcon";
import TrashIcon from "@/icons/TrashIcon";

interface DatabaseFileCardProps {
  id: string;
  date: string;
  title: string;
  category: string;
  onView: () => void;
  onDelete: () => void;
}

export default function DatabaseFileCard({ date, title, category, onView, onDelete }: DatabaseFileCardProps) {
  const categoryLabel = category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#1A1A1A] p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F9] px-3 py-1.5 text-[10px] font-medium text-black dark:bg-zinc-800 dark:text-zinc-300">
          <ProposalCalendarIcon size={14} className="shrink-0 text-black dark:text-white" />
          {date}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F9] dark:bg-zinc-800 text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <TrashIcon size={15} />
          </button>
          <button
            type="button"
            onClick={onView}
            aria-label="View / Download"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F5F9] dark:bg-zinc-800 text-primary transition-colors hover:bg-primary/10"
          >
            <DownloadIcon size={16} />
          </button>
        </div>
      </div>

      <div>
        <p className="truncate text-base md:text-lg lg:text-xl font-semibold text-black dark:text-white">
          {title}
        </p>
        <p className="mt-1 text-sm text-black/50 dark:text-white/40">
          {categoryLabel}
        </p>
      </div>
    </div>
  );
}
