import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  const hasData = chartData && chartData.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>
        <button onClick={onExpenseIncome} className="add-btn">
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        {hasData ? (
          <CustomLineChart data={chartData} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] px-4">
            <div className="w-24 h-24 mb-4 rounded-full bg-purple-50 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-purple-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" 
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2 text-center">
              No Expense Data
            </p>
            <p className="text-gray-300 text-sm text-center max-w-xs mb-6">
              Start tracking your expenses to see spending trends and insights over time.
            </p>
            <button 
              onClick={onExpenseIncome} 
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
            >
              <LuPlus className="text-lg" />
              Add Your First Expense
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;