import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/tablas-e-indicadores-sunat');
}

export default async function TablasIndicadoresPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/tablas-e-indicadores-sunat');
}
