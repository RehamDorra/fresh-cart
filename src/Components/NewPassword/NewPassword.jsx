import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthnContext } from '../../context/authContext'

export default function NewPassword() {

    const navigate = useNavigate()
    const {setnewToken} = useContext(AuthnContext)

   async function ResetNewPassword(){
        const email= document.querySelector('#email').value
        const password= document.querySelector('#password').value

        const user = {
            "email":email,
            "newPassword": password
        }

        try {
            const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , user )
            console.log(data)
            if(data.token){ 
                localStorage.setItem('ntkn' , data.token)
                setnewToken(data.token)
                setTimeout(() => {
                    navigate('/home')           
                },2000);         
        } 
      
    }
        catch (error) {
            console.log('error' , error)
        }
    }
  return<>
  <div className=' w-75 m-auto py-5'>
    <h1>reset your account password</h1>
    <input type="email" placeholder='Email' id='email' className=' w-100 p-3 '/>
    <input type="password" placeholder='password' id='password' className=' w-100 p-3 mt-2'/>

    <button onClick={ResetNewPassword} className=' btn btn-outline-success mt-3 px-3'>reset password</button>
  </div>
  
  
  </>

}
