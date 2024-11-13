import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

// Import your components here
import AdminView from "./admin/AdminView";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/Home";
import Checkout from "./checkout/Checkout";
import Cartpage from "./Cartpage/cartpage"; // Ensure case matches file name
import TestProducts from "./TestProducts/TestProducts"; // Ensure case matches file name

// Layout component with NavBar and Footer wrapping Outlet for nested routes
const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

// Create the router with paths to each route
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/adminview",
        element: <AdminView />
      },
      {
        path: "/checkout",
        element: <Checkout />
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
  }
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
