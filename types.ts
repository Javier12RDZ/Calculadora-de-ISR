export enum Periodicity {
  WEEKLY = 'Semanal',
  BIWEEKLY = 'Quincenal',
  MONTHLY = 'Mensual',
}

export interface IsrBracket {
  lowerLimit: number;
  upperLimit: number;
  fixedQuota: number;
  percent: number;
}

export interface Deduction {
  id: string;
  label: string;
  amount: number;
}

export interface TaxInputs {
  grossSalary: number;
  periodicity: Periodicity;
  imssOverride?: number; // Optional manual IMSS
  savingsFundPercent: number; // Fondo de ahorro %
  employerSavingsFundMatch: boolean; // Si el patron pone su parte (1:1)
  savingsBoxAmount: number; // Caja de ahorro fixed amount
  otherDeductionsList: Deduction[];
  overtimeHours: number;
  holidaysWorked: number;
  sundaysWorked: number;
  aguinaldoDays: number;
  vacationDays: number;
  vacationPremiumPercent: number;
}

export interface CalculationResult {
  grossSalary: number;
  
  // Overtime
  overtimePay: number;
  taxableOvertime: number;
  exemptOvertime: number;

  // Holiday & Sunday
  holidayPay: number;
  sundayPremium: number;
  taxableSundayPremium: number;
  exemptSundayPremium: number;
  
  // Tax Basics
  taxableIncomeRegular: number; // Base taxable (salary + OT)

  // Taxes
  isrRegular: number;   // Tax on regular pay

  imss: number;
  savingsFund: number;
  employerSavingsFund: number; // Aportacion patronal
  savingsBox: number;
  otherDeductionsTotal: number;
  totalDeductionsRegular: number;

  // Nets
  netRegular: number;   // Regular paycheck amount
  
  effectiveTaxRate: number;
}

export interface AguinaldoResult {
  aguinaldoPay: number;
  exemptAguinaldo: number;
  taxableAguinaldo: number;
  isrAguinaldo: number;
  netAguinaldo: number;
}

export interface PrimaVacacionalResult {
  primaVacacionalPay: number;
  exemptPrimaVacacional: number;
  taxablePrimaVacacional: number;
  isrPrimaVacacional: number;
  netPrimaVacacional: number;
}

export interface ComparisonData {
  label: string;
  inputs: TaxInputs;
  result: CalculationResult;
  aguinaldo?: AguinaldoResult;
  primaVacacional?: PrimaVacacionalResult;
}