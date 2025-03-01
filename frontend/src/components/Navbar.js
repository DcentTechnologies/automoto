import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import the CSS file

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🚲 auto moto
        </Link>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/bikes" onClick={() => setMenuOpen(false)}>Browse Bikes</Link>
          <Link to="/sell" onClick={() => setMenuOpen(false)}>Sell a Bike</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <div className="navbar-buttons">
            {user ? (
                <>
                <Link to="/profile" className="btn profile-btn" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
            <Link to="/login" className="btn login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="btn signup-btn" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;