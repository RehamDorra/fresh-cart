import React from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {
  return <>
   <div className="container  w-50 mt-5 mb-5">
  <div className="row gx-0 justify-content-start">
    <div className="col-sm-6">
    <HomeSlider/>
    </div>
    <div className="col-sm-6">
      <img style={ { width:'100%' , height:'200px' } } src={require ('../../photos/bag.jpg')} alt="" />
      <img style={ { width:'100%' , height:'200px' } } src={require ('../../photos/guitar.jpg')} alt="" />
    </div>
  </div>
  </div>

  <CategorySlider/>

  <Products/>

  
  
  </>
}
