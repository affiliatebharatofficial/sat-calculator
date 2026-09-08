import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/tipo-de-cambio-para-solventar-obligaciones');
}

export default async function TipoCambioSolventarPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/tipo-de-cambio-para-solventar-obligaciones');
}
