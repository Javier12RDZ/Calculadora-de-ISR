import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, DollarSign, HelpCircle, Info, MinusCircle, Clock, Wallet, Gift, ArrowRight, Sun, Percent, Calendar, Sunrise } from 'lucide-react';
import { CurrencyInput } from './components/CurrencyInput';
import { DonutChart } from './components/DonutChart';
import { calculateTaxes, calculateAguinaldo, calculatePrimaVacacional } from './services/calculatorService';
import { CalculationResult, Periodicity, AguinaldoResult, PrimaVacacionalResult } from './types';

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
  const [savingsBoxAmount, setSavingsBoxAmount] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  // Calculated Result
  const result: CalculationResult = useMemo(() => {
    return calculateTaxes({
      grossSalary,
      periodicity,
      imssOverride: imssOverride === 0 && grossSalary === 0 ? undefined : imssOverride, 
      savingsFundPercent,
      savingsBoxAmount,
      otherDeductions,
      overtimeHours,
      holidaysWorked,
      sundaysWorked,
    });
  }, [grossSalary, periodicity, imssOverride, savingsFundPercent, savingsBoxAmount, otherDeductions, overtimeHours, holidaysWorked, sundaysWorked]);

  // Handlers
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

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

  const getDaysInPeriod = (period: Periodicity): number => {
    switch (period) {
      case Periodicity.WEEKLY: return 7;
      case Periodicity.BIWEEKLY: return 15;
      case Periodicity.MONTHLY: return 30;
      default: return 30;
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 pb-12">
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
            Tablas ISR 2024
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Calculadora de Sueldo Neto México 2024</h1>
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
                  <label className="text-sm font-medium text-slate-600">Frecuencia de Pago</label>
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
                
                {result.overtimePay > 0 && (
                   <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm">
                      <div className="flex justify-between text-blue-900 font-medium">
                        <span>Pago por Horas Extra:</span>
                        <span>+{formatCurrency(result.overtimePay)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-blue-600 mt-1">
                        <span>Monto Gravable (ISR):</span>
                        <span>{formatCurrency(result.taxableOvertime)}</span>
                      </div>
                   </div>
                )}
                 {result.holidayPay > 0 && (
                   <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-sm">
                      <div className="flex justify-between text-indigo-900 font-medium">
                        <span>Pago por Días Festivos:</span>
                        <span>+{formatCurrency(result.holidayPay)}</span>
                      </div>
                      <p className="text-xs text-indigo-500 mt-1">Este ingreso es 100% gravable.</p>
                   </div>
                )}
                {result.sundayPremium > 0 && (
                   <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-sm">
                      <div className="flex justify-between text-yellow-900 font-medium">
                        <span>Prima Dominical:</span>
                        <span>+{formatCurrency(result.sundayPremium)}</span>
                      </div>
                       <div className="flex justify-between text-xs text-yellow-600 mt-1">
                        <span>Monto Gravable (ISR):</span>
                        <span>{formatCurrency(result.taxableSundayPremium)}</span>
                      </div>
                   </div>
                )}
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
                {/* Simple View: Just common stuff */}
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
                      <p className="text-xs text-slate-400 text-right">
                        {formatCurrency(result.savingsFund)}
                      </p>
                   </div>
                   
                   <CurrencyInput
                      label="Caja de Ahorro ($)"
                      value={savingsBoxAmount}
                      onChange={setSavingsBoxAmount}
                   />
                </div>
                
                {showAdvanced && (
                  <CurrencyInput
                    label="Otras Deducciones (Crédito Infonavit, etc)"
                    value={otherDeductions}
                    onChange={setOtherDeductions}
                  />
                )}
              </div>
            </div>
            {/* Aguinaldo Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-pink-500" />
                Cálculo de Aguinaldo
              </h2>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-slate-600">Días de Aguinaldo</label>
                <input
                  type="number"
                  min="0"
                  className="block w-full rounded-md border-slate-300 px-3 py-2 text-slate-900 ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm"
                  placeholder="15"
                  value={aguinaldoDays}
                  onChange={(e) => setAguinaldoDays(parseInt(e.target.value) || 0)}
                />
              </div>
              <button
                onClick={handleCalculateAguinaldo}
                className="mt-4 w-full bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Calcular Aguinaldo
              </button>
            </div>

            {/* Prima Vacacional Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                Cálculo de Prima Vacacional
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-slate-600">Días de Vacaciones</label>
                  <input
                    type="number"
                    min="0"
                    className="block w-full rounded-md border-slate-300 px-3 py-2 text-slate-900 ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm"
                    placeholder="12"
                    value={vacationDays}
                    onChange={(e) => setVacationDays(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-slate-600">% Prima</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Percent className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="number"
                      min="25"
                      className="block w-full rounded-md border-slate-300 pl-9 py-2 text-slate-900 ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none sm:text-sm"
                      placeholder="25"
                      value={vacationPremiumPercent}
                      onChange={(e) => setVacationPremiumPercent(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleCalculatePrimaVacacional}
                className="mt-4 w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Calcular Prima Vacacional
              </button>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 space-y-6">
            {/* Regular Pay Card */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Nómina {periodicity} (Regular)</p>
                  <h2 className="text-4xl font-bold tracking-tight">{formatCurrency(result.netRegular)}</h2>
                  <p className="text-slate-400 text-sm mt-1">Neto a pagar en este periodo</p>
                </div>
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
                      {result.holidayPay > 0 && (
                        <li className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-2 text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-indigo-300"></span>
                            Día Festivo
                          </span>
                          <span className="font-medium text-slate-900">+{formatCurrency(result.holidayPay)}</span>
                        </li>
                      )}
                      {result.sundayPremium > 0 && (
                        <li className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-2 text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
                            Prima Dominical
                          </span>
                          <span className="font-medium text-slate-900">+{formatCurrency(result.sundayPremium)}</span>
                        </li>
                      )}
                      <li className="flex justify-between items-center text-sm pt-2 mt-2 border-t border-slate-100">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          ISR Ordinario
                        </span>
                        <span className="font-medium text-slate-900">-{formatCurrency(result.isrRegular)}</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          IMSS
                        </span>
                        <span className="font-medium text-slate-900">-{formatCurrency(result.imss)}</span>
                      </li>
                       {(result.savingsFund > 0 || result.savingsBox > 0) && (
                        <li className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-2 text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Ahorro
                          </span>
                          <span className="font-medium text-slate-900">-{formatCurrency(result.savingsFund + result.savingsBox)}</span>
                        </li>
                      )}
                      {result.otherDeductions > 0 && (
                        <li className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-2 text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                            Otras Deducciones
                          </span>
                          <span className="font-medium text-slate-900">-{formatCurrency(result.otherDeductions)}</span>
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

                   <div className="mt-4 pt-4 border-t border-pink-100/50 text-xs text-pink-700 flex items-start gap-2">
                      <Info className="w-4 h-4 flex-shrink-0" />
                      <p>
                        Exento: {formatCurrency(aguinaldoResult.exemptAguinaldo)} (30 UMAs). El ISR es un cálculo simplificado.
                      </p>
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
                     <h3 className="text-lg font-bold text-yellow-900">Resultado de la Prima Vacacional</h3>
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

                   <div className="mt-4 pt-4 border-t border-yellow-100/50 text-xs text-yellow-700 flex items-start gap-2">
                      <Info className="w-4 h-4 flex-shrink-0" />
                      <p>
                        Exento: {formatCurrency(primaVacacionalResult.exemptPrimaVacacional)} (15 UMAs). El ISR es un cálculo simplificado.
                      </p>
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
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Sobre esta herramienta</h2>
            <div className="prose prose-slate max-w-none">
              <p>
                La Calculadora de Sueldo Neto (NominaMX) es una herramienta diseñada para proporcionar a los trabajadores en México una estimación clara y precisa de su salario neto. 
                Sabemos que entender una nómina puede ser complicado debido a los diversos impuestos y deducciones. Nuestro objetivo es simplificar este proceso.
              </p>
              <h3 className="font-semibold text-slate-700">¿Cómo funciona?</h3>
              <p>
                Utilizamos las tablas de Impuesto Sobre la Renta (ISR) y las cuotas del Instituto Mexicano del Seguro Social (IMSS) vigentes para el año 2024. 
                Al ingresar tu salario bruto y la frecuencia con la que recibes tu pago, la calculadora desglosa las deducciones y te muestra el monto final que deberías recibir.
              </p>
              <ul>
                <li><strong>ISR:</strong> Es el impuesto que se aplica directamente a tus ingresos.</li>
                <li><strong>IMSS:</strong> Son las aportaciones para tu seguridad social, que cubren enfermedad, maternidad, invalidez, retiro, etc.</li>
              </ul>
              <h3 className="font-semibold text-slate-700">Aviso Legal</h3>
              <p>
                Esta calculadora es una herramienta de simulación y debe ser utilizada únicamente con fines informativos y de referencia. 
                Los resultados son una estimación y pueden no reflejar con total exactitud los cálculos de tu empleador, ya que pueden existir otras variables o deducciones no contempladas (como préstamos, cuotas sindicales, etc.). 
                No nos hacemos responsables de las decisiones tomadas con base en la información aquí presentada. Para cálculos precisos y oficiales, consulta siempre a tu departamento de Recursos Humanos o a un contador profesional.
              </p>
            </div>
          </div>

      </main>
    </div>
  );
};

export default App;