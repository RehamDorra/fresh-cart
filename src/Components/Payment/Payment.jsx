import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'

export default function Payment() {

  const { cartid , setcartProducts , setnomOfCartItems , settotalcartPrice} = useContext( cartContext )

  async function CashPayment( cartId ){ 

        const PhoneValue = document.querySelector('#phone').value
        const CityValue = document.querySelector('#city').value
        const DetailsValue = document.querySelector('#details').value

        const shippingAddress = {           
         "shippingAddress":{
         "details": DetailsValue,
         "phone": PhoneValue,
         "city": CityValue
        }
        }

        try {
          const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , shippingAddress , {headers:{token:localStorage.getItem('tkn')}})
          console.log(data)
          if( data.status === 'success' ){
            setcartProducts( [] )
            setnomOfCartItems( 0 )
            settotalcartPrice( 0 )
            toast.success('Cash Payment Confirmed' , {
              position:'top-right'
            })
          }

          else{ 
            toast.error('Ooops! Something wrong happened' , {
              position:'top-right'
            })
          }

        }
        catch (error) {
          console.log('error' , error)
        }

  }

  async function OnlinePayment(cartId){
    const PhoneValue = document.querySelector('#phone').value
    const CityValue = document.querySelector('#city').value
    const DetailsValue = document.querySelector('#details').value

    const shippingAddress = {           
     "shippingAddress":{
     "details": DetailsValue,
     "phone": PhoneValue,
     "city": CityValue
    }
    }

    try {
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , shippingAddress , { headers:{token: localStorage.getItem('tkn')} , params:{url: 'http://localhost:4200'} }  )
        console.log(data)
        window.open( data.session.url , "_blank" )
    } 
    catch (error) {
        console.log('error' , error)
        
    }
 
}
  return <>
   <div className="container py-5">

   <label htmlFor="">Details:</label>
    <textarea id='details' type="tel" className=' mb-3 form-control' placeholder='details' />

    <label htmlFor="">Phone:</label>
    <input id='phone' type="tel" className=' mb-3 form-control' placeholder='phone' />

    <label htmlFor="">City:</label>
    <input id='city' type="tel" className=' mb-3 form-control' placeholder='city' />

   <div className=' d-flex justify-content-center mt-5'> 
   <button onClick={ () => CashPayment(cartid) } className=' btn btn-outline-primary mx-1' id='cashbtn'>Confirm cash Payment</button>
    <button onClick={ () => OnlinePayment(cartid) } className=' btn btn-outline-primary mx-1'>Confirm Online Payment</button>
   </div>

  </div>
  
  </>
}
