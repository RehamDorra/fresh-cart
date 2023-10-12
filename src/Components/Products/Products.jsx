import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { wishlistContext } from '../../context/wishlistContext'
import './product.css'

export default function Products() {

  const [allProducts, setallProducts] = useState([])
  const [searchfor, setsearchfor] = useState('')
  const { AddToCart } = useContext(cartContext)
  const { AddToWishlist } = useContext( wishlistContext )
  const heart = document.querySelector(".wish")


  async function GetAllProducts(){
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      console.log(data.data) 
      setallProducts(data.data)  
    }
    catch (error) {
      console.log('error' , error)
    }
  }
  useEffect(() => {
    GetAllProducts()
  },[] )  

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
      console.log('added' , id)
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
  console.log(searchfor)
 
  return <>
  {allProducts?  <div className="container">
  <div className='  d-flex justify-content-center mt-5 '>
        <input type="text" placeholder='search...' className=' w-75 rounded-2 p-1' id='search' onChange={ (e) => setsearchfor(e.target.value) } />
        </div>  
    <div className="row g-4">
      {allProducts.filter( (product) => product.title.toLowerCase().includes( searchfor.toLowerCase() ) ) .map( function( product ){
        return    <div className="col-md-3 mt-5  p-3 product ">         
        <div>
        <Link to={`/productdet/${ product.id }`}>
        <img src={ product.imageCover } className='w-100' alt={ product.title } />
         {/* <p>{product.id}</p> */}
        <p className=' text-success'> { product.category.name } </p>
        <h5 className='mt-1'> { product.title.split(' ').slice( 0 , 2 ).join(" ") } </h5>
       <div className=' d-flex justify-content-between align-items-center'>
       <p> { product.price } </p>
       <p><i class="fa-solid fa-star text-warning fs-5"></i> { product.ratingsAverage } </p>
       </div>
       </Link>
       <div className=' d-flex  justify-content-between align-items-center '>
        <button onClick={ () => AddProductToCart( product.id ) } className=' btn btn-success w-100 mt-3 mx-auto productbtn '>+ Add</button> 
        <i onClick={ () => AddProToWishlist( product.id ) } class="fa-solid fa-heart fs-4 ms-5 wish" style={ { cursor:'pointer' } } ></i>
       </div>
        </div>
       </div>  
       
      } )}
    </div>
  </div>  :   <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
  </div> }

 

 
  
  
  </>
}
