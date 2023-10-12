import  { createContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const AuthnContext = createContext()

export function AuthContextProvider( {children} ) {

    const [token, settoken] = useState(null)
    const [newToken, setnewToken] = useState(null)
    // const navigate = useNavigate()

    useEffect(() => {
      if(localStorage.getItem('tkn') !== null && localStorage.getItem('ntkn') !== null){
        settoken(localStorage.getItem('tkn'))
        setnewToken(localStorage.getItem('ntkn'))
      }    
    }, [])
    

  return <AuthnContext.Provider value={ { token , settoken , newToken , setnewToken } }>
    {children}
  </AuthnContext.Provider>
}
