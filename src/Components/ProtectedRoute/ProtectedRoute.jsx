import React, { useContext } from 'react'
import { AuthnContext } from '../../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute( { children } ) {

    const { token , newToken } = useContext(AuthnContext)
    // const navigate = useNavigate()

    if( token === null && newToken === null ){
        // return navigate('/login')
        return <Navigate to='/login'/>
    }
    
  return <>
  { children } 
  </>
    
  
}
