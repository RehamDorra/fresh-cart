import React, { useContext, useEffect } from 'react'
import { wishlistContext } from '../../context/wishlistContext'
import { ColorRing } from 'react-loader-spinner'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'

export default function Wishlist() {

  const { DisplayWishlist ,  WishlistProducts ,  DeleteFromWishlist} = useContext( wishlistContext )
  const { AddToCart } = useContext( cartContext )

  useEffect(() => {
    
   DisplayWishlist()
  }, [])

 
  
  
  async function DeleteProductFromWishlist( id ){
    
    const res = await DeleteFromWishlist( id )
    console.log(res)
    if( res.status === 'success' ){
      console.log('deleted')
      toast.success('Deleted' , {
        position:'top-right'
      })
      DisplayWishlist()
    }
    else{
      toast.error('Ooops! Something wrong happened', {
        position:'top-right'
      })
   }
  }

  return<>
   <div className="container mt-5 p-5" style={{ backgroundColor:'#eee' }}>
    <h2 className=' fw-bold'>My wish List</h2>
    {WishlistProducts.map(function(product){
      console.log(product)
      return<>
      <div  className='row align-items-center mt-5 my-3 border-bottom border-3 p-2' >
       <div className="col-sm-2">
           <figure>
               <img src={ product.imageCover } className=' w-100' alt="" />
           </figure>
       </div> 
       <div className="col-sm-8">
           <div className="mid">
               <h3 > { product.title } </h3>
               <h5 className='h6'> { product.price } </h5>
               <button onClick={ () => DeleteProductFromWishlist(product.id) }  className=' btn text-danger p-0'><i className=' fa fa-trash'></i> remove</button>
           </div>  
       </div>  
       <div className="col-sm-2">          
               <button onClick={ () => AddToCart( product.id ) }  className=' btn btn-outline-success text-black p-3'>Add To Cart</button>         
       </div>
     </div>     
      </>
    })}
  </div>   
    
  
  </>
}
