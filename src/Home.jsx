import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import

function Home() {
  const navigate = useNavigate(); // Initialize the hook

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fefefe" }}>
      {/* Hero Section with Scrolling Background */}
      <section
        style={{
          height: "80vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1950&q=80')",
          backgroundAttachment: "fixed", // makes the scrolling effect
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "1px 1px 5px rgba(0,0,0,0.6)",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>Welcome to WorkNest</h1>
        <p style={{ fontSize: "22px", maxWidth: "700px", lineHeight: "1.5", marginBottom: "30px" }}>
          Your trusted platform to connect with skilled professionals for every household and work task. 
          Fast, reliable, and secure.
        </p>
        <button style={{
          padding: "12px 30px",
          fontSize: "18px",
          borderRadius: "25px",
          border: "none",
          backgroundColor: "#1E90FF",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}>Get Started</button>
      </section>

      {/* Features Section */}
      <section style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 20px" }}>
        <h2 style={{ color: "#1E90FF", textAlign: "center", marginBottom: "40px" }}>Why Choose WorkNest?</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
          {[
            { title: "Skilled Professionals", desc: "All workers are verified and experienced in their fields.", color: "#32CD32" },
            { title: "Fast & Reliable", desc: "Get the help you need quickly, with guaranteed reliability.", color: "#1E90FF" },
            { title: "Safe & Secure", desc: "Your safety and privacy are our top priority.", color: "#FF6347" },
            { title: "Transparent Pricing", desc: "No hidden fees. Know what you pay before hiring.", color: "#FFA500" }
          ].map((feature, index) => (
            <div key={index} style={{
              flex: "1 1 250px",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              backgroundColor: feature.color,
              color: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ marginBottom: "10px" }}>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ backgroundColor: "#f0f0f0", padding: "50px 20px" }}>
        <h2 style={{ color: "#1E90FF", textAlign: "center", marginBottom: "40px" }}>How It Works</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", maxWidth: "1000px", margin: "0 auto" }}>
          {[
            { step: 1, title: "Post Your Task", desc: "Tell us what you need done and your preferred schedule." },
            { step: 2, title: "Choose a Worker", desc: "Browse verified workers and select the best fit for your task." },
            { step: 3, title: "Get It Done", desc: "Worker completes the task, and you confirm completion and payment." }
          ].map((item, index) => (
            <div key={index} style={{
              flex: "1 1 300px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#1E90FF",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "18px",
                margin: "0 auto 15px"
              }}>{item.step}</div>
              <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ textAlign: "center", padding: "50px 20px" }}>
        <h2 style={{ color: "#1E90FF", marginBottom: "20px" }}>Ready to get started?</h2>
        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto 30px" }}>
          Join WorkNest today and find the right professional for any task, anytime.
        </p>
        <button
          style={{
            padding: "12px 30px",
            fontSize: "18px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: "#32CD32",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => navigate("/register")} // Add this handler
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
}

export default Home;



