import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >

      <style>{`
        .app-layout-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

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
            width: 100%;
          }
        }
      `}</style>

      <Navbar />

      <div className="app-layout-body">

        <div className="app-layout-sidebar">
          <Sidebar />
        </div>

        <main
          className="app-layout-main"
          style={{
            flex: 1,
            overflowY: 'auto',
            background: '#f1f5f9'
          }}
        >
          {children}
        </main>

      </div>

    </div>
  );
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <style>{`
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
        <Sidebar />
        <main className="app-layout-main" style={{ flex: 1, overflowY: 'auto', background: '#f1f5f9' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/advanced-dashboard' element={<AdvancedDashboard />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/clients' element={<Client />} />
      </Routes>
    </Layout>
  )
}

export default App