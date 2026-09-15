const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="60%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="20%" r="45%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Top Accent Bar -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)" />

  <!-- Badge Pill -->
  <g transform="translate(80, 75)">
    <rect width="440" height="42" rx="21" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
    <text x="25" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#93c5fd" letter-spacing="1">
      PLATAFORMA FISCAL Y LABORAL MEXICO 2026
    </text>
  </g>

  <!-- Main Brand Title -->
  <text x="80" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" fill="#ffffff" letter-spacing="-2">
    Calculadora<tspan fill="#3b82f6">SAT</tspan>
  </text>

  <!-- Tagline / Description -->
  <text x="80" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="600" fill="#cbd5e1">
    Simulaciones y Calculos Tributarios Oficiales
  </text>

  <!-- Feature Grid Pills -->
  <g transform="translate(80, 330)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="240" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="20" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#3b82f6">&#9874;</text>
    <text x="20" y="74" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#f8fafc">ISR &amp; IVA</text>
    <text x="20" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Tarifas Art. 96 y 152</text>

    <!-- Card 2 -->
    <rect x="265" y="0" width="240" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="285" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#10b981">&#9998;</text>
    <text x="285" y="74" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Nomina LFT</text>
    <text x="285" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Finiquito &amp; Aguinaldo</text>

    <!-- Card 3 -->
    <rect x="530" y="0" width="240" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="550" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#6366f1">&#10022;</text>
    <text x="550" y="74" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#f8fafc">RESICO 2026</text>
    <text x="550" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Tasas 1.0% a 2.5%</text>

    <!-- Card 4 -->
    <rect x="795" y="0" width="240" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="815" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#f59e0b">&#128200;</text>
    <text x="815" y="74" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Inversiones</text>
    <text x="815" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">CETES &amp; Rendimientos</text>
  </g>

  <!-- Bottom Footer Line -->
  <line x1="80" y1="490" x2="1115" y2="490" stroke="#334155" stroke-width="1" />

  <!-- Bottom Meta Info -->
  <text x="80" y="540" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#60a5fa">
    https://www.calculadorasat.org
  </text>
  <text x="1115" y="540" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#64748b">
    Actualizado con normatividad del SAT, DOF y Ley Federal del Trabajo
  </text>
</svg>
`;

async function generate() {
  const outputPath = path.join(process.cwd(), 'public', 'og-image.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  console.log('Successfully generated:', outputPath);
}

generate().catch(console.error);
