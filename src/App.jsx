import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import AdminView from "./admin/adminview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./customer/home";
import LoginPage from './login/LoginPage';
import Signup from './login/Signup';
import ForgotPassword from './login/ForgotPassword';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* This renders nested routes */}
      <Footer />
    </div>
  );
};

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
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  }
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
