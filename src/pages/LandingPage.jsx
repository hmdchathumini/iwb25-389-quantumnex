import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Welcome to Task App</h1>
                <p>Your one-stop solution to find and offer tasks!</p>
            </header>
            <main className="landing-content">
                <section className="landing-buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                </section>
            </main>
            <footer className="landing-footer">
                <p>&copy; {new Date().getFullYear()} Task App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;