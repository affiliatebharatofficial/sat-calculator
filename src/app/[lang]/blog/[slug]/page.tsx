import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EditorialInfoCard from '@/components/EditorialInfoCard';
import TopicalClusterResources from '@/components/TopicalClusterResources';
import { getPostBySlug, getPublishedPosts } from '@/lib/blog';
import { getSeoAlternates } from '@/lib/seo';
import { renderMarkdown } from '@/lib/markdown';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const slug = resolvedParams.slug;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artículo No Encontrado | Calculadora SAT',
      description: 'El artículo solicitado no está disponible o ha sido actualizado.',
    };
  }

  const seoAlternates = getSeoAlternates(`blog/${slug}`, lang);

  return {
    title: `${post.title} | Calculadora SAT`,
    description: post.excerpt,
    keywords: [
      post.category.toLowerCase(),
      'sat mexico',
      'impuestos sat',
      'deducciones personales',
      'declaracion anual',
      'calculadora sat'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: `${post.title} | Calculadora SAT`,
      description: post.excerpt,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Firoz Khan'],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const slug = resolvedParams.slug;
  const isEn = lang === 'en';
  const langPrefix = isEn ? '/en' : '';
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://www.calculadorasat.org/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${postUrl}#article`,
    isPartOf: {
      '@type': 'WebPage',
      '@id': postUrl,
      url: postUrl,
      name: post.title,
    },
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    mainEntityOfPage: postUrl,
    author: {
      '@type': 'Person',
      name: 'Firoz Khan',
      jobTitle: isEn ? 'Creator & Technical Lead' : 'Creador y Responsable Técnico',
      worksFor: {
        '@type': 'Organization',
        name: 'FkDigitalMedia',
        url: 'https://www.calculadorasat.org/about',
      },
      sameAs: [
        'https://www.linkedin.com/in/firoz-khan-1153358a/',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculadora SAT',
      url: 'https://www.calculadorasat.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.calculadorasat.org/icon.png'
      }
    },
    inLanguage: post.lang === 'en' ? 'en-US' : 'es-MX'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${postUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Inicio', item: `https://www.calculadorasat.org${langPrefix || ''}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.calculadorasat.org/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl }
    ]
  };

  const renderedContent = renderMarkdown(post.content);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-250">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-grow w-full">
        {/* Navigation / Back Button */}
        <nav className="flex text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 items-center gap-2">
          <Link href={langPrefix || '/'} className="hover:text-blue-600 transition-colors">
            {isEn ? 'Home' : 'Inicio'}
          </Link>
          <span>/</span>
          <Link href={`${langPrefix}/blog`} className="hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs sm:max-w-sm">
            {post.category}
          </span>
        </nav>

        {/* Article Container */}
        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-12 shadow-sm">
          {/* Header Info */}
          <header className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-4">
              <span className="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                {post.category}
              </span>
              <span>•</span>
              <span>📅 {new Date(post.date).toLocaleDateString(isEn ? 'en-US' : 'es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>⏱️ Lectura: ~8 min</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 leading-relaxed font-medium mt-3 border-l-4 border-blue-600 dark:border-blue-400 pl-4 py-1">
                {post.excerpt}
              </p>
            )}

            {/* Truthful Author & Editorial Attribution Card */}
            <EditorialInfoCard
              author={post.author || 'Firoz Khan (FkDigitalMedia)'}
              editorialResponsibility={post.editorialResponsibility}
              publishedDate={post.date}
              lastReviewedDate={post.lastReviewed || '2026-09-20'}
              lastUpdatedDate={post.lastUpdated || '2026-09-20'}
              legalBasis={post.legalBasis}
              pageTitle={post.title}
              lang={lang}
            />
          </header>

          {/* Server-Rendered Article Body */}
          <div 
            className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />

          {/* Topical Cluster Specialized Resources */}
          <TopicalClusterResources
            currentType="guide"
            currentSlug={post.slug}
            currentCategorySlug={post.category}
            lang={lang}
            className="mt-12"
          />

          {/* Editorial Integrity & Legal Sources Footer */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <div className="font-bold text-slate-700 dark:text-slate-300">
              Aviso de Independencia y Responsabilidad Editorial:
            </div>
            <p className="leading-relaxed">
              Este artículo fue elaborado con fines educativos e informativos por el equipo de <code>calculadorasat.org</code>, fundamentado en la Ley del Impuesto Sobre la Renta (LISR) y disposiciones públicas del SAT. No constituye una consulta legal o asesoría contable formal. Consulta siempre las fuentes oficiales o acude a un profesional certificado para casos particulares.
            </p>
          </div>
        </article>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
