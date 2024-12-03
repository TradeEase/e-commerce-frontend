import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";


import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/home";
import Login from "./login/LoginPage";
import Forgotpassword from "./login/Forgotpassword";
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
import ReturnOrder from "./Orders/ReturnOrder";
import Payments1 from "./Payments/Payments1";
import Payments2 from "./Payments/Payments2";
import Payments3 from "./Payments/Payments3";

// Layout component with Navbar, Outlet, and Footer
const Layout = () => (
  <div>
    <NavBar />
    <Outlet /> {/* Render child routes */}
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgotpassword", element: <Forgotpassword /> },
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
      { path: "/returnorder", element: <ReturnOrder /> },
      { path: "/Payments1", element: <Payments1 /> },
      { path: "/Payments2", element: <Payments2 /> },
      { path: "/Payments3", element: <Payments3 /> },
      { path: "/Cartpage", element: <Cartpage /> },
    ],
  },
  { path: "/login", element: <Login /> }, // Login page without Layout
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
