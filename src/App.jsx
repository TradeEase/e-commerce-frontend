import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import adminview from "./admin/adminview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import home from "./customer/home";
import login from "./login/login";
import ProfilePage from "./profile/ProfilePage";
import ContactUs from "./contact/ContactUs";
import Categories from "./adminPages/Categories";
import AdminCreation from "./adminPages/AdminCreation";
import AdminProductsPage from "./adminPages/ProductsPage";
import ProductsPage from "./product/product";
import AdminHomePage from "./adminPages/AdminHomePage";
import Checkout from "./checkout/Checkout";
import Cartpage from "./Cartpage/cartpage"; // Ensure case matches file name
import TestProducts from "./TestProducts/TestProducts"; // Ensure case matches file name



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
        element: <home />
      },
      {
        path: "/adminview",
        element: <adminview />
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
        path: "products", 
        element: <ProductsPage/>
      },
      {
        path: "adminhomepage", 
        element: <AdminHomePage/>
      },
        {
        path: "/cartpage",
        element: <Cartpage /> // Cartpage route
      },
      {
        path: "/TestProducts", // New route for TestProduct
        element: <TestProducts />
      },
      
     

    ]
  },
  {
    path: "/login",
    element: <login/>,
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