import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Adminview from "./admin/adminview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/home"
import Login from "./login/LoginPage";
import ProfilePage from "./profile/ProfilePage";
import ContactUs from "./contact/ContactUs";
import Categories from "./adminPages/Categories";
import AdminCreation from "./adminPages/AdminCreation";
import AdminProductsPage from "./adminPages/ProductsPage";
import ProductsPage from "./product/product";
import AdminHomePage from "./adminPages/AdminHomePage";
import Checkout from "./checkout/Checkout";
import Cartpage from "./Cartpage/cartpage"; // Ensure case matches file name

import Orders from "./Orders/Orders";
import Forgotpassword from "./login/ForgotPassword";
import Signup from "./login/Signup";
import Testimonials from './product/Reviews';
import CheckoutPage from './checkout/Checkout';

// import TestProducts from "./TestProducts/TestProducts"; // Ensure case matches file name
import CustomersPage from './adminPages/CustomersPage';






const Layout =()=>{
  return(
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>, 
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/adminview",
        element: <Adminview />
      },
      {
        path: "/profile", 
        element: <ProfilePage />
      },
      {
        path: "/contact", 
        element: <ContactUs/>
      },
      
      {
        path: "/categories", 
        element: <Categories/>
      },
      {
        path: "/admincreation", 
        element: <AdminCreation/>
      },
      {
        path: "/products", 
        element: <ProductsPage/>
      },
      {
        path: "/adminhomepage", 
        element: <AdminHomePage/>
      },
      
        {
        path: "/cartpage",
        element: <Cartpage /> // Cartpage route
      },
      
      {
        path: "/checkout",
        element: <Checkout />
      },
      {

        path: "/orders",
        element: <Orders />
      },
      {
        path: "/forgotpassword",
        element: <Forgotpassword />
      },
      {
        path: "/signup",
        element: <Signup />
      }
      ,
      {
        path: "/checkoutpage",
        element: <CheckoutPage />
      },
      {
        path: "testcustomer", 
        element: <CustomersPage/>
      },

     

    ]
  },
  {
    path: "/login",
    element: <Login/>,
  }
  

]);

function App(){
  return(
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
    
  )
}



export default App;