import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './brands.css'
import { ColorRing } from 'react-loader-spinner'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Brands() {
  const [brands, setbrands] = useState(null)
  const [specbrand, setspecbrand] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function GetBrands(){
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      console.log(data.data)
      setbrands( data.data )
    } 
    catch (error) {
     console.log('error' , error) 
    }
  }

  useEffect(() => {
    GetBrands()
  }, [])

  async function GetSpecificBrand(brandId){
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
      console.log(data.data)
      setspecbrand(data.data)
    } 
    catch (error) {
     console.log('error' , error) 
    }

  }
  
  return <> 
  {brands?  <div className="container">
    <h2 className=' text-center text-success mt-5'>All Brands</h2>
    <div className="row g-2 ">
      {brands.map( function( product ){
        return<>
          <div className="col-md-3 mt-5 brand">
        <div onClick={handleShow}  class="card" style={ { 'width': "250px" } }>

          <div onClick={ () =>GetSpecificBrand(product._id) }>
          <img src={ product.image } className="card-img-top w-100" alt={ product.name }/>
          <div class="card-body">
            <p class="card-text text-center">{ product.name }</p>
            </div>

          </div>
        </div>
      </div>
      
    
        </>
      } )}
    

    </div>
    

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>

          {specbrand? <div className=' d-flex justify-content-around align-items-center'>
            <div>
              <h2 className=' text-success'> {specbrand.name} </h2>
              <p> {specbrand.slug} </p>
            </div>
            <div>
              <img src={ specbrand.image } alt="" />
            </div>
          </div>
          
          
          
          : <div className=' vh-100 d-flex justify-content-center align-items-center'>
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

        
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>          
        </Modal.Footer>
      </Modal>

  </div> 
  
  
  
  :  <div className=' vh-100 d-flex justify-content-center align-items-center'>
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
