/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type DonutData = {
  data: { name?: string; value: number; color?: string }[];
  viewSize: number;
  graphRadius: number;
  label: string;
};

const DonutGradient: React.FC<DonutData> = ({
  data,
  viewSize,
  graphRadius,
  label,
}) => {
  return (
    <PieChart width={viewSize} height={viewSize}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="1" x2="1" y2="0">
          <stop offset="35%" stopColor="#E42C64" stopOpacity={0.7} />
          <stop offset="90%" stopColor="#614AD3" stopOpacity={0.7} />
        </linearGradient>
      </defs>
      <Pie
        stroke="none"
        data={data}
        innerRadius={graphRadius - (graphRadius * 10) / 100}
        outerRadius={graphRadius}
        fill="#484847"
        startAngle={90}
        endAngle={-270}
        style={{ border: 'none' }}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry?.color || COLORS[index % COLORS.length]}
          />
        ))}
        <Label fill="white" fontSize={18} value={label} position="center" />
      </Pie>
    </PieChart>
  );
};

export default DonutGradient;
