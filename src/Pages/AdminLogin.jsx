import { useNavigate } from "react-router-dom";
import { useState } from "react";
import companyLogo from "../assets/companylogo.png";
import { login } from "../services/api";

export default function AdminLogin({ onLogin, isAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      // Store token and role
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role);
      // Update parent auth state if needed
      if (onLogin) onLogin();
      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-bg-container">
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(49,99,152,0.08) 0%, rgba(255,255,255,0) 60%)',
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

        .login-bg-container {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          width: 100%;
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
          background: #ebf4fa;
          border: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem auto;
          box-shadow: 0 10px 25px -5px rgba(49, 99, 152, 0.15);
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
          border-color: #4596ab;
          box-shadow: 0 0 0 4px rgba(49, 99, 152, 0.15);
        }

        .login-btn {
          width: 100%;
          padding: 1.1rem;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, #4596ab 0%, #316398 100%);
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(49, 99, 152, 0.4);
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
          box-shadow: 0 15px 30px -5px rgba(49, 99, 152, 0.5);
        }

        .login-btn:hover::after {
          opacity: 1;
        }

        .login-btn:active {
          transform: translateY(0);
          box-shadow: 0 5px 15px -5px rgba(49, 99, 152, 0.4);
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

        @media (max-width: 480px) {
          .login-bg-container {
            padding: 1rem;
          }
          .login-card {
            padding: 2rem 1.25rem;
            border-radius: 20px;
          }
          .login-title {
            font-size: 1.8rem;
          }
          .logo-container {
            margin-bottom: 1.5rem !important;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="logo-container" style={{ background: "transparent", border: "none", boxShadow: "none", width: "100%", maxWidth: "200px", height: "auto", margin: "0 auto 2.5rem auto" }}>
            <img
              src={companyLogo}
              alt="Sunbird Power Solutions"
              style={{
                width: "100%",
                height: "auto",
                filter: "invert(1)",
                display: "block"
              }}
            />
          </div>
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
            Sunbird Power Solutions
          </div>
        </div>
      </div>
    </div>
  );
}
