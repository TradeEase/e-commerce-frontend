import {
  createBrowserRouter,
  RouterProvider,
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

import ReturnOrder from "./Orders/ReturnOrder";
import Payments1 from "./Payments/Payments1";
import Payments2 from "./Payments/Payments2";
import Payments3 from "./Payments/Payments3";


// Layout component with Navbar, Outlet, and Footer
const Layout = ({ element }) => (
  <div>
    <NavBar />
    {element}
    <Footer />
  </div>
);

const router = createBrowserRouter([

  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/adminview", element: <Adminview /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/categories", element: <Categories /> },
      { path: "/admincreation", element: <AdminCreation /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/adminhomepage", element: <AdminHomePage /> },
      { path: "/orders", element: <Orders /> },
      { path: "/returnorder", element: <ReturnOrder /> },
      { path: "/Payments1", element: <Payments1 /> },
      { path: "/Payments2", element: <Payments2 /> },
      { path: "/Payments3", element: <Payments3 /> },
    ],
  },
  { path: "/login", element: <Login /> }, // Login page without Layout

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
