import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'

export default function Cart() {
  const { DisplayCart , cartProducts , totalcartPrice , nomOfCartItems , DeleteFromCart , ChangeCartCounter , ClearCart} = useContext( cartContext )
  useEffect(() => {
    DisplayCart()
  }, [])

  if(cartProducts === null){
    return <div className='vh-100 d-flex justify-content-center align-items-center'> 
    <i className='fa-spin fa-spinner'></i>
    </div>
}

  if(cartProducts.length === 0 ){
    return <div className="container mt-5 p-5" style={{ backgroundColor:'#eee' }}>
      <h2 className=' fw-bold'>Cart Shop</h2>
      <h2 className=' fw-bold mt-4'>your cart is empty</h2>
    </div>
}

  async function DeleteProductFromCart( id ){
    const res = await DeleteFromCart( id )
    console.log(res)
    if( res.status === 'success' ){
      console.log('deleted')
      toast.success('Deleted' , {
        position:'top-right'
      })
    }
    else{
      toast.error('Ooops! Something wrong happened', {
        position:'top-right'
      })
   }
  }

  async function IncrementCounter( id , counter ){
    const res = await ChangeCartCounter( id , counter )
    console.log(res)
    if( res.status === 'success' ){
      console.log(' product added ')
      toast.success('product added' , {
        position:'top-right'
      })
    }
    else{
      toast.error('Ooops! Something wrong happened', {
        position:'top-right'
      })
   }
  }

  async function DecrementCounter( id , counter ){
    const res = await ChangeCartCounter( id , counter )
    console.log(res)
    if(counter == 0){
      return DeleteProductFromCart( id )
     }
    if( res.status === 'success' ){
      console.log(' product added ')
      toast.success('product removed' , {
        position:'top-right'
      })
    }
    else{
      toast.error('Ooops! Something wrong happened', {
        position:'top-right'
      })
   }
   
  
  }

  async function ClearCartFromProducts(){
   await ClearCart()
}


  return <>
<div className="container mt-5 p-5" style={{ backgroundColor:'#eee' }}>
  <div className=' d-flex justify-content-between align-items-center'>
    <h2 className=' fw-bold'>Cart Shop</h2>
    <Link to='/payment' className=' btn btn-primary p-2 fs-5'>Check Out</Link>
    </div>
    <div className=' d-flex justify-content-between align-items-center'>
    <h5 className=' mt-3 '>total price:<span className=' text-success'> { totalcartPrice } </span> </h5>
    <h5 className=' mt-3 '>total number of items:<span className=' text-success'> { nomOfCartItems } </span>  </h5>
    </div>

    {cartProducts.map(function( product ){
      console.log(product)
      return <>
      <div  className='row align-items-center mt-3 my-3 border-bottom border-3 p-2' >
       <div className="col-sm-2">
           <figure>
               <img src={ product.product.imageCover } className=' w-100' alt="" />
           </figure>
       </div>
   
       <div className="col-sm-8">
           <div className="mid">
               <h3 > { product.product.title } </h3>
               <h5 className='h6'> { product.price } </h5>
               <button onClick={ () => DeleteProductFromCart( product.product.id ) }  className=' btn text-danger p-0'><i className=' fa fa-trash'></i> remove</button>
           </div>
   
       </div>
   
       <div className="col-sm-2">
           <div className="d-flex align-items-center">
               <button onClick={ () => IncrementCounter( product.product.id , product.count+1 ) }  className=' btn btn-outline-success'>+</button>
               <span className=' mx-2'> { product.count } </span>
               <button onClick={ () => DecrementCounter( product.product.id , product.count-1 ) } className=' btn btn-outline-success'>-</button>
           </div>
       </div>
     </div>
     </>
    })}
        <div className=' d-flex justify-content-center align-items-center'>
        <button onClick={ ClearCartFromProducts } className=' btn btn-outline-success text-black bg-transparent py-2 fs-4'>Clear Your Cart</button>
        </div>

    
 
  
  
  </div>
  
  </>
}
