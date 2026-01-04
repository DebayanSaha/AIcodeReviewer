import React from 'react'
import { getData } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const {user} = getData()
  return (
    <div>
        {
            user ? children : <Navigate to={'/login'}/>
        }
    </div>
  )
}

export default ProtectedRoutes