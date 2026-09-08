import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/dolar-hoy');
}

export default async function PrecioDolarPeruPage({ params }: PageProps) {
  permanentRedirect('/dolar-hoy');
}
