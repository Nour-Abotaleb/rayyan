"use client";

import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import SearchIcon from "@/icons/SearchIcon";
import NotificationIcon from "@/icons/NotificationIcon";

export interface DashboardRightControlsUser {
  name: string;
  email: string;
  avatar?: string;
}

export default function DashboardRightControls({
  theme,
  toggleTheme,
  cycleLanguage,
  navLabel,
  user,
}: {
  theme: string;
  toggleTheme: () => void;
  cycleLanguage: () => void;
  navLabel: { lightMode: string; darkMode: string; language: string };
  user: DashboardRightControlsUser;
}) {
  return (
    <>
      <div className="flex items-center gap-1 rounded-full bg-white/50 px-[7px] py-[2.5px] dark:bg-white/8 dark:border dark:border-white/25">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={navLabel.lightMode}
          className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
            theme === "light"
              ? "bg-primary text-white"
              : "text-zinc-900 hover:text-primary dark:text-white"
          }`}
        >
          <SunIcon size={18} />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={navLabel.darkMode}
          className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
            theme === "dark"
              ? "bg-primary text-white"
              : "text-zinc-900 hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
          }`}
        >
          <MoonIcon size={18} />
        </button>
      </div>

      <button
        type="button"
        onClick={cycleLanguage}
        aria-label={navLabel.language}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
      >
        <TranslateIcon size={20} />
      </button>

      <button
        type="button"
        aria-label="Search"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
      >
        <SearchIcon size={20} />
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
      >
        <NotificationIcon size={20} />
        <span className="absolute left-[12.7px] top-3 h-[5px] w-[5px] rounded-full bg-[#C10000]" />
      </button>

      <button
        type="button"
        className="flex items-center gap-2.5 rounded-full border border-transparent bg-white/50 py-1.5 ps-2 pe-3 transition-colors hover:bg-zinc-100 dark:border-white/25 dark:bg-white/8 dark:hover:bg-white/12"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          {user.name.charAt(0)}
        </div>
        <div className="hidden flex-col text-start lg:flex">
          <span className="text-xs font-semibold text-black dark:text-zinc-100">
            {user.name}
          </span>
          <span className="text-[10px] font-light text-[#656769]">
            {user.email}
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="hidden text-paragraph lg:block dark:text-zinc-400"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
