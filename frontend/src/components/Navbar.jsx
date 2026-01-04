import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../context/UserContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const {setUser} = getData()  
  const accessToken = localStorage.getItem("accessToken")
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async() => {
    try {
      const res = await axios.post(`http://localhost:8080/user/logout`,{},{
        headers:{
          Authorization : `Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        setUser(null);
        toast.success("Logged Out!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
        localStorage.clear();
        setTimeout(()=>{
          navigate('/login');
        },5000)
      }
    } catch (error) {
      console.log(error);
      
    }
    
  };

  return (
    <div className=" p-2 ">
        <nav className="bg-white border-2 border-gray-300 px-8 py-4 flex items-center justify-between rounded-full">
      
        {/* Left: Brand + Nav */}
        <div className="flex items-center justify-center">
            <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-gray-900 cursor-pointer font-[font2]"
            >
            REVI.
            </h1>

            <div className="absolute left-[50%] text-sm font-[font2] font-bold  text-gray-600">
                <span
                    onClick={() => navigate("/")}
                    className="cursor-pointer hover:text-gray-900"
                >Home
                </span>
            </div>
        </div>

        {/* Right: Profile */}
        <div className="relative" ref={dropdownRef}>
            <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer select-none"
            >
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                U
            </div>
            <span className="text-sm font-medium text-gray-700">
                Profile
            </span>
            </div>

            {open && (
            <div className="z-10 absolute right-0 mt-3 w-44 bg-red-200 border-2 border-red-500 rounded-md overflow-hidden">
                <button
                onClick={handleLogout}
                className="cursor-pointer w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-gray-100"
                >
                Logout <i className="ri-logout-box-r-line"></i>
                </button>
            </div>
            )}
        </div>
        </nav>
    </div>
    
  );
};

export default Navbar;
