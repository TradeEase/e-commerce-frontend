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

// Layout component with Navbar, Outlet, and Footer
const Layout = ({ element }) => (
  <div>
    <NavBar />
    {element}
    <Footer />
  </div>
);

const router = createBrowserRouter([
  { path: "/", element: <Layout element={<Home />} /> },
  { path: "/adminview", element: <Layout element={<Adminview />} /> },
  { path: "/checkout", element: <Layout element={<Checkout />} /> },
  { path: "/profile", element: <Layout element={<ProfilePage />} /> },
  { path: "/contact", element: <Layout element={<ContactUs />} /> },
  { path: "/categories", element: <Layout element={<Categories />} /> },
  { path: "/admincreation", element: <Layout element={<AdminCreation />} /> },
  { path: "/products", element: <Layout element={<ProductsPage />} /> },
  { path: "/adminhomepage", element: <Layout element={<AdminHomePage />} /> },
  { path: "/orders", element: <Layout element={<Orders />} /> },
  { path: "/login", element: <Login /> },
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
