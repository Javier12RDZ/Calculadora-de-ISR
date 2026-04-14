import { IsrBracket } from './types';

// Standard Monthly ISR Table 2026 (Mexico)
// Based on 2025 tables (as they often remain the same if inflation < 10%)
export const ISR_TABLE_2026_MONTHLY: IsrBracket[] = [
  { lowerLimit: 0.01, upperLimit: 746.04, fixedQuota: 0.00, percent: 1.92 },
  { lowerLimit: 746.05, upperLimit: 6332.05, fixedQuota: 14.32, percent: 6.40 },
  { lowerLimit: 6332.06, upperLimit: 11128.01, fixedQuota: 371.83, percent: 10.88 },
  { lowerLimit: 11128.02, upperLimit: 12935.82, fixedQuota: 893.63, percent: 16.00 },
  { lowerLimit: 12935.83, upperLimit: 15487.71, fixedQuota: 1182.88, percent: 17.92 },
  { lowerLimit: 15487.72, upperLimit: 31236.49, fixedQuota: 1640.18, percent: 21.36 },
  { lowerLimit: 31236.50, upperLimit: 49233.00, fixedQuota: 5004.12, percent: 23.52 },
  { lowerLimit: 49233.01, upperLimit: 93993.90, fixedQuota: 9236.89, percent: 30.00 },
  { lowerLimit: 93993.91, upperLimit: 125325.20, fixedQuota: 22665.17, percent: 32.00 },
  { lowerLimit: 125325.21, upperLimit: 375975.61, fixedQuota: 32691.18, percent: 34.00 },
  { lowerLimit: 375975.62, upperLimit: Infinity, fixedQuota: 117912.32, percent: 35.00 },
];

// UMA 2026 (Unidad de Medida y Actualización)
// Estimated for 2026 based on 2025 ($113.14)
export const UMA_2026_DAILY = 117.67; 
export const UMA_2026_MONTHLY = 3577.17;

// Approximate IMSS deduction factor for employees (simplification of the complex calculation based on SBC)
export const ESTIMATED_IMSS_RATE = 0.027; 
