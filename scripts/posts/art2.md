El **Impuesto al Valor Agregado (IVA)** es un tributo indirecto que grava el consumo de bienes y servicios en México conforme al Artículo 1 de la Ley del IVA (LIVA). A diferencia del impuesto sobre la renta, no grava las utilidades ni el patrimonio, sino el acto de consumo: el consumidor final absorbe el costo económico, mientras que los comerciantes y profesionistas actúan como recaudadores intermedios para el SAT.

En México coexisten cuatro esquemas de tratamiento de IVA:
1. **Tasa General (16%):** Aplica a la inmensa mayoría de productos, compras comerciales y servicios en el territorio nacional.
2. **Estímulo Fronterizo (8%):** Mecanismo de crédito fiscal para personas físicas y morales en la Zona Libre de la Frontera Norte y Sur.
3. **Tasa 0%:** Aplica a alimentos no procesados, medicamentos de patente, libros, revistas y exportaciones. A diferencia de los exentos, este esquema sí permite solicitar la devolución del IVA pagado a proveedores.
4. **Actos Exentos:** Servicios médicos profesionales, educación con reconocimiento de validez oficial (RVOE), transporte público urbano y arrendamiento de casa habitación.

En esta guía te explicamos cómo realizar las operaciones aritméticas exactas para **agregar el IVA** o **quitar el IVA** de un precio final, y desmentimos el error matemático más común en la facturación mexicana.

---

## 1. Cómo Agregar el IVA a un Subtotal (Precio Antes de Impuestos)

Cuando conoces el subtotal o costo base de un servicio o producto y necesitas emitir una factura o cotización con el 16% de IVA:

### Fórmulas Matemáticas:
$$
\text{Monto del IVA} = \text{Subtotal} \times 0.16
$$

$$
\text{Total con IVA} = \text{Subtotal} \times 1.16
$$

### Caso Práctico:
Ofreces un servicio de consultoría por un subtotal de **$15,000.00 MXN**:
1. Calculas el impuesto: $15,000.00 \times 0.16 = **$2,400.00 MXN**.
2. Sumas el impuesto a la base: $15,000.00 + $2,400.00 = **$17,400.00 MXN**.
3. O en un solo paso directo: $15,000.00 \times 1.16 = **$17,400.00 MXN**.

---

## 2. Cómo Quitar o Desglosar el IVA de un Precio Total (Con IVA Incluido)

Este es el cálculo más solicitado por profesionistas y compradores cuando reciben un ticket o precio que ya incluye impuestos y necesitan conocer la base imponible para emitir una factura electrónica (CFDI) o registrar un gasto contable.

### Fórmulas Matemáticas:
$$
\text{Subtotal Base} = \frac{\text{Total con IVA}}{1.16}
$$

$$
\text{Monto del IVA} = \text{Total con IVA} - \text{Subtotal Base}
$$

### Caso Práctico:
Compraste una computadora para tu oficina y el total del ticket es de **$23,200.00 MXN** (IVA incluido):
1. Obtienes el subtotal dividiendo entre 1.16:
   $$
   \text{Subtotal} = \frac{\$23,200.00}{1.16} = \mathbf{\$20,000.00\text{ MXN}}
   $$
2. Obtienes el IVA restando el subtotal del total:
   $$
   \text{IVA} = \$23,200.00 - \$20,000.00 = \mathbf{\$3,200.00\text{ MXN}}
   $$

Puedes realizar esta operación al instante ingresando cualquier cifra en nuestra [Calculadora de IVA](/calculadoras/sat/calculadora-iva).

---

## 3. El Error Matemático Clásico: ¿Por qué NUNCA debes multiplicar por 0.16 para quitar el IVA?

Uno de los errores más comunes cometidos por emprendedores y comercios en México es intentar "quitar el IVA" multiplicando el precio final por 0.16 y restando esa cifra. **Hacer esto genera una pérdida económica inmediata.**

### La Demostración de la Pérdida:
Imagina un producto cuyo precio final con IVA es de **$11,600.00 MXN**:
- **Cálculo Erróneo:**
  - Calculan: $11,600.00 \times 0.16 = $1,856.00 MXN.
  - Restan: $11,600.00 - $1,856.00 = **$9,744.00 MXN** como supuesto subtotal.
  - ¡Esto está mal! Si a $9,744.00 le sumas el 16% de IVA ($1,559.04), solo obtendrías $11,303.04 MXN. Se generó una discrepancia de **$256.00 MXN**.
