import React, { useState } from "react";

function WorkerDashboard({ jobs, setJobs }) {
  const [workerName, setWorkerName] = useState("");
  const [workerContact, setWorkerContact] = useState("");

  const handleAcceptJob = (index) => {
    if (!workerName || !workerContact) {
      alert("Enter your name and contact number");
      return;
    }

    const updatedJobs = jobs.map((job, i) =>
      i === index ? { ...job, acceptedBy: workerName, workerContact } : job
    );

    setJobs(updatedJobs);
    setWorkerName(""); setWorkerContact("");
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f2f4f7", minHeight: "100vh" }}>
      <h2 style={{ color: "#1E90FF", textAlign: "center", marginBottom: "30px" }}>Worker Dashboard</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {jobs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No available jobs.</p>
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
              <p><strong>Owner Contact:</strong> {job.contact}</p>

              {job.acceptedBy ? (
                <>
                  <p><strong>Accepted By:</strong> {job.acceptedBy}</p>
                  <p><strong>Worker Contact:</strong> {job.workerContact}</p>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                  <input placeholder="Your Name" value={workerName} onChange={e => setWorkerName(e.target.value)} style={inputStyle} />
                  <input placeholder="Your Contact Number" value={workerContact} onChange={e => setWorkerContact(e.target.value)} style={inputStyle} />
                  <button onClick={() => handleAcceptJob(index)} style={buttonStyle}>Accept Job</button>
                </div>
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

export default WorkerDashboard;











