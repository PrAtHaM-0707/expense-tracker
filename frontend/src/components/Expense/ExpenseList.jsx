import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>
        {hasTransactions && (
          <button className="card-btn" onClick={onDownload}> 
            <LuDownload className="text-base" /> Download
          </button>
        )}
      </div>

      <div className="mt-6">
        {hasTransactions ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions.map((expense) => (
              <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={() => onDelete(expense._id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">
              No Expenses Found
            </p>
            <p className="text-gray-300 text-sm text-center max-w-xs">
              You haven't added any expense transactions yet. Start tracking your spending to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;