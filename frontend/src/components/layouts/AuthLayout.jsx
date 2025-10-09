import React from "react";
import CARD2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";
import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h2 className="auth-heading">Expense Tracker</h2>
        {children}
      </div>

      <div className="auth-right bg-auth-bg-img">
        <div className="auth-shape1" />
        <div className="auth-shape2" />
        <div className="auth-shape3" />

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        <img className="auth-image" src={CARD2} alt="Card-2" />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="stats-card">
      <div className={`stats-icon ${color}`}>{icon}</div>
      <div className="stats-info">
        <h6>{label}</h6>
        <span>₹{value}</span>
      </div>
    </div>
  );
};
