import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "remixicon/fonts/remixicon.css";
import { getData } from "../context/UserContext";

const LoginPage = () => {
  const {setUser} = getData()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.username.length < 3) return setError(" Username must be at least 3 letters")
    if (formData.password.length < 8) return setError("Password should be min 8 char")
    if (!/[!@#$%^&*()<>,."]/.test(formData.password)) return setError("Password should contain special char")
    if (!/[A-Z]/.test(formData.password)) return setError("Password should contain atleast one uppercase")

    try {
      const res = await axios.post(`https://aicodereviewer-liq8.onrender.com/user/login`,formData);

      if(res.data.success){

        localStorage.setItem('accessToken' , res.data.accessToken)
        toast.success(`Welcome back ${formData.username}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setUser(res.data.userCheck)

        setTimeout(()=>{
          navigate('/code-review');
        },2000)

        setError("");

        setFormData({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    }    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tl from-stone-900 to-green-950">
      <div className="w-95 bg-white p-6 rounded-2xl">
        <div className="flex ">
          <h2 className="text-xl font-[font2] font-semibold text-gray-800 mb-6">
            Login to your account
          </h2>
          <i
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer ml-25 text-2xl font-bold ri-arrow-left-line"
          ></i>
        </div>

        <form onSubmit={handleSubmit} className="font-[font2] space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChanges}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-blue-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChanges}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="cursor-pointer font-[font3] w-full bg-blue-600 text-white rounded-full py-2 text-[16px] font-bold"
          >
            Log in
          </button>

          <p className="font-[font3] text-sm text-center text-gray-500 mt-4">
            Don’t have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-green-600 cursor-pointer ml-1 hover:underline font-bold"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
