'use client'

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
import { type Language, languages } from '@/lib/i18n'

const navIcons = [
  { Icon: LayoutIcon, key: 'layout' },
  { Icon: GalleryStarIcon, key: 'gallery' },
  { Icon: FolderCloudIcon, key: 'folderCloud' },
  { Icon: SliderIcon, key: 'settings' },
] as const

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function cycleLanguage() {
    const idx = languages.findIndex((l) => l.code === lang)
    const next = languages[(idx + 1) % languages.length]
    setLang(next.code as Language)
  }

  return (
    <header
      className={`sticky top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-[background-color,box-shadow] duration-200 ${
        scrolled
          ? 'bg-white shadow-sm dark:bg-zinc-950 dark:shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <span className="font-abril text-xl md:text-2xl lg:text-[32px] text-primary">
        RAYYAN
      </span>

      {/* Center nav icons */}
      <nav className="flex items-center gap-6">
        {navIcons.map(({ Icon, key }) => (
          <button
            key={key}
            aria-label={t.nav[key as keyof typeof t.nav]}
            className="text-paragraph transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light bg-white/50 rounded-full p-2 h-10 w-10 lg:h-11 lg:w-11 flex items-center justify-center"
          >
            <Icon size={20} />
          </button>
        ))}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Theme toggle — both icons in one white pill */}
        <div className="flex items-center gap-1 rounded-full bg-white/50 py-0.5 px-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.lightMode}
            className={`flex items-center justify-center rounded-full p-2 h-9 w-9 lg:h-10 lg:w-10 transition-colors ${
              theme === 'light'
                ? 'bg-primary text-white'
                : 'text-paragraph hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light'
            }`}
          >
            <SunIcon size={18} />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.darkMode}
            className={`flex items-center justify-center rounded-full p-2 h-9 w-9 lg:h-10 lg:w-10 transition-colors ${
              theme === 'dark'
                ? 'bg-primary text-white'
                : 'text-paragraph hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light'
            }`}
          >
            <MoonIcon size={18} />
          </button>
        </div>

        {/* Language toggle */}
        <button
          onClick={cycleLanguage}
          aria-label={t.nav.language}
          className="flex items-center justify-center  bg-white/50 rounded-full p-2 h-10 w-10 lg:h-11 lg:w-11 text-paragraph transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light"
        >
          <TranslateIcon size={20} />
        </button>
      </div>
    </header>
  )
}
