import React from "react";

function Contact() {
  return (
    <div style={{ padding: "50px 20px", fontFamily: "Arial, sans-serif", backgroundColor: "#fdfdfd" }}>
      <h1 style={{ textAlign: "center", color: "#1E90FF", marginBottom: "40px" }}>Contact Us</h1>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
          Have questions or need help? Reach out to us!
        </p>
        <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <input type="text" placeholder="Your Name" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <input type="email" placeholder="Your Email" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <textarea placeholder="Your Message" rows="5" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}></textarea>
          <button style={{ padding: "12px", backgroundColor: "#1E90FF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
