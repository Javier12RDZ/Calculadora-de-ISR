import { IsrBracket } from './types';

// Standard Monthly ISR Table 2026 (Mexico)
// Official tables published on December 28, 2025 (Anexo 8 RMF 2026)
export const ISR_TABLE_2026_MONTHLY: IsrBracket[] = [
  { lowerLimit: 0.01, upperLimit: 844.60, fixedQuota: 0.00, percent: 1.92 },
  { lowerLimit: 844.61, upperLimit: 7168.51, fixedQuota: 16.22, percent: 6.40 },
  { lowerLimit: 7168.52, upperLimit: 12598.02, fixedQuota: 420.95, percent: 10.88 },
  { lowerLimit: 12598.03, upperLimit: 14644.64, fixedQuota: 1011.68, percent: 16.00 },
  { lowerLimit: 14644.65, upperLimit: 17533.64, fixedQuota: 1339.14, percent: 17.92 },
  { lowerLimit: 17533.65, upperLimit: 35362.83, fixedQuota: 1856.84, percent: 21.36 },
  { lowerLimit: 35362.84, upperLimit: 55736.68, fixedQuota: 5665.16, percent: 23.52 },
  { lowerLimit: 55736.69, upperLimit: 106410.50, fixedQuota: 10457.09, percent: 30.00 },
  { lowerLimit: 106410.51, upperLimit: 141880.66, fixedQuota: 25659.23, percent: 32.00 },
  { lowerLimit: 141880.67, upperLimit: 425641.99, fixedQuota: 37009.69, percent: 34.00 },
  { lowerLimit: 425642.00, upperLimit: Infinity, fixedQuota: 133488.54, percent: 35.00 },
];

// UMA 2026 (Unidad de Medida y Actualización)
// Official values by INEGI, effective Feb 1, 2026 to Jan 31, 2027
export const UMA_2026_DAILY = 117.31; 
export const UMA_2026_MONTHLY = 3566.22;

// Approximate IMSS deduction factor for employees (simplification of the complex calculation based on SBC)
export const ESTIMATED_IMSS_RATE = 0.027; 

// Subsidio para el Empleo 2026
// Official rules: Applies to monthly taxable income under $11,492.66. Amount is 15.02% of UMA_2026_MONTHLY.
export const SUBSIDIO_2026_LIMIT = 11492.66;
export const SUBSIDIO_2026_MONTHLY = 535.65;
 
