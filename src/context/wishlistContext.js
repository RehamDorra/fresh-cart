import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const wishlistContext = createContext()

export function WishlistContextProvider( { children } ){

    const [WishlistProducts, setWishlistProducts] = useState(null)

    async function AddToWishlist( productId ){
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , { 'productId':productId } , {headers:{token:localStorage.getItem('tkn')}})
            console.log( data )  
            setWishlistProducts(data.data)
            return data         
        } 
        catch (error) {
          console.log("error" , error)  
        }
    }

    async function DisplayWishlist(){
        try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {headers:{token:localStorage.getItem('tkn')}})
        console.log( data.data )
        setWishlistProducts(data.data)
        return data   
        } 
        catch (error) {
            console.log('error' , error)
        }
    }
    useEffect(() => {
        DisplayWishlist()
    }, [])

    
async function DeleteFromWishlist(productId){
    try {
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {headers:{token:localStorage.getItem('tkn')}})
    setWishlistProducts(data.data)
    return data   
    } 
    catch (error) {
        console.log('error' , error)
    }
}

    return<wishlistContext.Provider value={ { AddToWishlist , DisplayWishlist , WishlistProducts , DeleteFromWishlist} }>
        { children }
    </wishlistContext.Provider>
}