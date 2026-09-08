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
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link 
            href={langPrefix || '/'} 
            className="font-black text-xl sm:text-2xl tracking-tight text-slate-950 dark:text-white hover:opacity-90 transition flex items-center gap-1 shrink-0"
          >
            Calculadora<span className="text-blue-600">SAT</span>
          </Link>

          {/* Controls: Theme & Language */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>

        {/* Navigation Bar Row - Mobile Optimized Horizontal Scroll */}
        <nav className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-850/60 flex items-center gap-1.5 sm:gap-4 overflow-x-auto scrollbar-none text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-350 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Link
            href={`${langPrefix}/calculadoras/sat`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            🏛️ {isEn ? 'SAT Taxes' : 'Impuestos SAT'}
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/nomina`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            💼 {isEn ? 'Payroll & Labor' : 'Nómina LFT'}
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/resico`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            🌱 RESICO
          </Link>
          <Link
            href={`${langPrefix}/calculadoras/inversiones`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            📈 {isEn ? 'Investments' : 'Inversiones'}
          </Link>
          <Link
            href={`${langPrefix}/calendario-fiscal`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            📅 {isEn ? 'Tax Calendar' : 'Calendario Fiscal'}
          </Link>
          <span className="text-slate-300 dark:text-slate-700 select-none hidden sm:inline">|</span>
          <Link
            href={`${langPrefix}/calculadoras/peru`}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800"
          >
            🇵🇪 {isEn ? 'Peru Tools' : 'Herramientas Perú'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
