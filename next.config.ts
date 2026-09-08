import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Old Peru URLs previously under /calculadoras/tipo-de-cambio/*
      {
        source: '/calculadoras/tipo-de-cambio/consulta-ruc-sunat',
        destination: '/calculadoras/peru/consulta-ruc-sunat',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-igv-peru',
        destination: '/calculadoras/peru/calculadora-igv-peru',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-cts-peru',
        destination: '/calculadoras/peru/calculadora-cts-peru',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-gratificacion-peru',
        destination: '/calculadoras/peru/calculadora-gratificacion-peru',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-quinta-categoria-peru',
        destination: '/calculadoras/peru/calculadora-quinta-categoria-peru',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/tipo-de-cambio-sunat',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/tablas-e-indicadores-sunat',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/tipo-de-cambio-para-solventar-obligaciones',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/dolar-hoy',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/precio-del-dolar-en-peru',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-dolares-a-soles',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-soles-a-dolares',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/soles-a-dolares',
        destination: '/tipo-de-cambio',
        permanent: true,
      },

      // 2. Standalone Peru routes consolidated into /calculadoras/peru/*
      {
        source: '/consulta-ruc-sunat',
        destination: '/calculadoras/peru/consulta-ruc-sunat',
        permanent: true,
      },
      {
        source: '/calculadora-igv-peru',
        destination: '/calculadoras/peru/calculadora-igv-peru',
        permanent: true,
      },
      {
        source: '/calculadora-cts-peru',
        destination: '/calculadoras/peru/calculadora-cts-peru',
        permanent: true,
      },
      {
        source: '/calculadora-gratificacion-peru',
        destination: '/calculadoras/peru/calculadora-gratificacion-peru',
        permanent: true,
      },
      {
        source: '/calculadora-quinta-categoria-peru',
        destination: '/calculadoras/peru/calculadora-quinta-categoria-peru',
        permanent: true,
      },
      {
        source: '/tipo-de-cambio-sunat',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },
      {
        source: '/tablas-e-indicadores-sunat',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },
      {
        source: '/tipo-de-cambio-para-solventar-obligaciones',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/tablas-e-indicadores-sunat',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/tipo-de-cambio-para-solventar-obligaciones',
        destination: '/calculadoras/peru/tipo-de-cambio-sunat',
        permanent: true,
      },

      // 3. Consolidated currency routes (all redirect to Universal Converter /tipo-de-cambio)
      {
        source: '/dolar-hoy',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/precio-del-dolar-en-peru',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/dolares-a-soles',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadora-dolares-a-soles',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/soles-a-dolares',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadora-soles-a-dolares',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/precio-del-dolar-en-peru',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/dolar-hoy',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/dolares-a-soles',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/calculadora-dolares-a-soles',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/soles-a-dolares',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/calculadora-soles-a-dolares',
        destination: '/tipo-de-cambio',
        permanent: true,
      },

      // 3.1 Nine Currency routes under /calculadoras/divisas/* (consolidated into universal /tipo-de-cambio)
      {
        source: '/calculadoras/divisas/dolar-hoy-mexico',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/euro-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/quetzal-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/yen-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/yuan-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/libra-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/franco-suizo-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/dolar-canadiense-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas/real-brasileno-a-peso-mexicano',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/calculadoras/divisas',
        destination: '/tipo-de-cambio',
        permanent: true,
      },
      {
        source: '/divisas',
        destination: '/tipo-de-cambio',
        permanent: true,
      },

      // 4. Core Mexican calculator slug aliases (0 chains)
      {
        source: '/calculadoras/sat/calculadora-isr',
        destination: '/calculadoras/sat/calculadora-isr-pf',
        permanent: true,
      },
      {
        source: '/calculadoras/sat/calculadora-resico',
        destination: '/calculadoras/sat/calculadora-resico-pf',
        permanent: true,
      },
      {
        source: '/calculadoras/nomina/calculadora-salario-neto',
        destination: '/calculadoras/nomina/calculadora-salario-neto-bruto',
        permanent: true,
      },
      {
        source: '/calculadoras/nomina/calculadora-finiquito',
        destination: '/calculadoras/nomina/calculadora-finiquito-liquidacion',
        permanent: true,
      },
      {
        source: '/calculadoras/nomina/calculadora-vacaciones',
        destination: '/calculadoras/nomina/calculadora-vacaciones-prima',
        permanent: true,
      },
      {
        source: '/calculadoras/nomina/calculadora-prima-vacacional',
        destination: '/calculadoras/nomina/calculadora-vacaciones-prima',
        permanent: true,
      },
      {
        source: '/calculadoras/laboral/calculadora-vacaciones',
        destination: '/calculadoras/nomina/calculadora-vacaciones-prima',
        permanent: true,
      },
      {
        source: '/calculadoras/laboral/calculadora-ptu',
        destination: '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
        permanent: true,
      },
      {
        source: '/calculadoras/nomina/calculadora-ptu',
        destination: '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
        permanent: true,
      },
      {
        source: '/calculadoras/laboral/calculadora-ptu-reparto-utilidades',
        destination: '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
        permanent: true,
      },
      {
        source: '/calculadoras/laboral/calculadora-semanas-cotizadas-imss',
        destination: '/calculadoras/nomina/calculadora-semanas-cotizadas-imss',
        permanent: true,
      },
      {
        source: '/calculadoras/fiscal/resico-vs-actividad-empresarial',
        destination: '/calculadoras/resico/comparador-resico-actividad-empresarial',
        permanent: true,
      },
      {
        source: '/calculadoras/sat/resico-vs-actividad-empresarial',
        destination: '/calculadoras/resico/comparador-resico-actividad-empresarial',
        permanent: true,
      },
      {
        source: '/calculadoras/sat/comparador-resico-actividad-empresarial',
        destination: '/calculadoras/resico/comparador-resico-actividad-empresarial',
        permanent: true,
      },
      {
        source: '/calculadoras/resico/resico-vs-actividad-empresarial',
        destination: '/calculadoras/resico/comparador-resico-actividad-empresarial',
        permanent: true,
      },

      // 5. Root shorthand aliases (direct 1-hop 301 to canonical)
      {
        source: '/calculadora-finiquito',
        destination: '/calculadoras/nomina/calculadora-finiquito-liquidacion',
        permanent: true,
      },
      {
        source: '/calculadora-salario-neto',
        destination: '/calculadoras/nomina/calculadora-salario-neto-bruto',
        permanent: true,
      },
      {
        source: '/calculadora-salario-bruto',
        destination: '/calculadoras/nomina/calculadora-salario-neto-bruto',
        permanent: true,
      },
      {
        source: '/calculadora-salario',
        destination: '/calculadoras/nomina/calculadora-salario-neto-bruto',
        permanent: true,
      },
      {
        source: '/calculadora-resico',
        destination: '/calculadoras/sat/calculadora-resico-pf',
        permanent: true,
      },
      {
        source: '/calculadora-vacaciones',
        destination: '/calculadoras/nomina/calculadora-vacaciones-prima',
        permanent: true,
      },
      {
        source: '/calculadora-aguinaldo',
        destination: '/calculadoras/nomina/calculadora-aguinaldo',
        permanent: true,
      },
      {
        source: '/calculadora-iva',
        destination: '/calculadoras/sat/calculadora-iva',
        permanent: true,
      },
      {
        source: '/calculadora-isr',
        destination: '/calculadoras/sat/calculadora-isr-pf',
        permanent: true,
      },
      {
        source: '/calculadora-ptu',
        destination: '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
        permanent: true,
      },
      {
        source: '/calculadora-ptu-reparto-utilidades',
        destination: '/calculadoras/nomina/calculadora-ptu-reparto-utilidades',
        permanent: true,
      },
      {
        source: '/calculadora-semanas-cotizadas-imss',
        destination: '/calculadoras/nomina/calculadora-semanas-cotizadas-imss',
        permanent: true,
      },
      {
        source: '/semanas-cotizadas-imss',
        destination: '/calculadoras/nomina/calculadora-semanas-cotizadas-imss',
        permanent: true,
      },
      {
        source: '/resico-vs-actividad-empresarial',
        destination: '/calculadoras/resico/comparador-resico-actividad-empresarial',
        permanent: true,
      },
      {
        source: '/comparador-resico-actividad-empresarial',
        destination: '/calculadoras/resico/comparador-resico-actividad-empresarial',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
