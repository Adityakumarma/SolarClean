import React, { useEffect, useState } from 'react';
import { getTasks, getClients } from '../services/api';
import { Users, UserRound, ClipboardList, Clock3, CheckCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const [client, setClient] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const clientsRes = await getClients();
      const thisClient = clientsRes?.data?.data?.[0] || null;
      setClient(thisClient);

      console.log("Client:", thisClient);

      const tasksRes = await getTasks();
      setTasks(tasksRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Simple current month display
  const currentDate = new Date();

  return (
    <div className="db-page fade-in" style={{ padding: '2rem' }}>
      <style>{`
        .db-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:2.5rem; padding-bottom:1.5rem; border-bottom:1px solid #e2e8f0; }
        .db-header-eyebrow { font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#316398; display:flex; align-items:center; gap:8px; margin-bottom:.5rem; }
        .db-header-eyebrow::before { content:''; width:24px; height:2px; background:#316398; display:inline-block; border-radius:2px; }
        .db-header h1 { font-family:'Outfit',sans-serif; font-size:2.5rem; font-weight:800; color:#0F172A; letter-spacing:-1px; margin:0; }
        .db-header p { font-size:15px; color:#64748b; margin:0.4rem 0 0 0; }
        .db-stats-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(220px,1fr)); gap:1.25rem; margin-bottom:2.5rem; }
        .db-stat { background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:1.5rem; display:flex; align-items:flex-start; gap:1rem; position:relative; overflow:hidden; transition:transform .2s, box-shadow .2s; }
        .db-stat:hover { transform:translateY(-3px); box-shadow:0 10px 25px rgba(0,0,0,0.05); }
        .db-stat-icon-wrapper { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .db-stat-blue .db-stat-icon-wrapper { background:#eff6ff; color:#3b82f6; }
        .db-stat-purple .db-stat-icon-wrapper { background:#f5f3ff; color:#8b5cf6; }
        .db-stat-slate .db-stat-icon-wrapper { background:#f8fafc; color:#64748b; }
        .db-stat-content { flex:1; }
        .db-stat-label { font-size:13px; font-weight:600; color:#64748b; margin-bottom:.25rem; }
        .db-stat-val { font-family:'Outfit',sans-serif; font-size:1.75rem; font-weight:800; color:#0F172A; display:flex; align-items:baseline; letter-spacing:-0.5px; }
        .db-stat-val span { font-size:13px; font-weight:500; color:#94a3b8; margin-left:6px; font-family:'Inter',sans-serif; }
      `}</style>
      <div className="db-header">
        <div>
          <div className="db-header-eyebrow">Customer Dashboard</div>
          <h1>{client ? `Welcome, ${client.name}` : 'Welcome, Customer!'}</h1>
          <p>Overview of your tasks and schedule.</p>
        </div>
      </div>
      <div className="db-stats-grid">
        <StatCard title="Total Tasks" value={totalTasks} suffix="tasks" icon={<ClipboardList size={24} />} theme="blue" />
        <StatCard title="Pending Tasks" value={pendingTasks} suffix="tasks" icon={<Clock3 size={24} />} theme="yellow" />
        <StatCard title="Completed Tasks" value={completedTasks} suffix="tasks" icon={<CheckCircle size={24} />} theme="green" />
      </div>
    </div>
  );
};

// Reuse StatCard component from Dashboard (you may extract to shared component) – defining inline for brevity
const StatCard = ({ title, value, suffix, icon, theme }) => (
  <div className={`db-stat db-stat-${theme}`}>
    <div className="db-stat-icon-wrapper">{icon}</div>
    <div className="db-stat-content">
      <div className="db-stat-label">{title}</div>
      <div className="db-stat-val">{value}{suffix && <span>{suffix}</span>}</div>
    </div>
  </div>
);

export default CustomerDashboard;
