import React, { useContext } from 'react'
import logo from '../../photos/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { AuthnContext } from '../../context/authContext'
import './navbar.css'
import { cartContext } from '../../context/cartContext'

export default function Navbar() {

 const {token , newToken} =  useContext(AuthnContext)
 const { nomOfCartItems  } = useContext(cartContext)



  return<>
 <nav className="navbar navbar-expand-lg bg-body-tertiary py-4">
  <div className="container">
    <Link className="navbar-brand" to="/home"> <img src={logo} alt="logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {token || newToken? <> <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
      <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">wish list</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/product">products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/category">categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brand">brands</Link>
        </li>
        
     </ul> </> : ''}
      




     <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
      {token || newToken? <>  <li className="nav-item">
          <Link className="nav-link " to="/cart"><i className="fa-solid fa-cart-shopping position-relative fs-3 mx-4 "><span className =" position-absolute top-0 start-100 translate-middle badge rounded bg-success ms-1 px-1 "> { nomOfCartItems } <span class="visually-hidden">unread messages</span></span></i></Link>
        </li>  <li className="nav-item">
          <Link className="nav-link" to="/logout">log out</Link>
        </li>  </> : <> <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "  to="/login">login</Link>
        </li> </>}

        </ul>
    
    </div>
  </div>
</nav>
  

  
  
  </>
}
