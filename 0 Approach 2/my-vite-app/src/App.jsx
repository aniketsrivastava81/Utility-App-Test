/*
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage.jsx";
import FaqPage from "./pages/FAQPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import CheckDataPage from "./pages/CheckDataPage.jsx";

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/features">Features</Link>
            </li>
            <li>
              <Link to="/checkdata">Check Data</Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <button onClick={login}>Login</button>
              )}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/checkdata" element={<CheckDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

*/

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage.jsx";
import FaqPage from "./pages/FAQPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import CheckDataPage from "./pages/CheckDataPage.jsx";
import "./App.css";  // Make sure to add styles here

function App() {
  const { isAuthenticated, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div>
        {/* Header Section */}
        <header className="header">
          <div className="logo">
            <h1>Sensors and Utility Management Software</h1>
          </div>
          
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>

          <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/checkdata">Check Data</Link>
              </li>
              <li>
                {isAuthenticated ? (
                  <button onClick={logout}>Logout</button>
                ) : (
                  <button onClick={login}>Login</button>
                )}
              </li>
            </ul>
          </nav>
        </header>

        {/* Routes Section */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/checkdata" element={<CheckDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
