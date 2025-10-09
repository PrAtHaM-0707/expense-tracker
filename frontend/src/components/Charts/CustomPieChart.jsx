import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";

// Custom Tooltip directly inside this file to handle zero case
const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // If the slice is the dummy "No Data", show 0
    const value = payload[0].name === "No Data" ? 0 : payload[0].value;
    return (
      <div className="bg-white p-2 rounded shadow-md border">
        <p className="text-sm">{payload[0].name}</p>
        <p className="font-bold">₹{value}</p>
      </div>
    );
  }
  return null;
};

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  // Check if all amounts are 0
  const allZero = data.every((entry) => entry.amount === 0);

  // If all zero, create a dummy slice for visibility
  const chartData = allZero
    ? [{ name: "No Data", amount: 1 }]
    : data;

  const chartColors = allZero ? ["#E0E0E0"] : colors;

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartColors[index % chartColors.length]}
            />
          ))}
        </Pie>
        <Tooltip content={CustomToolTip} />
        <Legend content={CustomLegend} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;