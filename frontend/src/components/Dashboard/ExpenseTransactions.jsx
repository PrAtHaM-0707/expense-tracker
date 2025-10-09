import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {hasTransactions ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="w-20 h-20 mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-red-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">
              No expenses yet
            </p>
            <p className="text-gray-300 text-sm text-center max-w-xs">
              Track your spending by adding expense transactions to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;