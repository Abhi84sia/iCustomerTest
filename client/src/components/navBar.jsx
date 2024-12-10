import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useAuth } from "../contexts/authContext";

export const NaveBar = () => {
  const [showMenu, setShowmenu] = useState(false);

  const handleButtonToggle = () => {
    setShowmenu(!showMenu);
  };

  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout(); // Logout function ko call karte hain
  };

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <header>
      <div className="navContainer">
        <div className="grid navbar-grid">
          <div className="logo">
            <h1>iCustomer</h1>
          </div>
          <nav className={showMenu ? "mobile-menu" : "web-menu"}>
            <ul>
              <li>
                <h4> {capitalizeFirstLetter(userData?.name || "User")} </h4>
              </li>
              <li>
                <a href="#"> Home </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/abhishek-chaurasiya-95a701210/"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </nav>
          <div className="ham-menu">
            <button
              onClick={handleButtonToggle}
              style={{ fontSize: "24px", padding: "5px 10px" }}
            >
              <AiOutlineBars />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
