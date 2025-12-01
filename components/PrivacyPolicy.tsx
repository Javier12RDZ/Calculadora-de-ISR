import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-100 p-8 rounded-xl border border-slate-200 text-sm text-slate-600 mt-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Política de Privacidad</h2>
      <div className="space-y-4">
        <p>
          <strong>Última actualización: Noviembre 2025</strong>
        </p>
        <p>
          En <strong>NominaMX</strong>, respetamos su privacidad y estamos comprometidos a protegerla mediante el cumplimiento de esta política.
        </p>
        
        <h3 className="font-semibold text-slate-800">1. Información que recopilamos</h3>
        <p>
          Nuestra calculadora funciona completamente en su navegador (lado del cliente). <strong>No almacenamos, guardamos ni transmitimos</strong> los datos salariales, montos o información personal que usted ingresa en los formularios a nuestros servidores. Los cálculos se realizan localmente en su dispositivo.
        </p>

        <h3 className="font-semibold text-slate-800">2. Cookies y Tecnologías de Rastreo</h3>
        <p>
          Utilizamos cookies y tecnologías similares para mejorar su experiencia y analizar nuestro tráfico. También utilizamos servicios de terceros, como Google AdSense y Google Analytics.
        </p>
        <ul className="list-disc pl-5">
          <li>
            <strong>Google AdSense:</strong> Utilizamos Google AdSense para mostrar anuncios. Google utiliza cookies para mostrar anuncios basados en las visitas anteriores del usuario a su sitio web o a otros sitios web. Los usuarios pueden inhabilitar la publicidad personalizada visitando la Configuración de anuncios de Google.
          </li>
        </ul>

        <h3 className="font-semibold text-slate-800">3. Uso de la Información</h3>
        <p>
          La información ingresada en la calculadora se utiliza exclusivamente para mostrarle los resultados de la estimación de impuestos en tiempo real. Estos datos se borran al cerrar o recargar la página.
        </p>

        <h3 className="font-semibold text-slate-800">4. Contacto</h3>
        <p>
          Si tiene preguntas sobre esta política de privacidad, puede contactarnos a través de los medios facilitados en este sitio web.
        </p>
      </div>
    </div>
  );
};
