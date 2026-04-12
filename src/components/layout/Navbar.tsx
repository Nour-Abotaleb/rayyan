'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import LayoutIcon from '@/icons/LayoutIcon'
import GalleryStarIcon from '@/icons/GalleryStarIcon'
import FolderCloudIcon from '@/icons/FolderCloudIcon'
import SliderIcon from '@/icons/SliderIcon'
import SunIcon from '@/icons/SunIcon'
import MoonIcon from '@/icons/MoonIcon'
import TranslateIcon from '@/icons/TranslateIcon'
import MenuIcon from '@/icons/MenuIcon'
import CloseIcon from '@/icons/CloseIcon'
import { type Language, languages } from '@/lib/i18n'

const navIcons = [
  { Icon: LayoutIcon, key: 'layout' },
  { Icon: GalleryStarIcon, key: 'gallery' },
  { Icon: FolderCloudIcon, key: 'folderCloud' },
  { Icon: SliderIcon, key: 'settings' },
] as const

const navIconInactive =
  'text-paragraph transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light bg-white/50 rounded-full p-2 h-10 w-10 lg:h-11 lg:w-11 flex items-center justify-center shrink-0'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  function cycleLanguage() {
    const idx = languages.findIndex((l) => l.code === lang)
    const next = languages[(idx + 1) % languages.length]
    setLang(next.code as Language)
  }

  const bgClass =
    scrolled || mobileOpen
      ? 'bg-white shadow-sm dark:bg-zinc-950 dark:shadow-black/20'
      : 'bg-transparent'

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${bgClass}`}
    >
      <div className="layout-shell-x flex h-16 items-center justify-between py-4">
        <span className="font-abril text-xl text-primary dark:text-[#519A91] md:text-2xl lg:text-[28px]">
          RAYYAN
        </span>

        {/* Center nav — desktop only */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navIcons.map(({ Icon, key }) => {
            const label = t.nav[key as keyof typeof t.nav]
            if (key === 'layout') {
              return (
                <Link
                  key={key}
                  href="/dashboard"
                  aria-label={label}
                  className={navIconInactive}
                >
                  <Icon size={20} />
                </Link>
              )
            }
            return (
              <button
                key={key}
                type="button"
                aria-label={label}
                className={navIconInactive}
              >
                <Icon size={20} />
              </button>
            )
          })}
        </nav>

        {/* Right controls — desktop only */}
        <div className="hidden items-center gap-2 lg:flex">
          <LandingControls
            theme={theme}
            toggleTheme={toggleTheme}
            cycleLanguage={cycleLanguage}
            navLabel={t.nav}
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
          <nav className="flex flex-wrap items-center gap-3">
            {navIcons.map(({ Icon, key }) => {
              const label = t.nav[key as keyof typeof t.nav]
              const mobileClass =
                'text-paragraph transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light bg-white/50 rounded-full p-2 h-10 w-10 flex shrink-0 items-center justify-center'
              if (key === 'layout') {
                return (
                  <Link
                    key={key}
                    href="/dashboard"
                    aria-label={label}
                    className={mobileClass}
                  >
                    <Icon size={18} />
                  </Link>
                )
              }
              return (
                <button
                  key={key}
                  type="button"
                  aria-label={label}
                  className={mobileClass}
                >
                  <Icon size={18} />
                </button>
              )
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <LandingControls
              theme={theme}
              toggleTheme={toggleTheme}
              cycleLanguage={cycleLanguage}
              navLabel={t.nav}
            />
          </div>
        </div>
      )}
    </header>
  )
}

function LandingControls({
  theme,
  toggleTheme,
  cycleLanguage,
  navLabel,
}: {
  theme: string
  toggleTheme: () => void
  cycleLanguage: () => void
  navLabel: { lightMode: string; darkMode: string; language: string }
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
    </>
  )
}
