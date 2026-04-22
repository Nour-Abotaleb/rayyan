"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LayoutIcon from "@/icons/LayoutIcon";
import OverviewActiveIcon from "@/icons/OverviewActiveIcon";
import ProposalNavIcon from "@/icons/ProposalNavIcon";
import ProposalActiveIcon from "@/icons/ProposalActiveIcon";
import DatabaseActiveIcon from "@/icons/DatabaseActiveIcon";
import FolderCloudIcon from "@/icons/FolderCloudIcon";
import SliderIcon from "@/icons/SliderIcon";
import SettingsActiveIcon from "@/icons/SettingsActiveIcon";
import DashboardRightControls from "@/components/layout/DashboardRightControls";
import MenuIcon from "@/icons/MenuIcon";
import CloseIcon from "@/icons/CloseIcon";
import { type Language, languages } from "@/lib/i18n";

interface DashboardNavbarProps {
  user: { name: string; email: string; avatar?: string };
}

const navItems = [
  { Icon: LayoutIcon, key: "layout", href: "/dashboard" },
  {
    Icon: ProposalNavIcon,
    key: "proposal",
    href: "/dashboard/proposals",
  },
  {
    Icon: FolderCloudIcon,
    key: "database",
    href: "/dashboard/database",
  },
  {
    Icon: SliderIcon,
    key: "settings",
    href: "/dashboard/settings",
  },
] as const;

const navIconInactiveLanding =
  "text-paragraph transition-all duration-200 ease-out hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light bg-white/50 rounded-full p-2 h-10 w-10 lg:h-11 lg:w-11 flex shrink-0 items-center justify-center";

const navIconInactiveOverview =
  "text-paragraph transition-all duration-200 ease-out hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light bg-white/50 rounded-full p-2 h-10 w-10 lg:h-11 lg:w-11 flex items-center justify-center";

const navIconActive =
  "bg-primary text-white rounded-full min-h-10 lg:min-h-11 text-sm font-medium transition-all duration-200 ease-out";

function isOverviewPath(pathname: string | null) {
  return pathname === "/dashboard";
}

