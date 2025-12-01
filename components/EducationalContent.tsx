import React from 'react';
import { BookOpen, TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';

export const EducationalContent: React.FC = () => {
  return (
    <div className="mt-12 space-y-12">
      
      {/* ISR Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">¿Qué es el ISR y cómo se calcula en 2024?</h2>
            <p className="text-slate-500 mt-1">Impuesto Sobre la Renta en México</p>
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p>
            El <strong>Impuesto Sobre la Renta (ISR)</strong> es una contribución directa que se aplica a las ganancias obtenidas durante el ejercicio fiscal. Para los trabajadores asalariados, este impuesto es retenido directamente por el empleador y reportado al SAT (Servicio de Administración Tributaria).
          </p>
          <h3 className="text-lg font-semibold text-slate-800 mt-4">El Proceso de Cálculo</h3>
          <p>
            El cálculo del ISR no es lineal; es progresivo. Esto significa que mientras más ganas, mayor es el porcentaje que pagas. El proceso se basa en las <strong>Tablas de ISR 2024</strong> publicadas en el Diario Oficial de la Federación (DOF).
          </p>
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li><strong>Identificar el Ingreso Gravable:</strong> Se toma tu salario bruto y se restan los conceptos exentos de impuestos.</li>
            <li><strong>Ubicar el Rango:</strong> Se busca tu ingreso gravable en la tabla de ISR correspondiente a tu periodo de pago (semanal, quincenal o mensual).</li>
            <li><strong>Aplicar la Tasa:</strong> Se identifica el límite inferior, la cuota fija y el porcentaje excedente de tu rango.</li>
            <li><strong>Fórmula:</strong> <em>(Ingreso - Límite Inferior) × Porcentaje + Cuota Fija = ISR a Retener.</em></li>
          </ol>
        </div>
      </div>

      {/* IMSS Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Cuotas del IMSS: Tu Seguridad Social</h2>
            <p className="text-slate-500 mt-1">Instituto Mexicano del Seguro Social</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600">
          <p>
            Las cuotas del IMSS son las aportaciones tripartitas (Trabajador, Patrón y Estado) que garantizan tu acceso a la salud y prestaciones sociales. Como trabajador, se te descuenta una parte de tu salario para cubrir ciertos rubros.
          </p>
          <h3 className="text-lg font-semibold text-slate-800 mt-4">Conceptos que paga el trabajador:</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Enfermedades y Maternidad:</strong> Cubre atención médica y prestaciones en dinero.</li>
            <li><strong>Invalidez y Vida:</strong> Protección ante contingencias que te impidan trabajar.</li>
            <li><strong>Cesantía en Edad Avanzada y Vejez:</strong> Aportaciones para tu fondo de retiro (Afore).</li>
            <li><strong>Gastos Médicos para Pensionados:</strong> Cobertura futura.</li>
          </ul>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4 flex gap-3">
            <AlertCircle className="w-6 h-6 text-slate-400 flex-shrink-0" />
            <p className="text-sm">
              <strong>Nota Importante:</strong> El Salario Base de Cotización (SBC) suele ser mayor a tu salario diario nominal, ya que integra prestaciones como aguinaldo y prima vacacional. Nuestra calculadora estima el IMSS basándose en un factor de integración estándar mínimo.
            </p>
          </div>
        </div>
      </div>

      {/* Subsidio Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-orange-100 rounded-lg">
            <BookOpen className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Subsidio para el Empleo 2024</h2>
            <p className="text-slate-500 mt-1">Apoyo para salarios bajos</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600">
          <p>
            El <strong>Subsidio para el Empleo</strong> es un beneficio fiscal diseñado para apoyar a los trabajadores con menores ingresos. Si tu salario es bajo, el gobierno puede otorgarte un monto mensual que reduce el ISR a pagar, e incluso puede resultar en un saldo a favor.
          </p>
          <p className="mt-2">
            En 2024, este subsidio se aplica automáticamente a quienes ganan menos de cierta cantidad mensual (aproximadamente $7,382.33 MXN en la zona general, aunque esto puede variar según las actualizaciones fiscales).
          </p>
        </div>
      </div>

    </div>
  );
};
