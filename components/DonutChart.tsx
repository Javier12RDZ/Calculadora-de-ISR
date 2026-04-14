import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculationResult } from '../types';

interface DonutChartProps {
  data: CalculationResult;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Neto', value: data.netRegular, color: '#4CAF50' }, // Green
    { name: 'ISR', value: data.isrRegular, color: '#FF5252' }, // Red
    { name: 'IMSS', value: data.imss, color: '#FFC107' }, // Amber/Orange
    { name: 'Ahorro/Otros', value: data.savingsFund + data.savingsBox + data.otherDeductionsTotal, color: '#2196F3' }, // Blue
  ].filter(d => d.value > 0);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

  const CustomLabel = ({ viewBox, totalAmount }: any) => {
    // Add null check for viewBox to prevent white screen crash
    if (!viewBox) return null;
    
    const { cx, cy } = viewBox;
    return (
      <text x={cx} y={cy} fill="#333" textAnchor="middle" dominantBaseline="central">
        <tspan x={cx} dy="-0.5em" className="text-sm font-medium">Total Neto</tspan>
        <tspan x={cx} dy="1.5em" className="text-xl font-bold">{formatCurrency(totalAmount)}</tspan>
      </text>
    );
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
            <CustomLabel totalAmount={data.netRegular} />
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Monto']}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle"/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};