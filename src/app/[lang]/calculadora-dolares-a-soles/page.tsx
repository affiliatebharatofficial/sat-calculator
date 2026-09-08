import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirigiendo a Dólares a Soles...',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.calculadorasat.org/dolares-a-soles',
  },
};

export default async function CalculadoraDolaresASolesPage() {
  redirect('/dolares-a-soles');
}
