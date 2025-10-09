import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  const hasData = chartData && chartData.length > 0;

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <div className="mt-6">
        {hasData ? (
          <CustomBarChart data={chartData} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-20 h-20 mb-4 rounded-full bg-orange-50 flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-orange-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">
              No Recent Expenses
            </p>
            <p className="text-gray-300 text-sm text-center max-w-xs">
              No expenses recorded in the last 30 days. Your spending chart will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Last30DaysExpenses;