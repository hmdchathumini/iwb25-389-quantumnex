import React, { useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    ownerName: "",
    workerName: "",
    rating: "",
    reviewText: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.ownerName && formData.workerName && formData.rating && formData.reviewText) {
      setReviews([formData, ...reviews]);
      setFormData({ ownerName:"", workerName:"", rating:"", reviewText:"" });
    } else {
      alert("Please fill all fields before submitting!");
    }
  };

  return (
    <div style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#f4f6f8", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#1E90FF", marginBottom: "30px" }}>Worker Reviews</h1>

      {/* Review Form */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto 40px",
        padding: "25px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", color: "#32CD32", marginBottom: "20px" }}>Post a Review</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="ownerName"
            placeholder="Your Name"
            value={formData.ownerName}
            onChange={handleChange}
            style={{ padding:"10px", borderRadius:"8px", border:"1px solid #ccc" }}
          />
          <input
            type="text"
            name="workerName"
            placeholder="Worker's Name"
            value={formData.workerName}
            onChange={handleChange}
            style={{ padding:"10px", borderRadius:"8px", border:"1px solid #ccc" }}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            min="1" max="5"
            style={{ padding:"10px", borderRadius:"8px", border:"1px solid #ccc" }}
          />
          <textarea
            name="reviewText"
            placeholder="Write your review..."
            value={formData.reviewText}
            onChange={handleChange}
            style={{ padding:"10px", borderRadius:"8px", border:"1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{ padding:"12px", background:"#1E90FF", color:"white", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"500" }}
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#1E90FF", marginBottom: "20px" }}>All Reviews</h2>
        {reviews.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No reviews yet.</p>
        ) : (
          reviews.map((rev, i) => (
            <div key={i} style={{
              padding:"20px", marginBottom:"15px", background:"#ffffff", borderRadius:"12px",
              boxShadow:"0 4px 15px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color:"#32CD32", marginBottom:"10px" }}>{rev.workerName} <span style={{ color:"#FFA500"}}>({rev.rating}/5)</span></h3>
              <p style={{ marginBottom:"5px" }}><strong>Review by:</strong> {rev.ownerName}</p>
              <p>{rev.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;

