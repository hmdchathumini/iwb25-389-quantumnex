import React, { useState } from "react";
import logo from "./sitelogo.svg";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import WorkerDashboardPage from "./pages/WorkerDashboardPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";

// --- Common Styles ---
const commonStyles = `
  .font-poppins { font-family: 'Poppins', sans-serif; }
  .container {
    width: 90%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  }
  .btn {
    padding: 0.75rem 1.75rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  .btn-primary {
    background-color: #007bff;
    color: #ffffff;
    border: none;
  }
  .btn-primary:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  .btn-outline {
    background-color: transparent;
    color: #007bff;
    border: 2px solid #007bff;
  }
  .btn-outline:hover {
    background-color: #007bff;
    color: #ffffff;
  }
`;

// --- Navbar ---
function Navbar({ userName }) {
  const location = useLocation();
  const navLinks = userName
    ? [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/owner-dashboard" },
        { name: "Honest Review", path: "/honest-review" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];

  // Hide navbar on dashboard routes
  const hideNavbarRoutes = [
    "/admin-dashboard",
    "/customer-dashboard",
    "/worker-dashboard",
  ];
  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  if (hideNavbar) return null;

  return (
    <header className="py-6 px-4 bg-white shadow-sm font-poppins sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 cursor-pointer">
          <img src={logo} alt="WorkNest Logo" width="40" />
          Worknest
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {userName ? (
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
              {userName.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="font-medium text-gray-700 hidden md:block">{userName}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/login" className="btn btn-outline hidden sm:block">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 font-poppins">
      <div className="container text-center">
        <p className="text-sm">&copy; 2025 Worknest. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link to="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}

// --- Page Container ---
const PageContainer = ({ children }) => (
  <div className="flex-1 flex flex-col items-center w-full">
    <main className="container flex-1">{children}</main>
  </div>
);

// --- Pages ---
function Landing() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <section className="py-20 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
          Find Trusted Help for Your Home. Find Work That Fits Your Life.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl">
          Worknest connects homeowners with skilled, local workers for any household task, from cleaning to gardening and more.
        </p>
        <button onClick={() => navigate("/signup")} className="btn btn-primary text-xl px-10 py-4">Get Started</button>
      </section>
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card text-left p-8">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">For Homeowners</h3>
            <p className="text-gray-600 mb-6 flex-1">
              Post your task, browse profiles of trusted workers, and get your home sparkling. All payments are handled securely through our platform.
            </p>
            <img src="https://placehold.co/600x400/007bff/ffffff?text=Homeowner" alt="Homeowner posting a task" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
          <div className="card text-left p-8">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">For Workers</h3>
            <p className="text-gray-600 mb-6 flex-1">
              Create a profile, browse local tasks that match your skills, and earn extra income on your own schedule. Build your reputation with every job you complete.
            </p>
            <img src="https://placehold.co/600x400/28a745/ffffff?text=Worker" alt="Worker finding a new task" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

function Login({ setUserName }) {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setUserName("John P.");
    // Redirect based on role
    if (role === "worker") navigate("/worker-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
    else navigate("/customer-dashboard");
  };
  return (
    <PageContainer>
      <div className="flex justify-center items-center min-h-screen-minus-nav">
        <div className="card max-w-lg w-full p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Log In to Worknest</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="worker">Worker</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">Log In</button>
          </form>
          <p className="mt-4 text-gray-600">Don't have an account? <span onClick={() => navigate("/signup")} className="text-blue-500 cursor-pointer font-medium">Sign Up</span></p>
        </div>
      </div>
    </PageContainer>
  );
}

function SignUp({ setUserName }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setUserName(fullName || "New User");
    setMessage("Sign up successful! Redirecting...");
    setIsSuccess(true);
    setTimeout(() => {
      if (role === "worker") navigate("/worker-dashboard");
      else navigate("/customer-dashboard");
    }, 1000);
  };

  return (
    <PageContainer>
      <div className="flex justify-center items-center min-h-screen-minus-nav">
        <div className="card max-w-lg w-full p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up for Worknest</h2>
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="worker">Worker</option>
                <option value="customer">Customer</option>
                {/* No admin option for sign up */}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
          </form>
          {message && (
            <p className={`mt-4 ${isSuccess ? "text-green-600" : "text-red-600"}`}>{message}</p>
          )}
          <p className="mt-4 text-gray-600">Already have an account? <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer font-medium">Log In</span></p>
        </div>
      </div>
    </PageContainer>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Welcome, John P.! How can we help you today?</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My Dashboard</h2>
            <p className="text-gray-600 mb-6 flex-1">
              View and manage tasks you've posted, track bids, and find the perfect worker for your home projects.
            </p>
            <button onClick={() => navigate("/owner-dashboard")} className="btn btn-primary self-start">Go to Dashboard</button>
          </div>
          <div className="card p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Work</h2>
            <p className="text-gray-600 mb-6 flex-1">
              Browse available tasks in your area, create a professional profile, and earn money on your own schedule.
            </p>
            <button onClick={() => navigate("/worker-dashboard")} className="btn btn-primary self-start">Go to Work Page</button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

function OwnerDashboard() {
  const tasks = [
    { id: 1, title: "Deep Clean Apartment", status: "Active", worker: "Jane Doe" },
    { id: 2, title: "Repair Leaky Faucet", status: "Completed", worker: "John Smith" },
    { id: 3, title: "Gardening & Weeding", status: "Awaiting Bids", worker: null },
  ];
  const navigate = useNavigate();
  return (
    <PageContainer>
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
          <button className="btn btn-primary" onClick={() => navigate("/owner-dashboard")}>Post a New Task</button>
        </div>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                <h3 className="text-xl font-medium text-blue-600">{task.title}</h3>
                {task.worker && <p className="text-gray-500 mt-1">Worker: {task.worker}</p>}
              </div>
              <span className={`text-lg font-semibold ${task.status === "Active" ? "text-green-600" : task.status === "Completed" ? "text-purple-600" : "text-yellow-600"}`}>{task.status}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Want to provide feedback? Share your honest review with your friends.</p>
          <button className="btn btn-primary" onClick={() => navigate("/honest-review")}>Share Honest Review</button>
        </div>
      </section>
    </PageContainer>
  );
}

function WorkerDashboard() {
  const tasks = [
    { id: 1, title: "Deep Clean Apartment", description: "Need a thorough deep cleaning for a 1-bedroom apartment.", price: "$150", location: "Downtown" },
    { id: 2, title: "Assemble IKEA Furniture", description: "A few pieces of IKEA furniture need assembly.", price: "$75", location: "Suburbia" },
    { id: 3, title: "Lawn Mowing & Edging", description: "Regular lawn maintenance needed for a small backyard.", price: "$40", location: "East Side" },
  ];
  return (
    <PageContainer>
      <section className="py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Tasks</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="card p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h3>
                <p className="text-gray-500 mb-4">Location: {task.location}</p>
                <p className="text-gray-600 flex-1">{task.description}</p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-bold text-green-600">{task.price}</span>
                <button className="btn btn-primary">Accept Request</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

function About() {
  return (
    <PageContainer>
      <section className="py-16 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Worknest</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          At Worknest, we're dedicated to simplifying the process of finding and providing household services. We created our platform to bridge the gap between homeowners who need a helping hand and skilled workers seeking flexible opportunities. Our mission is to build a community founded on trust, reliability, and mutual respect.
        </p>
        <h2 className="text-3xl font-bold text-blue-600 mt-12 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          We envision a world where every household task, big or small, can be completed with ease and confidence. We strive to empower workers by giving them a secure platform to showcase their skills and build a reputation, and to give homeowners peace of mind knowing they are hiring from a community of vetted professionals.
        </p>
      </section>
    </PageContainer>
  );
}

function Contact() {
  return (
    <PageContainer>
      <div className="flex justify-center items-center py-16">
        <div className="card max-w-xl w-full p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <form className="space-y-6">
            <div>
              <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <textarea placeholder="Message" rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

function HonestReview() {
  return (
    <PageContainer>
      <div className="flex justify-center items-center py-16">
        <div className="card max-w-xl w-full p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Honest Review</h1>
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <label key={i} className="text-4xl text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors">
                <input type="radio" name="rating" value={5 - i} className="hidden" />
                &#9733;
              </label>
            ))}
          </div>
          <form className="space-y-6">
            <div>
              <textarea placeholder="Write your honest review here..." rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Submit Review</button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

// --- App ---
function App() {
  const [userName, setUserName] = useState(null);
  const location = useLocation();

  return (
    <>
      <style>{commonStyles}</style>
      <Navbar userName={userName} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/signup" element={<SignUp setUserName={setUserName} />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/worker-dashboard" element={<WorkerDashboardPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboardPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/honest-review" element={<HonestReview />} />
        <Route path="*" element={<div className="p-8 text-center">Page Not Found</div>} />
      </Routes>
      {location.pathname === "/" && <Footer />}
    </>
  );
}

// Wrap App with Router and export
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
