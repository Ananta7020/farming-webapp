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
import ExpenseTracker from "./pages/ExpenseTracker";
import Tips from "./pages/Tips";
import FertilizerAndPesticide from "./pages/FertilizerAndPesticide";
import MarketPrice from "./pages/MarketPrice";
import AboutPage from "./pages/AboutPages";
import ShopsPage from "./pages/ShopPage";
import AddShopPage from "./pages/AddShopPage";
import AddProductPage from "./pages/AddProductPage";
import ShopDetailsPage from "./pages/ShopDeatailsPage";

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
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/shops" element={<ShopsPage/>}></Route>

      <Route path="/shops/:aaa" element={<ShopDetailsPage/>}/>

      {/* it is for shopkeeper only */}
      <Route path="/shops/myshop" element={<ShopsPage/>}></Route>
      
      <Route path="/addshop" element={<AddShopPage/>}></Route>
      {/* <Route path="/shop/:id/addproduct" element={<AddProductPage />} /> */}
       <Route path="/addproduct" element={<AddProductPage />} />

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
        <Route path="/expence" element={<ProtectedRoute>
              <ExpenseTracker />
            </ProtectedRoute>}></Route>
        <Route path="/tips" element={<Tips/>}></Route>
        <Route path="/fertilizerandpesticide" element={<FertilizerAndPesticide/>}></Route>
        <Route path="/marketprice" element={<MarketPrice/>}></Route>
        <Route path="/crops" element={<CropPage/>}></Route>
        <Route path="/weather" element={<WeatherPage/>}></Route>
        
      </Routes>
    </>
  );
}
export default App;
