import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  ClipboardList,
  Users,
  Building2,
  ChevronDown,
  ChevronRight,
  FileText,
  Sparkles,
  UserPlus
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const [clientsOpen, setClientsOpen] = useState(true);
  const [teamsOpen, setTeamsOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(true);
  const [quotationsOpen, setQuotationsOpen] = useState(true);

  return (
    <div className="app-sidebar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

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
          font-family: 'Outfit', sans-serif;
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
          user-select: none;
        }

        .sb-nav-item:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .sb-nav-item.active {
          background: #f1f5f9;
          color: #0f172a;
          font-weight: 600;
        }

        .sb-nav-item.active svg {
          color: #316398;
        }

        .sb-sub-menu {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding-left: 1.5rem;
          margin-left: 1.5rem;
          border-left: 1.5px solid #e2e8f0;
          margin-top: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .sb-sub-item {
          display: flex;
          align-items: center;
          padding: 0.55rem 1rem;
          border-radius: 8px;
          color: #64748b;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
        }

        .sb-sub-item:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .sb-sub-item.active {
          background: #ebf4fa;
          color: #316398;
          font-weight: 600;
        }

        /* Active dot indicator overlaying the vertical menu line */
        .sb-sub-item.active::before {
          content: '';
          position: absolute;
          left: -25.5px;
          top: 50%;
          transform: translateY(-50%);
          width: 7px;
          height: 7px;
          background: #316398;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #316398;
          z-index: 2;
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
            gap: 1rem;
          }
          .sb-title { display: none; }
          .sb-nav-item { width: auto; white-space: nowrap; }
          .sb-sub-menu { display: none; }
        }
      `}</style>
      
      <div className="sb-title">Menu</div>
      
      <Link to="/dashboard" className={`sb-nav-item ${path === '/dashboard' ? 'active' : ''}`}>
        <LayoutDashboard size={20} /> Dashboard
      </Link>
      
      <Link to="/advanced-dashboard" className={`sb-nav-item ${path === '/advanced-dashboard' ? 'active' : ''}`}>
        <LineChart size={20} /> Advanced Dashboard
      </Link>

      <Link to="/leads" className={`sb-nav-item ${path === '/leads' ? 'active' : ''}`}>
        <UserPlus size={20} /> Lead Enquiries
      </Link>

      
      <div>
        <div 
          onClick={() => setClientsOpen(!clientsOpen)} 
          className={`sb-nav-item ${(path === '/clients' || path === '/clients-list') ? 'active' : ''}`}
          style={{ justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Building2 size={20} /> Clients
          </span>
          {clientsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {clientsOpen && (
          <div className="sb-sub-menu">
            <Link to="/clients" className={`sb-sub-item ${path === '/clients' ? 'active' : ''}`}>
              Add Client
            </Link>
            <Link to="/clients-list" className={`sb-sub-item ${path === '/clients-list' ? 'active' : ''}`}>
              View Clients
            </Link>
          </div>
        )}
      </div>

      
      <div>
        <div 
          onClick={() => setTeamsOpen(!teamsOpen)} 
          className={`sb-nav-item ${(path === '/teams' || path === '/teams-list') ? 'active' : ''}`}
          style={{ justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users size={20} /> Teams
          </span>
          {teamsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {teamsOpen && (
          <div className="sb-sub-menu">
            <Link to="/teams" className={`sb-sub-item ${path === '/teams' ? 'active' : ''}`}>
              Add Team
            </Link>
            <Link to="/teams-list" className={`sb-sub-item ${path === '/teams-list' ? 'active' : ''}`}>
              View Teams
            </Link>
          </div>
        )}
      </div>

      
      <div>
        <div 
          onClick={() => setTasksOpen(!tasksOpen)} 
          className={`sb-nav-item ${(path === '/tasks' || path === '/tasks-list') ? 'active' : ''}`}
          style={{ justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ClipboardList size={20} /> Tasks
          </span>
          {tasksOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {tasksOpen && (
          <div className="sb-sub-menu">
            <Link to="/tasks" className={`sb-sub-item ${path === '/tasks' ? 'active' : ''}`}>
              Create Task
            </Link>
            <Link to="/tasks-list" className={`sb-sub-item ${path === '/tasks-list' ? 'active' : ''}`}>
              View Tasks
            </Link>
          </div>
        )}
      </div>

      
      <div>
        <div 
          onClick={() => setQuotationsOpen(!quotationsOpen)} 
          className={`sb-nav-item ${(path === '/quotations/create' || path === '/quotations/history') ? 'active' : ''}`}
          style={{ justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={20} /> Quotations
          </span>
          {quotationsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {quotationsOpen && (
          <div className="sb-sub-menu">
            <Link to="/quotations/create" className={`sb-sub-item ${path === '/quotations/create' ? 'active' : ''}`}>
              Create Quotation
            </Link>
            <Link to="/quotations/history" className={`sb-sub-item ${path === '/quotations/history' ? 'active' : ''}`}>
              Quotation History
            </Link>
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}></div>
    </div>
  );
}
