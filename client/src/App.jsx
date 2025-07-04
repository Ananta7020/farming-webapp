import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CropPage from "./pages/CropPages";
import WeatherPage from "./pages/WeatherPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupPage from "./pages/Signup";
import Navbar from "./pages/Header";
import ProfilePage from "./pages/Profile";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Don't show navbar on login or signup
  const hideNavbarRoutes = ["/", "/signup"];
  const shouldShowNavbar =
    isLoggedIn && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
      <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}
export default App;
