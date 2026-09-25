import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import CookieBanner from "../../components/CookieBanner";
import SEOHreflang from "../../components/SEO/SEOHreflang";
import ThemeProvider from "../../components/ThemeProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.calculadorasat.org'),
  title: {
    default: "🧮 Calculadora SAT 2026 — IVA, ISR, RESICO y Nómina Gratis Online",
    template: "%s | Calculadora SAT"
  },
  description: "Plataforma de calculadoras fiscales y financieras 2026. Calcula IVA (16% u 8%), ISR Personas Físicas y Morales, RESICO, Recargos, Aguinaldo y Tipo de Cambio gratis conforme a normatividad oficial mexicana.",
  keywords: [
    "calculadora sat",
    "impuestos mexico",
    "calculadora iva",
    "calculadora isr 2026",
    "resico personas fisicas",
    "calculadora finiquito",
    "calculadora aguinaldo",
    "salario neto vs bruto",
    "tipo de cambio banxico sat"
  ],
  authors: [{ name: "Firoz Khan - FkDigitalMedia", url: "https://www.calculadorasat.org/about" }],
  creator: "FkDigitalMedia",
  publisher: "Calculadora SAT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://www.calculadorasat.org',
    siteName: 'Calculadora SAT',
    title: '🧮 Calculadora SAT 2026 — IVA, ISR, RESICO y Nómina Gratis Online',
    description: 'Plataforma interactiva e independiente de simulaciones fiscales y laborales en México: IVA, ISR, RESICO, Aguinaldo y Liquidaciones.',
    images: [
      {
        url: 'https://www.calculadorasat.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Calculadora SAT — Plataforma Fiscal y Laboral México 2026',
        type: 'image/png'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🧮 Calculadora SAT 2026 — IVA, ISR, RESICO y Nómina Gratis Online',
    description: 'Plataforma interactiva e independiente de simulaciones fiscales y laborales en México.',
    images: ['https://www.calculadorasat.org/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="rRetDb7bEgDlPVqH4e0hWvIB__PrqNCSr2FYbfXsZMM" />
        <meta name="google-adsense-account" content="ca-pub-9602707669345879" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <SEOHreflang />
        <script
          type="text/javascript"
          async
          data-noptimize="1"
          data-cfasync="false"
          src="//scripts.scriptwrapper.com/tags/c23e2624-ae2a-4b52-bf67-1471e78365a3.js"
        ></script>
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden text-slate-900 dark:text-slate-100">
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PFQQD895QD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PFQQD895QD');
          `}
        </Script>
        <ThemeProvider>
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}


