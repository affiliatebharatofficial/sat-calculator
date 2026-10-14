El **CFDI 4.0** es la versión vigente y obligatoria de la factura electrónica en México desde el **1 de abril de 2023**. Todo comprobante fiscal digital por internet debe cumplir con esta versión: no hay alternativa legal.

La 4.0 endureció la validación: el timbrado se rechaza automáticamente si el nombre, el código postal fiscal o el régimen del receptor no coinciden con el registro del SAT. Una factura mal llenada deja a tu cliente sin deducciones y a ti expuesto a multas.

Esta guía reúne los **datos obligatorios** del artículo 29-A del CFF, los **errores que más rechazos provocan** y un ejemplo con números reales.

## 1. Qué cambió del CFDI 3.3 al 4.0

Cinco cambios explican la mayoría de los rechazos que siguen ocurriendo en 2026:

- **Nombre del receptor obligatorio**, como aparece en el registro del RFC del SAT.
- **Domicilio fiscal del receptor obligatorio** (código postal, no el de la sucursal).
- **Régimen fiscal del receptor obligatorio**, validado contra la base del SAT.
- **Validación del RFC del receptor**: un RFC mal escrito se rechaza antes de timbrar.
- **Uso del CFDI validado por régimen**: hay combinaciones de uso y régimen que el validador rechaza automáticamente.

## 2. Los datos obligatorios de todo CFDI de ingreso

El **artículo 29-A del CFF** fija la información mínima de cada comprobante, y el **Anexo 20** de la RMF define el estándar técnico. Para una factura de ingreso (tipo **I**), verifica estos campos:

| # | Dato | Quién lo aporta |
|---|------|-----------------|
| 1 | RFC del emisor | Tú |
| 2 | Nombre o razón social del emisor | Tú |
| 3 | Régimen fiscal del emisor | Tú |
| 4 | Lugar de expedición (código postal) | Tú |
| 5 | Fecha y hora de expedición | Sistema |
| 6 | Tipo de comprobante (I, E, T, P, N) | Tú |
| 7 | RFC del receptor | Tu cliente |
| 8 | Nombre del receptor | Tu cliente |
| 9 | Código postal del domicilio fiscal del receptor | Tu cliente |
| 10 | Régimen fiscal del receptor | Tu cliente |
| 11 | Uso del CFDI | Tu cliente |
| 12 | Clave de producto o servicio (catálogo del Anexo 20) | Tú |
| 13 | Cantidad, unidad, descripción, valor unitario e importe | Tú |
| 14 | Impuestos trasladados y retenidos (base, tasa, importe) | Tú |
| 15 | Forma de pago y método de pago (PUE o PPD) | Tú |
| 16 | Moneda y tipo de cambio (si no es MXN) | Tú |

El timbrado agrega el **folio fiscal (UUID)** y el sello digital. Si falta cualquiera de los datos del 1 al 16, el comprobante **no cumple** el artículo 29-A y el receptor no podrá deducirlo.

## 3. Los datos del receptor: la causa número uno de rechazos

Casi todos los rechazos de timbrado en 4.0 vienen del bloque del receptor. Tres reglas de oro:

El nombre debe ser idéntico al del registro del SAT: si la constancia dice **MARÍA FERNANDA LÓPEZ GARCÍA**, no pongas "Ma. Fernanda López"; puntos, abreviaturas y mayúsculas cuentan.

**El código postal es el del domicilio fiscal.** Muchos capturan el CP de la sucursal donde se entrega la mercancía, pero el SAT valida contra el domicilio fiscal registrado. Pide siempre la **Constancia de Situación Fiscal** actualizada: es gratuita y trae los cuatro datos.

**El régimen fiscal debe ser el vigente.** Si el cliente cambió de régimen y te dio el anterior, el timbrado se rechaza. Pide la constancia actualizada al menos una vez al año.

## 4. Ejemplo completo: factura de honorarios por $25,000

Un consultor (régimen 612) factura **$25,000.00** a una empresa (régimen 601) y cobra por transferencia en una sola exhibición: **tipo** I, **método** PUE, **forma** 03, **uso** G03, **objeto de impuesto** 02.

Cálculo de importes e impuestos:

- **Subtotal:** $25,000.00
- **IVA trasladado (16%):** $25,000.00 × 0.16 = **$4,000.00**
- **Retención de ISR (10%, artículo 106 de la LISR):** $25,000.00 × 0.10 = **$2,500.00**
- **Retención de IVA (dos terceras partes del IVA trasladado, artículo 1-A de la Ley del IVA):** $4,000.00 × 2/3 = **$2,666.67**
- **Total del comprobante:** $25,000.00 + $4,000.00 − $2,500.00 − $2,666.67 = **$23,833.33**

Verificación: $29,000.00 − $5,166.67 = **$23,833.33**. Cada retención debe ir desglosada con base, tasa e importe.

## 5. Complemento de pago: cuándo es obligatorio

