import React from 'react';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  placeholder?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ 
  label, 
  value, 
  onChange, 
  prefix = "$", 
  placeholder = "0.00" 
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-slate-500 sm:text-sm">{prefix}</span>
        </div>
        <input
          type="number"
          min="0"
          step="any"
          className="block w-full rounded-md border-slate-300 pl-7 py-2 text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm transition-all"
          placeholder={placeholder}
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        />
      </div>
    </div>
  );
};
