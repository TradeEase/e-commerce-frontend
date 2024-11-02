import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import adminview from "./admin/adminview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/home";
import login from "./login/login";

const Layout =()=>{
  return(
    <div>
      <NavBar/>
      <Home/>
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
      }
     

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