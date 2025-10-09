import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {hasTransactions ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="w-20 h-20 mb-4 rounded-full bg-green-50 flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-green-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">
              No income yet
            </p>
            <p className="text-gray-300 text-sm text-center max-w-xs">
              Track your earnings by adding income transactions to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;