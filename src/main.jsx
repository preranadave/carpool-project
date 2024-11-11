import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { UserAuthContextProvider } from "./Context/UserAuthContext.jsx";
//User Components Import
import UserHomePage from "./Components/User/UserHomePage.jsx";
import SignUp from "./Components/User/SignUp.jsx";
import LogIn from "./Components/User/LogIn.jsx";
import CreateDriverAccount from "./Components/User/Driver/CreateDriverAccount.jsx";
import CreateRide from "./Components/User/Ride/CreateRide.jsx";
import ViewRides from "./Components/User/Ride/ViewRides.jsx";
import UserRides from "./Components/User/Ride/UserRides.jsx";
import BookRide from "./Components/User/Ride/BookRide.jsx";
import PageNotFound from "./Components/User/PageNotFound.jsx";
//Admin Components Import
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
import AdminDashboard from "./Components/Admin/MainContent/AdminDashboard.jsx";
import UserManagement from "./Components/Admin/MainContent/UserManagement/UserManagement.jsx";
import DriverManagement from "./Components/Admin/MainContent/DriverManagement/DriverManagement.jsx";
import LocationManagement from "./Components/Admin/MainContent/Ride/LocationManagment.jsx";
import RidesManagement from "./Components/Admin/MainContent/Ride/RidesManagement.jsx";
import DeleteRide from "./Components/Admin/MainContent/Ride/DeleteRide.jsx";
import DeleteDriver from "./Components/Admin/MainContent/DriverManagement/DeleteDriver.jsx";
import RideNotifiactions from "./Components/User/Ride/RideNotifiactions.jsx";
import ConfirmJourney from "./Components/User/Ride/ConfirmJourney.jsx";
import ManageUserProfile from "./Components/User/ManageUserProfile.jsx";
import ContactUs from "./Components/User/Content/ContactUs.jsx";
import ContactManagement from "./Components/Admin/MainContent/ContactManagement/ContactManagement.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import AdminProtectedRoute from "./Components/Admin/AdminProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* user Component Route */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" index element={<LogIn></LogIn>}></Route>

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <UserHomePage />
              </ProtectedRoute>
            }
          ></Route>
          {/* Signup route */}

          <Route path="/signup" element={<SignUp></SignUp>}></Route>

          <Route path="/login" element={<LogIn></LogIn>}></Route>

          <Route
            path="/create-driver-account"
            element={
              <ProtectedRoute>
                <CreateDriverAccount></CreateDriverAccount>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-ride"
            element={
              <ProtectedRoute>
                <CreateRide></CreateRide>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/view-rides"
            element={
              <ProtectedRoute>
                <ViewRides></ViewRides>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/user-rides"
            element={
              <ProtectedRoute>
                <UserRides></UserRides>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/book-ride/:id"
            element={
              <ProtectedRoute>
                <BookRide></BookRide>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/ride-notifications"
            element={
              <ProtectedRoute>
                <RideNotifiactions></RideNotifiactions>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/confirm-journey/:id"
            element={
              <ProtectedRoute>
                <ConfirmJourney></ConfirmJourney>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/manage-profile"
            element={
              <ProtectedRoute>
                <ManageUserProfile></ManageUserProfile>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/contact-us"
            element={
              <ProtectedRoute>
                <ContactUs></ContactUs>
              </ProtectedRoute>
            }
          ></Route>

          {/* Admin Routing */}
          <Route path="/admin-login"  element={<AdminLogin></AdminLogin>}></Route>

          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route
              path="/admin/dashboard"
              element={<AdminProtectedRoute><AdminDashboard></AdminDashboard></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-users"
              element={<AdminProtectedRoute><UserManagement></UserManagement></AdminProtectedRoute>}
            ></Route>

            <Route
              path="/admin/dashboard/manage-users/:id"
              element={<AdminProtectedRoute><UserManagement></UserManagement></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-drivers"
              element={<AdminProtectedRoute><DriverManagement></DriverManagement></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-drivers/delete-driver/:id"
              element={<AdminProtectedRoute><DriverManagement></DriverManagement></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-locations"
              element={<AdminProtectedRoute><LocationManagement></LocationManagement></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-locations/delete-location/:id"
              element={<AdminProtectedRoute><LocationManagement></LocationManagement></AdminProtectedRoute>}
            ></Route>

            <Route
              path="/admin/dashboard/manage-rides"
              element={<AdminProtectedRoute><RidesManagement></RidesManagement></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-rides/delete-ride/:id"
              element={<AdminProtectedRoute><RidesManagement></RidesManagement></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-contacts"
              element={<AdminProtectedRoute><ContactManagement></ContactManagement></AdminProtectedRoute>}
            ></Route>
            <Route
              path="/admin/dashboard/manage-contacts/delete-contact/:id"
              element={<AdminProtectedRoute><ContactManagement></ContactManagement></AdminProtectedRoute>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  </StrictMode>
);
