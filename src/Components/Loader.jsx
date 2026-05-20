import React from 'react';

export default function Loader({ message = "Loading data...", fullPage = false }) {
  const containerStyle = fullPage ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: '#f8fafc',
    zIndex: 9999,
    fontFamily: "'DM Sans', sans-serif",
  } : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '350px',
    width: '100%',
    fontFamily: "'DM Sans', sans-serif",
    padding: '2rem 0',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        .loader-sun-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4.5px solid rgba(49, 99, 152, 0.08);
          border-top: 4.5px solid #316398;
          border-radius: 50%;
          animation: spin-loader 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .loader-sun {
          width: 38px;
          height: 38px;
          background: radial-gradient(circle, #6eb7c7 30%, #4596ab 100%);
          border-radius: 50%;
          box-shadow: 0 0 25px rgba(69, 150, 171, 0.5);
          animation: pulse-loader 1.8s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes spin-loader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse-loader {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(69, 150, 171, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 28px rgba(69, 150, 171, 0.7); }
        }

        .loader-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .loader-subtext {
          font-size: 0.85rem;
          color: #64748b;
          margin-top: 0.5rem;
          text-align: center;
          max-width: 300px;
          line-height: 1.5;
          font-weight: 500;
        }
      `}</style>

      <div className="loader-sun-container">
        <div className="loader-ring"></div>
        <div className="loader-sun">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M21 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </div>
      </div>

      <h3 className="loader-text">{message}</h3>
      <p className="loader-subtext">Connecting to server. This may take up to few minutes</p>
    </div>
  );
}
