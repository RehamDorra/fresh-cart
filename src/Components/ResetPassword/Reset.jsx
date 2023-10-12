import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Reset() {

    const [errorMsg, seterrorMsg] = useState(null)
    const navigate = useNavigate()

    async function VerifyCode(){

        const code= document.querySelector('#code').value
        const user = {
            "resetCode": code
        }

        try {
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , user )
            console.log(data.status)
            if (data.status === 'Success'){ 
                setTimeout(() => {
                    navigate('/newpassword')           
                },1000);         
            }      
        }
        catch (error) {
            console.log('error' , error.response.data.message)
           seterrorMsg(error.response.data.message)
        }
    }

   
  return <>
  
  <div className=' w-75 m-auto py-5'>
  <h1>reset your account password</h1>
    <input type="text" placeholder='code' id='code' className=' w-100 p-3 '/>
    {errorMsg? <div className=' alert alert-danger mt-2'> {errorMsg} </div> : ''}
    <button onClick={ VerifyCode } className=' btn btn-outline-success mt-3 px-3'>verify</button>
  </div>
  </>
   
  
}
