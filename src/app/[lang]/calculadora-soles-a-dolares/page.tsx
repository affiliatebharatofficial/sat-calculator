import { permanentRedirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  permanentRedirect('/dolares-a-soles');
}

export default async function CalculadoraSolesDolaresPage({ params }: PageProps) {
  permanentRedirect('/dolares-a-soles');
}
