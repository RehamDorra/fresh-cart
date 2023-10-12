import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext()

export function CartContextProvider( {children} ){

    const [cartProducts, setcartProducts] = useState([])
    const [totalcartPrice, settotalcartPrice] = useState(0)
    const [nomOfCartItems, setnomOfCartItems] = useState(0)
    const [cartid, setcartid] = useState(null)


    async function DisplayCart(){
        try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {headers:{token:localStorage.getItem('tkn')}})
        setcartProducts(data.data.products)
        settotalcartPrice(data.data.totalCartPrice)
        setnomOfCartItems(data.numOfCartItems)
        setcartid(data.data._id)
        console.log( data )
        return data   
        } 
        catch (error) {
            console.log('error' , error)
        }
    }
    useEffect(() => {
        DisplayCart()
    }, [])
    

async function AddToCart( productId ){
    try {
        const { data } =  await axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {"productId": productId} , {headers:{token: localStorage.getItem('tkn')}})
        console.log(data)
        setcartProducts(data.data.products)
        settotalcartPrice(data.data.totalCartPrice)
        setnomOfCartItems(data.numOfCartItems)

        console.log(cartProducts)
        return data
        
    } 
    catch (error) {
    console("error" , error)
        
    }
}


async function DeleteFromCart(productId){
    try {
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {headers:{token:localStorage.getItem('tkn')}})
    setcartProducts(data.data.products)
    settotalcartPrice(data.data.totalCartPrice)
    setnomOfCartItems(data.numOfCartItems)
    console.log( data )
    return data   
    } 
    catch (error) {
        console.log('error' , error)
    }
}

async function ChangeCartCounter(productId , count){
    try {
    const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , { 'count': count } , {headers:{token:localStorage.getItem('tkn')}})
    setcartProducts(data.data.products)
    settotalcartPrice(data.data.totalCartPrice)
    setnomOfCartItems(data.numOfCartItems)
    console.log( data )
    return data   
    } 
    catch (error) {
        console.log('error' , error)
    }
}


async function ClearCart(){
    try {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart'  , {headers:{token:localStorage.getItem('tkn')}})
    setcartProducts([])
    settotalcartPrice(0)
    setnomOfCartItems(0)
    console.log( data )
    return data   
    } 
    catch (error) {
        console.log('error' , error)
    }
}



    return <cartContext.Provider value={ { AddToCart , DisplayCart , cartProducts , totalcartPrice , nomOfCartItems , DeleteFromCart , ChangeCartCounter , ClearCart , cartid , setcartProducts , setnomOfCartItems , settotalcartPrice} }>
        { children }
    </cartContext.Provider>
}