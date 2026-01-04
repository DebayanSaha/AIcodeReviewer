import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from "react-toastify";

const Verify = () => {
  const {token} = useParams();
  const [status, setStatus] = useState('Verifying...')
  const navigate = useNavigate()

  useEffect(()=>{
    const verifyEmail =async()=>{
      try {
        //That {} is the request body, keeping it blank means this is a POST request, but I’m not sending any body data.
        const res = await axios.post(`http://localhost:8080/user/verify`,{},{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(res.data.success){
          setStatus("✅ Email verified successfully");

          toast.success("Account succesfully created!", {
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
            navigate('/login')
          },5000)
        }
        else{
          setStatus("❌ Invalid or expired token"); 
        }
        
      } catch (error) {
        console.log(error);
        setStatus("❌ Verification failed");
      }
    }
    verifyEmail();
  },[token,navigate]) 
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tl from-stone-900 to-green-950">
      <div className="w-105 bg-white p-6 rounded-2xl text-center">
            <h2 className="text-xl font-semibold text-green-600">
              {status}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              You will be redirected to login shortly.
            </p>
      </div>
    </div>
  );
};

export default Verify;
