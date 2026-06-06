import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import companyLogo from "../assets/companylogo.png";


export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isSectionActive = (paths) => paths.some(path => location.pathname === path);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=Outfit:wght@400;500;600;700;800&display=swap');

        .nb-root {
          font-family: 'Outfit', sans-serif;
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
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 24px;
          letter-spacing: -0.5px;
          color: #0F172A;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb-logo-icon {
          width: 34px;
          height: 34px;
          background: #4596ab;
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
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          cursor: pointer;
        }
        .nb-link:hover {
          background: #f8fafc;
          color: #0F172A;
        }
        .nb-link.active {
          background: #ebf4fa;
          color: #316398;
          font-weight: 500;
        }
        .nb-link-dot {
          width: 5px;
          height: 5px;
          background: #4596ab;
          border-radius: 50%;
          display: none;
        }
        .nb-link.active .nb-link-dot {
          display: inline-block;
        }

        /* DROPDOWN */
        .nb-dropdown-container {
          position: relative;
        }

        .nb-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: 0.5px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          display: none;
          flex-direction: column;
          padding: 0.5rem 0;
          min-width: 155px;
          list-style: none;
          margin: 0;
          z-index: 210;
        }

        .nb-dropdown-container:hover .nb-dropdown-menu {
          display: flex;
        }

        .nb-dropdown-item {
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 550;
          color: #64748b;
          padding: 0.6rem 1.25rem;
          display: block;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }

        .nb-dropdown-item:hover {
          background: #f8fafc;
          color: #0F172A;
        }

        .nb-dropdown-item.active {
          background: #ebf4fa;
          color: #316398;
        }

        /* RIGHT SIDE */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .nb-divider {
          width: 1px;
          height: 24px;
          background: #e2e8f0;
        }
        .nb-cta {
          background: #316398;
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
          transition: background 0.15s;
        }
        .nb-cta:hover { background: #4596ab; }

        .nb-logout-btn {
          background: transparent;
          color: #64748b;
          border: 1px solid #cbd5e1;
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .nb-logout-btn:hover {
          background: #f8fafc;
          color: #ef4444;
          border-color: #fecaca;
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
          max-height: calc(100vh - 64px);
          overflow-y: auto;
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
        .nb-mobile-link.active { background: #ebf4fa; color: #316398; font-weight: 500; }
        
        .nb-mobile-section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #94a3b8;
          padding: 0.6rem 1rem 0.2rem 1rem;
        }
        
        .nb-mobile-link.sub {
          padding-left: 1.75rem;
          font-size: 14px;
        }

        .nb-mobile-divider {
          height: 0.5px;
          background: #e2e8f0;
          margin: 0.5rem 0;
        }
        .nb-mobile-cta {
          background: #316398;
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
          .nb-logout-btn { display: none; }
          .nb-hamburger { display: flex; }
          .nb-root { position: relative; }
        }
      `}</style>

      <nav className="nb-root">
        <div className="nb-inner">
          <Link to="/" className="nb-logo">
            <img
              src={companyLogo}
              alt="Sunbird Power Solutions"
              style={{
                height: "50px",
                width: "auto",
                filter: "invert(1)",
                display: "block"
              }}
            />
          </Link>

          <ul className="nb-links">
            <li>
              <Link to="/dashboard" className={`nb-link${isActive('/dashboard') ? " active" : ""}`}>
                <span className="nb-link-dot"></span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/advanced-dashboard" className={`nb-link${isActive('/advanced-dashboard') ? " active" : ""}`}>
                <span className="nb-link-dot"></span>
                Advanced Dashboard
              </Link>
            </li>

            <li className="nb-dropdown-container">
              <span className={`nb-link${isSectionActive(['/clients', '/clients-list']) ? " active" : ""}`}>
                <span className="nb-link-dot"></span>
                Clients
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <ul className="nb-dropdown-menu">
                <li>
                  <Link to="/clients" className={`nb-dropdown-item${isActive('/clients') ? " active" : ""}`}>
                    Add Client
                  </Link>
                </li>
                <li>
                  <Link to="/clients-list" className={`nb-dropdown-item${isActive('/clients-list') ? " active" : ""}`}>
                    View Clients
                  </Link>
                </li>
              </ul>
            </li>

            
            <li className="nb-dropdown-container">
              <span className={`nb-link${isSectionActive(['/teams', '/teams-list']) ? " active" : ""}`}>
                <span className="nb-link-dot"></span>
                Teams
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <ul className="nb-dropdown-menu">
                <li>
                  <Link to="/teams" className={`nb-dropdown-item${isActive('/teams') ? " active" : ""}`}>
                    Add Team
                  </Link>
                </li>
                <li>
                  <Link to="/teams-list" className={`nb-dropdown-item${isActive('/teams-list') ? " active" : ""}`}>
                    View Teams
                  </Link>
                </li>
              </ul>
            </li>

            
            <li className="nb-dropdown-container">
              <span className={`nb-link${isSectionActive(['/tasks', '/tasks-list']) ? " active" : ""}`}>
                <span className="nb-link-dot"></span>
                Tasks
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <ul className="nb-dropdown-menu">
                <li>
                  <Link to="/tasks" className={`nb-dropdown-item${isActive('/tasks') ? " active" : ""}`}>
                    Create Task
                  </Link>
                </li>
                <li>
                  <Link to="/tasks-list" className={`nb-dropdown-item${isActive('/tasks-list') ? " active" : ""}`}>
                    View Tasks
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nb-dropdown-container">
              <span className={`nb-link${isSectionActive(['/quotations/create', '/quotations/history']) ? " active" : ""}`}>
                <span className="nb-link-dot"></span>
                Quotations
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <ul className="nb-dropdown-menu">
                <li>
                  <Link to="/quotations/create" className={`nb-dropdown-item${isActive('/quotations/create') ? " active" : ""}`}>
                    Create Quotation
                  </Link>
                </li>
                <li>
                  <Link to="/quotations/history" className={`nb-dropdown-item${isActive('/quotations/history') ? " active" : ""}`}>
                    Quotation History
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="nb-right">
            <Link to="/tasks" className="nb-cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Task
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem('Admin');
                window.location.href = '/admin-login';
              }}
              className="nb-logout-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>

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
          <Link to="/dashboard" className={`nb-mobile-link${isActive('/dashboard') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/advanced-dashboard" className={`nb-mobile-link${isActive('/advanced-dashboard') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Advanced Dashboard
          </Link>
          <Link to="/leads" className={`nb-mobile-link${isActive('/leads') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Lead Enquiries
          </Link>
          
          <div className="nb-mobile-section-title">Clients</div>
          <Link to="/clients" className={`nb-mobile-link sub${isActive('/clients') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Add Client
          </Link>
          <Link to="/clients-list" className={`nb-mobile-link sub${isActive('/clients-list') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Clients List
          </Link>

          <div className="nb-mobile-section-title">Teams</div>
          <Link to="/teams" className={`nb-mobile-link sub${isActive('/teams') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Add Team
          </Link>
          <Link to="/teams-list" className={`nb-mobile-link sub${isActive('/teams-list') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Teams List
          </Link>

          <div className="nb-mobile-section-title">Tasks</div>
          <Link to="/tasks" className={`nb-mobile-link sub${isActive('/tasks') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Create Task
          </Link>
          <Link to="/tasks-list" className={`nb-mobile-link sub${isActive('/tasks-list') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Tasks List
          </Link>

          <div className="nb-mobile-section-title">Quotations</div>
          <Link to="/quotations/create" className={`nb-mobile-link sub${isActive('/quotations/create') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Create Quotation
          </Link>
          <Link to="/quotations/history" className={`nb-mobile-link sub${isActive('/quotations/history') ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
            Quotation History
          </Link>
          
          <div className="nb-mobile-divider"></div>
          <Link to="/tasks" className="nb-mobile-cta" onClick={() => setMenuOpen(false)}>
            + New Task
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem('Admin');
              window.location.href = '/admin-login';
            }}
            className="nb-mobile-cta"
            style={{
              background: '#ef4444',
              marginTop: '0.5rem'
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}