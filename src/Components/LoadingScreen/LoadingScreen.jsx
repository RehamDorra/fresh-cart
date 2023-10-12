import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function LoadingScreen() {  

const Navigate = useNavigate() 
    useEffect(() => {
        setTimeout(function(){
             Navigate('/category')   
        } , 300)
    }, [])
   
  return <>  
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
            </div>
  
  </>
}
