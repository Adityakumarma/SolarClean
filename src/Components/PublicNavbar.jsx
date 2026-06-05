import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import companyLogo from "../assets/companylogo.png";

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

        .pub-navbar {
          font-family: 'Outfit', sans-serif;
          position: sticky;
          top: 0;
          z-index: 999;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
        }

        .pub-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 72px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .pub-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .pub-logo:hover {
          transform: scale(1.02);
        }

        .pub-logo-img {
          height: 40px;
          width: auto;
          filter: invert(1);
          display: block;
        }

        .pub-nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .pub-nav-item {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #475569;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0.5rem 0;
          position: relative;
        }

        .pub-nav-item:hover {
          color: #316398;
        }

        .pub-nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #4596ab;
          transition: width 0.2s ease;
        }

        .pub-nav-item:hover::after {
          width: 100%;
        }

        .pub-login-btn {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(135deg, #316398 0%, #4596ab 100%);
          color: #ffffff;
          padding: 0.6rem 1.4rem;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(49, 99, 152, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pub-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(49, 99, 152, 0.35);
          opacity: 0.95;
        }

        .pub-login-btn:active {
          transform: translateY(0);
        }

        .pub-hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          padding: 6px;
          background: transparent;
          border: none;
          z-index: 1000;
        }

        .pub-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #0f172a;
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pub-mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #ffffff;
          padding: 6rem 2rem 2rem 2rem;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 998;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
        }

        .pub-mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          display: flex;
        }

        .pub-mobile-item {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #0f172a;
          background: transparent;
          border: none;
          text-align: left;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          width: 100%;
        }

        .pub-mobile-item:hover {
          color: #316398;
          padding-left: 8px;
          transition: all 0.2s ease;
        }

        .pub-mobile-login-btn {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(135deg, #316398 0%, #4596ab 100%);
          color: #ffffff;
          padding: 1rem;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          text-align: center;
          margin-top: 1rem;
          box-shadow: 0 4px 12px rgba(49, 99, 152, 0.2);
        }

        @media (max-width: 768px) {
          .pub-nav-links {
            display: none;
          }
          .pub-login-btn {
            display: none;
          }
          .pub-hamburger {
            display: flex;
          }
          .pub-hamburger.open span:nth-child(1) {
            transform: rotate(45deg) translateY(8px);
          }
          .pub-hamburger.open span:nth-child(2) {
            opacity: 0;
          }
          .pub-hamburger.open span:nth-child(3) {
            transform: rotate(-45deg) translateY(-8px);
          }
        }
      `}</style>

      <nav className="pub-navbar">
        <div className="pub-nav-inner">
          <Link to="/" className="pub-logo" onClick={() => handleScroll("hero")}>
            <img src={companyLogo} alt="Sunbird Power Solutions" className="pub-logo-img" />
          </Link>

          <ul className="pub-nav-links">
            <li>
              <button onClick={() => handleScroll("hero")} className="pub-nav-item">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleScroll("about")} className="pub-nav-item">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => handleScroll("services")} className="pub-nav-item">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => handleScroll("contact")} className="pub-nav-item">
                Contact
              </button>
            </li>
          </ul>

          <Link to="/admin-login" className="pub-login-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Admin Login
          </Link>

          <button
            className={`pub-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`pub-mobile-menu${menuOpen ? " open" : ""}`}>
          <button onClick={() => handleScroll("hero")} className="pub-mobile-item">
            Home
          </button>
          <button onClick={() => handleScroll("about")} className="pub-mobile-item">
            About Us
          </button>
          <button onClick={() => handleScroll("services")} className="pub-mobile-item">
            Services
          </button>
          <button onClick={() => handleScroll("contact")} className="pub-mobile-item">
            Contact
          </button>
          <Link to="/admin-login" className="pub-mobile-login-btn" onClick={() => setMenuOpen(false)}>
            Admin Login
          </Link>
        </div>
      </nav>
    </>
  );
}
