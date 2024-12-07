import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/home";
import Login from "./login/LoginPage";
import Forgotpassword from "./login/ForgotPassword";
import Signup from "./login/Signup";
import ProfilePage from "./profile/ProfilePage";
import ContactUs from "./contact/ContactUs";
import Categories from "./adminPages/Categories";
import AdminCreation from "./adminPages/AdminCreation";
import AdminProductsPage from "./adminPages/ProductsPage";
import ProductsPage from "./product/product";
import CustomerPage from "./adminPages/CustomersPage";
import Checkout from "./checkout/Checkout";
import Cartpage from "./Cartpage/cartpage";
import Orders from "./Orders/Orders";
import CategoryPage from "./customer/CategoryPage";
import Payments1 from "./Payments/Payments1";
import { RequireToken } from "./login/Auth";



// Layout component with Navbar, Outlet, and Footer
const Layout = () => (
  <div>
<RequireToken>
    <div>
      <NavBar />
      <Outlet /> {/* Render child routes */}
      <Footer />
    </div>
</RequireToken>
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/categories", element: <Categories /> },
      { path: "/admincreation", element: <AdminCreation /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/product/:id", element: <ProductsPage /> },
      { path: "/adminproducts", element: <AdminProductsPage /> },
      { path: "/customers", element: <CustomerPage /> },
      { path: "/orders", element: <Orders /> },

      { path: "/payments1", element: <Payments1 /> },
      { path: "/Cartpage", element: <Cartpage /> },
    ],
  },
  { path: "/login", element: <Login /> }, // Login page without Layout
  { path: "/forgotpassword", element: <Forgotpassword /> },
  { path: "/signup", element: <Signup /> },

]);

function App() {
  return (
    <div className="app">
    
      <RouterProvider router={router} />
    
    </div>
  );
}

export default App;
