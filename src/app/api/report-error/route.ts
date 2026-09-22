import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      pageOrCalculator,
      problem,
      expectedResult,
      actualResult,
      supportingSource,
      userMessage,
      email,
    } = body;

    // Validate required fields
    if (!pageOrCalculator || !problem || !userMessage) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes (pageOrCalculator, problem, userMessage)' },
        { status: 400 }
      );
    }

    // Sanitize and structure the received report
    const reportData = {
      timestamp: new Date().toISOString(),
      pageOrCalculator: String(pageOrCalculator).slice(0, 300),
      problem: String(problem).slice(0, 500),
      expectedResult: String(expectedResult || '').slice(0, 1000),
      actualResult: String(actualResult || '').slice(0, 1000),
      supportingSource: String(supportingSource || '').slice(0, 1000),
      userMessage: String(userMessage).slice(0, 3000),
      email: email ? String(email).slice(0, 150) : null,
    };

    // Log the error report for technical review
    console.log('[ERROR_REPORT_RECEIVED]', JSON.stringify(reportData));

    return NextResponse.json({
      success: true,
      message: 'Reporte recibido correctamente. Será auditado en un plazo máximo de 48 horas hábiles.',
      reportId: `ERR-${Date.now()}`,
    });
  } catch (error) {
    console.error('Error processing error report:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar el reporte de error.' },
      { status: 500 }
    );
  }
}
