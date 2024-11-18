import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Adminview from "./admin/Adminview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/home";
import Checkout from "./checkout/Checkout";
import Login from "./login/LoginPage";
import ProfilePage from "./profile/ProfilePage";
import ContactUs from "./contact/ContactUs";
import Categories from "./adminPages/Categories";
import AdminCreation from "./adminPages/AdminCreation";
import ProductsPage from "./adminPages/ProductsPage";
import AdminHomePage from "./adminPages/AdminHomePage";
import Orders from "./Orders/Orders";
import ReturnOrder from "./Orders/ReturnOrder";

const Layout = () => (
  <div>
    <NavBar />
    <div className="content">
      <Outlet /> 
    </div>
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
    ],
  },
  { path: "/login", element: <Login /> }, // Login page without Layout
]);

// Main App component
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

