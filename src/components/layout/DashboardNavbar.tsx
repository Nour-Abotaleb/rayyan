'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import LayoutIcon from '@/icons/LayoutIcon'
import OverviewActiveIcon from '@/icons/OverviewActiveIcon'
import GalleryStarIcon from '@/icons/GalleryStarIcon'
import FolderCloudIcon from '@/icons/FolderCloudIcon'
import SliderIcon from '@/icons/SliderIcon'
import SunIcon from '@/icons/SunIcon'
import MoonIcon from '@/icons/MoonIcon'
import TranslateIcon from '@/icons/TranslateIcon'
import SearchIcon from '@/icons/SearchIcon'
import NotificationIcon from '@/icons/NotificationIcon'
import MenuIcon from '@/icons/MenuIcon'
import CloseIcon from '@/icons/CloseIcon'
import { type Language, languages } from '@/lib/i18n'

interface User {
  name: string
  email: string
  avatar?: string
}

interface DashboardNavbarProps {
  user: User
}

const navItems = [
  { Icon: LayoutIcon, key: 'layout', label: 'Overview', href: '/dashboard' },
  { Icon: GalleryStarIcon, key: 'gallery', label: 'Gallery', href: '/dashboard/gallery' },
  { Icon: FolderCloudIcon, key: 'folderCloud', label: 'Documents', href: '/dashboard/documents' },
  { Icon: SliderIcon, key: 'settings', label: 'Settings', href: '/dashboard/settings' },
] as const

const navIconInactiveLanding =
  'text-paragraph transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light bg-white/50 rounded-full p-2 h-10 w-10 lg:h-11 lg:w-11 flex shrink-0 items-center justify-center'

const navIconInactiveOverview =
  'text-paragraph transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light bg-white/50 rounded-full p-2 h-10 w-10 lg:h-11 lg:w-11 flex items-center justify-center'

const navIconActive =
  'bg-primary text-white rounded-full p-2 flex items-center justify-center gap-2 px-4 min-h-10 lg:min-h-11 w-auto text-sm font-medium'

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  function cycleLanguage() {
    const idx = languages.findIndex((l) => l.code === lang)
    const next = languages[(idx + 1) % languages.length]
    setLang(next.code as Language)
  }

  const bgClass = scrolled || mobileOpen
    ? 'bg-white shadow-sm dark:bg-zinc-950 dark:shadow-black/20'
    : 'bg-transparent'

  /** Match other nav pills on proposal flows (e.g. /dashboard/proposals/new) */
  const overviewInactiveClass = pathname?.startsWith('/dashboard/proposals')
    ? navIconInactiveLanding
    : navIconInactiveOverview

  return (
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 py-2 ${bgClass}`}>
      {/* Main row */}
      <div className="layout-shell-x flex h-16 items-center justify-between">
        {/* Logo */}
        <span className="font-abril text-xl text-primary md:text-2xl lg:text-[28px]">
          RAYYAN
        </span>

        {/* Center nav — desktop only */}
        <nav className="hidden items-center gap-3 lg:flex">
          {navItems.map(({ Icon, key, label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={key}
                href={href}
                aria-label={label}
                className={
                  isActive
                    ? navIconActive
                    : key === 'layout'
                      ? overviewInactiveClass
                      : navIconInactiveLanding
                }
              >
                {key === 'layout' && isActive ? (
                  <OverviewActiveIcon size={20} className="shrink-0 text-white" />
                ) : (
                  <Icon size={20} className={isActive ? 'shrink-0 text-white' : undefined} />
                )}
                {isActive && <span className="whitespace-nowrap">{label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Right controls — desktop only */}
        <div className="hidden items-center gap-2 lg:flex">
          <RightControls
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
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
            {navItems.map(({ Icon, key, label, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={key}
                  href={href}
                  aria-label={label}
                  className={
                    isActive
                      ? navIconActive
                      : key === 'layout'
                        ? overviewInactiveClass
                        : navIconInactiveLanding
                  }
                >
                  {key === 'layout' && isActive ? (
                    <OverviewActiveIcon size={18} className="shrink-0 text-white" />
                  ) : (
                    <Icon size={18} className={isActive ? 'shrink-0 text-white' : undefined} />
                  )}
                  {isActive && <span className="whitespace-nowrap text-xs">{label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <RightControls
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
  )
}

/* ─── Shared controls (theme, lang, search, bell, user) ─── */
function RightControls({
  theme,
  toggleTheme,
  cycleLanguage,
  navLabel,
  user,
}: {
  theme: string
  toggleTheme: () => void
  cycleLanguage: () => void
  navLabel: { lightMode: string; darkMode: string; language: string }
  user: { name: string; email: string }
}) {
  return (
    <>
      <div className="flex items-center gap-1 rounded-full bg-white/50 dark:bg-white/8 dark:border dark:border-white/25 px-[7px] py-[2.5px]">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={navLabel.lightMode}
          className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
            theme === 'light'
              ? 'bg-primary text-white'
              : 'text-zinc-900 hover:text-primary dark:text-white'
          }`}
        >
          <SunIcon size={18} />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={navLabel.darkMode}
          className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
            theme === 'dark'
              ? 'bg-primary text-white'
              : 'text-zinc-900 hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light'
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
        <span className="absolute left-3 top-3 h-[5px] w-[5px] rounded-full bg-[#C10000]" />
      </button>

      <button
        type="button"
        className="flex items-center gap-2.5 rounded-full border border-transparent bg-white/50 py-1.5 ps-2 pe-3 transition-colors hover:bg-zinc-100 dark:border-white/25 dark:bg-white/8 dark:hover:bg-white/12"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          {user.name.charAt(0)}
        </div>
        <div className="hidden flex-col text-start lg:flex">
          <span className="text-xs font-semibold text-black dark:text-zinc-100">{user.name}</span>
          <span className="text-[10px] font-light text-[#656769]">{user.email}</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="hidden text-paragraph lg:block dark:text-zinc-400">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  )
}
