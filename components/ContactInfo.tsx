import React from 'react';
import { Mail, Heart } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  return (
    <div className="bg-slate-100 p-8 rounded-xl border border-slate-200 text-sm text-slate-600 mt-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Sobre Nosotros y Contacto</h2>
      <div className="space-y-4">
        <p>
          <strong>NominaMX</strong> es un proyecto independiente desarrollado con el fin de simplificar el entendimiento de la nómina y el cálculo de impuestos (ISR, IMSS, Subsidio) para los trabajadores y empleadores en México.
        </p>

        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500 font-bold" /> Nuestra Misión
        </h3>
        <p>
          Creemos que la transparencia salarial y la educación financiera son fundamentales para el bienestar laboral. Queremos ofrecer una herramienta rápida, visual y sumamente precisa que sirva de guía para entender las retenciones de ley y los beneficios como aguinaldo, vacaciones y fondos de ahorro.
        </p>

        <h3 className="font-semibold text-slate-800">
          Contacto y Soporte
        </h3>
        <p>
          ¿Tienes sugerencias, encontraste algún error en las fórmulas, o te gustaría sugerir una nueva funcionalidad? Valoramos enormemente la retroalimentación de la comunidad. Puedes ponerte en contacto con nosotros a través del siguiente medio:
        </p>

        <div className="pt-2">
          <a 
            href="mailto:javier.rodriguez.corona60@gmail.com" 
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all font-medium text-slate-700 w-fit"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            calculadoradesalarioneto@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
