import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing({ onLogin, isAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin();
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try admin / admin");
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#0F172A", background: "#fff", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');

        .login-container {
          display: flex;
          width: 100%;
          min-height: 100vh;
        }

        /* LEFT SIDE - BRANDING */
        .login-brand {
          flex: 1;
          background: #0F172A;
          color: #fff;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        
        .login-brand::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0) 70%);
          border-radius: 50%;
        }

        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          z-index: 1;
        }

        .brand-logo svg {
          color: #F59E0B;
        }

        .brand-content {
          z-index: 1;
          max-width: 480px;
        }

        .brand-title {
          font-family: 'Syne', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -1px;
        }
        
        .brand-title span {
          color: #F59E0B;
        }

        .brand-desc {
          color: #94a3b8;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        /* STATS GRID */
        .brand-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .stat-value span {
          color: #F59E0B;
        }

        .stat-label {
          color: #64748b;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }

        /* RIGHT SIDE - FORM */
        .login-form-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #ffffff;
          padding: 2rem;
        }

        .login-form-inner {
          width: 100%;
          max-width: 420px;
        }

        .form-header {
          margin-bottom: 2.5rem;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
        }

        .form-subtitle {
          color: #64748b;
          font-size: 1rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: #334155;
          margin-bottom: 0.5rem;
        }

        .input-field {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #0F172A;
          transition: all 0.2s ease;
          background: #f8fafc;
          box-sizing: border-box;
        }

        .input-field:focus {
          outline: none;
          border-color: #F59E0B;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        .btn-login {
          width: 100%;
          padding: 1.125rem;
          background: #0F172A;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .btn-login:hover {
          background: #1e293b;
          transform: translateY(-1px);
        }

        .btn-login:active {
          transform: translateY(1px);
        }

        .error-message {
          background: #fef2f2;
          color: #ef4444;
          padding: 1rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
          border: 1px solid #fee2e2;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 968px) {
          .login-container {
            flex-direction: column;
          }
          .login-brand {
            padding: 3rem 2rem;
            flex: none;
          }
          .brand-title {
            font-size: 2.5rem;
          }
          .brand-stats {
            display: none; /* Hide stats on mobile for cleaner look */
          }
          .login-form-wrapper {
            padding: 4rem 2rem;
          }
        }
      `}</style>

      <div className="login-container">
        
        <div className="login-brand">
          <div className="brand-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>
            </svg>
            Solar Clean
          </div>

          <div className="brand-content">
            <h1 className="brand-title">
              Manage Your <br/>
              <span>Solar Panels</span><br/>
              Smarter.
            </h1>
            <p className="brand-desc">
              Organize teams, assign cleaning tasks, manage clients, and automate recurring schedules — all from a single, powerful dashboard.
            </p>

            <div className="brand-stats">
              <div className="stat-card">
                <div className="stat-value">500<span>+</span></div>
                <div className="stat-label">Tasks Done</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">98<span>%</span></div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            © 2026 SolarClean. All rights reserved.
          </div>
        </div>

        
        <div className="login-form-wrapper">
          <div className="login-form-inner">
            <div className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Please enter your admin credentials to access the dashboard.</p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="error-message">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {error}
                </div>
              )}

              <div className="input-group">
                <label className="input-label" htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="input-field"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="input-field"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button type="submit" className="btn-login">
                Login to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}