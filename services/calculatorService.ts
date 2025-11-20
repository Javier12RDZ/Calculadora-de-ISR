import { ISR_TABLE_2024_MONTHLY, ESTIMATED_IMSS_RATE, UMA_2024_DAILY } from '../constants';
import { CalculationResult, IsrBracket, Periodicity, TaxInputs, AguinaldoResult, PrimaVacacionalResult } from '../types';

const getPeriodFactor = (period: Periodicity): number => {
  switch (period) {
    case Periodicity.WEEKLY: return 4.33; // Average weeks in a month
    case Periodicity.BIWEEKLY: return 2;
    case Periodicity.MONTHLY: return 1;
    default: return 1;
  }
};

const getDaysInPeriod = (period: Periodicity): number => {
  switch (period) {
    case Periodicity.WEEKLY: return 7;
    case Periodicity.BIWEEKLY: return 15;
    case Periodicity.MONTHLY: return 30;
    default: return 30;
  }
};

// Helper to calculate monthly ISR and scale it back to the period
const calculateIsrForAmount = (taxableAmount: number, periodFactor: Periodicity): number => {
  if (taxableAmount <= 0) return 0;

  const factor = getPeriodFactor(periodFactor);
  // Normalize to Monthly for Table Lookup
  const monthlyTaxableIncome = taxableAmount * factor;

  const applicableBracket = ISR_TABLE_2024_MONTHLY.find(
    (b) => monthlyTaxableIncome >= b.lowerLimit && monthlyTaxableIncome <= b.upperLimit
  ) || ISR_TABLE_2024_MONTHLY[ISR_TABLE_2024_MONTHLY.length - 1];

  const surplus = monthlyTaxableIncome - applicableBracket.lowerLimit;
  const marginalTax = surplus * (applicableBracket.percent / 100);
  const monthlyIsr = marginalTax + applicableBracket.fixedQuota;

  // Scale ISR back to period
  return monthlyIsr / factor;
};

export const calculateTaxes = (inputs: TaxInputs): CalculationResult => {
  const { 
    grossSalary, 
    periodicity, 
    savingsFundPercent, 
    savingsBoxAmount, 
    otherDeductions, 
    imssOverride, 
    overtimeHours,
    holidaysWorked,
    sundaysWorked,
  } = inputs;

  const daysInPeriod = getDaysInPeriod(periodicity);
  
  // --- 1. Calculate Daily Salary & Hourly Rate ---
  const dailySalary = grossSalary > 0 ? grossSalary / daysInPeriod : 0;
  const hourlyRate = dailySalary > 0 ? dailySalary / 8 : 0;

  // --- 2. Overtime Calculation ---
  let weeksInPeriod = 1;
  if (periodicity === Periodicity.BIWEEKLY) weeksInPeriod = 2;
  if (periodicity === Periodicity.MONTHLY) weeksInPeriod = 4.33;

  const doubleHourLimit = 9 * weeksInPeriod;
  const doubleHours = Math.min(overtimeHours, doubleHourLimit);
  const tripleHours = Math.max(0, overtimeHours - doubleHourLimit);

  const amountDouble = doubleHours * hourlyRate * 2;
  const amountTriple = tripleHours * hourlyRate * 3;
  const totalOvertimePay = amountDouble + amountTriple;

  const potentialExemption = amountDouble * 0.50;
  const exemptionCap = (5 * UMA_2024_DAILY) * weeksInPeriod;
  const exemptOvertime = Math.min(potentialExemption, exemptionCap);
  const taxableOvertime = totalOvertimePay - exemptOvertime;

  // --- 3. Holiday & Sunday Pay ---
  const holidayPay = holidaysWorked * dailySalary * 2; // Additional pay
  const sundayPremium = sundaysWorked * dailySalary * 0.25;
  const exemptSundayPremium = Math.min(sundayPremium, sundaysWorked * UMA_2024_DAILY);
  const taxableSundayPremium = sundayPremium - exemptSundayPremium;

  // --- 4. Tax Calculation ---
  const taxableIncomeRegular = grossSalary + taxableOvertime + holidayPay + taxableSundayPremium;
  const isrRegular = calculateIsrForAmount(taxableIncomeRegular, periodicity);

  // --- 5. Deductions (Regular) ---
  const periodImss = imssOverride !== undefined && imssOverride !== null && !isNaN(imssOverride)
    ? imssOverride 
    : grossSalary * ESTIMATED_IMSS_RATE;

  const periodSavingsFund = grossSalary * (savingsFundPercent / 100);
  const totalDeductionsRegular = isrRegular + periodImss + periodSavingsFund + savingsBoxAmount + otherDeductions;

  // --- 6. Net Results ---
  const totalIncome = grossSalary + totalOvertimePay + holidayPay + sundayPremium;
  const netRegular = totalIncome - totalDeductionsRegular;

  return {
    grossSalary,
    overtimePay: totalOvertimePay,
    taxableOvertime,
    exemptOvertime,

    holidayPay,
    sundayPremium,
    taxableSundayPremium,
    exemptSundayPremium,
    
    taxableIncomeRegular,
    
    isrRegular,
    
    imss: Math.max(0, periodImss),
    savingsFund: periodSavingsFund,
    savingsBox: savingsBoxAmount,
    otherDeductions,
    totalDeductionsRegular,
    
    netRegular: Math.max(0, netRegular),
    
    effectiveTaxRate: totalIncome > 0 ? (isrRegular / totalIncome) * 100 : 0,
  };
};

