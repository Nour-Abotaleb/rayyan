import ProposalCalendarIcon from "@/icons/ProposalCalendarIcon";
import DownloadIcon from "@/icons/DownloadIcon";

interface DatabaseFileCardProps {
  date: string;
  title: string;
  description: string;
}

export default function DatabaseFileCard({ date, title, description }: DatabaseFileCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#1A1A1A] p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F9] px-3 py-1.5 text-[10px] font-medium text-black dark:bg-zinc-800 dark:text-zinc-300">
          <ProposalCalendarIcon size={14} className="shrink-0 text-black dark:text-white" />
          {date}
        </span>
        <button
          type="button"
          aria-label="Download"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F5F9] dark:bg-zinc-800 text-primary transition-colors hover:bg-primary/10"
        >
          <DownloadIcon size={16} />
        </button>
      </div>

      <div>
        <p className="truncate text-base md:text-lg lg:text-xl font-semibold text-black dark:text-white">
          {title}
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-black/50 dark:text-white/40">
          {description}
        </p>
      </div>
    </div>
  );
}
