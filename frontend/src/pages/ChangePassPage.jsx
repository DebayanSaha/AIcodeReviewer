import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { pageVariants } from "../animations/pageVariants";

const ChangePassPage = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8)
      return setError("Password should be minimum 8 characters");

    if (formData.password !== formData.confirmPassword)
      return setError("Password and Confirm Password must be same");

    if (!/[!@#$%^&*()<>,."]/.test(formData.password))
      return setError("Password should contain a special character");

    if (!/[A-Z]/.test(formData.password))
      return setError("Password should contain at least one uppercase letter");

    try {
      const res = await axios.post(
        `https://aicodereviewer-liq8.onrender.com/user/new-password/${email}`,
        {
          newPassword: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (res.data.success) {
        toast.success(`Password changed successfully`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Try again.");
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
      <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-tr from-stone-900 to-green-950">
        <div className="w-full max-w-[420px] md:w-[420px] bg-white p-6 rounded-2xl text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            <i className="ri-rotate-lock-line"></i> Change Password
          </h2>

          <p className="text-[16px] text-gray-600 mb-6">
            Set a new password for your account.
          </p>

          {error && (
            <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Update Password
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Choose a strong password you haven’t used before.
          </p>
        </div>
      </div>
    </motion.main>
  );
};

export default ChangePassPage;
