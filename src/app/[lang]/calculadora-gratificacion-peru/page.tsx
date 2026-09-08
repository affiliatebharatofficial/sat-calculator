import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-gratificacion-peru');
}

export default async function CalculadoraGratificacionPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-gratificacion-peru');
}
