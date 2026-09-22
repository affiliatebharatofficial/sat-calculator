import React from 'react';
import Link from 'next/link';

interface FooterProps {
  lang?: string;
}

export default function Footer({ lang = 'es' }: FooterProps) {
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 overflow-hidden text-slate-700 dark:text-slate-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Brand + Legal Disclaimer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <Link href={langPrefix || '/'} className="font-black text-xl text-slate-950 dark:text-white hover:opacity-90 transition">
              Calculadora<span className="text-blue-600">SAT</span>
            </Link>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-3xl">
              © 2026 {isEn ? 'Calculadora SAT. All rights reserved.' : 'Calculadora SAT. Todos los derechos reservados.'}{' '}
              {isEn
                ? 'This website is an independent educational tool and is not officially affiliated with or endorsed by SUNAT (Peru) or SAT (Mexico).'
                : 'Este sitio web es una herramienta informativa independiente y no está afiliado, patrocinado ni representa a la SUNAT de Perú ni al SAT de México.'}
            </p>
          </div>
        </div>

        {/* International Tools & Official Government Sources Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 mb-2.5">
              {isEn ? 'Official Regulatory Resources (Mexico)' : 'Fuentes Oficiales y Normatividad (México)'}
            </h4>
            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400">
              <li>
                <a href="https://www.sat.gob.mx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  🏛️ SAT México (Servicio de Administración Tributaria) ↗
                </a>
              </li>
              <li>
                <a href="https://www.dof.gob.mx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  📜 DOF (Diario Oficial de la Federación) ↗
                </a>
              </li>
              <li>
                <a href="https://www.gob.mx/profedet" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  ⚖️ PROFEDET (Defensa del Trabajo y Asesoría Gratuita) ↗
                </a>
              </li>
              <li>
                <a href="https://www.inegi.org.mx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  📊 INEGI (Valores oficiales de la UMA y UDIS) ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 mb-2.5">
              {isEn ? 'International & Global Tools' : 'Herramientas Internacionales y Divisas'}
            </h4>
            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/calculadoras/peru" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">
                  🇵🇪 {isEn ? 'Peru Tax & Labor Calculators (SUNAT, IGV, CTS, 5ta)' : 'Calculadoras Perú (SUNAT, IGV, CTS, Renta 5ta)'}
                </Link>
              </li>
              <li>
                <Link href="/tipo-de-cambio" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">
                  💱 {isEn ? 'Universal Currency & Exchange Rate Converter' : 'Conversor Universal de Tipo de Cambio'}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/calculadoras/negocios`} className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">
                  📊 {isEn ? 'Business & Cost Accounting Calculators' : 'Calculadoras de Costos y Negocios (Punto de Equilibrio, Depreciación)'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row md:flex-wrap gap-y-3 gap-x-6 justify-center md:justify-start text-xs font-semibold text-slate-600 dark:text-slate-400 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
          <Link href={`${langPrefix}/metodologia`} className="hover:text-blue-600 dark:hover:text-blue-400 transition font-bold text-blue-600 dark:text-blue-400 truncate">
            {isEn ? '🔬 Methodology' : '🔬 Metodología'}
          </Link>
          <Link href={`${langPrefix}/fuentes`} className="hover:text-blue-600 dark:hover:text-blue-400 transition font-bold text-blue-600 dark:text-blue-400 truncate">
            {isEn ? '🏛️ Official Sources' : '🏛️ Fuentes Oficiales'}
          </Link>
          <Link href={`${langPrefix}/actualizaciones`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition font-bold text-indigo-600 dark:text-indigo-400 truncate">
            {isEn ? '🔄 Updates Log' : '🔄 Actualizaciones'}
          </Link>
          <Link href={`${langPrefix}/reportar-error`} className="hover:text-amber-600 dark:hover:text-amber-400 transition font-bold text-amber-600 dark:text-amber-400 truncate">
            {isEn ? '⚠️ Report an Error' : '⚠️ Reportar un Error'}
          </Link>
          <Link href="/calendario-fiscal" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-bold text-slate-700 dark:text-slate-300 truncate">
            {isEn ? 'Fiscal Calendar' : 'Calendario Fiscal'}
          </Link>
          <Link href={`${langPrefix}/blog`} className="hover:text-blue-600 dark:hover:text-blue-400 transition font-bold text-slate-700 dark:text-slate-300 truncate">
            Blog
          </Link>
          <Link href={`${langPrefix}/developer`} className="hover:text-slate-600 dark:text-slate-400 transition truncate">
            {isEn ? 'API Developers' : 'API Desarrollo'}
          </Link>
          <Link href="/formatos" className="hover:text-blue-600 dark:hover:text-blue-400 transition truncate">
            {isEn ? 'HR Formats' : 'Formatos RH'}
          </Link>
          <Link href="/widgets" className="hover:text-blue-600 dark:hover:text-blue-400 transition truncate">
            Widgets
          </Link>
          <Link href={`${langPrefix}/privacy`} className="hover:text-slate-900 dark:hover:text-white transition truncate">
            {isEn ? 'Privacy Policy' : 'Políticas de Privacidad'}
          </Link>
          <Link href={`${langPrefix}/terms`} className="hover:text-slate-900 dark:hover:text-white transition truncate">
            {isEn ? 'Terms & Conditions' : 'Términos y Condiciones'}
          </Link>
          <Link href={`${langPrefix}/disclaimer`} className="hover:text-slate-900 dark:hover:text-white transition truncate">
            {isEn ? 'Legal Disclaimer' : 'Aviso Legal'}
          </Link>
          <Link href={`${langPrefix}/about`} className="hover:text-slate-900 dark:hover:text-white transition truncate">
            {isEn ? 'About Us' : 'Acerca de'}
          </Link>
          <Link href={`${langPrefix}/contact`} className="hover:text-slate-900 dark:hover:text-white transition truncate">
            {isEn ? 'Contact' : 'Contacto'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
