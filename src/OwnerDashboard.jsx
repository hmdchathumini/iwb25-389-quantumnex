import React, { useState } from "react";

function OwnerDashboard({ jobs, setJobs }) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");

  const handlePostJob = () => {
    if (!task || !description || !price || !location || !date || !contact) {
      alert("Please fill all fields");
      return;
    }

    const newJob = {
      task,
      description,
      price,
      location,
      date,
      contact,
      acceptedBy: null,
      workerContact: null,
    };

    setJobs([...jobs, newJob]);
    setTask(""); setDescription(""); setPrice(""); setLocation(""); setDate(""); setContact("");
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f2f4f7", minHeight: "100vh" }}>
      <h2 style={{ color: "#1E90FF", textAlign: "center", marginBottom: "30px" }}>Owner Dashboard</h2>

      {/* Job Posting Form */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto 40px",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ marginBottom: "20px", color: "#333" }}>Post a New Job</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input placeholder="Task" value={task} onChange={e => setTask(e.target.value)} style={inputStyle} />
          <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={inputStyle} />
          <input placeholder="Price (Rs.)" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} />
          <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} style={inputStyle} />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
          <input placeholder="Contact Number" value={contact} onChange={e => setContact(e.target.value)} style={inputStyle} />
          <button onClick={handlePostJob} style={buttonStyle}>Post Job</button>
        </div>
      </div>

      {/* Posted Jobs */}
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Your Posted Jobs</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {jobs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No jobs posted yet.</p>
        ) : (
          jobs.map((job, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <p><strong>Task:</strong> {job.task}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Price:</strong> Rs. {job.price}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Date:</strong> {job.date}</p>
              <p><strong>Contact:</strong> {job.contact}</p>
              {job.acceptedBy && (
                <>
                  <p><strong>Accepted By:</strong> {job.acceptedBy}</p>
                  <p><strong>Worker Contact:</strong> {job.workerContact}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "16px"
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(to right, #1E90FF, #32CD32)",
  color: "#fff",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s",
};

export default OwnerDashboard;








