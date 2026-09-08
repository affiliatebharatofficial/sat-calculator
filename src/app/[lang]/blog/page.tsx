import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublishedPosts } from '@/lib/blog';
import { getSeoAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('blog', lang);

  const title = lang === 'en' 
    ? 'Fiscal & Tax Blog | Calculadora SAT' 
    : 'Blog Fiscal y Financiero | Calculadora SAT';
  const description = lang === 'en'
    ? 'Practical guides, SAT tax regulations, personal deductions, and financial calculation tutorials in Mexico.'
    : 'Guías prácticas, normatividad fiscal del SAT, deducciones personales y tutoriales de finanzas en México.';

  return {
    title,
    description,
    alternates: seoAlternates,
    openGraph: {
      title,
      description,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
      type: 'website',
    },
  };
}

export default async function BlogListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';
  const posts = getPublishedPosts(lang);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Inicio', item: `https://www.calculadorasat.org${langPrefix || ''}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.calculadorasat.org/blog' }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-250">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-white/15 text-blue-100 uppercase tracking-widest mb-4">
            {isEn ? 'Editorial Guidance' : 'Orientación y Análisis Tributario'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none mb-4">
            {isEn ? 'Fiscal & Financial Blog' : 'Blog Fiscal y Financiero'}
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
            {isEn 
              ? 'Authoritative articles, official SAT updates, and step-by-step guides on personal finance and taxes in Mexico.' 
              : 'Artículos respaldados en la legislación mexicana, disposiciones del SAT y guías prácticas sobre deducciones, nómina e impuestos.'}
          </p>
        </div>
      </section>

      {/* Main Content Area - Server Rendered Static HTML */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 mb-4 text-xs font-extrabold">
                    <span className="px-2.5 py-0.5 rounded uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-bold">
                      {post.category}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">
                      📅 {new Date(post.date).toLocaleDateString(isEn ? 'en-US' : 'es-MX')}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-extrabold text-slate-950 dark:text-white leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Link href={`${langPrefix}/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-3.5 leading-relaxed line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-400">
                    ✍️ {post.author}
                  </span>
                  <Link 
                    href={`${langPrefix}/blog/${post.slug}`}
                    className="font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                  >
                    {isEn ? 'Read Guide ➔' : 'Leer Guía ➔'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-sm space-y-4">
            <span className="text-4xl block">📚</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isEn ? 'Editorial Guides in Preparation' : 'Guías Editoriales en Preparación'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {isEn 
                ? 'Our tax specialists are currently drafting verified educational articles and regulatory breakdowns. In the meantime, you can perform exact simulations using our suite of calculators.' 
                : 'Nuestro comité editorial está redactando nuevas guías tributarias con fundamento legal actualizado. Mientras tanto, puedes realizar proyecciones exactas con nuestras calculadoras.'}
            </p>
            <div className="pt-2">
              <Link
                href={langPrefix || '/'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                <span>{isEn ? 'Explore Financial Calculators' : 'Explorar Calculadoras Fiscales'}</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
