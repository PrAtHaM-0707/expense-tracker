import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./input.css";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="input-box"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={22}
              className="input-icon active"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="input-icon"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
