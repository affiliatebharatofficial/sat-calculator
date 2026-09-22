'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  lang?: string;
  activePath?: string;
}

export default function Header({ lang = 'es', activePath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

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

          {/* Controls: Country Switcher + Theme & Language + Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Country Selector Badges */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
              <Link
                href={langPrefix || '/'}
                title={isEn ? 'Mexico (Primary Market)' : 'México (Mercado Principal)'}
                className="px-2 py-1 rounded-md transition flex items-center gap-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
              >
                <span>🇲🇽</span>
                <span className="hidden sm:inline">MX</span>
              </Link>
              <Link
                href="/peru"
                title={isEn ? 'Peru Tax & Labor Hub' : 'Portal Tributario y Laboral Perú'}
                className="px-2 py-1 rounded-md transition flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <span>🇵🇪</span>
                <span className="hidden sm:inline">PE</span>
              </Link>
            </div>

            <ThemeToggle />
            <LanguageSelector />

            {/* Hamburger Button (Mobile Only) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-hidden"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden md:flex mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-850/60 items-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-bold text-slate-600 dark:text-slate-350">
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
            href="/tipo-de-cambio"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            💱 {isEn ? 'Exchange Rate' : 'Tipo de Cambio'}
          </Link>
          <Link
            href={`${langPrefix}/blog`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            ✍️ Blog
          </Link>
          <Link
            href="/peru"
            className="ml-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition flex items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            🇵🇪 {isEn ? 'Peru Portal' : 'Perú'}
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Navigation (Overlay + Panel) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bottom-0 z-40 bg-slate-950/60 backdrop-blur-xs flex flex-col">
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl p-5 overflow-y-auto max-h-[calc(100vh-61px)] space-y-6 animate-in slide-in-from-top-2 duration-200">
            {/* Primary Category Links */}
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                {isEn ? 'Core Tools' : 'Herramientas Principales'}
              </div>
              <div className="grid grid-cols-1 gap-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                <Link
                  href={`${langPrefix}/calculadoras/sat`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition"
                >
                  <span className="text-xl">🏛️</span>
                  <div>
                    <div>{isEn ? 'SAT Taxes' : 'Impuestos SAT'}</div>
                    <div className="text-xs font-normal text-slate-400">IVA, ISR Personas Físicas y Morales</div>
                  </div>
                </Link>

                <Link
                  href={`${langPrefix}/calculadoras/nomina`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition"
                >
                  <span className="text-xl">💼</span>
                  <div>
                    <div>{isEn ? 'Payroll & Labor' : 'Nómina y Ley Federal del Trabajo'}</div>
                    <div className="text-xs font-normal text-slate-400">Salario neto, aguinaldo, finiquito y PTU</div>
                  </div>
                </Link>

                <Link
                  href={`${langPrefix}/calculadoras/resico`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition"
                >
                  <span className="text-xl">🌱</span>
                  <div>
                    <div>RESICO</div>
                    <div className="text-xs font-normal text-slate-400">Régimen Simplificado y Comparador</div>
                  </div>
                </Link>

                <Link
                  href="/tipo-de-cambio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition"
                >
                  <span className="text-xl">💱</span>
                  <div>
                    <div>{isEn ? 'Currency & Exchange Rate' : 'Tipo de Cambio FIX DOF / Banxico'}</div>
                    <div className="text-xs font-normal text-slate-400">Dólar a pesos mexicanos en tiempo real</div>
                  </div>
                </Link>

                <Link
                  href={`${langPrefix}/calculadoras`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition"
                >
                  <span className="text-xl">🧮</span>
                  <div>
                    <div>{isEn ? 'All 31 Calculators' : 'Todas las Calculadoras (31)'}</div>
                    <div className="text-xs font-normal text-slate-400">Directorio completo de simuladores</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Guides, Content & Fiscal Tools */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                {isEn ? 'Guides & Resources' : 'Guías y Recursos'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Link
                  href={`${langPrefix}/guias`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <span>📚</span>
                  <span>{isEn ? 'Guides' : 'Guías'}</span>
                </Link>
                <Link
                  href="/calendario-fiscal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <span>📅</span>
                  <span>{isEn ? 'Calendar' : 'Calendario'}</span>
                </Link>
                <Link
                  href={`${langPrefix}/blog`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <span>✍️</span>
                  <span>Blog</span>
                </Link>
                <Link
                  href="/formatos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <span>📄</span>
                  <span>{isEn ? 'HR Templates' : 'Formatos RH'}</span>
                </Link>
                <Link
                  href="/peru"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-red-50/80 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 transition flex items-center gap-2 col-span-2"
                >
                  <span>🇵🇪</span>
                  <span>{isEn ? 'Peru Hub (SUNAT, CTS, Gratificaciones)' : 'Portal Perú (SUNAT, CTS, Gratificaciones)'}</span>
                </Link>
              </div>
            </div>

            {/* Transparency & Quality */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                {isEn ? 'Transparency & Trust' : 'Transparencia y Normatividad'}
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <Link href={`${langPrefix}/metodologia`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                  🔬 {isEn ? 'Methodology' : 'Metodología'}
                </Link>
                <span>•</span>
                <Link href={`${langPrefix}/fuentes`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                  🏛️ {isEn ? 'Sources' : 'Fuentes'}
                </Link>
                <span>•</span>
                <Link href={`${langPrefix}/actualizaciones`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                  🔄 {isEn ? 'Updates' : 'Actualizaciones'}
                </Link>
                <span>•</span>
                <Link href={`${langPrefix}/reportar-error`} onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-600">
                  ⚠️ {isEn ? 'Report Error' : 'Reportar Error'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
