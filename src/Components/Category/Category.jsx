import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './category.css'
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'


export default function Category() {
  const [getCategory, setgetCategory] = useState(null)
  const navigate = useNavigate()

  function GetLoading(){    
      navigate('/loading')   
  }

  async function GetCategory(){
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      console.log(data.data)
      setgetCategory(data.data)     
    } 
    catch (error) {
      console.log('error' , error)
    }
  }



  useEffect(() => {
    GetCategory()   
  }, [])
  
  return <>
  {getCategory? <div className="container mt-4">
    <div className="row g-3">
      {getCategory.map(function(category){
        return  <div className="col-md-4  category">
        <div onClick={GetLoading}>
        <div class="card" style={{"width": '100%'}}>
          <img src= { category.image } style={{"height": '300px'}} className="card-img-top w-100" alt="..."/>
          <div class="card-body">
            <h2 class="card-text  text-success text-center"> { category.name } </h2>
          </div>
        </div>
        </div>
      </div>
      })  }   
    </div>
  </div>   :   
  <div className=' vh-100 d-flex justify-content-center align-items-center'>
            <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            </div>} 
  </>
}
