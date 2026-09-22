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

      {/* Mobile Drawer Navigation (Full Slide-Out Drawer) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container (Right-aligned, fully scrollable) */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 dark:border-slate-850">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Link 
                  href={langPrefix || '/'} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-black text-lg text-slate-950 dark:text-white"
                >
                  Calculadora<span className="text-blue-600">SAT</span>
                </Link>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                  2026
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Cerrar menú"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-800 dark:text-slate-200">
              {/* 1. Categorías Principales de Calculadoras */}
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2.5 flex items-center gap-1.5">
                  <span>🧮</span>
                  <span>{isEn ? 'Calculators by Category' : 'Calculadoras por Categoría'}</span>
                </div>
                <div className="space-y-1 text-sm font-semibold">
                  <Link
                    href={`${langPrefix}/calculadoras/sat`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🏛️</span>
                      <div>
                        <div>{isEn ? 'SAT & Taxes' : 'Impuestos SAT'}</div>
                        <div className="text-[11px] font-normal text-slate-400">IVA 16%/8%, ISR Personas Físicas y Morales</div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">➔</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/calculadoras/nomina`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">💼</span>
                      <div>
                        <div>{isEn ? 'Payroll & LFT' : 'Nómina y Laboral (LFT)'}</div>
                        <div className="text-[11px] font-normal text-slate-400">Salario neto, aguinaldo, finiquito, PTU, IMSS</div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">➔</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/calculadoras/resico`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🌱</span>
                      <div>
                        <div>RESICO 2026</div>
                        <div className="text-[11px] font-normal text-slate-400">Tasas 1%-2.5% y Comparador Actividad Emp.</div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">➔</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/calculadoras/finanzas-personales`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🪙</span>
                      <div>
                        <div>{isEn ? 'Personal Finance' : 'Finanzas Personales'}</div>
                        <div className="text-[11px] font-normal text-slate-400">CETES, Hipotecas, Afore, Interés Compuesto</div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">➔</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/calculadoras/negocios`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">📈</span>
                      <div>
                        <div>{isEn ? 'Business & Costing' : 'Negocios y Costos'}</div>
                        <div className="text-[11px] font-normal text-slate-400">Punto de equilibrio y Depreciación de activos</div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">➔</span>
                  </Link>

                  <Link
                    href="/tipo-de-cambio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">💱</span>
                      <div>
                        <div>{isEn ? 'Exchange Rate Banxico/DOF' : 'Tipo de Cambio Banxico/DOF'}</div>
                        <div className="text-[11px] font-normal text-slate-400">Dólar FIX y conversor de divisas oficial</div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">➔</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/calculadoras`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold transition mt-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">✨</span>
                      <div>{isEn ? 'View All 31 Calculators' : 'Ver el Directorio Completo (31)'}</div>
                    </div>
                    <span>➔</span>
                  </Link>
                </div>
              </div>

              {/* 2. Portal Regional Perú */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-red-400 mb-2.5 flex items-center gap-1.5">
                  <span>🇵🇪</span>
                  <span>{isEn ? 'Peru Hub (SUNAT)' : 'Herramientas Perú (SUNAT)'}</span>
                </div>
                <div className="space-y-1 text-xs font-semibold">
                  <Link
                    href="/peru"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl bg-red-50/70 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 transition font-bold"
                  >
                    <span>{isEn ? 'Portal Perú Overview' : 'Portal General Perú'}</span>
                    <span>➔</span>
                  </Link>
                  <Link
                    href="/peru/calculadoras"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    • {isEn ? 'Peru Calculators (IGV, CTS, Grati, Renta 5ta)' : 'Calculadoras Perú (IGV 18%, CTS, Gratificación)'}
                  </Link>
                  <Link
                    href="/peru/guias"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    • {isEn ? 'SUNAT Guides & Tax Deadlines' : 'Guías Tributarias y Laborales SUNAT'}
                  </Link>
                  <Link
                    href="/peru/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    • {isEn ? 'Peru Labor Articles' : 'Artículos y Normas SUNAT Perú'}
                  </Link>
                </div>
              </div>

              {/* 3. Guías, Calendario y Recursos Prácticos */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  {isEn ? 'Guides & Resources' : 'Guías y Recursos Fiscales'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Link
                    href={`${langPrefix}/guias`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <span className="text-base">📚</span>
                    <span>{isEn ? 'Guides' : 'Guías SAT'}</span>
                  </Link>

                  <Link
                    href="/calendario-fiscal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <span className="text-base">📅</span>
                    <span>{isEn ? 'Calendar' : 'Calendario'}</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/blog`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <span className="text-base">✍️</span>
                    <span>Blog</span>
                  </Link>

                  <Link
                    href="/formatos"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <span className="text-base">📄</span>
                    <span>{isEn ? 'HR Formats' : 'Formatos RH'}</span>
                  </Link>

                  <Link
                    href="/widgets"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2 col-span-2"
                  >
                    <span className="text-base">🧩</span>
                    <span>{isEn ? 'Embeddable Widgets' : 'Widgets para Sitios Web'}</span>
                  </Link>
                </div>
              </div>

              {/* 4. Metodología, Fuentes y Transparencia */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  {isEn ? 'Trust & Methodology' : 'Metodología y Transparencia'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <Link
                    href={`${langPrefix}/metodologia`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                  >
                    <span>🔬</span>
                    <span>{isEn ? 'Methodology' : 'Metodología'}</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/fuentes`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                  >
                    <span>🏛️</span>
                    <span>{isEn ? 'Sources' : 'Fuentes DOF'}</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/actualizaciones`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                  >
                    <span>🔄</span>
                    <span>{isEn ? 'Updates' : 'Bitácora 2026'}</span>
                  </Link>

                  <Link
                    href={`${langPrefix}/reportar-error`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition flex items-center gap-1.5"
                  >
                    <span>⚠️</span>
                    <span>{isEn ? 'Report Error' : 'Reportar Error'}</span>
                  </Link>
                </div>
              </div>

              {/* 5. Legal e Información Institucional */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 pb-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  {isEn ? 'Institutional & Legal' : 'Información y Marco Legal'}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Link href={`${langPrefix}/about`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                    {isEn ? 'About Us' : 'Acerca de'}
                  </Link>
                  <span>•</span>
                  <Link href={`${langPrefix}/contact`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                    {isEn ? 'Contact' : 'Contacto'}
                  </Link>
                  <span>•</span>
                  <Link href={`${langPrefix}/privacy`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                    {isEn ? 'Privacy' : 'Privacidad'}
                  </Link>
                  <span>•</span>
                  <Link href={`${langPrefix}/terms`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                    {isEn ? 'Terms' : 'Términos'}
                  </Link>
                  <span>•</span>
                  <Link href={`${langPrefix}/disclaimer`} onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                    {isEn ? 'Legal Notice' : 'Aviso Legal'}
                  </Link>
                </div>

                <p className="mt-4 text-[10px] text-slate-400 leading-relaxed">
                  © 2026 Calculadora SAT. Plataforma informativa independiente no afiliada al SAT ni al IMSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
