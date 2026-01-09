import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from 'framer-motion'
import { pageVariants } from '../animations/pageVariants'

const VerifyOTPPage = () => {
    const {email} = useParams();
    
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    try {
        const res = await axios.post(`https://aicodereviewer-liq8.onrender.com/user/verify-otp/${email}` , {otp:enteredOtp});
        if(res.data.success){
            toast.success("OTP verified✅!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                navigate(`/change-password/${email}`)
            }, 3000);
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
      <div className="w-105 bg-white p-6 rounded-2xl text-center">

        {/* Heading */}
        <h2 className="text-xl font-[font2] font-semibold text-gray-800 mb-2">
          🔐 Verify OTP
        </h2>

        {/* Message */}
        <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
          Enter the 6-digit code sent to your registered email address.
        </p>

        {/* OTP Boxes */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </form>

        {/* Helper */}
        <p className="text-xs text-gray-500 mt-4">
          Didn’t receive the code? Check your spam folder or wait a moment.
        </p>
      </div>
    </div>
    </motion.main>
  );
};

export default VerifyOTPPage;
