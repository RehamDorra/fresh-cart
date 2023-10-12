import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let user = {
    "name":" ",
    "email":" ",
    "password":" ",
    "rePassword":" ",
    "phone":" "
}

const navigate = useNavigate()
  async function SignUp(values){
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values )
      console.log(data.message)
      if(data.message === 'success'){
        toast.success('success')
        setTimeout( ()=>{
          navigate('/login')
        } , 2000)
      }
    }
     catch (error) {
      console.log('error' , error.response.data.message)
      if( error.response.data.message === 'Account Already Exists'){
        toast.error('Account Already Exists')
      }
    }
  }

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: SignUp,
    validate: function(values){
      const error = {}

      if(values.name.length < 4 || values.name.length > 10){
        error.name = 'name min length is 3'
      }
      if(values.email.includes('@') === false || values.email.includes('.') === false){
        error.email = 'email is required'
      }
      if( !values.password.match (/^[a-zA-Z0-9]{5,9}$/) ){
        error.password = `must be
        * Start with a letter (either uppercase or lowercase).
        * Be between 6 and 9 characters in total.
        * Can only contain letters (A-Z or a-z) and numbers (0-9)`
      }
      if(values.rePassword !== values.password){
        error.rePassword = 're-Password pattern is inavalid'
      }
      if( ! values.phone.match( /^01[0125][0-9]{8}$/ ) ){
        error.phone = 'invalid Phone'
      }
      return error
    }
  })
  
  return <>
  <div className='w-75 m-auto py-3'>

  <h1>Register</h1>
    <form onSubmit={formikObj.handleSubmit}>
      <label htmlFor="name">name</label>
      <input onBlur={formikObj.handleBlur} value={formikObj.values.name} onChange={formikObj.handleChange} id='name' type="text" placeholder='name...' className='form-control mb-2'/>
      {formikObj.errors.name && formikObj.touched.name? <div className='alert alert-danger'> {formikObj.errors.name} </div> : ''}
      
      <label htmlFor="email">email</label>
      <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange}  id='email' type="email" placeholder='email...' className='form-control mb-2'/>
      {formikObj.errors.email && formikObj.touched.email? <div className='alert alert-danger'> {formikObj.errors.email} </div> : ''}


      <label htmlFor="phone">phone</label>
      <input onBlur={formikObj.handleBlur} value={formikObj.values.phone} onChange={formikObj.handleChange}  id='phone' type="tel" placeholder='phone...' className='form-control mb-2'/>
      {formikObj.errors.phone && formikObj.touched.phone? <div className='alert alert-danger'> {formikObj.errors.phone} </div> : ''}


      <label htmlFor="password">password</label>
      <input onBlur={formikObj.handleBlur} value={formikObj.values.password} onChange={formikObj.handleChange}  id='password' type="password" placeholder='password...' className='form-control mb-2'/>
      {formikObj.errors.password && formikObj.touched.password? <div className='alert alert-danger'> {formikObj.errors.password} </div> : ''}


      <label htmlFor="rePassword">rePassword</label>
      <input onBlur={formikObj.handleBlur} value={formikObj.values.rePassword} onChange={formikObj.handleChange}  id='rePassword' type="password" placeholder='rePassword...' className='form-control mb-2'/>
      {formikObj.errors.rePassword && formikObj.touched.rePassword? <div className='alert alert-danger'> {formikObj.errors.rePassword} </div> : ''}


      <button disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success mt-2'>Register</button>
    </form>
  </div>
  
  
  </>
}
