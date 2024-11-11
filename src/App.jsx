import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import adminview from "./admin/adminview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import home from "./customer/home";

import Checkout from "./checkout/Checkout";



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
        path: "/checkout", 
        element: <Checkout/>
      },

    ]
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