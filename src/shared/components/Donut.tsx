/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type DonutData = {
  data: { name?: string; value: number; color?: string }[];
  viewSize: number;
  graphRadius: number;
};

const Donut: React.FC<DonutData> = ({ data, viewSize, graphRadius }) => {
  return (
    <PieChart width={viewSize} height={viewSize}>
      <Pie
        stroke="none"
        data={data}
        innerRadius={graphRadius - (graphRadius * 30) / 100}
        outerRadius={graphRadius}
        fill="#8884d8"
        startAngle={0}
        endAngle={-360}
        style={{ border: 'none' }}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry?.color || COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Donut;
