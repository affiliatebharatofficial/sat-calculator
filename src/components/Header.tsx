'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  lang?: string;
  activePath?: string;
}

export default function Header({ lang = 'es', activePath }: HeaderProps) {
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 py-3 sm:py-4 transition-all">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Row: Logo + Controls */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link 
            href={langPrefix || '/'} 
            className="font-black text-lg sm:text-2xl tracking-tight text-slate-950 dark:text-white hover:opacity-90 transition flex items-center gap-0.5 sm:gap-1 shrink-0"
          >
            Calculadora<span className="text-blue-600">SAT</span>
          </Link>

          {/* Controls: Country Switcher + Theme & Language */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Country Selector Badges */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
              <Link
                href={langPrefix || '/'}
                title={isEn ? 'Mexico (Primary Market)' : 'México (Mercado Principal)'}
                className="px-1.5 sm:px-2 py-1 rounded-md transition flex items-center gap-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs text-xs"
              >
                <span>🇲🇽</span>
                <span className="hidden md:inline">MX</span>
              </Link>
              <Link
                href="/peru"
                title={isEn ? 'Peru Tax & Labor Hub' : 'Portal Tributario y Laboral Perú'}
                className="px-1.5 sm:px-2 py-1 rounded-md transition flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs"
              >
                <span>🇵🇪</span>
                <span className="hidden md:inline">PE</span>
              </Link>
            </div>

            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>

        {/* Navigation Bar Row - Mobile Optimized Horizontal Scroll */}
        <nav className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-850/60 flex items-center gap-1 sm:gap-2.5 overflow-x-auto scrollbar-none text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-350 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Link
            href={`${langPrefix}/calculadoras/sat`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            🏛️ {isEn ? 'SAT Taxes' : 'Impuestos SAT'}
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/nomina`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            💼 {isEn ? 'Payroll & Labor' : 'Nómina LFT'}
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/resico`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            🌱 RESICO
          </Link>
          <Link
            href={`${langPrefix}/calculadoras`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            🧮 {isEn ? 'All Calculators' : 'Calculadoras'}
          </Link>
          <Link
            href={`${langPrefix}/guias`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            📚 {isEn ? 'Guides' : 'Guías'}
          </Link>
          <Link
            href="/calendario-fiscal"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            📅 {isEn ? 'Tax Calendar' : 'Calendario Fiscal'}
          </Link>
          <Link
            href={`${langPrefix}/blog`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            ✍️ Blog
          </Link>
          <Link
            href="/peru"
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            🇵🇪 {isEn ? 'Peru Portal' : 'Perú'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
