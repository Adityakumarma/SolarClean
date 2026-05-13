import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Advanced Dashboard", to: "/advanced-dashboard" },
    { label: "Clients", to: "/clients" },
     { label: "Teams", to: "/teams" },
    { label: "Tasks", to: "/tasks" },
    
   
    

  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .nb-root {
          font-family: "'Inter', sans-serif";
          position: sticky;
          top: 0;
          z-index: 200;
          background: #fff;
          border-bottom: 0.5px solid #e2e8f0;
        }

        .nb-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          height: 64px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* LOGO */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "'Inter', sans-serif";
          font-weight: 900;
          font-size: 25px;
          letter-spacing: -0.5px;
          color: #0F172A;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb-logo-icon {
          width: 34px;
          height: 34px;
          background: #F59E0B;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* LINKS */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nb-link {
          text-decoration: none;
          font-size: 16px;
          font-weight: 400;
          color: #64748b;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .nb-link:hover {
          background: #f8fafc;
          color: #0F172A;
        }
        .nb-link.active {
          background: #FEF3C7;
          color: #B45309;
          font-weight: 500;
        }
        .nb-link-dot {
          width: 5px;
          height: 5px;
          background: #F59E0B;
          border-radius: 50%;
          display: none;
        }
        .nb-link.active .nb-link-dot {
          display: inline-block;
        }

        /* RIGHT SIDE */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .nb-icon-btn {
          width: 36px;
          height: 36px;
          border: 0.5px solid #e2e8f0;
          border-radius: 8px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          position: relative;
        }
        .nb-icon-btn:hover { background: #f8fafc; }
        .nb-notif-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 6px;
          height: 6px;
          background: #F59E0B;
          border-radius: 50%;
          border: 1.5px solid #fff;
        }
        .nb-divider {
          width: 1px;
          height: 24px;
          background: #e2e8f0;
        }
        .nb-cta {
          background: #0F172A;
          color: #fff;
          border: none;
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          white-space: nowrap;
        }
        .nb-cta:hover { background: #1e293b; }

        /* AVATAR */
        .nb-avatar {
          width: 34px;
          height: 34px;
          background: #F59E0B;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #1a1200;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* HAMBURGER */
        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: transparent;
          border: none;
        }
        .nb-hamburger span {
          display: block;
          width: 20px;
          height: 1.5px;
          background: #0F172A;
          border-radius: 2px;
          transition: all 0.2s;
        }

        /* MOBILE MENU */
        .nb-mobile-menu {
          display: none;
          position: absolute;
          top: 64px;
          left: 0;
          right: 0;
          background: #fff;
          border-bottom: 0.5px solid #e2e8f0;
          padding: 1rem 1.5rem;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .nb-mobile-menu.open { display: flex; }
        .nb-mobile-link {
          text-decoration: none;
          font-size: 15px;
          font-weight: 400;
          color: #64748b;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nb-mobile-link:hover { background: #f8fafc; color: #0F172A; }
        .nb-mobile-link.active { background: #FEF3C7; color: #B45309; font-weight: 500; }
        .nb-mobile-divider {
          height: 0.5px;
          background: #e2e8f0;
          margin: 0.5rem 0;
        }
        .nb-mobile-cta {
          background: #0F172A;
          color: #fff;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .nb-links { display: none; }
          .nb-cta { display: none; }
          .nb-divider { display: none; }
          .nb-hamburger { display: flex; }
          .nb-root { position: relative; }
        }
      `}</style>

      <nav className="nb-root">
        <div className="nb-inner">


          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
            Solar Clean
          </Link>


          <ul className="nb-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nb-link${isActive(link.to) ? " active" : ""}`}
                >
                  <span className="nb-link-dot"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>


          <div className="nb-right">


            <Link to="/tasks" className="nb-cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Task
            </Link>

            <button
              className="nb-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }}></span>
              <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }}></span>
            </button>

          </div>
        </div>


        <div className={`nb-mobile-menu${menuOpen ? " open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nb-mobile-link${isActive(link.to) ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="nb-mobile-divider"></div>
          <Link to="/tasks" className="nb-mobile-cta" onClick={() => setMenuOpen(false)}>
            + New Task
          </Link>
        </div>
      </nav>
    </>
  );
}