import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Category from './Components/Category/Category';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Wishlist from './Components/Wishlist/Wishlist';
import Brands from './Components/Brands/Brands';
import Logout from './Components/Logout/Logout';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/authContext';
import Forget from './Components/ForgetPassaword/Forget';
import Reset from './Components/ResetPassword/Reset';
import NewPassword from './Components/NewPassword/NewPassword';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import { CartContextProvider } from './context/cartContext';
import Payment from './Components/Payment/Payment';
import { WishlistContextProvider } from './context/wishlistContext';

const router = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {path:'' , element: <Login/>},
    {path:'home' , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:'product' , element: <ProtectedRoute><Products/> </ProtectedRoute> },
    {path:'productdet/:id' , element: <ProtectedRoute><ProductDetails/> </ProtectedRoute> },

    {path:'wishlist' , element: <ProtectedRoute><Wishlist/> </ProtectedRoute> },
    {path:'product' , element: <ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:'category' , element:  <ProtectedRoute><Category/> </ProtectedRoute>},
    {path:'cart' , element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path:'payment' , element: <ProtectedRoute> <Payment/> </ProtectedRoute>},

    {path:'brand' , element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:'loading' , element: <ProtectedRoute> <LoadingScreen/> </ProtectedRoute>},

    {path:'register' , element:  <Register/> },
    {path:'login' , element:  <Login/>  },
    {path:'logout' , element: <ProtectedRoute> <Logout/> </ProtectedRoute>},
    {path:'forget' , element:  <Forget/> },
    {path:'reset' , element: <Reset/> },
    {path:'newpassword' , element:  <NewPassword/>  },







  ]}
])

function App() {
  return <>
  <WishlistContextProvider>
  <CartContextProvider>
  <AuthContextProvider>
  <RouterProvider router={router}/>
  </AuthContextProvider>
  </CartContextProvider>
  </WishlistContextProvider>
  <Toaster/>
  </>
}

export default App;
