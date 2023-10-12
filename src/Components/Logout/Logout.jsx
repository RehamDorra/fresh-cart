import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthnContext } from '../../context/authContext'

export default function Logout() {
  
  const { settoken , setnewToken } = useContext(AuthnContext)
  const navigate = useNavigate()

  useEffect(() => {
  localStorage.removeItem('token')
  localStorage.removeItem('tkn')
    settoken(null)
    setnewToken(null)
    navigate('/login')

  }, [])
  
  return <>
  
  
  </>


    
}
