'use client';

import React, { useState } from 'react';

interface ContactFormProps {
  lang: string;
}

export default function ContactForm({ lang }: ContactFormProps) {
  const isEn = lang === 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: isEn ? 'General Inquiry' : 'Consulta General',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-4 space-y-3">
        <span className="text-5xl block animate-bounce">🎉</span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {isEn ? 'Message Sent Successfully!' : '¡Mensaje Enviado Exitosamente!'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          {isEn
            ? 'Thank you for writing to us. Our editorial and technical team will review your inquiry shortly.'
            : 'Gracias por ponerte en contacto. Nuestro equipo técnico y editorial revisará tu consulta a la brevedad.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          {isEn ? 'Full Name' : 'Nombre Completo'}
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={isEn ? 'e.g. Maria Gonzalez' : 'Ej: María González'}
          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          {isEn ? 'Email Address' : 'Correo Electrónico'}
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={isEn ? 'e.g. your-email@example.com' : 'correo@ejemplo.com'}
          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          {isEn ? 'Subject' : 'Asunto / Motivo'}
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEn ? (
            <>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Calculator Suggestion">Calculator Suggestion / Improvement</option>
              <option value="Report a Bug">Report a Calculation Bug</option>
              <option value="Commercial Contact">Commercial Contact / Advertising</option>
            </>
          ) : (
            <>
              <option value="Consulta General">Consulta General</option>
              <option value="Sugerencia de Calculadora">Sugerencia de Nueva Herramienta</option>
              <option value="Reporte de Error">Reporte de Error en Cálculo</option>
              <option value="Contacto Comercial">Contacto Comercial y Publicidad</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          {isEn ? 'Message' : 'Mensaje o Consulta'}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={
            isEn
              ? 'Type your query or detailed comment here...'
              : 'Escribe tu mensaje, sugerencia o detalle del cálculo...'
          }
          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition duration-200 hover:scale-[1.01] active:scale-[0.99]"
      >
        {isEn ? 'Send Message 🚀' : 'Enviar Mensaje 🚀'}
      </button>
    </form>
  );
}
