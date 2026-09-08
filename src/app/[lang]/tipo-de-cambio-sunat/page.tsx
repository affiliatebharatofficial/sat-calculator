import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/tipo-de-cambio-sunat');
}

export default async function TipoCambioSunatPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/tipo-de-cambio-sunat');
}
