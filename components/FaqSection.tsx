import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "¿Por qué mi sueldo neto es menor al que pacté?",
    answer: "Generalmente, los salarios se negocian en términos 'brutos' (antes de impuestos). La diferencia corresponde a las retenciones de ISR e IMSS que tu patrón está obligado a hacer por ley."
  },
  {
    question: "¿Esta calculadora incluye el Subsidio al Empleo?",
    answer: "Sí. El cálculo detecta automáticamente si tu rango salarial es elegible para el Subsidio para el Empleo vigente en 2024 y lo aplica al resultado final."
  },
  {
    question: "¿Cómo afecta el Aguinaldo a mis impuestos?",
    answer: "El aguinaldo está exento de ISR hasta por un monto equivalente a 30 UMAs (Unidad de Medida y Actualización). Lo que exceda de esa cantidad genera impuestos. Nuestra calculadora separa esta exención para darte un resultado más preciso."
  },
  {
    question: "¿Qué es el Salario Diario Integrado (SDI)?",
    answer: "Es el salario diario más todas las prestaciones que recibes (aguinaldo, vacaciones, primas, bonos, comidas, etc.). Se usa principalmente para calcular tus cuotas del IMSS e INFONAVIT."
  },
  {
    question: "¿Las tablas de ISR cambian cada año?",
    answer: "Las tarifas pueden actualizarse cuando la inflación acumulada supera el 10%. Para 2024, se utilizan las tablas actualizadas publicadas en el Anexo 8 de la Resolución Miscelánea Fiscal."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          Preguntas Frecuentes
        </h2>
        <p className="text-slate-600 mt-2">Resolvemos tus dudas sobre nómina e impuestos en México</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        {faqs.map((faq, index) => (
          <div key={index} className="transition-all hover:bg-slate-50">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
            >
              <span className="font-medium text-slate-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