export const calculateAguinaldo = (dailySalary: number, aguinaldoDays: number): AguinaldoResult => {
  if (dailySalary <= 0 || aguinaldoDays <= 0) return {
    aguinaldoPay: 0,
    exemptAguinaldo: 0,
    taxableAguinaldo: 0,
    isrAguinaldo: 0,
    netAguinaldo: 0
  };

  const aguinaldoPay = dailySalary * aguinaldoDays;
  const aguinaldoExemptionLimit = 30 * UMA_2024_DAILY;
  const exemptAguinaldo = Math.min(aguinaldoPay, aguinaldoExemptionLimit);
  const taxableAguinaldo = aguinaldoPay - exemptAguinaldo;
  
  // Simplified ISR calculation for aguinaldo. This is not 100% accurate.
  // A proper calculation requires a more complex method (Art. 96 LISR).
  const isrAguinaldo = taxableAguinaldo * (ISR_TABLE_2024_MONTHLY[ISR_TABLE_2024_MONTHLY.length - 1].percent / 100);
  const netAguinaldo = aguinaldoPay - isrAguinaldo;

  return {
    aguinaldoPay,
    exemptAguinaldo,
    taxableAguinaldo,
    isrAguinaldo,
    netAguinaldo
  };
}

export const calculatePrimaVacacional = (dailySalary: number, vacationDays: number, vacationPremiumPercent: number): PrimaVacacionalResult => {
  if (dailySalary <= 0 || vacationDays <= 0) return {
    primaVacacionalPay: 0,
    exemptPrimaVacacional: 0,
    taxablePrimaVacacional: 0,
    isrPrimaVacacional: 0,
    netPrimaVacacional: 0
  };

  const salaryForVacationDays = dailySalary * vacationDays;
  const primaVacacionalPay = salaryForVacationDays * (vacationPremiumPercent / 100);
  const primaExemptionLimit = 15 * UMA_2024_DAILY;
  const exemptPrimaVacacional = Math.min(primaVacacionalPay, primaExemptionLimit);
  const taxablePrimaVacacional = primaVacacionalPay - exemptPrimaVacacional;

  // Simplified ISR calculation.
  const isrPrimaVacacional = taxablePrimaVacacional * (ISR_TABLE_2024_MONTHLY[ISR_TABLE_2024_MONTHLY.length - 1].percent / 100);
  const netPrimaVacacional = primaVacacionalPay - isrPrimaVacacional;

  return {
    primaVacacionalPay,
    exemptPrimaVacacional,
    taxablePrimaVacacional,
    isrPrimaVacacional,
    netPrimaVacacional
  };
}