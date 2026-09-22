import React from 'react';
import Link from 'next/link';
import { getClusterForCalculator, getClusterForGuide } from '@/data/topicalClusters';
import type { TopicalCluster } from '@/types/topicalClusters';

interface TopicalClusterResourcesProps {
  currentType: 'calculator' | 'guide';
  currentSlug: string;
  currentCategorySlug?: string;
  lang: 'es' | 'en';
  clusterId?: string;
  className?: string;
}

export default function TopicalClusterResources({
  currentType,
  currentSlug,
  currentCategorySlug,
  lang,
  className = '',
}: TopicalClusterResourcesProps) {
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';

  const cluster: TopicalCluster =
    currentType === 'calculator'
      ? getClusterForCalculator(currentSlug, currentCategorySlug)
      : getClusterForGuide(currentSlug, currentCategorySlug);

  if (!cluster) return null;

  // Filter out current item to avoid self-linking
  const relevantCalculators = cluster.calculators.filter(c => c.slug !== currentSlug);
  const relevantGuides = cluster.guides.filter(g => g.slug !== currentSlug);

  return (
    <section
      aria-label={isEn ? `Topic cluster: ${cluster.nameEn}` : `Clúster temático: ${cluster.name}`}
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 ${className}`}
    >
      {/* Cluster Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 mb-2 border border-blue-200/60 dark:border-blue-900/60">
          <span>🏷️</span>
          <span>{isEn ? 'Topical Cluster Hub' : 'Clúster Temático Especializado'}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
          {isEn ? cluster.nameEn : cluster.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {isEn ? cluster.shortDescriptionEn : cluster.shortDescription}
        </p>
      </div>

      {/* Grid: Companion Guides & Related Calculators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Companion In-Depth Guides */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <span className="text-base">📚</span>
            <h4>{isEn ? 'Authoritative Guides & Foundations' : 'Guías Explicativas y Fundamento Teórico'}</h4>
          </div>

          {relevantGuides.length > 0 ? (
            <div className="space-y-3">
              {relevantGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`${langPrefix}/blog/${guide.slug}`}
                  className="block p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition bg-slate-50/70 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                      {isEn ? guide.contextualAnchorEn || guide.contextualAnchor : guide.contextualAnchor} ➔
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                    {isEn ? guide.titleEn || guide.title : guide.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {isEn ? guide.descriptionEn || guide.description : guide.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 italic">
              {isEn ? 'Additional cluster guides currently in editorial review.' : 'Guías complementarias en proceso de revisión editorial.'}
            </div>
          )}
        </div>

        {/* Companion Calculators */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <span className="text-base">🧮</span>
            <h4>{isEn ? 'Cluster Simulators & Calculators' : 'Herramientas de Simulación del Clúster'}</h4>
          </div>

          {relevantCalculators.length > 0 ? (
            <div className="space-y-3">
              {relevantCalculators.slice(0, 3).map((calc) => (
                <Link
                  key={calc.slug}
                  href={`${langPrefix}/calculadoras/${calc.categorySlug}/${calc.slug}`}
                  className="block p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition bg-slate-50/70 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                      {isEn ? calc.contextualAnchorEn || calc.contextualAnchor : calc.contextualAnchor} ➔
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                    {isEn ? calc.titleEn || calc.title : calc.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {isEn ? calc.descriptionEn || calc.description : calc.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 italic">
              {isEn ? 'Primary calculator for this cluster.' : 'Herramienta principal de este clúster temático.'}
            </div>
          )}
        </div>
      </div>

      {/* Cluster Transparency: Methodology & Official Sources Dual Links */}
      <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {isEn ? 'Cluster Governance:' : 'Gobernanza del Clúster:'}
          </span>
          <Link
            href={`${langPrefix}${cluster.methodology.anchor}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            🔬 {isEn ? cluster.methodology.labelEn : cluster.methodology.label}
          </Link>
        </div>

        {cluster.primarySources.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? 'Official basis:' : 'Sustento oficial:'}
            </span>
            {cluster.primarySources.map((src, idx) => (
              <Link
                key={src.sourceId || idx}
                href={`${langPrefix}${src.anchor}`}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
              >
                🏛️ {src.documentTitle.split('-')[0].trim()}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
