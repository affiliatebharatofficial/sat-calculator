'use client';

import React from 'react';

interface AIOpenButtonProps {
  label: string;
}

export default function AIOpenButton({ label }: AIOpenButtonProps) {
  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-ai-assistant'));
        }
      }}
      aria-label="Abrir Asistente Fiscal con Inteligencia Artificial"
      className="px-6 py-3 bg-white text-indigo-700 hover:bg-slate-100 transition rounded-xl font-bold text-sm shadow-md whitespace-nowrap shrink-0"
    >
      {label}
    </button>
  );
}
