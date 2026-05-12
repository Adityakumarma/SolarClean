import React, { useState } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Tasks from './Pages/Tasks'
import Teams from './Pages/Teams'
import Client from './Pages/Client'
import Dashboard from './Pages/Dashboard'
import AdvancedDashboard from './Pages/AdvancedDashboard'
import LandingPage from './Pages/LandingPage'

const Layout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <style>{`

      .app-layout-sidebar {
  display: block;
}

@media (max-width: 768px) {

  .app-layout-body {
    flex-direction: column;
    overflow: auto;
  }

  .app-layout-sidebar {
    display: none;
  }

  .app-layout-main {
    overflow: visible !important;
  }
}
        .app-layout-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .app-layout-body {
            flex-direction: column;
            overflow: auto;
          }
          .app-layout-main {
            overflow: visible !important;
          }
        }
      `}</style>
      <Navbar />
      <div className="app-layout-body">
        <div className="app-layout-sidebar">
          <Sidebar />
        </div>
        <main className="app-layout-main" style={{ flex: 1, overflowY: 'auto', background: '#f1f5f9' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('Admin', 'true');
  };


  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('Admin') === 'true';
  });



  return (
    <Layout>
      <Routes>
        <Route path='/' element={<LandingPage onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
        <Route path='/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
        <Route path='/advanced-dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdvancedDashboard /></ProtectedRoute>} />
        <Route path='/tasks' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Tasks /></ProtectedRoute>} />
        <Route path='/teams' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Teams /></ProtectedRoute>} />
        <Route path='/clients' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Client /></ProtectedRoute>} />
      </Routes>
    </Layout>
  )
}

export default App