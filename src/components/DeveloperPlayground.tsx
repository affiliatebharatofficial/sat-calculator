'use client';

import React, { useState } from 'react';

interface DeveloperPlaygroundProps {
  lang: string;
}

export default function DeveloperPlayground({ lang }: DeveloperPlaygroundProps) {
  const isEn = lang === 'en';

  const [selectedCalc, setSelectedCalc] = useState('calculo-iva');
  const [jsonInputs, setJsonInputs] = useState(
    JSON.stringify({ monto: 10000, tipo_accion: 'agregar', tasa: 16 }, null, 2)
  );
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTestAPI = async () => {
    setLoading(true);
    try {
      const parsedInputs = JSON.parse(jsonInputs);
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorId: selectedCalc,
          inputs: parsedInputs,
        }),
      });
      const data = await res.json();
      setApiResponse(data);
    } catch (err: any) {
      setApiResponse({ error: 'JSON malformado o error de red: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCalcChange = (id: string) => {
    setSelectedCalc(id);
    if (id === 'calculo-iva') {
      setJsonInputs(JSON.stringify({ monto: 10000, tipo_accion: 'agregar', tasa: 16 }, null, 2));
    } else if (id === 'calculo-isr-pf') {
      setJsonInputs(JSON.stringify({ ingresos: 35000, deducciones: 8000, periodo: 'mensual' }, null, 2));
    } else if (id === 'calculo-resico-pf') {
      setJsonInputs(
        JSON.stringify({ ingresos: 45000, factura_persona_moral: true, ingresos_persona_moral: 20000 }, null, 2)
      );
    } else if (id === 'calculo-salario' || id === 'calculo-salario-neto-bruto') {
      setJsonInputs(JSON.stringify({ salario: 25000, direccion: 'bruto_a_neto', periodo: 'mensual' }, null, 2));
    } else if (id === 'calculo-finiquito') {
      setJsonInputs(
        JSON.stringify(
          {
            tipo_baja: 'despido_injustificado',
            salario_mensual: 20000,
            fecha_ingreso: '2022-01-01',
            fecha_salida: '2026-06-30',
          },
          null,
          2
        )
      );
    }
  };

  const curlSnippet = `curl -X POST https://www.calculadorasat.org/api/calculate \\
  -H "Content-Type: application/json" \\
  -d '${jsonInputs.replace(/\n/g, '').replace(/\s+/g, ' ')}'`;

  const nodeSnippet = `const response = await fetch('https://www.calculadorasat.org/api/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    calculatorId: '${selectedCalc}',
    inputs: ${jsonInputs.replace(/\n/g, '\n    ')}
  })
});
const data = await response.json();
console.log(data);`;

  return (
    <>
      {/* API Playground Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Playground Panel */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-850 rounded-2xl p-6 shadow-xl flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            🔌 {isEn ? 'API Playground (Test the API live)' : 'API Playground (Prueba la API en vivo)'}
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            {isEn
              ? 'Select a calculator and adjust the input variables in JSON format to see the response returned by the server.'
              : 'Selecciona una calculadora y ajusta las variables de entrada en formato JSON para ver la respuesta devuelta por el servidor.'}
          </p>

          <label
            htmlFor="calculator-select"
            className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
          >
            {isEn ? '1. Select the Calculator' : '1. Selecciona la Calculadora'}
          </label>
          <select
            id="calculator-select"
            value={selectedCalc}
            onChange={(e) => handleCalcChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          >
            <option value="calculo-iva">
              {isEn ? 'VAT Calculator (sat/calculadora-iva)' : 'Calculadora de IVA (sat/calculadora-iva)'}
            </option>
            <option value="calculo-isr-pf">
              {isEn ? 'ISR Individuals Calculator (sat/calculadora-isr-pf)' : 'Calculadora de ISR Personas Físicas (sat/calculadora-isr-pf)'}
            </option>
            <option value="calculo-resico-pf">
              {isEn ? 'RESICO Individuals Calculator (resico/calculadora-resico-pf)' : 'Calculadora de RESICO Persona Física (resico/calculadora-resico-pf)'}
            </option>
            <option value="calculo-salario">
              {isEn ? 'Net/Gross Salary Calculator (nomina/calculadora-salario-neto-bruto)' : 'Calculadora de Salario Neto/Bruto (nomina/calculadora-salario-neto-bruto)'}
            </option>
          </select>

          <label
            htmlFor="json-inputs"
            className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
          >
            {isEn ? '2. Input Parameters (JSON Body)' : '2. Parámetros de Entrada (JSON Body)'}
          </label>
          <textarea
            id="json-inputs"
            rows={6}
            value={jsonInputs}
            onChange={(e) => setJsonInputs(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <button
            onClick={handleTestAPI}
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-bold rounded-xl text-sm transition"
          >
            {loading
              ? isEn
                ? 'Executing API Request...'
                : 'Ejecutando Consulta API...'
              : isEn
              ? 'Send POST Request ➔'
              : 'Enviar Petición POST ➔'}
          </button>
        </div>

        {/* Response Panel */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-850 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              📦 {isEn ? 'Server Response (JSON)' : 'Respuesta del Servidor (JSON)'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              {isEn
                ? 'The server processes the calculation and returns a complete breakdown of structured results and mathematical steps.'
                : 'El servidor procesa el cálculo y retorna un desglose completo de resultados y pasos matemáticos estructurados.'}
            </p>

            <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-[340px] text-blue-300">
              {apiResponse ? (
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              ) : (
                <span className="text-slate-600">
                  {isEn
                    ? 'Click "Send POST Request" to see the response here.'
                    : 'Haz clic en "Enviar Petición POST" para ver la respuesta aquí.'}
                </span>
              )}
            </div>
          </div>
          {apiResponse && (
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-900/50 rounded-xl text-xs text-blue-400 leading-relaxed">
              ℹ️ <strong>Status {apiResponse.status === 'success' ? '200 OK' : 'Error'}</strong>:{' '}
              {isEn
                ? 'Observe how the results field includes the final breakdowns formatted and ready to be injected into any interface.'
                : 'Observa cómo el campo results incluye los desgloses finales formateados y listos para inyectarse en cualquier interfaz.'}
            </div>
          )}
        </div>
      </div>

      {/* Integration Code Snippets */}
      <section className="bg-slate-950 border border-slate-850 rounded-2xl p-6 sm:p-8 mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">
          🛠️ {isEn ? 'Code Integration Examples' : 'Ejemplos de Integración de Código'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">cURL Command</h3>
            <pre className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
              {curlSnippet}
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              JavaScript (Fetch API)
            </h3>
            <pre className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
              {nodeSnippet}
            </pre>
          </div>
        </div>
      </section>
    </>
  );
}
