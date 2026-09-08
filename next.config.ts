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
        destination: '/calculadoras/peru/tablas-e-indicadores-sunat',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/tipo-de-cambio-para-solventar-obligaciones',
        destination: '/calculadoras/peru/tipo-de-cambio-para-solventar-obligaciones',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/dolar-hoy',
        destination: '/dolar-hoy',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/precio-del-dolar-en-peru',
        destination: '/dolar-hoy',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-dolares-a-soles',
        destination: '/dolares-a-soles',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/calculadora-soles-a-dolares',
        destination: '/dolares-a-soles',
        permanent: true,
      },
      {
        source: '/calculadoras/tipo-de-cambio/soles-a-dolares',
        destination: '/dolares-a-soles',
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
        destination: '/calculadoras/peru/tablas-e-indicadores-sunat',
        permanent: true,
      },
      {
        source: '/tipo-de-cambio-para-solventar-obligaciones',
        destination: '/calculadoras/peru/tipo-de-cambio-para-solventar-obligaciones',
        permanent: true,
      },

      // 3. Consolidated currency routes
      {
        source: '/precio-del-dolar-en-peru',
        destination: '/dolar-hoy',
        permanent: true,
      },
      {
        source: '/calculadora-dolares-a-soles',
        destination: '/dolares-a-soles',
        permanent: true,
      },
      {
        source: '/soles-a-dolares',
        destination: '/dolares-a-soles',
        permanent: true,
      },
      {
        source: '/calculadora-soles-a-dolares',
        destination: '/dolares-a-soles',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/precio-del-dolar-en-peru',
        destination: '/dolar-hoy',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/dolar-hoy',
        destination: '/dolar-hoy',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/calculadora-dolares-a-soles',
        destination: '/dolares-a-soles',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/soles-a-dolares',
        destination: '/dolares-a-soles',
        permanent: true,
      },
      {
        source: '/calculadoras/peru/calculadora-soles-a-dolares',
        destination: '/dolares-a-soles',
        permanent: true,
      },

      // 4. Core Mexican calculator slug aliases (0 chains)
      {
        source: '/calculadoras/sat/calculadora-isr',
        destination: '/calculadoras/sat/calculadora-isr-pf',
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
    ];
  },
};

export default nextConfig;
