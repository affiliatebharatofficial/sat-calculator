import { CalculatorConfig } from '../types/calculator';
import { ivaCalculator } from './sat/iva';
import { isrPfCalculator } from './sat/isr-pf';
import { resicoCalculator } from './sat/resico';
import { resicoVsActividadCalculator } from './sat/resico-vs-actividad';
import { isrPmCalculator } from './sat/isr-pm';
import { salaryCalculator } from './nomina/salario';
import { vacationsCalculator } from './nomina/vacaciones';
import { aguinaldoCalculator } from './nomina/aguinaldo';
import { finiquitoCalculator } from './nomina/finiquito';
import { ptuCalculator } from './nomina/ptu';
import { cetesCalculator } from './inversiones/cetes';
import { hipotecarioCalculator } from './creditos/hipotecario';
import { compoundInterestCalculator } from './finanzas-personales/interes-compuesto';
import { rule503020Calculator } from './finanzas-personales/regla-50-30-20';
import { breakEvenCalculator } from './negocios/punto-equilibrio';
import { umaCalculator } from './conversiones/uma';
import { prestamoCalculator } from './creditos/prestamo';
import { tipoCambioCalculator } from './conversiones/tipo-de-cambio';
import { depreciacionCalculator } from './contabilidad/depreciacion';
import { aforeCalculator } from './finanzas-personales/afore';
import { horasExtraCalculator } from './nomina/horas-extra';
import { conversionImpuestosCalculator } from './sat/conversion-impuestos';
import { recargosCalculator } from './sat/recargos';
import { tipoCambioSunatCalculator } from './conversiones/tipo-de-cambio-sunat';
import { tipoCambioSolventarObligacionesCalculator } from './conversiones/tipo-de-cambio-para-solventar-obligaciones';
import { calculadoraDolaresASolesCalculator } from './conversiones/calculadora-dolares-a-soles';
import { consultaRucSunatCalculator } from './conversiones/consulta-ruc-sunat';
import { tablasEIndicadoresSunatCalculator } from './conversiones/tablas-e-indicadores-sunat';
import { dolarHoyCalculator } from './conversiones/dolar-hoy';
import { semanasCotizadasImssCalculator } from './nomina/semanas-cotizadas-imss';
import { pagoTarjetaCreditoCalculator } from './finanzas-personales/pago-tarjeta-credito';
import { igvPeruCalculator } from './conversiones/igv-peru';
import { quintaCategoriaPeruCalculator } from './nomina/quinta-categoria-peru';
import { gratificacionPeruCalculator } from './nomina/gratificacion-peru';
import { ctsPeruCalculator } from './nomina/cts-peru';
import { comisionesTarjetaDolaresCalculator } from './finanzas-personales/comisiones-tarjeta-dolares';

export const calculators: CalculatorConfig[] = [
  ivaCalculator,
  isrPfCalculator,
  resicoCalculator,
  resicoVsActividadCalculator,
  isrPmCalculator,
  salaryCalculator,
  vacationsCalculator,
  aguinaldoCalculator,
  finiquitoCalculator,
  ptuCalculator,
  semanasCotizadasImssCalculator,
  gratificacionPeruCalculator,
  ctsPeruCalculator,
  quintaCategoriaPeruCalculator,
  cetesCalculator,
  hipotecarioCalculator,
  compoundInterestCalculator,
  rule503020Calculator,
  pagoTarjetaCreditoCalculator,
  comisionesTarjetaDolaresCalculator,
  breakEvenCalculator,
  umaCalculator,
  prestamoCalculator,
  tipoCambioCalculator,
  tipoCambioSunatCalculator,
  tipoCambioSolventarObligacionesCalculator,
  calculadoraDolaresASolesCalculator,
  consultaRucSunatCalculator,
  tablasEIndicadoresSunatCalculator,
  dolarHoyCalculator,
  igvPeruCalculator,
  depreciacionCalculator,
  aforeCalculator,
  horasExtraCalculator,
  conversionImpuestosCalculator,
  recargosCalculator
];

const slugAliases: Record<string, string> = {
  'calculadora-isr': 'calculadora-isr-pf',
  'calculadora-resico': 'calculadora-resico-pf',
  'calculadora-salario-neto': 'calculadora-salario-neto-bruto',
  'calculadora-salario-bruto': 'calculadora-salario-neto-bruto',
  'calculadora-salario': 'calculadora-salario-neto-bruto',
  'calculadora-finiquito': 'calculadora-finiquito-liquidacion',
  'calculadora-vacaciones': 'calculadora-vacaciones-prima',
  'calculadora-prima-vacacional': 'calculadora-vacaciones-prima',
  'calculadora-ptu': 'calculadora-ptu-reparto-utilidades',
  'resico-vs-actividad-empresarial': 'comparador-resico-actividad-empresarial',
};

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  const canonicalSlug = slugAliases[slug] || slug;
  return calculators.find(c => c.slug === canonicalSlug || c.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): CalculatorConfig[] {
  return calculators.filter(c => c.categorySlug === categorySlug);
}
