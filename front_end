import React, { useState } from 'react';

// =================================================================
// Worknest Web Application
// This is a complete, single-file React application.
// All components and logic are contained within this file.
// =================================================================
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Utility component to handle page routing
  const PageContainer = ({ children }) => (
    <div className="flex-1 flex flex-col items-center w-full">
      <main className="container flex-1">
        {children}
      </main>
    </div>
  );

  // Common styles for a professional look
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

  // Reusable navigation bar component
  const Navbar = ({ setPage, userName = null }) => {
    const isLoggedIn = userName !== null;
    return (
      <header className="py-6 px-4 bg-white shadow-sm font-poppins sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <a onClick={() => setPage('landing')} className="flex items-center gap-2 text-2xl font-bold text-blue-600 cursor-pointer">
            <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-9v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Worknest
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <a onClick={() => setPage('home')} className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">Home</a>
                <a onClick={() => setPage('owner-dashboard')} className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">Dashboard</a>
                <a onClick={() => setPage('honest-review')} className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">Honest Review</a>
              </>
            ) : (
              <>
                <a onClick={() => setPage('landing')} className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">Home</a>
                <a onClick={() => setPage('about')} className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">About Us</a>
                <a onClick={() => setPage('contact')} className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">Contact</a>
              </>
            )}
          </nav>
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">{userName.split(' ').map(n => n[0]).join('')}</div>
              <span className="font-medium text-gray-700 hidden md:block">{userName}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button onClick={() => setPage('login')} className="btn btn-outline hidden sm:block">Login</button>
              <button onClick={() => setPage('signup')} className="btn btn-primary">Sign up</button>
            </div>
          )}
        </div>
      </header>
    );
  };

  // Reusable footer component
  const Footer = () => (
    <footer className="bg-gray-800 text-white py-8 font-poppins">
      <div className="container text-center">
        <p className="text-sm">&copy; 2025 Worknest. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</a>
          <a onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact Us</a>
        </div>
      </div>
    </footer>
  );

  // --- Page Components ---

  const Landing = () => (
    <PageContainer>
      <section className="py-20 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
          Find Trusted Help for Your Home. Find Work That Fits Your Life.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl">
          Worknest connects homeowners with skilled, local workers for any household task, from cleaning to gardening and more.
        </p>
        <button onClick={() => setCurrentPage('signup')} className="btn btn-primary text-xl px-10 py-4">Get Started</button>
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

  const Login = () => (
    <PageContainer>
      <div className="flex justify-center items-center min-h-screen-minus-nav">
        <div className="card max-w-lg w-full p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Log In to Worknest</h2>
          <form className="space-y-6">
            <div>
              <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <button type="submit" onClick={() => setCurrentPage('home')} className="btn btn-primary w-full">Log In</button>
          </form>
          <p className="mt-4 text-gray-600">Don't have an account? <span onClick={() => setCurrentPage('signup')} className="text-blue-500 cursor-pointer font-medium">Sign Up</span></p>
        </div>
      </div>
    </PageContainer>
  );

  const SignUp = () => {
    // This function handles the sign-up submission and calls the backend.
    const handleSignUp = async (e) => {
      e.preventDefault(); // Prevent the default form submission that reloads the page.
      setMessage('Signing up...');

      // Note: You must have your Ballerina backend running at this URL.
      const backendUrl = 'http://localhost:9090/worknest/signup';
      
      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: password
          }),
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
          setMessage('Sign up successful! Redirecting to home page...');
          setIsSuccess(true);
          setTimeout(() => setCurrentPage('home'), 2000); // Redirect after 2 seconds
        } else {
          setMessage(result.message || 'Sign up failed. Please try again.');
          setIsSuccess(false);
        }
      } catch (error) {
        console.error('Error connecting to the backend:', error);
        setMessage('Error: Could not connect to the server.');
        setIsSuccess(false);
      }
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
              <button type="submit" className="btn btn-primary w-full">Sign Up</button>
            </form>
            {message && (
              <p className={`mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <p className="mt-4 text-gray-600">Already have an account? <span onClick={() => setCurrentPage('login')} className="text-blue-500 cursor-pointer font-medium">Log In</span></p>
          </div>
        </div>
      </PageContainer>
    );
  };

  const Home = () => (
    <PageContainer>
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Welcome, John P.! How can we help you today?</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My Dashboard</h2>
            <p className="text-gray-600 mb-6 flex-1">
              View and manage tasks you've posted, track bids, and find the perfect worker for your home projects.
            </p>
            <button onClick={() => setCurrentPage('owner-dashboard')} className="btn btn-primary self-start">Go to Dashboard</button>
          </div>
          <div className="card p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Work</h2>
            <p className="text-gray-600 mb-6 flex-1">
              Browse available tasks in your area, create a professional profile, and earn money on your own schedule.
            </p>
            <button onClick={() => setCurrentPage('worker-dashboard')} className="btn btn-primary self-start">Go to Work Page</button>
          </div>
        </div>
      </section>
    </PageContainer>
  );

  const OwnerDashboard = () => {
    const tasks = [
      { id: 1, title: 'Deep Clean Apartment', status: 'Active', worker: 'Jane Doe' },
      { id: 2, title: 'Repair Leaky Faucet', status: 'Completed', worker: 'John Smith' },
      { id: 3, title: 'Gardening & Weeding', status: 'Awaiting Bids', worker: null },
    ];
    return (
      <PageContainer>
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
            <button className="btn btn-primary" onClick={() => setCurrentPage('owner-dashboard')}>Post a New Task</button>
          </div>
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-xl font-medium text-blue-600">{task.title}</h3>
                  {task.worker && <p className="text-gray-500 mt-1">Worker: {task.worker}</p>}
                </div>
                <span className={`text-lg font-semibold ${task.status === 'Active' ? 'text-green-600' : task.status === 'Completed' ? 'text-purple-600' : 'text-yellow-600'}`}>{task.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Want to provide feedback? Share your honest review with your friends.</p>
            <button className="btn btn-primary" onClick={() => setCurrentPage('honest-review')}>Share Honest Review</button>
          </div>
        </section>
      </PageContainer>
    );
  };

  const WorkerDashboard = () => {
    const tasks = [
      { id: 1, title: 'Deep Clean Apartment', description: 'Need a thorough deep cleaning for a 1-bedroom apartment.', price: '$150', location: 'Downtown' },
      { id: 2, title: 'Assemble IKEA Furniture', description: 'A few pieces of IKEA furniture need assembly.', price: '$75', location: 'Suburbia' },
      { id: 3, title: 'Lawn Mowing & Edging', description: 'Regular lawn maintenance needed for a small backyard.', price: '$40', location: 'East Side' },
    ];
    return (
      <PageContainer>
        <section className="py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Tasks</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <div key={task.id} className="card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h3>
                  <p className="text-gray-500 mb-4">Location: {task.location}</p>
                  <p className="text-gray-600 flex-1">{task.description}</p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-xl font-bold text-green-600">{task.price}</span>
                  <button className="btn btn-primary" onClick={() => setCurrentPage('worker-dashboard')}>Accept Request</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
    );
  };

  const About = () => (
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

  const Contact = () => (
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

  const HonestReview = () => (
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

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <Landing />;
      case 'login': return <Login />;
      case 'signup': return <SignUp />;
      case 'home': return <Home />;
      case 'owner-dashboard': return <OwnerDashboard />;
      case 'worker-dashboard': return <WorkerDashboard />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'honest-review': return <HonestReview />;
      default: return <div className="p-8 text-center">Page Not Found</div>;
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-poppins min-h-screen flex flex-col">
      <style>{commonStyles}</style>
      <Navbar setPage={setCurrentPage} userName={currentPage === 'home' || currentPage === 'owner-dashboard' || currentPage === 'honest-review' ? 'John P.' : currentPage === 'worker-dashboard' ? 'Jane D.' : null} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
