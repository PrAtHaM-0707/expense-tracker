import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input1";
import '../../styles/Login.css'
import '../../index.css'
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/ApiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)){
      setError(`Please Enter a valid Email!`)
      return;
    }
    if (!password){
      setError(`Please Enter a valid Password!`)
      return;
    }
    setError("");
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password,
      })
      const {token, user} = response.data;
      if (token){
        localStorage.setItem('token', token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if (error.response && error.response.data.message){
        setError(error.response.data.message);
      }else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4  md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please Enter Your Details To Login
        </p>

        <form onSubmit= {handleLogin} action="">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="example@gmail.com"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button className="btn-primary" type="submit">
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't Have an Account?{" "}
            <Link className="font-medium font-primary underline" to="/signUp">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
