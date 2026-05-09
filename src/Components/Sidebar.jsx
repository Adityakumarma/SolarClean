import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  ClipboardList,
  Users,
  Building2,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="app-sidebar">
      <style>{`
        .app-sidebar {
          width: 260px;
          background: #fff;
          border-right: 1px solid #e2e8f0;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-shrink: 0;
          height: calc(100vh - 64px);
          position: sticky;
          top: 0;
          overflow-y: auto;
          font-family: 'Inter', sans-serif;
        }

        .sb-title {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #94a3b8;
          margin-bottom: 1rem;
          padding-left: 0.75rem;
          font-weight: 700;
        }

        .sb-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.85rem 1rem;
          border-radius: 10px;
          color: #64748b;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .sb-nav-item:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .sb-nav-item.active {
          background: #0f172a;
          color: #fff;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .sb-nav-item.active svg {
          color: #F59E0B;
        }
        
        @media (max-width: 768px) {
          .app-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
            flex-direction: row;
            height: auto;
            position: relative;
            top: 0;
            padding: 1rem;
            overflow-x: auto;
          }
          .sb-title { display: none; }
          .sb-nav-item { width: auto; white-space: nowrap; }
        }
      `}</style>
      
      <div className="sb-title">Menu</div>
      
      <Link to="/dashboard" className={`sb-nav-item ${path === '/dashboard' ? 'active' : ''}`}>
        <LayoutDashboard size={20} /> Dashboard
      </Link>
      
      <Link to="/advanced-dashboard" className={`sb-nav-item ${path === '/advanced-dashboard' ? 'active' : ''}`}>
        <LineChart size={20} /> Advanced Dashboard
      </Link>

      <Link to="/clients" className={`sb-nav-item ${path === '/clients' ? 'active' : ''}`}>
        <Building2 size={20} /> Clients
      </Link>

      <Link to="/teams" className={`sb-nav-item ${path === '/teams' ? 'active' : ''}`}>
        <Users size={20} /> Teams
      </Link>

      <Link to="/tasks" className={`sb-nav-item ${path === '/tasks' ? 'active' : ''}`}>
        <ClipboardList size={20} /> Tasks
      </Link>


      <div style={{ flex: 1 }}></div>

      
    </div>
  );
}
