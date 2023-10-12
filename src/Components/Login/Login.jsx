import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthnContext } from '../../context/authContext'
import './login.css'

export default function Login() {

  let user = {
    "email":" ",
    "password":" ",
}

const {settoken} = useContext( AuthnContext )
const navigate = useNavigate()

  async function SignUp(values){
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values )
      console.log(data.message)
      if(data.message === 'success'){
        toast.success('success')
        localStorage.setItem('tkn' , data.token)
        settoken(data.token)
        setTimeout( ()=>{
          navigate('/home')
        } , 2000)
      }
    }
     catch (error) {
      console.log('error' , error.response.data.message)
      if( error.response.data.message === 'Incorrect email or password'){
        toast.error('Incorrect email or password')
      }
    }
  }

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: SignUp,
    validate: function(values){
      const error = {}

      if(values.email.includes('@') === false || values.email.includes('.') === false){
        error.email = 'email is required'
      }
      if( !values.password.match (/^[a-zA-Z0-9]{5,9}$/) ){
        error.password = `must be
        * Start with a letter (either uppercase or lowercase).
        * Be between 6 and 9 characters in total.
        * Can only contain letters (A-Z or a-z) and numbers (0-9)`
      }

      return error
    }
  })
  
  return <>
  <div className='w-75 m-auto py-3'>

<h1>Login</h1>
  <form onSubmit={formikObj.handleSubmit}>
   
    <label htmlFor="email">email</label>
    <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange}  id='email' type="email" placeholder='email...' className='form-control mb-2'/>
    {formikObj.errors.email && formikObj.touched.email? <div className='alert alert-danger'> {formikObj.errors.email} </div> : ''}


    <label htmlFor="password">password</label>
    <input onBlur={formikObj.handleBlur} value={formikObj.values.password} onChange={formikObj.handleChange}  id='password' placeholder='password...' type="password"  className='form-control mb-2'/>
    {formikObj.errors.password && formikObj.touched.password? <div className='alert alert-danger'> {formikObj.errors.password} </div> : ''}

   <div className=' d-flex justify-content-between'>
   <Link  className=' text-decoration-none fs-5 forget' to='/forget'>forget your password ?</Link>

 <button disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success mt-2'>Login</button>
   </div>
  </form>
</div>

  
  </>
}
