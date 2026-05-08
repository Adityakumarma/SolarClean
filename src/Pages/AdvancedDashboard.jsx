import React, { useEffect, useState, useMemo } from 'react';
import { getTeams, getClients, getTasks } from '../services/api';
import {
    BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area
} from "recharts";

export default function AdvancedDashboard() {
    const [teams, setTeams] = useState([]);
    const [clients, setClients] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamRes = await getTeams();
                const clientRes = await getClients();
                const taskRes = await getTasks();
                setTeams(teamRes.data);
                setClients(clientRes.data);
                setTasks(taskRes.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const pendingTasks = tasks.filter((task) => task.status === "pending").length;
    const waitingTasks = tasks.filter((task) => task.status === "waiting").length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;

    const taskChartData = [
        { name: "Pending", value: pendingTasks },
        { name: "Waiting", value: waitingTasks },
        { name: "Completed", value: completedTasks }
    ];

    const COLORS = ["#B45309", "#3b82f6", "#16a34a"];

    const teamMembersChart = useMemo(() => {
        return teams.map((team) => ({
            name: team.name,
            members: team.members.length
        }));
    }, [teams]);

    const clientTaskChart = useMemo(() => {
        const clientMap = {};
        tasks.forEach(task => {
            const cName = task.client?.name || "Unknown";
            if (!clientMap[cName]) clientMap[cName] = 0;
            clientMap[cName]++;
        });
        return Object.keys(clientMap).map(key => ({
            name: key,
            tasks: clientMap[key]
        })).sort((a, b) => b.tasks - a.tasks).slice(0, 5);
    }, [tasks]);



    const timelineChart = useMemo(() => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push({
                dateFull: d,
                dateStr: d.toLocaleDateString('en-US', { weekday: 'short' }),
                total: 0,
                pending: 0,
                waiting: 0
            });
        }

        tasks.forEach(task => {
            if (task.nextCleaning) {
                const d = new Date(task.nextCleaning);
                days.forEach(day => {
                    if (d.getDate() === day.dateFull.getDate() && d.getMonth() === day.dateFull.getMonth() && d.getFullYear() === day.dateFull.getFullYear()) {
                        day.total++;
                        if (task.status === "pending") day.pending++;
                        if (task.status === "waiting") day.waiting++;
                    }
                });
            }
        });

        return days.map(d => ({ name: d.dateStr, total: d.total, pending: d.pending, waiting: d.waiting }));
    }, [tasks]);

    const dueTasks = useMemo(() => {

        if (!searchClicked) return [];

        if (!fromDate || !toDate) return [];

        return tasks.filter((task) => {

            if (!task.nextCleaning) return false;

            const nextDate = new Date(task.nextCleaning);

            const from = new Date(fromDate);
            const to = new Date(toDate);

            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);

            return nextDate >= from && nextDate <= to;

        });

    }, [tasks, fromDate, toDate, searchClicked]);

    return (
        <div className="db-advanced-charts fade-in" style={{ padding: '2.5rem 3rem' }}>
            <style>{`
            .db-clear-btn {
  background: #fff;
  color: #ef4444;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  height: fit-content;
  margin-top: 1.55rem;
  transition: 0.2s;
}

.db-clear-btn:hover {
  background: #fef2f2;
}

            .db-search-btn {
  background: #0F172A;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  height: fit-content;
  margin-top: 1.55rem;
  transition: 0.2s;
}

.db-search-btn:hover {
  background: #1e293b;
}

            .db-date-filter {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.db-date-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.db-date-group label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.db-date-input {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  background: #fff;
  font-size: 14px;
  outline: none;
  width : 300px;
}

.db-date-input:focus {
  border-color: #3b82f6;
}

.db-due-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.db-due-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  background: #fff;
}

.db-due-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.db-due-location {
  font-size: 1rem;
  font-weight: 700;
  color: #dc143c;
}

.db-due-date {
  color: #2563eb;
  font-size: 13px;
  font-weight: 600;
}

.db-due-info {
  font-size: 14px;
  color: #00000;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
        .db-charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .db-chart-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
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
          gap: 8px;
        }
        
        .db-card-title-dot {
          width: 8px;
          height: 8px;
          background: #F59E0B;
          border-radius: 50%;
        }

        .db-chart-container {
          height: 300px;
          width: 100%;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .db-charts-grid, .db-chart-row {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .db-advanced-charts {
            padding: 1.5rem 1rem !important;
          }
          .db-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .db-card {
            padding: 1rem;
          }
        }
      `}</style>

            <div className="db-header" style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                    <div className="db-header-eyebrow" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#B45309', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                        <span style={{ width: '24px', height: '2px', background: '#B45309', borderRadius: '2px' }}></span>
                        Analytics
                    </div>
                    <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-1px', margin: 0 }}>Advanced Dashboard</h1>
                    <p style={{ fontSize: '15px', color: '#64748b', margin: '0.4rem 0 0 0' }}>Comprehensive visualizations and operational metrics</p>
                </div>
            </div>

            <div className="db-card" style={{ marginTop: "2rem", marginBottom: "30px" }}>

                <div className="db-card-title">
                    <span
                        className="db-card-title-dot"
                        style={{ background: "#16a34a" }}
                    ></span>

                    Cleaning Due Search
                </div>

                <div className="db-date-filter">

                    <div className="db-date-group">

                        <label>From Date</label>

                        <input
                            type="date"
                            className="db-date-input"
                            value={fromDate}
                            onChange={(e) => {
                                setFromDate(e.target.value);
                                setSearchClicked(false);
                            }}
                        />

                    </div>

                    <div className="db-date-group">

                        <label>To Date</label>

                        <input
                            type="date"
                            className="db-date-input"
                            value={toDate}
                            onChange={(e) => {
                                setToDate(e.target.value);
                                setSearchClicked(false);
                            }}
                        />

                    </div>

                    <button
                        className="db-search-btn"
                        onClick={() => setSearchClicked(true)}
                    >
                        Search
                    </button>

                    <button
                        className="db-clear-btn"
                        onClick={() => {
                            setFromDate("");
                            setToDate("");
                            setSearchClicked(false);
                        }}
                    >
                        Clear
                    </button>

                </div>

                {searchClicked && (

                    dueTasks.length === 0 ? (

                        <div
                            style={{
                                padding: "2rem",
                                textAlign: "center",
                                color: "#94a3b8"
                            }}
                        >
                            No cleaning dues found.
                        </div>

                    ) : (

                        <div className="db-due-list">

                            {dueTasks.map((task) => (

                                <div
                                    key={task._id}
                                    className="db-due-card"
                                >

                                    <div className="db-due-top">

                                        <div className="db-due-location">
                                            {task.location}
                                        </div>

                                        <div className="db-due-date">

                                            Due on{" "}
                                            {new Date(task.nextCleaning).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )}

                                        </div>

                                    </div>

                                    <div className="db-due-info">

                                        <div>
                                            Client:{" "}
                                            <strong>
                                                {task.client?.name || "N/A"}
                                            </strong>
                                        </div>

                                        <div>
                                            Location:{" "}
                                            <strong>
                                                {task.client?.location || "N/A"}
                                            </strong>
                                        </div>
                                        <div>
                                            Phone:{" "}
                                            <strong>
                                                {task.client?.phone || "N/A"}
                                            </strong>
                                        </div>

                                        <div>
                                            Assigned Team:{" "}
                                            <strong>
                                                {task.assignedTeam?.name || "N/A"}
                                            </strong>
                                        </div>


                                    </div>

                                </div>

                            ))}

                        </div>

                    )

                )}

            </div>

            <div className="db-charts-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="db-card">
                    <div className="db-card-title">
                        <span className="db-card-title-dot"></span>
                        Task Status Distribution
                    </div>
                    <div className="db-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taskChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="45%"
                                    outerRadius="60%"
                                    dataKey="value"
                                    labelLine={true}
                                    label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""}
                                >
                                    {taskChartData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>


            </div>



            <div className="db-chart-row" style={{ gridTemplateColumns: '1fr' }}>
                <div className="db-card">
                    <div className="db-card-title">
                        <span
                            className="db-card-title-dot"
                            style={{ background: '#3b82f6' }}
                        ></span>
                        Members Per Team
                    </div>

                    <div className="db-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={teamMembersChart}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />

                                <Bar
                                    dataKey="members"
                                    fill="#3b82f6"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={50}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>



        </div>
    );
}
