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
        padding: "2rem"
      }}
    >

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *{
          box-sizing:border-box;
        }

        .login-card{

          width:100%;
          max-width:420px;

          background:#ffffff;

          border-radius:24px;

          padding:3rem;

          box-shadow:
          0 10px 30px rgba(15,23,42,0.08);

          border:1px solid #e2e8f0;
        }

        .login-logo{

          width:70px;
          height:70px;

          border-radius:20px;

          background:#0f172a;

          display:flex;

          align-items:center;

          justify-content:center;

          margin:0 auto 1.5rem auto;
        }

        .login-title{

          font-family:'Outfit',sans-serif;

          font-size:2.2rem;

          font-weight:700;

          color:#0f172a;

          text-align:center;

          margin-bottom:0.5rem;
        }

        .login-subtitle{

          text-align:center;

          color:#64748b;

          margin-bottom:2.5rem;

          font-size:0.95rem;
        }

        .input-group{
          margin-bottom:1.25rem;
        }

        .input-label{

          display:block;

          margin-bottom:0.5rem;

          font-size:0.9rem;

          font-weight:600;

          color:#334155;
        }

        .input-field{

          width:100%;

          padding:1rem 1rem;

          border:1.5px solid #cbd5e1;

          border-radius:14px;

          font-size:1rem;

          font-family:'Inter',sans-serif;

          background:#fff;

          transition:0.2s;
        }

        .input-field:focus{

          outline:none;

          border-color:#f59e0b;

          box-shadow:
          0 0 0 4px rgba(245,158,11,0.15);
        }

        .login-btn{

          width:100%;

          padding:1rem;

          border:none;

          border-radius:14px;

          background:#0f172a;

          color:#fff;

          font-size:1rem;

          font-weight:600;

          font-family:'Inter',sans-serif;

          cursor:pointer;

          transition:0.2s;

          margin-top:1rem;
        }

        .login-btn:hover{

          background:#1e293b;

          transform:translateY(-1px);
        }

        .error-box{

          background:#fef2f2;

          border:1px solid #fecaca;

          color:#dc2626;

          padding:0.9rem 1rem;

          border-radius:12px;

          margin-bottom:1rem;

          font-size:0.9rem;

          font-weight:500;
        }

        .bottom-text{

          text-align:center;

          margin-top:1.5rem;

          color:#94a3b8;

          font-size:0.85rem;
        }

        @media(max-width:768px){

          .login-card{

            padding:2rem;
          }

          .login-title{

            font-size:1.9rem;
          }
        }

      `}</style>

      <div className="login-card">

        <div className="login-logo">

          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.2"
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

        <h1 className="login-title">
          Solar Clean
        </h1>

        <p className="login-subtitle">
          Login to manage tasks, teams and clients
        </p>

        <form onSubmit={handleSubmit}>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <div className="input-group">

            <label className="input-label">
              Username
            </label>

            <input
              type="text"
              className="input-field"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label className="input-label">
              Password
            </label>

            <input
              type="password"
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="bottom-text">
          Solar Cleaning Management System
        </div>

      </div>

    </div>
  );
}