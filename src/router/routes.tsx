import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../layout/ProtectedRoute";
import ProductPage from "../pages/ProductPage";
import SignUpForm from "../pages/SignUp";
import ServiceManagement from "../pages/ServiceManagement";
import UpdateService from "../pages/UpdateService";
import SlotManagement from "../pages/SlotManagement";
import ServiceDetails from "../pages/ServiceDetails";
import BookingPage from "../pages/Booking";
import UserDashboard from "../pages/UserDashboard";
import UserProtecedRoute from "../layout/UserProtecedRoute";

import UserBooking from "../pages/UserBooking";
import UserProfile from "../pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/services",
        element: <ProductPage />
      },
      {
        path: "/booking",
        element: <BookingPage />
      },
      {
        path: "/serviceDetails/:id",
        element: <ServiceDetails />
      },
    ]
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminDashboard />
      </ProtectedRoute>
    ),




    children:[
        {
        path: "/dashboard",
        element: (
          <ProtectedRoute adminOnly={true}>
            <ServiceManagement />
          </ProtectedRoute>
        ),
      },
        {
        path: "/dashboard/update/:id",
        element: (
          <ProtectedRoute adminOnly={true}>
            <UpdateService />
          </ProtectedRoute>
        ),
      },
        {
        path: "/dashboard/slots",
        element: (
          <ProtectedRoute adminOnly={true}>
            <SlotManagement />
          </ProtectedRoute>
        ),
      },

    ]




  },
  {
    path: "/userDashboard",
    element: (
     <UserProtecedRoute userOnly={true}>
<UserDashboard/>
     </UserProtecedRoute>
    ),

    children:[
        {
        path: "/userDashboard",
        element: (
          <UserProtecedRoute userOnly={true}>
          <UserProfile/>
               </UserProtecedRoute>
        ),
      },
        {
        path: "/userDashboard/myBooking",
        element: (
          <UserProtecedRoute userOnly={true}>
          <UserBooking/>
               </UserProtecedRoute>
        ),
      },
        

    ]




  },





  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signUp",
    element: <SignUpForm />
  },
]);

export default router;
