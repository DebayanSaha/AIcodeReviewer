import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'remixicon/fonts/remixicon.css'

const SignupPage = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        username:'',
        password:'',
        confirmPassword:''
    })
    const [error, setError] = useState("");
    
      const handleChanges = (e) => {
        const {name,value}=e.target;
    
        setFormData((preData)=>({
          ...preData,
          [name]:value
        }))
    
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (formData.password.length < 8) {
          setError("Password should be min 8 char");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Password and confirm password must be same");
          return;
        }
        if (!/[!@#$%^&*()<>,."]/.test(formData.password)) {
          setError("Password should contain special char");
          return;
        }
        if (!/[A-Z]/.test(formData.password)) {
          setError("Password should contain atleast one uppercase");
          return;
        }
    
        console.log(formData.name,formData.username, formData.email, formData.password, formData.confirmPassword);
        setError("");
        
        setFormData({
          name:'',
          email:'',
          username:'',
          password:'',
          confirmPassword:'',
        });
    
        toast.success("Account succesfully created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tl from-stone-900 to-green-950">
      <div className="w-95 bg-white p-6 rounded-2xl">
        <div className='flex '>
            <h2 className="text-xl font-[font2] font-semibold text-gray-800 mb-6">
                 Create new account 
            </h2>
            <i onClick={()=>{navigate('/')}} className="cursor-pointer ml-30 text-2xl font-bold ri-arrow-left-line"></i>
        </div>

        <form  onSubmit={handleSubmit} className="font-[font2] space-y-4">
             <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChanges}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="string"
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
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChanges}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChanges}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            onClick={()=>{navigate('/login')}}
            type="submit"
            className="cursor-pointer font-[font3] w-full bg-blue-600 text-white rounded-full py-2 text-[16px] font-bold"
          >
            Sign in
          </button>

          <p className="font-[font3] text-sm text-center text-gray-500 mt-4">
            Already have an account?
            <span onClick={()=>navigate('/login')} className="text-green-600 cursor-pointer ml-1 hover:underline font-bold">
              Log In
            </span>
          </p>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default SignupPage

