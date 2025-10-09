import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentTransactions = ({ onSeeMore, transactions }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {hasTransactions ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="w-20 h-20 mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">
              No transactions yet
            </p>
            <p className="text-gray-300 text-sm text-center max-w-xs">
              Your recent transactions will appear here once you start adding income or expenses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;