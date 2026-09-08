import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/consulta-ruc-sunat');
}

export default async function ConsultaRucPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/consulta-ruc-sunat');
}
