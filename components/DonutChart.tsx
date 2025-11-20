import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculationResult } from '../types';

interface DonutChartProps {
  data: CalculationResult;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Neto', value: data.netRegular, color: '#22c55e' }, // Green-500
    { name: 'ISR', value: data.isrRegular, color: '#ef4444' }, // Red-500
    { name: 'IMSS', value: data.imss, color: '#f97316' }, // Orange-500
    { name: 'Ahorro/Otros', value: data.savingsFund + data.savingsBox + data.otherDeductions, color: '#3b82f6' }, // Blue-500
  ].filter(d => d.value > 0);

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
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
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