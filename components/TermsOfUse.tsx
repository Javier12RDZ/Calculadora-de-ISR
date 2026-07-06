import React from 'react';

export const TermsOfUse: React.FC = () => {
  return (
    <div className="bg-slate-100 p-8 rounded-xl border border-slate-200 text-sm text-slate-600 mt-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Términos de Uso</h2>
      <div className="space-y-4">
        <p>
          <strong>Última actualización: Julio 2026</strong>
        </p>
        <p>
          Bienvenido a <strong>NominaMX</strong> (en adelante, "el Sitio"). Al acceder y utilizar este sitio web, usted acepta cumplir con los siguientes términos y condiciones de uso.
        </p>

        <h3 className="font-semibold text-slate-800">1. Naturaleza Informativa</h3>
        <p>
          La información y los cálculos proporcionados por esta herramienta son de carácter <strong>puramente ilustrativo e informativo</strong>. Aunque nos esforzamos por mantener las fórmulas, porcentajes y límites actualizados conforme a las leyes fiscales vigentes en México (tablas de ISR y cuotas de seguridad social del IMSS), estos resultados no constituyen asesoramiento financiero, contable o legal oficial.
        </p>

        <h3 className="font-semibold text-slate-800">2. Exclusión de Responsabilidad</h3>
        <p>
          El Sitio no se hace responsable por decisiones tomadas, pérdidas, malentendidos u obligaciones contraídas por parte del usuario en base a los cálculos de esta herramienta. Para cualquier decisión oficial relacionada con su nómina, declaración de impuestos o asesoría fiscal, le recomendamos encarecidamente consultar a un contador público certificado o acudir directamente al SAT o al IMSS.
        </p>

        <h3 className="font-semibold text-slate-800">3. Propiedad Intelectual</h3>
        <p>
          El diseño, el código fuente y las marcas asociadas de NominaMX son propiedad de sus respectivos desarrolladores. Queda prohibida la reproducción parcial o total con fines comerciales sin el consentimiento previo por escrito.
        </p>

        <h3 className="font-semibold text-slate-800">4. Modificaciones del Servicio</h3>
        <p>
          Nos reservamos el derecho de modificar, actualizar o suspender temporal o permanentemente el funcionamiento del Sitio o cualquier sección del mismo en cualquier momento y sin previo aviso.
        </p>
      </div>
    </div>
  );
};
