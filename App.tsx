import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Calculator, DollarSign, HelpCircle, Info, MinusCircle, Clock, Wallet, Gift, ArrowRight, Sun, Percent, Calendar, Sunrise, Plus, Trash2, Scale } from 'lucide-react';
import { CurrencyInput } from './components/CurrencyInput';
import { DonutChart } from './components/DonutChart';
import { calculateTaxes, calculateAguinaldo, calculatePrimaVacacional, getPeriodFactor, getDaysInPeriod } from './services/calculatorService';
import { CalculationResult, Periodicity, AguinaldoResult, PrimaVacacionalResult, Deduction, ComparisonData } from './types';
import { EducationalContent } from './components/EducationalContent';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';

const App: React.FC = () => {
  // State for inputs
  const [periodicity, setPeriodicity] = useState<Periodicity>(Periodicity.WEEKLY);
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [dailySalary, setDailySalary] = useState<number>(0);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [holidaysWorked, setHolidaysWorked] = useState<number>(0);
  const [sundaysWorked, setSundaysWorked] = useState<number>(0);
  
  // Aguinaldo State
  const [aguinaldoDays, setAguinaldoDays] = useState(15);
  const [aguinaldoResult, setAguinaldoResult] = useState<AguinaldoResult | null>(null);

  // Prima Vacacional State
  const [vacationDays, setVacationDays] = useState(12);
  const [vacationPremiumPercent, setVacationPremiumPercent] = useState(25);
  const [primaVacacionalResult, setPrimaVacacionalResult] = useState<PrimaVacacionalResult | null>(null);

  const [imssOverride, setImssOverride] = useState<number | undefined>(undefined);
  const [savingsFundPercent, setSavingsFundPercent] = useState<number>(0);
  const [employerSavingsFundMatch, setEmployerSavingsFundMatch] = useState<boolean>(false);
  const [savingsBoxAmount, setSavingsBoxAmount] = useState<number>(0);
  const [otherDeductionsList, setOtherDeductionsList] = useState<Deduction[]>([]);
  const [comparisons, setComparisons] = useState<ComparisonData[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [showPrivacy, setShowPrivacy] = useState(false);
  const privacyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dailySalary > 0) {
      setGrossSalary(dailySalary * 7);
      setPeriodicity(Periodicity.WEEKLY);
    }
  }, [dailySalary]);

  // Initialize AdSense
  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  useEffect(() => {
    if (showPrivacy && privacyRef.current) {
      privacyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showPrivacy]);

  // Calculated Result
  const result: CalculationResult = useMemo(() => {
    return calculateTaxes({
      grossSalary,
      periodicity,
      imssOverride: imssOverride === 0 && grossSalary === 0 ? undefined : imssOverride, 
      savingsFundPercent,
      employerSavingsFundMatch,
      savingsBoxAmount,
      otherDeductionsList,
      overtimeHours,
      holidaysWorked,
      sundaysWorked,
      aguinaldoDays,
      vacationDays,
      vacationPremiumPercent,
    });
  }, [grossSalary, periodicity, imssOverride, savingsFundPercent, employerSavingsFundMatch, savingsBoxAmount, otherDeductionsList, overtimeHours, holidaysWorked, sundaysWorked, aguinaldoDays, vacationDays, vacationPremiumPercent]);

  // Handlers
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

  const addDeduction = () => {
    const newDeduction: Deduction = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'Seguro, préstamo, etc.',
      amount: 0
    };
    setOtherDeductionsList([...otherDeductionsList, newDeduction]);
  };

  const updateDeduction = (id: string, label: string, amount: number) => {
    setOtherDeductionsList(otherDeductionsList.map(d => d.id === id ? { ...d, label, amount } : d));
  };

  const removeDeduction = (id: string) => {
    setOtherDeductionsList(otherDeductionsList.filter(d => d.id !== id));
  };

  const addToComparison = () => {
    const label = prompt('Nombre para esta oferta (ej. Oferta A, Empresa X):');
    if (label) {
      const currentDailySalary = dailySalary > 0 ? dailySalary : (grossSalary > 0 ? grossSalary / getDaysInPeriod(periodicity) : 0);
      const calcAguinaldo = calculateAguinaldo(currentDailySalary, aguinaldoDays);
      const calcPrimaVacacional = calculatePrimaVacacional(currentDailySalary, vacationDays, vacationPremiumPercent);

      setComparisons([...comparisons, {
        label,
        inputs: {
          grossSalary,
          periodicity,
          imssOverride,
          savingsFundPercent,
          employerSavingsFundMatch,
          savingsBoxAmount,
          otherDeductionsList: [...otherDeductionsList],
          overtimeHours,
          holidaysWorked,
          sundaysWorked,
          aguinaldoDays,
          vacationDays,
          vacationPremiumPercent,
        },
        result: { ...result },
        aguinaldo: calcAguinaldo,
        primaVacacional: calcPrimaVacacional
      }]);
    }
  };

  const removeComparison = (index: number) => {
    setComparisons(comparisons.filter((_, i) => i !== index));
  };

  const handleCalculateAguinaldo = () => {
    const currentDailySalary = dailySalary > 0 ? dailySalary : (grossSalary > 0 ? grossSalary / getDaysInPeriod(periodicity) : 0);
    const res = calculateAguinaldo(currentDailySalary, aguinaldoDays);
    setAguinaldoResult(res);
  };

  const handleCalculatePrimaVacacional = () => {
    const currentDailySalary = dailySalary > 0 ? dailySalary : (grossSalary > 0 ? grossSalary / getDaysInPeriod(periodicity) : 0);
    const res = calculatePrimaVacacional(currentDailySalary, vacationDays, vacationPremiumPercent);
    setPrimaVacacionalResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-0 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">NominaMX</h1>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            Tablas ISR 2026
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Calculadora de Sueldo Neto México 2026</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Estima tu salario neto mensual, quincenal o semanal después de impuestos (ISR) y deducciones de ley (IMSS). 
              Nuestra herramienta te ayuda a entender tu nómina y planificar tus finanzas personales.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Ingresos y Periodo
              </h2>
              
              <div className="space-y-5">
                {/* Periodicity Selector */}
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-600">Frecuencia de Pago</label>
                    <button 
                      onClick={addToComparison}
                      className="text-xs flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100 transition-colors"
                    >
                      <Scale className="w-3 h-3" /> Comparar
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.values(Periodicity).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPeriodicity(p);
                          if (dailySalary > 0) {
                            setGrossSalary(dailySalary * getDaysInPeriod(p));
                          }
                        }}
                        className={`py-2 px-3 text-sm font-medium rounded-md transition-all ${
                          periodicity === p
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CurrencyInput
                    label="Salario Diario Bruto"
                    value={dailySalary}
                    onChange={setDailySalary}
                    placeholder="Ej. 500"
                  />
                  <CurrencyInput
                    label={`Salario Bruto (${periodicity})`}
                    value={grossSalary}
                    onChange={(value) => {
                      setGrossSalary(value);
                      if (dailySalary > 0) {
                        setDailySalary(0);
                      }
                    }}
                    placeholder="Ej. 15000"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-600">Horas Extra (Total)</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Clock className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        className="block w-full rounded-md border-slate-300 pl-9 py-2 text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm transition-all"
                        placeholder="0"
                        value={overtimeHours === 0 ? '' : overtimeHours}
                        onChange={(e) => setOvertimeHours(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-600">Días Festivos Laborados</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Calendar className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        className="block w-full rounded-md border-slate-300 pl-9 py-2 text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm transition-all"
                        placeholder="0"
                        value={holidaysWorked === 0 ? '' : holidaysWorked}
                        onChange={(e) => setHolidaysWorked(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-600">Domingos Laborados</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Sunrise className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        className="block w-full rounded-md border-slate-300 pl-9 py-2 text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm transition-all"
                        placeholder="0"
                        value={sundaysWorked === 0 ? '' : sundaysWorked}
                        onChange={(e) => setSundaysWorked(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <MinusCircle className="w-5 h-5 text-orange-500" />
                  Deducciones Ordinarias
                </h2>
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 underline"
                >
                  {showAdvanced ? 'Ocultar Avanzados' : 'Mostrar Avanzados'}
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col space-y-1">
                   <label className="text-sm font-medium text-slate-600 flex justify-between">
                     <span>IMSS (Estimado: {result.imss > 0 ? formatCurrency(result.imss) : '$0.00'})</span>
                     <span className="text-xs text-slate-400 font-normal">aprox ~2.7%</span>
                   </label>
                   {showAdvanced && (
                     <CurrencyInput
                        label="Sobrescribir monto IMSS (Opcional)"
                        value={imssOverride ?? 0}
                        onChange={(val) => setImssOverride(val === 0 ? undefined : val)}
                        placeholder={result.imss.toFixed(2)}
                     />
                   )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-slate-600">Fondo de Ahorro (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="block w-full rounded-md border-slate-300 px-3 py-2 text-slate-900 ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm"
                        placeholder="0"
                        value={savingsFundPercent === 0 ? '' : savingsFundPercent}
                        onChange={(e) => setSavingsFundPercent(parseFloat(e.target.value) || 0)}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                            checked={employerSavingsFundMatch}
                            onChange={(e) => setEmployerSavingsFundMatch(e.target.checked)}
                          />
                          <span className="text-[10px] text-slate-500 font-medium">Patrón duplica (1:1)</span>
                        </label>
                        <p className="text-xs text-slate-400">
                          {formatCurrency(result.savingsFund)}
                        </p>
                      </div>
                   </div>                   
                   <CurrencyInput
                      label="Caja de Ahorro ($)"
                      value={savingsBoxAmount}
                      onChange={setSavingsBoxAmount}
                   />
                </div>
                
                {/* Other Deductions List */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-slate-700">Otras Deducciones</label>
                    <button 
                      onClick={addDeduction}
                      className="text-xs flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded hover:bg-orange-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Añadir
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {otherDeductionsList.map((deduction) => (
                      <div key={deduction.id} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <input 
                          type="text" 
                          className="flex-grow bg-transparent border-none text-xs focus:ring-0 p-0"
                          value={deduction.label}
                          onChange={(e) => updateDeduction(deduction.id, e.target.value, deduction.amount)}
                        />
                        <div className="w-24">
                          <CurrencyInput
                            label=""
                            value={deduction.amount}
                            onChange={(val) => updateDeduction(deduction.id, deduction.label, val)}
                            placeholder="0.00"
                            minimal
                          />
                        </div>
                        <button onClick={() => removeDeduction(deduction.id)} className="text-slate-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {otherDeductionsList.length === 0 && (
                      <p className="text-xs text-slate-400 italic text-center py-2">No hay otras deducciones (ej. Infonavit, Préstamos)</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Aguinaldo & Prima Vacacional (Combined for space) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-500" />
                  Aguinaldo
                </h2>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-slate-600">Días</label>
                  <input
                    type="number"
                    min="0"
                    className="block w-full rounded-md border-slate-300 px-3 py-2 text-slate-900 ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm"
                    value={aguinaldoDays}
                    onChange={(e) => setAguinaldoDays(parseInt(e.target.value) || 0)}
                  />
                </div>
                <button
                  onClick={handleCalculateAguinaldo}
                  className="mt-4 w-full bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Calcular
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  Prima Vac.
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-600">Días</label>
                    <input
                      type="number"
                      className="block w-full rounded-md border-slate-300 px-2 py-2 text-slate-900 ring-1 ring-slate-300 text-xs"
                      value={vacationDays}
                      onChange={(e) => setVacationDays(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-600">%</label>
                    <input
                      type="number"
                      className="block w-full rounded-md border-slate-300 px-2 py-2 text-slate-900 ring-1 ring-slate-300 text-xs"
                      value={vacationPremiumPercent}
                      onChange={(e) => setVacationPremiumPercent(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <button
                  onClick={handleCalculatePrimaVacacional}
                  className="mt-4 w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Calcular
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 space-y-6">
            {/* Regular Pay Card */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Nómina {periodicity} (Neto 2026)</p>
                  <h2 className="text-4xl font-bold tracking-tight">{formatCurrency(result.netRegular)}</h2>
                  <p className="text-slate-400 text-sm mt-1">Sueldo neto después de impuestos y deducciones</p>
                </div>
                <button 
                  onClick={addToComparison}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Scale className="w-5 h-5" /> Guardar para Comparar
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                 <div className="order-2 md:order-1">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide border-b border-slate-100 pb-2">Desglose Ordinario</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                          Salario Base
                        </span>
                        <span className="font-medium text-slate-900">{formatCurrency(result.grossSalary)}</span>
                      </li>
                       {result.overtimePay > 0 && (
                        <li className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-2 text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                            Horas Extra
                          </span>
                          <span className="font-medium text-slate-900">+{formatCurrency(result.overtimePay)}</span>
                        </li>
                      )}
                      <li className="flex justify-between items-center text-sm pt-2 mt-2 border-t border-slate-100">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          ISR Retenido
                        </span>
                        <span className="font-medium text-slate-900">-{formatCurrency(result.isrRegular)}</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          IMSS Obrero
                        </span>
                        <span className="font-medium text-slate-900">-{formatCurrency(result.imss)}</span>
                      </li>
                       {(result.savingsFund > 0 || result.savingsBox > 0) && (
                         <li className="flex justify-between items-center text-sm">
                           <span className="flex items-center gap-2 text-slate-600">
                             <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                             Ahorro (Retenido)
                           </span>
                           <span className="font-medium text-slate-900">-{formatCurrency(result.savingsFund + result.savingsBox)}</span>
                         </li>
                       )}
                       {result.employerSavingsFund > 0 && (
                         <li className="flex justify-between items-center text-sm">
                           <span className="flex items-center gap-2 text-slate-600">
                             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                             Aportación Patronal
                           </span>
                           <span className="font-medium text-emerald-600">+{formatCurrency(result.employerSavingsFund)}</span>
                         </li>
                       )}                      {result.otherDeductionsTotal > 0 && (
                        <li className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-2 text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                            Otras Deducciones
                          </span>
                          <span className="font-medium text-slate-900">-{formatCurrency(result.otherDeductionsTotal)}</span>
                        </li>
                      )}
                      <li className="flex justify-between items-center text-sm pt-3 border-t border-slate-100 mt-2">
                        <span className="font-semibold text-slate-800">Total Deducciones</span>
                        <span className="font-bold text-red-600">-{formatCurrency(result.totalDeductionsRegular)}</span>
                      </li>
                    </ul>
                 </div>
                 <div className="order-1 md:order-2 flex justify-center">
                    <DonutChart data={result} />
                 </div>
              </div>
            </div>

            {/* Comparisons Section */}
            {comparisons.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-indigo-600" />
                    Comparativa de Ofertas
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">{comparisons.length} guardadas</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left py-2 font-semibold text-slate-600">Concepto</th>
                        {comparisons.map((c, i) => (
                          <th key={i} className="text-right py-2 px-3 font-bold text-indigo-700">
                            <div className="flex flex-col">
                              <span>{c.label}</span>
                              <span className="text-[10px] font-medium text-slate-400">{c.inputs.periodicity}</span>
                              <button onClick={() => removeComparison(i)} className="text-[10px] text-red-400 hover:text-red-600 font-normal mt-1">Eliminar</button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr>
                        <td className="py-2 text-slate-500">Sueldo Bruto</td>
                        {comparisons.map((c, i) => (
                          <td key={i} className="text-right py-2 px-3">{formatCurrency(c.inputs.grossSalary)}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-500">Impuestos (ISR)</td>
                        {comparisons.map((c, i) => (
                          <td key={i} className="text-right py-2 px-3 text-red-500">-{formatCurrency(c.result.isrRegular)}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-500">IMSS + Otras Ded.</td>
                        {comparisons.map((c, i) => (
                          <td key={i} className="text-right py-2 px-3 text-red-500">-{formatCurrency(c.result.totalDeductionsRegular - c.result.isrRegular - c.result.savingsFund - c.result.savingsBox)}</td>
                        ))}
                      </tr>
                      {(comparisons.some(c => c.result.savingsFund > 0 || c.result.savingsBox > 0)) && (
                        <tr>
                          <td className="py-2 text-slate-500">Ahorro (Retenido)</td>
                          {comparisons.map((c, i) => (
                            <td key={i} className="text-right py-2 px-3 text-blue-500">-{formatCurrency(c.result.savingsFund + c.result.savingsBox)}</td>
                          ))}
                        </tr>
                      )}
                      <tr className="bg-slate-50/50 font-bold">
                        <td className="py-3 px-2 text-slate-800 border-t border-slate-100">Sueldo NETO ({periodicity})</td>
                        {comparisons.map((c, i) => (
                          <td key={i} className="text-right py-3 px-3 text-slate-900 border-t border-slate-100">{formatCurrency(c.result.netRegular)}</td>
                        ))}
                      </tr>

                      {/* Benefits Section */}
                      <tr className="bg-indigo-50/30">
                        <td colSpan={comparisons.length + 1} className="py-2 px-2 text-xs font-bold text-indigo-800 uppercase tracking-wider">Beneficios Anuales</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-500 flex items-center gap-1">
                          <Gift className="w-3 h-3" /> Aguinaldo (Neto)
                        </td>
                        {comparisons.map((c, i) => (
                          <td key={i} className="text-right py-2 px-3">{formatCurrency(c.aguinaldo?.netAguinaldo || 0)}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-500 flex items-center gap-1">
                          <Sun className="w-3 h-3" /> Prima Vacacional (Neto)
                        </td>
                        {comparisons.map((c, i) => (
                          <td key={i} className="text-right py-2 px-3">{formatCurrency(c.primaVacacional?.netPrimaVacacional || 0)}</td>
                        ))}
                      </tr>
                      {comparisons.some(c => c.result.employerSavingsFund > 0) && (
                        <tr>
                          <td className="py-2 text-slate-500">Fondo Ahorro (Patrón)</td>
                          {comparisons.map((c, i) => (
                            <td key={i} className="text-right py-2 px-3 text-green-600">+{formatCurrency(c.result.employerSavingsFund * (getPeriodFactor(c.inputs.periodicity) * 12))}</td>
                          ))}
                        </tr>
                      )}
                      
                      {/* Subtotal Anual */}
                      <tr className="bg-green-50/50 font-bold">
                        <td className="py-3 px-2 text-slate-800">TOTAL ANUAL (Neto + Ahorros)</td>
                        {comparisons.map((c, i) => {
                          const factor = getPeriodFactor(c.inputs.periodicity);
                          const annualNet = c.result.netRegular * factor * 12;
                          const annualAguinaldo = c.aguinaldo?.netAguinaldo || 0;
                          const annualPrimaVac = c.primaVacacional?.netPrimaVacacional || 0;
                          const annualSavingsEmployee = (c.result.savingsFund + c.result.savingsBox) * factor * 12;
                          const annualSavingsEmployer = c.result.employerSavingsFund * factor * 12;
                          const total = annualNet + annualAguinaldo + annualPrimaVac + annualSavingsEmployee + annualSavingsEmployer;
                          return (
                            <td key={i} className="text-right py-3 px-3 text-green-700">
                              <div className="flex flex-col">
                                <span>{formatCurrency(total)}</span>
                                <span className="text-[10px] font-normal text-slate-500">Mensual prom: {formatCurrency(total / 12)}</span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Aguinaldo Card - SEPARATE */}
            {aguinaldoResult && (
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-sm border border-pink-100 p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Gift className="w-24 h-24 text-pink-600" />
                 </div>
                 <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-4">
                     <div className="p-2 bg-pink-100 rounded-lg">
                        <Gift className="w-5 h-5 text-pink-600" />
                     </div>
                     <h3 className="text-lg font-bold text-pink-900">Resultado del Aguinaldo</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                         <p className="text-xs text-pink-600 uppercase font-medium mb-1">Monto Bruto</p>
                         <p className="text-xl font-semibold text-pink-900">{formatCurrency(aguinaldoResult.aguinaldoPay)}</p>
                         <p className="text-xs text-pink-400 mt-1">{aguinaldoDays} días de salario</p>
                      </div>
                      <div>
                         <p className="text-xs text-pink-600 uppercase font-medium mb-1">ISR a Retener</p>
                         <p className="text-xl font-semibold text-red-500">-{formatCurrency(aguinaldoResult.isrAguinaldo)}</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 border border-pink-100">
                         <p className="text-xs text-pink-600 uppercase font-bold mb-1">Neto a Recibir</p>
                         <p className="text-2xl font-bold text-green-600">{formatCurrency(aguinaldoResult.netAguinaldo)}</p>
                      </div>
                   </div>
                 </div>
              </div>
            )}
            
            {/* Prima Vacacional Card - SEPARATE */}
            {primaVacacionalResult && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-yellow-100 p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sun className="w-24 h-24 text-yellow-600" />
                 </div>
                 <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-4">
                     <div className="p-2 bg-yellow-100 rounded-lg">
                        <Sun className="w-5 h-5 text-yellow-600" />
                     </div>
                     <h3 className="text-lg font-bold text-yellow-900">Prima Vacacional</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                         <p className="text-xs text-yellow-600 uppercase font-medium mb-1">Monto Bruto</p>
                         <p className="text-xl font-semibold text-yellow-900">{formatCurrency(primaVacacionalResult.primaVacacionalPay)}</p>
                         <p className="text-xs text-yellow-400 mt-1">{vacationDays} días de salario base</p>
                      </div>
                      <div>
                         <p className="text-xs text-yellow-600 uppercase font-medium mb-1">ISR a Retener</p>
                         <p className="text-xl font-semibold text-red-500">-{formatCurrency(primaVacacionalResult.isrPrimaVacacional)}</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 border border-yellow-100">
                         <p className="text-xs text-yellow-600 uppercase font-bold mb-1">Neto a Recibir</p>
                         <p className="text-2xl font-bold text-green-600">{formatCurrency(primaVacacionalResult.netPrimaVacacional)}</p>
                      </div>
                   </div>
                 </div>
              </div>
            )}
            
            {/* Ad Unit */}
            <div className="flex justify-center my-8">
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-8650238416383621"
                   data-ad-slot="4125717924"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                 <div className="p-2 bg-green-100 rounded-lg">
                   <Wallet className="w-6 h-6 text-green-600" />
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 font-medium uppercase">Disponible Anual (Estimado)</p>
                   <p className="text-lg font-bold text-slate-800">
                     {formatCurrency((result.netRegular * (periodicity === Periodicity.WEEKLY ? 52 : periodicity === Periodicity.BIWEEKLY ? 24 : 12)) + (aguinaldoResult?.netAguinaldo ?? 0) + (primaVacacionalResult?.netPrimaVacacional ?? 0) )}
                   </p>
                 </div>
              </div>
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                 <div className="p-2 bg-purple-100 rounded-lg">
                   <HelpCircle className="w-6 h-6 text-purple-600" />
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 font-medium uppercase">Tasa Efectiva (Nómina)</p>
                   <p className="text-lg font-bold text-slate-800">
                     {result.effectiveTaxRate.toFixed(2)}%
                   </p>
                 </div>
              </div>
            </div>



          </div>
        </div>
        
        {/* Educational Content and FAQ - New Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Sobre esta herramienta</h2>
            <div className="prose prose-slate max-w-none">
              <p>
                La Calculadora de Sueldo Neto (NominaMX) es una herramienta diseñada para proporcionar a los trabajadores en México una estimación clara y precisa de su salario neto. 
                Sabemos que entender una nómina puede ser complicado debido a los diversos impuestos y deducciones. Nuestro objetivo es simplificar este proceso.
              </p>
              <h3 className="font-semibold text-slate-700">¿Cómo funciona?</h3>
              <p>
                Utilizamos las tablas de Impuesto Sobre la Renta (ISR) y las cuotas del Instituto Mexicano del Seguro Social (IMSS) vigentes para el año 2026. 
                Al ingresar tu salario bruto y la frecuencia con la que recibes tu pago, la calculadora desglosa las deducciones y te muestra el monto final que deberías recibir.
              </p>
              <ul>
                <li><strong>ISR:</strong> Es el impuesto que se aplica directamente a tus ingresos.</li>
                <li><strong>IMSS:</strong> Son las aportaciones para tu seguridad social, que cubren enfermedad, maternidad, invalidez, retiro, etc.</li>
              </ul>
            </div>
        </div>
        
        <EducationalContent />
        
        <FaqSection />
        
        {showPrivacy && (
          <div ref={privacyRef}>
            <PrivacyPolicy />
          </div>
        )}

      </main>
      
      <Footer onShowPrivacy={() => setShowPrivacy(!showPrivacy)} />
    </div>
  );
};

export default App;
