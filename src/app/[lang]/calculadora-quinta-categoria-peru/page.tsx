import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-quinta-categoria-peru');
}

export default async function CalculadoraQuintaCategoriaPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-quinta-categoria-peru');
}
