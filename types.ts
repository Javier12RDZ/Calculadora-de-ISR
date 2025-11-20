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

export interface TaxInputs {
  grossSalary: number;
  periodicity: Periodicity;
  imssOverride?: number; // Optional manual IMSS
  savingsFundPercent: number; // Fondo de ahorro %
  savingsBoxAmount: number; // Caja de ahorro fixed amount
  otherDeductions: number;
  overtimeHours: number;
  holidaysWorked: number;
  sundaysWorked: number;
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
  savingsBox: number;
  otherDeductions: number;
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