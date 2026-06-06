import React from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Tasks from './Pages/Tasks'
import Teams from './Pages/Teams'
import Client from './Pages/Client'
import ClientList from './Pages/ClientList'
import TasksList from './Pages/TasksList'
import TeamsLists from './Pages/TeamsLists'
import Dashboard from './Pages/Dashboard'
import AdvancedDashboard from './Pages/AdvancedDashboard'
import LandingPage from './Pages/LandingPage'
import CreateQuotation from './Pages/CreateQuotation'
import QuotationHistory from './Pages/QuotationHistory'
import PublicNavbar from './Components/PublicNavbar'
import Leads from './Pages/Leads'
import CustomerDashboard from './Pages/CustomerDashboard'
import AdminLogin from './Pages/AdminLogin'
const Layout = ({ children }) => {
  const location = useLocation();
  const isPublic = location.pathname === '/' || location.pathname === '/login';

  if (isPublic) {
    return (
      <>
        <PublicNavbar />
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

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const location = useLocation();
  if (location.pathname.startsWith('/admin') && role !== 'admin') {
    return <Navigate to="/customer-dashboard" replace />;
  }
  if (location.pathname.startsWith('/customer') && role !== 'customer') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Placeholder Customer Dashboard


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/leads' element={<ProtectedRoute><Leads /></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/advanced-dashboard' element={<ProtectedRoute><AdvancedDashboard /></ProtectedRoute>} />
        <Route path='/tasks' element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path='/tasks-list' element={<ProtectedRoute><TasksList /></ProtectedRoute>} />
        <Route path='/teams' element={<ProtectedRoute><Teams /></ProtectedRoute>} />
        <Route path='/teams-list' element={<ProtectedRoute><TeamsLists /></ProtectedRoute>} />
        <Route path='/clients' element={<ProtectedRoute><Client /></ProtectedRoute>} />
        <Route path='/clients-list' element={<ProtectedRoute><ClientList /></ProtectedRoute>} />
        <Route path='/quotations/create' element={<ProtectedRoute><CreateQuotation /></ProtectedRoute>} />
        <Route path='/quotations/history' element={<ProtectedRoute><QuotationHistory /></ProtectedRoute>} />
        <Route path='/customer-dashboard' element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}

export default App;