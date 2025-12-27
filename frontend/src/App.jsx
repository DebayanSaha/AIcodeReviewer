import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CodeReviewerPage from './pages/CodeReviewerPage'
import SignupPage from './pages/SignupPage'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/code-review' element={<CodeReviewerPage/>} />
    </Routes>
    </>
  )
}

export default App;