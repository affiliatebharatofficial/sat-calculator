import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirigiendo a Dólar Hoy...',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.calculadorasat.org/dolar-hoy',
  },
};

export default async function PrecioDolarPeruPage() {
  redirect('/dolar-hoy');
}