Si el método de pago es **PPD (Pago en parcialidades o diferido)**, la factura original no basta: debes emitir el **Complemento de Recepción de Pagos** (REP) por cada cobro. Sin el complemento, tu cliente **no puede deducir ni acreditar** ese IVA.

- Se emite un CFDI tipo **P** por cada pago, relacionando la factura original por su UUID.
- El SAT permite emitirlo **a más tardar el quinto día del mes siguiente** a aquel en que se recibió el pago.
- Si ya cobraste, factura en **PUE** y olvídate del complemento.

## 6. Los 7 errores más comunes y cómo corregirlos

| Error | Consecuencia | Corrección |
|-------|--------------|------------|
| Nombre del receptor distinto al del registro del SAT | Rechazo de timbrado | Copiarlo de la Constancia de Situación Fiscal |
| Código postal del domicilio fiscal incorrecto | Rechazo de timbrado | Pedir el CP fiscal, no el de la sucursal |
| Régimen fiscal del receptor desactualizado | Rechazo de timbrado | Verificar el régimen vigente con el cliente cada año |
| Uso del CFDI incompatible con el régimen | Rechazo de timbrado | Usar el catálogo de usos del Anexo 20 según el régimen |
| Facturar en PPD sin emitir complemento de pago | El cliente pierde deducción y acreditamiento | Emitir el REP por cada cobro |
| Cancelar con motivo 01 sin relacionar el UUID sustituto | La cancelación no procede | Relacionar siempre el folio fiscal del comprobante sustituto |

## 7. Cómo cancelar un CFDI correctamente en 2026

El **artículo 29-A del CFF** permite cancelar un CFDI solo dentro del ejercicio en que se expidió; la RMF amplía el plazo hasta el mes de la **declaración anual** del ISR (marzo personas morales, abril personas físicas).

Los **4 motivos válidos** de cancelación son: **01** (emitido con errores, con relación: obliga a relacionar el **UUID del CFDI sustituto**), **02** (emitido con errores, sin relación), **03** (no se llevó a cabo la operación) y **04** (operación nominativa relacionada en una factura global).

El receptor tiene **3 días hábiles** para aceptar o rechazar desde su Buzón Tributario; si no responde, se entiende aceptada. Excepciones sin aceptación (regla 2.7.1.34 de la RMF 2026): montos de **hasta $1,000.00**, cancelación al **día hábil siguiente**, CFDI de **nómina** y de **egreso**, y facturas al **público en general**. El **complemento de pago** y los CFDI de hidrocarburos exigen aceptación expresa.

**Multas:** no cancelar a tiempo un CFDI de ingresos emitido por error es infracción (**artículo 81, fracción XLVI del CFF**) sancionada con el **5% al 10% del monto** de cada comprobante (artículo 82, fracción XLII).

## 8. Antes de timbrar: verifícalo en 60 segundos

RFC activo del receptor, nombre idéntico al de su Constancia de Situación Fiscal, código postal del domicilio fiscal, régimen vigente, uso del CFDI compatible, método de pago correcto (**PUE** si ya cobraste, **PPD** si cobrarás después), impuestos desglosados con base, tasa e importe, y clave de producto/servicio específica del Anexo 20.

[FICHATECNICA]

### ¿Qué versión de CFDI debo usar en 2026?
La **4.0**, obligatoria desde el **1 de abril de 2023**. No existe una versión 5.0: cualquier comprobante en versión anterior se rechaza al timbrar.

### ¿Cuáles son los datos obligatorios que deben incluirse en una factura?
Los del **artículo 29-A del CFF** (sección 2): los que más rechazos causan son los del receptor — **RFC, nombre exacto, código postal fiscal, régimen y uso del CFDI**.

### ¿Qué se pone cuando te piden el CFDI?
Tus datos fiscales de la **Constancia de Situación Fiscal**: RFC, nombre o razón social, código postal del domicilio fiscal, régimen fiscal y el **uso del CFDI** del comprobante.

### ¿Cuál es la multa por no emitir facturas electrónicas?
El CFF vigente prevé multas de **$16,971 a $101,826** por no expedir o no timbrar a tiempo, y del **5% al 10% del monto** por no cancelar a tiempo un CFDI emitido por error (artículos 81 y 82).

### Ficha Técnica y Marco Jurídico

- **Fundamento legal:** Artículos 29 y 29-A del CFF; Anexo 20 de la RMF (CFDI 4.0); reglas 2.7.1.34 y 2.7.1.35 de la RMF 2026; artículos 81, 82 y 84 del CFF; artículos 106 de la LISR y 1-A de la Ley del IVA
- **Vigencia:** CFDI 4.0 obligatorio desde el 1 de abril de 2023; desde el 1 de enero de 2026 (DOF 7/11/2025) los comprobantes deben amparar operaciones reales (materialidad y razón de negocios)
- **Verificación:** octubre de 2026. Verifica montos y plazos vigentes en el portal del SAT antes de emitir
