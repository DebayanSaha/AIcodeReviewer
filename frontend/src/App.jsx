import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CodeReviewerPage from './pages/CodeReviewerPage'
import VerifyEmailPage from './pages/verify-pages/VerifyEmailPage'
import Verify from './pages/verify-pages/Verify'
import ForgotPassPage from './pages/ForgotPassPage'
import VerifyOTPPage from './pages/VerifyOTPPage'
import ChangePassPage from './pages/ChangePassPage'

import Navbar from './components/Navbar'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/verify-otp/:email" element={<VerifyOTPPage />} />
        <Route path="/change-password/:email" element={<ChangePassPage />} />

        {/* Protected Route */}
        <Route
          path="/code-review"
          element={
            <ProtectedRoutes>
              <Navbar />
              <CodeReviewerPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default App
