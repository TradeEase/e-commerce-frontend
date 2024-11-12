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
        path: "/home",
        element: <Home />
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