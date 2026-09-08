import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-cts-peru');
}

export default async function CalculadoraCtsPage({ params }: PageProps) {
  permanentRedirect('/calculadoras/peru/calculadora-cts-peru');
}
