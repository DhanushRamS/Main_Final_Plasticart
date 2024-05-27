import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/pageviews/Home";
import History from "./History";
import Scanner from "./Components/pageviews/Scanner";
import Start from "./Components/pageviews/Start";
import VendorAuth from "./Components/pageviews/VendorAuth";
import Dashboard from "./Components/layout/Dashboard";
import Redeem from "./Components/pageviews/RedeemSection";
import AdminAuth from "./Components/pageviews/AdminAuth";
import AdminDashboard from "./Components/pageviews/AdminDashboard";
import "./style.css";

const App = () => {
  const [isWrapperOpen, setIsWrapperOpen] = useState(false);
  const [vendorEmail, setVendorEmail] = useState(
    localStorage.getItem("vendorEmail") || ""
  ); // Track logged-in vendor email
  const [acceptedPickups, setAcceptedPickups] = useState(
    JSON.parse(localStorage.getItem("acceptedPickups")) || []
  );
  const [rejectedPickups, setRejectedPickups] = useState(
    JSON.parse(localStorage.getItem("rejectedPickups")) || []
  );
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    localStorage.setItem("vendorEmail", vendorEmail);
  }, [vendorEmail]);

  useEffect(() => {
    localStorage.setItem("acceptedPickups", JSON.stringify(acceptedPickups));
  }, [acceptedPickups]);

  useEffect(() => {
    localStorage.setItem("rejectedPickups", JSON.stringify(rejectedPickups));
  }, [rejectedPickups]);

  const handleCloseWrapper = () => {
    setIsWrapperOpen(false);
  };

  const handleLogin = (email) => {
    setVendorEmail(email);
  };

  const handleAcceptPickup = (pickup) => {
    setAcceptedPickups((prev) => [...prev, pickup]);
  };

  const handleRejectPickup = (pickup) => {
    setRejectedPickups((prev) => [...prev, pickup]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/Userhome"
          element={
            <Home
              isWrapperOpen={isWrapperOpen}
              setIsWrapperOpen={setIsWrapperOpen}
              handleCloseWrapper={handleCloseWrapper}
            />
          }
        />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/vendor-auth"
          element={<VendorAuth onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              email={vendorEmail}
              pickups={pickups}
              setPickups={setPickups}
              acceptedPickups={acceptedPickups}
              rejectedPickups={rejectedPickups}
              onAcceptPickup={handleAcceptPickup}
              onRejectPickup={handleRejectPickup}
            />
          }
        />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/redeem" element={<Redeem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
