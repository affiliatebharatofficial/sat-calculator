'use client';

import React, { useState } from 'react';
import { validateRucChecksum } from '@/calculators/conversiones/consulta-ruc-sunat';

export default function ConsultaRucClient() {
  const [rucInput, setRucInput] = useState<string>('20100047218');
  const result = validateRucChecksum(rucInput);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            🧮 Validador Numérico y Dígito de Control (Módulo 11)
          </h2>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-700">
            Validación Matemática Local (Sin conexión a SUNAT)
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ingresa los 11 dígitos numéricos de un RUC peruano para verificar su algoritmo de control y tipo de emisor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Número de RUC (11 dígitos)
            </label>
            <input
              type="text"
              maxLength={11}
              value={rucInput}
              onChange={(e) => setRucInput(e.target.value.replace(/\D/g, ''))}
              placeholder="Ej: 20100047218"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>Caracteres: {rucInput.length}/11</span>
              <span>Algoritmo: Módulo 11</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-200 text-[11px] uppercase tracking-wider">
              Prefijos Oficiales en Perú:
            </div>
            <div className="space-y-1">
              <div>• <strong className="text-slate-900 dark:text-slate-200">10:</strong> Persona Natural con DNI (los 8 dígitos intermedios corresponden al DNI).</div>
              <div>• <strong className="text-slate-900 dark:text-slate-200">15 / 17:</strong> Persona Natural extranjera (Carné de Extranjería / Pasaporte).</div>
              <div>• <strong className="text-slate-900 dark:text-slate-200">20:</strong> Persona Jurídica (Empresas, Sociedades SAC, SRL, EIRL, etc.).</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 space-y-4">
          <div className={`p-6 rounded-2xl border transition-all ${
            result.isValid
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{result.isValid ? '✅' : '❌'}</span>
              <h3 className="font-extrabold text-base">
                {result.isValid ? 'Estructura y Dígito de Control VÁLIDOS' : 'Estructura o Dígito de Control INVÁLIDOS'}
              </h3>
            </div>

            <p className="text-xs leading-relaxed font-medium mt-2">
              {result.message}
            </p>

            {result.type && (
              <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60 text-xs font-bold">
                Categoría detectada: {result.type}
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-850 text-xs text-amber-900 dark:text-amber-200 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <span>⚠️</span>
              <span>¿Necesitas Razón Social o Estado Habido / Activo?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
              Esta herramienta únicamente verifica la consistencia matemática de los dígitos. No certifica la existencia activa en el padrón de la SUNAT ni deudas tributarias.
            </p>
            <div className="pt-1">
              <a
                href="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline"
              >
                <span>Consultar padrón oficial en e-Consulta SUNAT</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
