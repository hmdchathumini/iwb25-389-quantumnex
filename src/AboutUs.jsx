import React from "react";
import aboutImage from "./about_us.jpeg"; // Place about_us.jpeg in src/

function AboutUs() {
  const teamMembers = [
    { name: "Dinithi Dewmini", role: "CEO" },
    { name: "Chamathka Ranathunga", role: "CTO" },
    { name: "Dinithi Chathumini", role: "COO" },
    { name: "Madhumi Bhagya", role: "Lead Developer" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fdfdfd" }}>
      
      {/* Top Parallax Header */}
      <div 
        style={{
          height: "450px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${aboutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          textAlign: "center",
          padding: "0 20px"
        }}
      >
        <h1 style={{ fontSize: "60px", fontWeight: "700", marginBottom: "15px", textShadow: "2px 2px 10px rgba(0,0,0,0.7)" }}>
          About Us
        </h1>
        <p style={{ fontSize: "22px", maxWidth: "700px", textShadow: "1px 1px 8px rgba(0,0,0,0.6)" }}>
          Connecting homeowners with skilled professionals to make every project seamless and reliable.
        </p>
      </div>

      {/* Content Wrapper */}
      <div style={{ padding: "50px 20px", backgroundColor: "#ffffff" }}>
        
        {/* Intro Section */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px" }}>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Welcome to <strong>WorkNest</strong>! We connect homeowners with skilled workers for tasks like painting, cleaning, driving, and more. 
            Our goal is to make it simple, reliable, and safe to find professional help whenever you need it.
          </p>
        </div>

        {/* Mission & Vision */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
          <div style={{
            flex: "1 1 300px",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: "#1E90FF",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "10px" }}>Our Mission</h2>
            <p>To provide homeowners with easy access to reliable, skilled workers for every task, big or small.</p>
          </div>

          <div style={{
            flex: "1 1 300px",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: "#32CD32",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginBottom: "10px" }}>Our Vision</h2>
            <p>To become the most trusted platform connecting homeowners and skilled workers seamlessly across the country.</p>
          </div>
        </div>

        {/* Core Values */}
        <div style={{ maxWidth: "800px", margin: "0 auto 50px" }}>
          <h2 style={{ color: "#1E90FF", textAlign: "center", marginBottom: "20px" }}>Our Core Values</h2>
          <ul style={{ listStyleType: "circle", fontSize: "16px", lineHeight: "1.8", paddingLeft: "20px" }}>
            <li>Reliability – Deliver quality work you can trust.</li>
            <li>Transparency – Honest communication and fair pricing.</li>
            <li>Safety – Ensuring secure and safe interactions.</li>
            <li>Customer Focus – Your satisfaction is our priority.</li>
            <li>Innovation – Continuously improving our platform and services.</li>
          </ul>
        </div>

        {/* Team Section */}
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ color: "#1E90FF", textAlign: "center", marginBottom: "20px" }}>Meet Our Team</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            {teamMembers.map((member) => (
              <div key={member.name} style={{
                flex: "1 1 250px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "12px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}>
                <div style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#1E90FF",
                  margin: "0 auto 15px",
                }}></div>
                <h3>{member.name}</h3>
                <p style={{ color: "#555" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
