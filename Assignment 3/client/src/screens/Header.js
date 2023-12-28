import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token);
    console.log("isLoggedIn :", token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <div className="header-container">
      <h1 className="header-title">BlogVoyage</h1>
      {isLoggedIn ? (
        <div className="header-links">
          <Link to="/blogs" className={location.pathname === "/blogs" ? "selected" : ""}>Community Posts</Link>
          <Link to="/myblogs" className={location.pathname === "/myblogs" ? "selected" : ""}>My Blogs</Link>
          <Link to="/blogs/add" className={location.pathname === "/blogs/add" ? "selected" : ""}>Add Blog</Link>
          <button onClick={handleLogout}>Log Out</button>
        </div>
        
      ) : (
        <div className="header-links">
          <Link to="/auth" className="login">
            Login In
          </Link>
          <Link to="/auth" className="signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
