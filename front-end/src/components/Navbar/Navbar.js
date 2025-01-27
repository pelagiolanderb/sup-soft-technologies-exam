import React, { useState } from "react";
import "./Navbar.css";
import { logout } from "../../api/auth";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await logout(localStorage.getItem("authToken"));
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button onClick={handleLogout} className="logout-button">
          {loading ? "Loading..." : "Logout"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
