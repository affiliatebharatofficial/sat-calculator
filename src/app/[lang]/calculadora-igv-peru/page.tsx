import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-igv-peru');
}

export default async function CalculadoraIgvPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-igv-peru');
}
