import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from 'framer-motion'
import { pageVariants } from '../animations/pageVariants'

const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://aicodereviewer-liq8.onrender.com/user/forget-password`,{email});

      if(res.data.success){
        toast.success("OTP has been sent!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setTimeout(()=>{
              navigate(`/verify-otp/${email}`);
            },3000)
          
          setEmail('');
      }
    } catch (error) {
      console.log(error);
      
    }
  };


  return (
    <motion.main 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-neutral-950"
    >
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tl from-stone-900 to-green-950">
      <div className="w-105 bg-white p-6 rounded-2xl">

        {/* Heading */}
        <div className="flex items-center mb-4 justify-center">
          <h2 className="text-xl font-[font2] font-semibold text-gray-800">
            🔐 Forgot Password
          </h2>
        </div>

        {/* Message */}
        <p className="text-[16px] text-gray-600 leading-relaxed mt-2 text-center">
          Kindly enter your registered email address.  
          We’ll send you a one-time password (OTP) to reset your password.
        </p>

        {/* Email Input */}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Send OTP
          </button>
        </form>

        {/* Helper text */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Make sure you have access to this email inbox.
        </p>
      </div>
    </div>
    </motion.main>
  );
};

export default ForgotPassPage;
