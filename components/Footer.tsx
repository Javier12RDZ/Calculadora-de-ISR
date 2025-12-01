import React from 'react';

interface FooterProps {
  onShowPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowPrivacy }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-800">NominaMX</h3>
          <p className="text-sm text-slate-500">Calculadora Fiscal y de Nómina para México.</p>
          <p className="text-xs text-slate-400 mt-1">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
        
        <div className="flex gap-6 text-sm text-slate-600">
          <button onClick={onShowPrivacy} className="hover:text-blue-600 transition-colors">
            Política de Privacidad
          </button>
          <span className="text-slate-300">|</span>
          <a href="#" className="hover:text-blue-600 transition-colors pointer-events-none text-slate-400">
            Términos de Uso
          </a>
        </div>
      </div>
    </footer>
  );
};
