import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import axios from 'axios';

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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.username.length < 3) return setError(" Username must be at least 3 letters");
      
        if (formData.password.length < 8) return setError("Password should be min 8 char");

        if (formData.password !== formData.confirmPassword) return setError("Password and confirm password must be same");

        if (!/[!@#$%^&*()<>,."]/.test(formData.password)) return setError("Password should contain special char")
        
        if (!/[A-Z]/.test(formData.password)) return setError("Password should contain atleast one uppercase");

        try {
          const res = await axios.post(`https://aicodereviewer-liq8.onrender.com/user/register`,formData,{
            headers:{
              "Content-Type": "application/json"
            }
          })
          if(res.data.success){
            navigate('/verify');
            setError("");
            setFormData({
              name:'',
              email:'',
              username:'',
              password:'',
              confirmPassword:'',
            });
          }      
        } catch (error) {
          console.log(error.message)
        }
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
            type="submit"
            className="cursor-pointer font-[font3] w-full bg-blue-600 text-white rounded-full py-2 text-[16px] font-bold"
          >
            Sign up
          </button>

          <p className="font-[font3] text-sm text-center text-gray-500 mt-4">
            Already have an account?
            <span onClick={()=>navigate('/login')} className="text-green-600 cursor-pointer ml-1 hover:underline font-bold">
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage

