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
      setError("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
     
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(255,255,255,0) 60%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(255,255,255,0) 60%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=Inter:wght@400;500;600&display=swap');

        * {
          box-sizing: border-box;
        }

        .login-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 3.5rem;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.08);
          border: 1px solid #e2e8f0;
        }

        .logo-container {
          width: 76px;
          height: 76px;
          border-radius: 22px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem auto;
          box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.15);
        }

        .login-title {
          font-family: 'Outfit', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f172a;
          text-align: center;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.5px;
        }

        .login-subtitle {
          text-align: center;
          color: #64748b;
          margin-bottom: 2.5rem;
          font-size: 1rem;
          line-height: 1.5;
        }

        .input-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .input-label {
          display: block;
          margin-bottom: 0.6rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #334155;
        }

        .input-field {
          width: 100%;
          padding: 1rem 1.25rem;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 16px;
          font-size: 1rem;
          color: #0f172a;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .input-field::placeholder {
          color: #94a3b8;
        }

        .input-field:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15);
        }

        .login-btn {
          width: 100%;
          padding: 1.1rem;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.4);
          position: relative;
          overflow: hidden;
        }

        .login-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(245, 158, 11, 0.5);
        }

        .login-btn:hover::after {
          opacity: 1;
        }

        .login-btn:active {
          transform: translateY(0);
          box-shadow: 0 5px 15px -5px rgba(245, 158, 11, 0.4);
        }

        .error-box {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #ef4444;
          padding: 1rem;
          border-radius: 14px;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }

        .bottom-text {
          text-align: center;
          margin-top: 2rem;
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @media(max-width: 500px) {
          .login-card {
            padding: 2.5rem 2rem;
          }
          .login-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="logo-container">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2" />
              <path d="M12 21v2" />
              <path d="M4.22 4.22l1.42 1.42" />
              <path d="M18.36 18.36l1.42 1.42" />
              <path d="M1 12h2" />
              <path d="M21 12h2" />
            </svg>
          </div>

          <h1 className="login-title">Solar Clean</h1>
          <p className="login-subtitle">
            Login to manage tasks, teams, and clients securely.
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="bottom-text">
            Solar Cleaning Management System
          </div>
        </div>
      </div>
    </div>
  );
}