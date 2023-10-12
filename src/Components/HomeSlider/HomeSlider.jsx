import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return <>
  <Slider {...settings}>
      <div className='bg-danger'>
        <img style={ { width:'100%' , height:'400px' } }  src={ require( '../../photos/bag school.jpg' ) } alt="" />
      </div>
      <div>
      <img style={ { width:'100%' , height:'400px' } }  src={ require( '../../photos/carsit.jpg' ) } alt="" />

      </div>
      <div>
      <img style={ { width:'100%' , height:'200px' } }  src={ require( '../../photos/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg' ) } alt="" />

      </div>
     
    </Slider>
  
  </>
}
