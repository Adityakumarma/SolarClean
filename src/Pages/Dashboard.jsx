import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  ClipboardList,
  CheckCircle,
  Clock3,
  Building2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  MapPin,


  Phone,
  Mail,
  UserStar,

  UsersRoundIcon,
} from "lucide-react";

import {
  getTeams,
  getClients,
  getTasks,
  getLeads
} from "../services/api";
import Loader from "../Components/Loader";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [leads, setLeads] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const teamRes = await getTeams();
      const clientRes = await getClients();
      const taskRes = await getTasks();
      const leadsRes = await getLeads();

      setTeams(teamRes.data.data || teamRes.data || []);
      setClients(clientRes.data.data || clientRes.data || []);
      setTasks(taskRes.data.data || taskRes.data || []);
      setLeads(leadsRes.data.data || leadsRes.data || []);
    } catch (err) {
      console.error(err);
      setTeams([]);
      setClients([]);
      setTasks([]);
      setLeads([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalTeams = teams.length;
  const totalMembers = teams.reduce(
    (acc, team) => acc + (team.members?.length || 0),
    0
  ); const averageMembersPerTeam = totalTeams ? Math.floor(totalMembers / totalTeams) : 0;
  const totalClients = clients.length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const waitingTasks = tasks.filter((task) => task.status === "waiting").length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === "new").length;
  const upcomingFollowUps = leads.filter(lead => lead.status === "new");

  const upcomingTasks = tasks.filter((task) => {
    const targetDate = task.nextCleaning || task.date;
    if (!targetDate) return false;
    const dueDate = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 10;
  });

  const StatCard = ({ title, value, icon, suffix, theme }) => (
    <div className={`db-stat db-stat-${theme}`}>
      <div className="db-stat-icon-wrapper">
        {icon}
      </div>
      <div className="db-stat-content">
        <div className="db-stat-label">{title}</div>
        <div className="db-stat-val">
          {value}
          {suffix && <span>{suffix}</span>}
        </div>
      </div>
      <div className="db-stat-bg-icon">{icon}</div>
    </div>
  );

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const tasksByDate = {};
  tasks.forEach(task => {
    const targetDate = task.nextCleaning || task.date;
    if (targetDate) {
      const d = new Date(targetDate);
      if (d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()) {
        const dateNum = d.getDate();
        if (!tasksByDate[dateNum]) tasksByDate[dateNum] = [];
        tasksByDate[dateNum].push(task);
      }
    }
  });

  if (loading) {
    return <Loader message="Loading Dashboard data..." />;
  }

  return (
    <div className="db-page fade-in">
      <style>{`
        .db-page {
          padding: 2.5rem 3rem;
          max-width: 1100px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* HEADER */
        .db-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .db-header-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #316398;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.5rem;
        }
        .db-header-eyebrow::before {
          content: '';
          width: 24px;
          height: 2px;
          background: #316398;
          display: inline-block;
          border-radius: 2px;
        }

        .db-header h1 {
          font-family: "Outfit", sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -1px;
          margin: 0;
        }

        .db-header p {
          font-size: 15px;
          color: #64748b;
          margin: 0.4rem 0 0 0;
        }

        .db-primary-btn {
          background: #316398;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .db-primary-btn:hover {
          background: #4596ab;
        }

        /* STATS */
        .db-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .db-stat {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .db-stat:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .db-stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .db-stat-blue .db-stat-icon-wrapper { background: #eff6ff; color: #3b82f6; }
        .db-stat-purple .db-stat-icon-wrapper { background: #f5f3ff; color: #8b5cf6; }
        .db-stat-orange .db-stat-icon-wrapper { background: #fff7ed; color: #f97316; }
        .db-stat-slate .db-stat-icon-wrapper { background: #f8fafc; color: #64748b; }
        .db-stat-yellow .db-stat-icon-wrapper { background: #fefce8; color: #eab308; }
        .db-stat-green .db-stat-icon-wrapper { background: #f0fdf4; color: #22c55e; }
        .db-stat-indigo .db-stat-icon-wrapper { background: #eef2ff; color: #6366f1; }

        .db-stat-content {
          flex: 1;
        }

        .db-stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 0.25rem;
        }

        .db-stat-val {
          font-family: 'Outfit', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #0F172A;
          display: flex;
          align-items: baseline;
          letter-spacing: -0.5px;
        }

        .db-stat-val span {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          margin-left: 6px;
          font-family: 'Inter', sans-serif;
        }

        .db-stat-bg-icon {
          position: absolute;
          right: -10px;
          bottom: -10px;
          opacity: 0.03;
          transform: scale(2.5);
          pointer-events: none;
        }

        .db-overview-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
          align-items: start;
        }
        
        @media (max-width: 1200px) {
          .db-overview-bottom {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .db-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          min-width: 0;
          overflow: hidden;
        }

        .db-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .db-card-title-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .db-card-title-dot {
          width: 8px;
          height: 8px;
          background: #4596ab;
          border-radius: 50%;
          
        }

        .db-card-badge {
          background: #f1f5f9;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 100px;
        }

        /* TABLE */
        .db-table-wrapper {
          overflow-x: auto;
          margin-top: 0.5rem;
        }

        .db-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        .db-table th {
          padding: 1rem 1.25rem;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #94a3b8;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        
        .db-table th:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
        .db-table th:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }

        .db-table td {
          padding: 1.1rem 1.25rem;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          font-weight: 500;
        }

        .db-loc-flex {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .db-loc-icon {
          color: #94a3b8;
        }

        .db-td-location {
          font-family: 'Outfit', sans-serif;
          font-weight: 700 !important;
          color: #0F172A !important;
        }

        .db-panels-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .db-status-pill {
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 100px;
          display: inline-block;
        }

        .db-status-pending { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
        .db-status-waiting { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
        .db-status-completed { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }

        .db-date-td {
          color: #64748b !important;
        }

        .db-more-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }
        .db-more-btn:hover { background: #f1f5f9; color: #0f172a; }

        /* CALENDAR */
        .db-calendar-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .db-calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          font-weight : 600;
        }

        .db-calendar-header h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          color: #0f172a;
          margin: 0;
        }

        .db-calendar-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .db-cal-nav-btn {
          width: 36px;
          height: 36px;
          border: 1px solid #e2e8f0;
          background: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }
        .db-cal-nav-btn:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .db-cal-today-btn {
          border: 1px solid #e2e8f0;
          background: #fff;
          border-radius: 8px;
          padding: 0 16px;
          height: 36px;
          font-weight: 600;
          font-size: 14px;
          color: #0f172a;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        .db-cal-today-btn:hover {
          background: #f8fafc;
        }

        .db-calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: #e2e8f0;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .db-cal-day-name {
          background: #f8fafc;
          text-align: center;
          padding: 0.5rem 0;
          font-weight: 600;
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .db-cal-cell {
          background: #fff;
          min-height: 70px;
          padding: 6px;
          display: flex;
          flex-direction: column;
        }
        .db-cal-cell.empty {
          background: #f8fafc;
        }
        .db-cal-cell.today .db-cal-date {
          background: #4596ab;
          color: #fff;
          font-weight: 700;
        }

        .db-cal-date {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 4px;
        }

        .db-cal-tasks {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .db-cal-task-pill {
          font-size: 11px;
          padding: 4px 6px;
          border-radius: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
          background: #fffbeb;
          color: #b45309;
          border-left: 2px solid #f59e0b;
        }

        .db-cal-task-pill.completed { background: #f0fdf4; color: #15803d; border-left-color: #22c55e; }
        .db-cal-task-pill.waiting { background: #eff6ff; color: #1d4ed8; border-left-color: #3b82f6; }

        .db-cal-more {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          margin-top: 2px;
          padding-left: 2px;
        }

        .db-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: #64748b;
          font-weight: 500;
        }
        .db-empty-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }
        .db-empty-text {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          color: #64748b;
        }

        /* ── RESPONSIVE STYLES ── */
        @media (max-width: 1024px) {
          .db-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .db-page {
            padding: 1.5rem 1rem;
          }
          .db-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
          }
          .db-header h1 {
            font-size: 2rem;
          }
          .db-calendar-card {
            padding: 1.25rem;
          }
          .db-card {
            padding: 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .db-stats-grid {
            grid-template-columns: 1fr;
          }
          .db-cal-task-pill {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            padding: 0;
            border: none;
            display: inline-block;
            overflow: hidden;
            color: transparent !important;
            background: #f59e0b !important;
            border-left: none !important;
          }
          .db-cal-task-pill.completed {
            background: #22c55e !important;
          }
          .db-cal-task-pill.waiting {
            background: #3b82f6 !important;
          }
          .db-cal-tasks {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 3px;
            justify-content: center;
            margin-top: 2px;
          }
          .db-cal-cell {
            min-height: 48px;
            align-items: center;
            justify-content: flex-start;
            padding: 4px 2px;
          }
          .db-cal-date {
            margin-bottom: 2px;
            width: 20px;
            height: 20px;
            font-size: 11px;
          }
          .db-cal-more {
            display: none;
          }
          .db-calendar-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="db-header">
        <div>
          <div className="db-header-eyebrow">Overview</div>
          <h1>Dashboard</h1>
          <p>Sunbird Power Solutions Overview</p>
        </div>

      </div>

      <div className="db-stats-grid">
        <StatCard title="Total Teams" value={totalTeams} suffix="teams" icon={<Users size={24} />} theme="blue" />
        <StatCard title="Total Members" value={totalMembers} suffix="members" icon={<UserRound size={24} />} theme="purple" />
        <StatCard title="Total Clients" value={totalClients} suffix="clients" icon={<Building2 size={24} />} theme="orange" />
        <StatCard title="Total Tasks" value={totalTasks} suffix="tasks" icon={<ClipboardList size={24} />} theme="slate" />
        <StatCard title="Pending Tasks" value={pendingTasks} suffix="tasks" icon={<Clock3 size={24} />} theme="yellow" />
        <StatCard title="Waiting for Confirmation" value={waitingTasks} suffix="tasks" icon={<Clock3 size={24} />} theme="blue" />
        <StatCard title="Completed Tasks" value={completedTasks} suffix="tasks" icon={<CheckCircle size={24} />} theme="green" />
        <StatCard title="Avg Members Per Team" value={averageMembersPerTeam} suffix="members" icon={<Users size={24} />} theme="indigo" />
        <StatCard title="Total Leads" value={totalLeads} suffix="leads" icon={<UsersRoundIcon size={24} />} theme="indigo" />
        <StatCard title="New Leads" value={newLeads} suffix="new" icon={<UserStar size={20} />} theme="yellow" />
      </div>


      <div className="db-card" style={{ marginBottom: '2.5rem' }}>
        <div className="db-card-title">
          <div className="db-card-title-left">
            <span className="db-card-title-dot" style={{ backgroundColor: '#ef4444' }}></span>
            Upcoming Tasks Due
          </div>
          <span className="db-card-badge" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
            {upcomingTasks.length} Dues
          </span>
        </div>
        {upcomingTasks.length === 0 ? (
          <div className="db-empty-state">
            <div className="db-empty-icon">🎉</div>
            <div className="db-empty-text">No upcoming tasks due</div>
          </div>
        ) : (
          <div className="db-table-wrapper">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Client</th>
                  <th>Team</th>
                  <th>Panels</th>
                  <th>Days Left</th>
                  <th>Cleaning Date</th>
                </tr>
              </thead>
              <tbody>
                {upcomingTasks.map((task) => {
                  const dueDate = new Date(task.nextCleaning || task.date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  dueDate.setHours(0, 0, 0, 0);
                  const diffTime = dueDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  return (
                    <tr key={task._id}>
                      <td className="db-td-location">
                        <div className="db-loc-flex">
                          <MapPin size={14} className="db-loc-icon" />
                          {task.location}
                        </div>
                      </td>
                      <td>{task.client?.name || "N/A"}</td>
                      <td>{task.assignedTeam?.name || "N/A"}</td>
                      <td><span className="db-panels-badge">{task.panels} Panels</span></td>

                      <td>
                        <span style={{
                          fontWeight: '700',
                          color: diffDays <= 2 ? '#ef4444' : diffDays <= 5 ? '#f59e0b' : '#10b981'
                        }}>
                          {diffDays === 0 ? "Due Today" : diffDays === 1 ? "1 day left" : `${diffDays} days left`}
                        </span>
                      </td>
                      <td className="db-date-td">
                        {new Date(task.nextCleaning || task.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upcoming Lead Follow-ups */}
      <div className="db-card" style={{ marginBottom: '2.5rem' }}>
        <div className="db-card-title">
          <div className="db-card-title-left">
            <span className="db-card-title-dot" style={{ backgroundColor: '#f59e0b' }}></span>
            Lead Enquiry Follow-ups
          </div>
          <span className="db-card-badge" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
            {upcomingFollowUps.length} Pending
          </span>
        </div>
        {upcomingFollowUps.length === 0 ? (
          <div className="db-empty-state">
            <div className="db-empty-icon">🎉</div>
            <div className="db-empty-text">No pending lead follow-ups</div>
          </div>
        ) : (
          <div className="db-table-wrapper">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Requirement</th>
                  <th>Enquiry Date</th>
                </tr>
              </thead>
              <tbody>
                {upcomingFollowUps.map((lead) => (
                  <tr key={lead._id}>
                    <td className="db-td-location">
                      <div className="db-loc-flex">
                        <Users size={14} className="db-loc-icon" />
                        {lead.name}
                      </div>
                    </td>
                    <td>
                      <div className="font-bold flex  "> <Phone className="mr-2" size={15} /> {lead.phone}</div>
                      <div className="flex mt-2" style={{ fontSize: '12px', color: '#64748b' }}> <Mail className="mr-2 " size={15} /> {lead.email}</div>
                    </td>
                    <td>
                      <div className="db-loc-flex">
                        <MapPin size={12} className="db-loc-icon" />
                        {lead.location}
                      </div>
                    </td>
                    <td><span className="db-panels-badge" style={{ backgroundColor: '#ebf4fa', color: '#316398' }}>{lead.requirement}</span></td>
                    <td className="db-date-td">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="db-overview-bottom">
        <div className="db-calendar-card">
          <div className="db-card-title">
            <div className="db-card-title-left">
              <span className="db-card-title-dot "></span>
              Scheduled Tasks for the Month
            </div>
          </div>
          <div className="db-calendar-header">

            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="db-calendar-nav">
              <button onClick={prevMonth} className="db-cal-nav-btn"><ChevronLeft size={20} /></button>
              <button onClick={() => setCurrentDate(new Date())} className="db-cal-today-btn">Today</button>
              <button onClick={nextMonth} className="db-cal-nav-btn"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="db-calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="db-cal-day-name">{day}</div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`blank-${i}`} className="db-cal-cell empty"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
              const dayTasks = tasksByDate[day] || [];

              return (
                <div key={day} className={`db-cal-cell ${isToday ? 'today' : ''} ${dayTasks.length > 0 ? 'has-tasks' : ''}`}>
                  <div className="db-cal-date">{day}</div>
                  <div className="db-cal-tasks">
                    {dayTasks.map((t, idx) => (
                      <div key={idx} className={`db-cal-task-pill ${t.status}`}>
                        {t.client?.name}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="db-cal-more">+{dayTasks.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="db-card">
          <div className="db-card-title">
            <div className="db-card-title-left">
              <span className="db-card-title-dot"></span>
              Recent Tasks
            </div>
            <span className="db-card-badge">Latest 5 tasks</span>
          </div>
          {tasks.length === 0 ? (
            <div className="db-empty">No tasks found.</div>
          ) : (
            <div className="db-table-wrapper">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Client</th>
                    <th>Team</th>
                    <th>Panels</th>
                    <th>Status</th>
                    <th>Cleaning Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.slice(0, 5).map((task) => (
                    <tr key={task._id}>
                      <td className="db-td-location">
                        <div className="db-loc-flex">
                          <MapPin size={14} className="db-loc-icon" />
                          {task.location}
                        </div>
                      </td>
                      <td>{task.client?.name || "N/A"}</td>
                      <td>{task.assignedTeam?.name || "N/A"}</td>
                      <td><span className="db-panels-badge">{task.panels} Panels</span></td>
                      <td>
                        <span className={`db-status-pill ${task.status === "completed" ? "db-status-completed" :
                          task.status === "waiting" ? "db-status-waiting" : "db-status-pending"
                          }`}>
                          {task.status === "completed" ? "Completed" :
                            task.status === "waiting" ? "Waiting" : "Pending"}
                        </span>
                      </td>
                      <td className="db-date-td">
                        {task.nextCleaning || task.date ? new Date(task.nextCleaning || task.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
                      </td>
                      <td>
                        <button className="db-more-btn"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}