- **Cálculo Correcto (Dividir entre 1.16):**
  - $11,600.00 / 1.16 = **$10,000.00 MXN** de subtotal exacto.
  - IVA exacto = **$1,600.00 MXN**.

**Razón algebraica:** El 16% se calculó originalmente sobre una base de 100 partes. Por tanto, el total representa el 116% de la base, no el 100%. Para regresar al origen, la división obligatoria es entre 1.16.

---

## 4. El IVA en la Declaración Mensual: IVA Trasladado vs. IVA Acreditable

En la determinación mensual de impuestos ante el SAT (a presentar a más tardar el día 17 del mes siguiente), los contribuyentes con actividad empresarial, profesionistas independientes y personas morales calculan su saldo con base en dos variables:

1. **IVA Trasladado (Cobrado):** Es el IVA que efectivamente cobraste a tus clientes al vender productos o prestar servicios.
2. **IVA Acreditable (Pagado):** Es el IVA que tú pagaste a proveedores autorizados por compras, materias primas o gastos indispensables para tu operación.

### La Fórmula de Determinación:
$$
\text{IVA a Pagar al SAT} = \text{IVA Trasladado Cobrado} - \text{IVA Acreditable Pagado}
$$

- Si el IVA cobrado es mayor que el pagado, la diferencia debe transferirse al SAT.
- Si el IVA pagado es mayor que el cobrado (por ejemplo, al iniciar un negocio o realizar una inversión fuerte en maquinaria), se genera un **Saldo a Favor de IVA**, el cual puedes acreditar contra meses futuros o solicitar en devolución formal ante el SAT.

---

## 5. Requisitos Indispensables para que el IVA sea Acreditable

Conforme al Artículo 5 de la Ley del IVA, para que el SAT acepte que restes el IVA pagado de tus declaraciones, se deben cumplir los siguientes requisitos de ley:
- **Estrictamente indispensable:** El gasto debe ser necesario para la actividad por la que tributas para efectos de ISR.
- **CFDI 4.0 Válido:** Debes contar con la factura electrónica correspondiente donde el IVA esté expresamente desglosado.
- **Efectivamente pagado:** En el mes que se declara, el dinero debe haber salido efectivamente de tu cuenta bancaria.
- **Medios bancarizados obligatorios:** Cualquier gasto superior a $2,000.00 MXN (o combustible de cualquier importe) debe pagarse forzosamente mediante transferencia electrónica (SPEI), tarjeta de crédito, débito o cheque nominativo. Si se paga en efectivo, el IVA pierde su deducibilidad y acreditamiento ante el SAT.

---

## 6. Preguntas Frecuentes sobre el IVA (FAQs)

### ¿Quiénes están en RESICO pueden acreditar IVA?
Sí. Aunque en el Régimen Simplificado de Confianza (RESICO) no se permiten deducciones para el Impuesto Sobre la Renta (ISR), **las reglas del IVA se rigen por la Ley del IVA y no se modificaron**. Los contribuyentes en RESICO pueden acreditar el IVA pagado en sus gastos indispensables si cuentan con el CFDI correspondiente.

### ¿Qué diferencia hay entre Tasa 0% y Exento de IVA?
Los productos a **Tasa 0%** sí están sujetos a la Ley del IVA, pero con tasa cero, lo que otorga a los fabricantes y productores el derecho legal de solicitar la devolución en efectivo del IVA que pagaron a sus proveedores. Por el contrario, quienes realizan **actos exentos** no pueden solicitar devolución de IVA; el IVA que pagan se convierte en un costo no recuperable.

### ¿Cuándo aplica una retención de IVA del 10.6667%?
Conforme al Artículo 1-A de la LIVA, cuando una persona física presta servicios profesionales independientes o arrienda bienes a una Persona Moral (empresa), la empresa debe retenerle las dos terceras partes del IVA trasladado, lo que equivale exactamente al **10.6667%** sobre el subtotal.

---

### Ficha Técnica y Marco Jurídico
- **Autor e Investigación:** Firoz Khan (FkDigitalMedia).
- **Responsabilidad Editorial:** FkDigitalMedia — Revisión matemática y verificación con la Ley del Impuesto al Valor Agregado (LIVA).
- **Marco Legal:** Ley del Impuesto al Valor Agregado (LIVA) Artículos 1, 1-A, 2-A, 4 y 5; Código Fiscal de la Federación (CFF) Artículo 29-A.
- **Herramienta Interactiva:** [Calculadora de IVA en México](/calculadoras/sat/calculadora-iva).
- **Fecha de revisión:** 22 de septiembre de 2026.
