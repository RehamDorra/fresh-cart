import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bars, ColorRing } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { wishlistContext } from '../../context/wishlistContext'
import './details.css'

export default function ProductDetails() {

    const { id } = useParams()
    console.log(id)
    const [productDetails, setproductDetails] = useState(null)
    const { AddToCart } = useContext( cartContext )
    const { AddToWishlist  } = useContext( wishlistContext )

    const heart = document.querySelector('.wish')


    async function GetProductDetails(){
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            console.log(data.data)      
            setproductDetails(data.data)
        }
        catch (error) {
          console.log("error" , error)  
        }

    }

    useEffect(() => {
      GetProductDetails()  
 
    }, [])

    async function AddProductToCart( id ){       
      const res = await AddToCart( id )
      console.log(res)
      if( res.status === 'success' ){
        console.log('added')
        toast.success(res.message , {
          position:'top-right'
        })
      }
      else{
        toast.error('Ooops! Something wrong happened', {
          position:'top-right'
        })

      }
      

    }

    async function AddProToWishlist( id ){
      const res = await AddToWishlist( id )
      console.log(res)
      document.querySelector('.wish').classList.add('heart')
  
      if(res.status === 'success'){
        console.log('added')
        toast.success(res.message , {
          position:'top-right'
        })
        heart.classList.add('heart')

      }
      else{
        toast.error('Ooops! Something wrong happened', {
          position:'top-right'
        })
     }
    }
    
   

  return <>

  {productDetails?  <div className="container py-5">
    <div className="row align-items-center">
      <div className="col-md-4">
        <figure>
          <img className='w-100' src={ productDetails.imageCover } alt="" />
        </figure>
      </div>

        <div className="col-md-8">
          <div className="">
            <h1> { productDetails.title } </h1>
            <p > { productDetails.description } </p>
            <div className=' d-flex justify-content-between align-items-center'>
            <p>price: { productDetails.price } EGP </p>
            <p><i class="fa-solid fa-star text-warning fs-5"></i> { productDetails.ratingsAverage} </p>
            </div>

            <div className=' d-flex justify-content-between align-items-center mt-4'>

              
              
                <button onClick={ () => AddProductToCart( productDetails.id ) } className=' btn btn-success mx-auto w-75'>+ Add</button>
                              
                <i onClick={ () => AddProToWishlist( productDetails.id ) } class="fa-solid fa-heart fs-4 ms-5 wish"></i>

            </div>

         </div>
        </div>
    </div>
   </div> :  <div className=' vh-100 d-flex justify-content-center align-items-center'>
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
