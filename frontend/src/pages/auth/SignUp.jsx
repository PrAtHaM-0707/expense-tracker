import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input1";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/ApiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [showNotice, setShowNotice] = useState(true); 

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter your email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-10 flex flex-col justify-center">
        
        {showNotice && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-md mb-4 text-sm flex justify-between items-center animate-fadeIn">
            <p>
              ⚠️ Note: The backend is hosted on a free Render plan. 
              It might take up to <b>30–60 seconds</b> to wake up after inactivity.
            </p>
            <button
              onClick={() => setShowNotice(false)}
              className="ml-4 text-yellow-700 font-bold text-lg leading-none"
            >
              ×
            </button>
          </div>
        )}

        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join Today By entering your details.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="example@gmail.com"
            />

            <div className="col-span-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 characters"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button className="btn-primary" type="submit">
            Sign-up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium font-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
