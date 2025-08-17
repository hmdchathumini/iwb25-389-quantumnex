import React, { useState } from "react";
import logo from "./sitelogo.svg";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import OwnerDashboard from "./OwnerDashboard";
import WorkerDashboard from "./WorkerDashboard";
import Reviews from "./Reviews";

function App() {
  const [page, setPage] = useState("Home");
  const [jobs, setJobs] = useState([]); // shared jobs state

  const renderPage = () => {
    switch (page) {
      case "Home":
        return <Home />;
      case "AboutUs":
        return <AboutUs />;
      case "Contact":
        return <Contact />;
      case "OwnerDashboard":
        return <OwnerDashboard jobs={jobs} setJobs={setJobs} />;
      case "WorkerDashboard":
        return <WorkerDashboard jobs={jobs} setJobs={setJobs} />;
      case "Reviews":
        return <Reviews />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
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
        <div style={{ cursor: "pointer" }} onClick={() => setPage("Home")}>
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

          {["Home", "AboutUs", "Contact", "OwnerDashboard", "WorkerDashboard", "Reviews"].map(
            (p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor: page === p ? "#1E90FF" : "#f0f0f0",
                  color: page === p ? "white" : "black",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "500",
                }}
              >
                {p === "AboutUs" ? "About Us" : p}
              </button>
            )
          )}

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

      {renderPage()}
    </div>
  );
}

export default App;






