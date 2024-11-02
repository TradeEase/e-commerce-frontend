import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import adminview from "./admin/adminview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/home";
import LoginPage from './login/LoginPage';
import Signup from './login/Signup';
import ForgotPassword from './login/ForgotPassword';
import EnterConfirmationCode from './login/EnterConfirmationCode';
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
        <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
      </div>
    </div>
    
  )
}



export default App;