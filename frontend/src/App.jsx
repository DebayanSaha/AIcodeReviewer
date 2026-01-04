import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CodeReviewerPage from './pages/CodeReviewerPage'
import SignupPage from './pages/SignupPage'
import VerifyEmailPage from './pages/verify-pages/VerifyEmailPage'
import Verify from './pages/verify-pages/Verify'
import ForgotPassPage from './pages/ForgotPassPage'
import Navbar from './components/Navbar'
import ProtectedRoutes from './components/ProtectedRoutes'
import VerifyOTPPage from './pages/VerifyOTPPage'
import ChangePassPage from './pages/ChangePassPage'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/code-review' element={<ProtectedRoutes><Navbar/><CodeReviewerPage/></ProtectedRoutes>} />
      <Route path='/verify' element={<VerifyEmailPage/>} />
      <Route path='/verify/:token' element={<Verify/>} />
      <Route path='/forgot-password' element={<ForgotPassPage/>} />
      <Route path='/verify-otp/:email' element={<VerifyOTPPage/>} />
      <Route path='/change-password/:email' element={<ChangePassPage/>} />
    </Routes>
    </>
  )
}

export default App;