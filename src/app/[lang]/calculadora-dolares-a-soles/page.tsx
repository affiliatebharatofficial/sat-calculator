import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/tipo-de-cambio');
}

export default async function Page({ params }: PageProps) {
  permanentRedirect('/tipo-de-cambio');
}
