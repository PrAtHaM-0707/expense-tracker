import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from '../Charts/CustomBarChart'

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  const hasData = chartData && chartData.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button onClick={onAddIncome} className="add-btn">
          <LuPlus className="text-lg"/>
          Add Income
        </button>
      </div>
      <div className="mt-10">
        {hasData ? (
          <CustomBarChart data={chartData} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] px-4">
            <div className="w-24 h-24 mb-4 rounded-full bg-green-50 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-green-300" 
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
            <p className="text-gray-400 text-lg font-medium mb-2 text-center">
              No Income Data
            </p>
            <p className="text-gray-300 text-sm text-center max-w-xs mb-6">
              Start tracking your income to see earning trends and insights over time.
            </p>
            <button 
              onClick={onAddIncome} 
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            >
              <LuPlus className="text-lg" />
              Add Your First Income
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default IncomeOverview;