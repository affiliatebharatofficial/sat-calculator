import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada (404) | CalculadoraSAT',
  description: 'La página que buscas no existe o ha sido movida. Explora nuestras calculadoras fiscales y laborales gratuitas.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const topCalculators = [
    {
      title: 'Calculadora de IVA',
      slug: '/calculadoras/sat/calculadora-iva',
      icon: '📊',
      desc: 'Calcula IVA desglosado o retenido al 16% y 8%.',
    },
    {
      title: 'Calculadora de ISR Personas Físicas',
      slug: '/calculadoras/sat/calculadora-isr-pf',
      icon: '🏛️',
      desc: 'Tablas oficiales del SAT para sueldos, honorarios y arrendamiento.',
    },
    {
      title: 'Calculadora de Salario Neto y Bruto',
      slug: '/calculadoras/nomina/calculadora-salario-neto-bruto',
      icon: '💵',
      desc: 'Convierte sueldo bruto a neto con retenciones de ISR e IMSS.',
    },
    {
      title: 'Calculadora de Finiquito y Liquidación',
      slug: '/calculadoras/nomina/calculadora-finiquito-liquidacion',
      icon: '⚖️',
      desc: 'Simula tu liquidación conforme a la Ley Federal del Trabajo.',
    },
    {
      title: 'Calculadora de Aguinaldo',
      slug: '/calculadoras/nomina/calculadora-aguinaldo',
      icon: '🎁',
      desc: 'Calcula tu aguinaldo anual proporcional o completo (LFT Art. 87).',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col justify-between font-sans">
      {/* Mini Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-lg">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-base font-bold shadow">
              CS
            </span>
            <span>Calculadora<span className="text-blue-600">SAT</span></span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 text-center flex-grow">
        <span className="text-7xl font-black text-blue-600 dark:text-blue-400 block tracking-tight">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
          Página no encontrada
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          La dirección que intentas abrir no existe, cambió de nombre o fue actualizada a una versión más reciente.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
          >
            Ir al Portal Principal
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition"
          >
            Reportar un Enlace Roto
          </Link>
        </div>

        {/* Recommended Calculators */}
        <div className="mt-14 text-left">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🔥</span> Calculadoras fiscales más consultadas:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={calc.slug}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{calc.icon}</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {calc.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-8">
                  {calc.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-850 py-6 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} CalculadoraSAT.org • Herramientas Fiscales Gratuitas de México</p>
      </footer>
    </div>
  );
}
