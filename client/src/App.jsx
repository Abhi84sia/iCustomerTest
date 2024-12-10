import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
import Dashboard from "./pages/dashboard";
import Register from "./auth/register";
import { useAuth } from "./contexts/authContext";
import ProductDetail from "./components/productDetails";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> :<Login/>} />
        <Route path="/product/:productId" element={<ProductDetail />} />

      </Routes>
    </Router>
  );
};

export default App;
