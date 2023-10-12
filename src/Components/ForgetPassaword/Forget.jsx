import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Forget() {



    const navigate = useNavigate()


 

    async function ForgetPassword(){

        const email = document.querySelector('#email').value

        const user = {
            "email": email
        }

        try {
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , user )
            console.log(data)
            if(data.statusMsg === 'success'){ 
                toast.success('Reset code sent to your email')   
                setTimeout(() => {
                    navigate('/reset')           
                },2000);         
        } 
      
    }
        catch (error) {
            console.log('error' , error)
            if( error.response.data.statusMsg === 'fail'){
                toast.error('There is no user registered with this email')
            }
        }
    }

   


  return <>
  <div className=' w-75 m-auto py-5'>
    <h1>please enter your verification code</h1>
    <input type="email" placeholder='Email' id='email' className=' w-100 p-3 '/>
    <button onClick={ ForgetPassword } className=' btn btn-outline-success mt-3 px-3'>verify</button>
  </div>
  
  
  </>
}