function isItemActive(
  key: (typeof navItems)[number]["key"],
  pathname: string | null,
  href: string,
) {
  if (key === "layout") return isOverviewPath(pathname);
  if (key === "proposal") {
    return (
      pathname === "/dashboard/proposals" ||
      (pathname?.startsWith("/dashboard/proposals/") &&
        !pathname?.startsWith("/dashboard/proposals/new"))
    );
  }
  if (key === "database") return pathname?.startsWith("/dashboard/database");
  if (key === "settings") return pathname?.startsWith("/dashboard/settings");
  return pathname === href;
}

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activePill, setActivePill] = useState<{
    x: number;
    w: number;
  } | null>(null);
  const navLabelByKey: Record<(typeof navItems)[number]["key"], string> = {
    layout: t.dashboard.nav.overview,
    proposal: t.dashboard.nav.proposal,
    database: t.dashboard.nav.database,
    settings: t.dashboard.nav.settings,
  };

  const activeKey = useMemo(() => {
    if (isOverviewPath(pathname)) return "layout";
    if (
      pathname === "/dashboard/proposals" ||
      (pathname?.startsWith("/dashboard/proposals/") &&
        !pathname?.startsWith("/dashboard/proposals/new"))
    ) {
      return "proposal";
    }
    if (pathname?.startsWith("/dashboard/database")) return "database";
    if (pathname?.startsWith("/dashboard/settings")) return "settings";
    return null;
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const recalc = useCallback(() => {
    if (!activeKey) return setActivePill(null);
    const navEl = navRef.current;
    const itemEl = itemRefs.current[activeKey];
    if (!navEl || !itemEl) return;
    const navRect = navEl.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    setActivePill({
      x: itemRect.left - navRect.left,
      w: itemRect.width,
    });
  }, [activeKey]);

  useLayoutEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("resize", recalc);
    };
  }, [recalc]);

  useEffect(() => {
    // Language switch changes label widths; recalc once layout is painted.
    const rafId = window.requestAnimationFrame(recalc);
    return () => window.cancelAnimationFrame(rafId);
  }, [lang, recalc]);

  function cycleLanguage() {
    const idx = languages.findIndex((l) => l.code === lang);
    const next = languages[(idx + 1) % languages.length];
    setLang(next.code as Language);
  }

  const bgClass =
    scrolled || mobileOpen
      ? "bg-white shadow-sm dark:bg-zinc-950 dark:shadow-black/20"
      : "bg-transparent";

  /** Match other nav pills on proposal flows (e.g. /dashboard/proposals/new) */
  const overviewInactiveClass = pathname?.startsWith("/dashboard/proposals")
    ? navIconInactiveLanding
    : navIconInactiveOverview;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 py-2 ${bgClass}`}
    >
      {/* Main row */}
      <div className="layout-shell-x flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-abril text-xl text-primary md:text-2xl lg:text-[28px]"
          aria-label={t.home.footer.linkHome}
        >
          RAYYAN
        </Link>

        {/* Center nav — desktop only */}
        <nav
          ref={navRef}
          className="relative hidden items-center gap-3 lg:flex"
        >
          {activePill && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-primary transition-transform duration-300 ease-out"
              style={{
                width: activePill.w,
                transform: `translateX(${activePill.x}px)`,
              }}
            />
          )}
          {navItems.map(({ Icon, key, href }) => {
            const isActive = isItemActive(key, pathname, href);
            const label = navLabelByKey[key];
            return (
              <Link
                key={key}
                href={href}
                aria-label={label}
                ref={(el) => {
                  itemRefs.current[key] = el;
                }}
                className={[
                  "relative z-10",
                  isActive
                    ? `grid grid-cols-[20px_1fr] items-center gap-2 px-4 py-2 text-white rounded-full min-h-10 lg:min-h-11`
                    : `grid grid-cols-[20px_0fr] items-center gap-0 overflow-hidden ${
                        key === "layout"
                          ? overviewInactiveClass
                          : navIconInactiveLanding
                      }`,
                ].join(" ")}
              >
                {key === "layout" && isActive ? (
                  <OverviewActiveIcon
                    size={20}
                    className="shrink-0 text-white"
                  />
                ) : key === "proposal" && isActive ? (
                  <ProposalActiveIcon
                    size={20}
                    className="shrink-0 text-white"
                  />
                ) : key === "database" && isActive ? (
                  <DatabaseActiveIcon
                    size={20}
                    className="shrink-0 text-white"
                  />
                ) : key === "settings" && isActive ? (
                  <SettingsActiveIcon
                    size={20}
                    className="shrink-0 text-white"
                  />
                ) : (
                  <Icon
                    size={20}
                    className={isActive ? "shrink-0 text-white" : undefined}
                  />
                )}
                <span className="min-w-0 overflow-hidden whitespace-nowrap">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right controls — desktop only */}
        <div className="hidden items-center gap-2 lg:flex">
          <DashboardRightControls
            theme={theme}
            toggleTheme={toggleTheme}
            cycleLanguage={cycleLanguage}
            navLabel={t.nav}
            user={user}
          />
        </div>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? t.contact.closeMenu : t.contact.openMenu}
          className="flex items-center justify-center rounded-full p-2 text-paragraph transition-colors hover:text-primary lg:hidden dark:text-zinc-400"
        >
          {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="layout-shell-x flex flex-col gap-4 border-t border-zinc-100 pb-5 pt-4 lg:hidden dark:border-zinc-800">
          {/* Nav items */}
          <nav className="flex items-center gap-3 flex-wrap">
            {navItems.map(({ Icon, key, href }) => {
              const isActive = isItemActive(key, pathname, href);
              const label = navLabelByKey[key];
              return (
                <Link
                  key={key}
                  href={href}
                  aria-label={label}
                  className={[
                    isActive
                      ? `${navIconActive} grid grid-cols-[18px_1fr] items-center gap-2 px-4 py-2`
                      : `grid grid-cols-[18px_0fr] items-center gap-0 overflow-hidden ${
                          key === "layout" ? overviewInactiveClass : navIconInactiveLanding
                        }`,
                  ].join(" ")}
                >
                  {key === "layout" && isActive ? (
                    <OverviewActiveIcon
                      size={18}
                      className="shrink-0 text-white"
                    />
                  ) : key === "proposal" && isActive ? (
                    <ProposalActiveIcon
                      size={18}
                      className="shrink-0 text-white"
                    />
                  ) : key === "database" && isActive ? (
                    <DatabaseActiveIcon
                      size={18}
                      className="shrink-0 text-white"
                    />
                  ) : key === "settings" && isActive ? (
                    <SettingsActiveIcon
                      size={18}
                      className="shrink-0 text-white"
                    />
                  ) : (
                    <Icon
                      size={18}
                      className={isActive ? "shrink-0 text-white" : undefined}
                    />
                  )}
                  <span className="min-w-0 overflow-hidden whitespace-nowrap text-xs">
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <DashboardRightControls
              theme={theme}
              toggleTheme={toggleTheme}
              cycleLanguage={cycleLanguage}
              navLabel={t.nav}
              user={user}
            />
          </div>
        </div>
      )}
    </header>
  );
}