import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';


export default function CategorySlider() {
    const [catslider, setcatslider] = useState([])

    async function getAllCategories(){
        try {
            const{data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            console.log(data.data)
            setcatslider(data.data)
            
        } 
        catch (error) {
            console.log('error' , error)
        }
    }
      
       const settings = {
           dots: true,
           infinite: true,
           speed: 500,
           slidesToShow: 7,
           slidesToScroll: 1
         };
       useEffect(() => {
        getAllCategories()
       
       }, [])
       
   
   
  return <>
  {catslider? <div className='  mt-5'>     
        <Slider {...settings}>
            {catslider.map( function( category , idx){
                return  <div>
                <img style={ { width:'100%' , height:'400px' } }  src={category.image} alt="" />
                <h6 className=' mt-2'> { category.name } </h6>
              </div>
            } )}              
        </Slider>
      </div>  :    <div className=' vh-100 d-flex justify-content-center align-items-center'>
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
