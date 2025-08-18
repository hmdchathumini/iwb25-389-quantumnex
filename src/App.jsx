import React from "react";
import logo from "./sitelogo.svg";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Reviews", path: "/reviews" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ cursor: "pointer" }}>
        <img src={logo} alt="WorkNest Logo" width="200" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "7px 12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              color: "black",
              border: "none",
              borderRadius: "5px",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            {link.name}
          </Link>
        ))}

        <button
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#32CD32",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "500",
          }}
        >
          Sign In
        </button>
        <button
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#FF6347",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "500",
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  // List all dashboard route prefixes here
  const hideNavbarRoutes = [
    "/admin-dashboard",
    "/customer-dashboard",
    "/worker-dashboard",
  ];
  // Hide navbar if the current path starts with any dashboard route
  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
