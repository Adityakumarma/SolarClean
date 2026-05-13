import React, { useEffect, useState, useMemo } from 'react';
import { getTeams, getClients, getTasks } from '../services/api';
import {
    BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    XAxis, YAxis, CartesianGrid, Legend
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

    const dueTasks = useMemo(() => {
        if (!searchClicked || !fromDate || !toDate) return [];
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


    const getDaysUntil = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dateStr);
        due.setHours(0, 0, 0, 0);
        return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    };

    const getUrgencyStyle = (days) => {
        if (days < 0) return { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'Overdue' };
        if (days === 0) return { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', label: 'Today' };
        if (days <= 2) return { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: `${days}d left` };
        return { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', label: `${days}d left` };
    };

    return (
        <div className="db-advanced-charts fade-in" style={{ padding: '2.5rem 3rem' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');


                .db-btn-group {
    display: flex;
    gap: 0.8rem;
}

@media (max-width: 768px) {

    .db-btn-group {
        width: 100%;
    }

    .db-search-btn,
    .db-clear-btn {
        flex: 1;
        width: 100%;
    }
}
    
                /* ── Search card ── */
                .db-search-card {
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 1.75rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                    margin-bottom: 30px;
                    margin-top: 2rem;
                }

                .db-date-filter {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    margin-bottom: 2rem;
                    align-items: flex-end;
                }

                .db-date-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .db-date-group label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    font-family: 'DM Sans', sans-serif;
                }

                .db-date-input {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 0.7rem 1rem;
                    background: #f8fafc;
                    font-size: 14px;
                    outline: none;
                    width: 240px;
                    font-family: 'DM Sans', sans-serif;
                    color: #0f172a;
                    transition: border-color 0.2s, background 0.2s;
                }

                .db-date-input:focus {
                    border-color: #3b82f6;
                    background: #fff;
                }

                .db-search-btn {
                    background: #0F172A;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 0.72rem 1.6rem;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    letter-spacing: 0.3px;
                    transition: background 0.2s, transform 0.1s;
                }

                .db-search-btn:hover { background: #1e293b; }
                .db-search-btn:active { transform: scale(0.98); }

                .db-clear-btn {
                    background: #fff;
                    color: #ef4444;
                    border: 1.5px solid #fecaca;
                    border-radius: 10px;
                    padding: 0.7rem 1.4rem;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    transition: background 0.2s;
                }

                .db-clear-btn:hover { background: #fef2f2; }

                /* ── Results header ── */
                .db-results-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.2rem;
                }

                .db-results-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #0f172a;
                }

                .db-results-count {
                    background: #0f172a;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 20px;
                    padding: 3px 10px;
                    font-family: 'DM Sans', sans-serif;
                    letter-spacing: 0.5px;
                }

                /* ── Due list grid ── */
                .db-due-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1rem;
                }

                /* ── Individual card ── */
                .db-due-card {
                    border-radius: 14px;
                    padding: 1.2rem 1.3rem;
                    background: #fff;
                    border: 1.5px solid #e2e8f0;
                    position: relative;
                    overflow: hidden;
                    transition: box-shadow 0.2s, transform 0.2s;
                    animation: cardIn 0.35s ease-out both;
                }

                .db-due-card:hover {
                    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                    transform: translateY(-2px);
                }

                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Accent stripe on left */
                .db-due-card::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 4px;
                    border-radius: 14px 0 0 14px;
                }

                .db-due-card.urgent::before   { background: #dc2626; }
                .db-due-card.today::before    { background: #ea580c; }
                .db-due-card.soon::before     { background: #d97706; }
                .db-due-card.normal::before   { background: #16a34a; }

                /* ── Card top row ── */
                .db-card-top {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    gap: 0.5rem;
                }

                .db-location-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #0f172a;
                    line-height: 1.3;
                    flex: 1;
                }

                .db-urgency-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 20px;
                    padding: 3px 10px;
                    font-family: 'DM Sans', sans-serif;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                /* ── Due date row ── */
                .db-due-date-row {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 0.9rem;
                    padding-bottom: 0.9rem;
                    border-bottom: 1px solid #f1f5f9;
                }

                .db-calendar-icon {
                    width: 14px;
                    height: 14px;
                    opacity: 0.5;
                    flex-shrink: 0;
                }

                .db-due-date-text {
                    font-size: 13px;
                    font-weight: 600;
                    color: #475569;
                    font-family: 'DM Sans', sans-serif;
                }

                /* ── Info rows ── */
                .db-info-rows {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .db-info-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    font-family: 'DM Sans', sans-serif;
                    color: #64748b;
                }

                .db-info-icon {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    font-size: 13px;
                }

                .db-info-label {
                    color: #94a3b8;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    min-width: 48px;
                }

                .db-info-value {
                    font-weight: 600;
                    color: #1e293b;
                    font-size: 13px;
                }

                /* ── Empty state ── */
                .db-empty-state {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: #94a3b8;
                }

                .db-empty-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.75rem;
                }

                .db-empty-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #cbd5e1;
                }

                /* ── Shared card styles ── */
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

                .db-chart-container { height: 300px; width: 100%; }

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

                .fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) {
                    .db-charts-grid, .db-chart-row { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .db-advanced-charts { padding: 1.5rem 1rem !important; }
                    .db-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .db-card { padding: 1rem; }
                    .db-due-grid { grid-template-columns: 1fr; }
                    .db-date-input { width: 340px; }
                }
            `}</style>


            <div className="db-header" style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#B45309', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                        <span style={{ width: '24px', height: '2px', background: '#B45309', borderRadius: '2px' }}></span>
                        Analytics
                    </div>
                    <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-1px', margin: 0 }}>Advanced Dashboard</h1>
                    <p style={{ fontSize: '15px', color: '#64748b', margin: '0.4rem 0 0 0' }}>Comprehensive visualizations and operational metrics</p>
                </div>
            </div>



            <div className="db-search-card">
                <div className="db-card-title">
                    <span className="db-card-title-dot" style={{ background: '#16a34a' }}></span>
                    Cleaning Due Search
                </div>

                <div className="db-date-filter">
                    <div className="db-date-group">
                        <label>From Date</label>
                        <input
                            type="date"
                            className="db-date-input"
                            value={fromDate}
                            onChange={(e) => { setFromDate(e.target.value); setSearchClicked(false); }}
                        />
                    </div>
                    <div className="db-date-group">
                        <label>To Date</label>
                        <input
                            type="date"
                            className="db-date-input"
                            value={toDate}
                            onChange={(e) => { setToDate(e.target.value); setSearchClicked(false); }}
                        />
                    </div>
                    <div className="db-btn-group">
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
                </div>

                {searchClicked && (
                    dueTasks.length === 0 ? (
                        <div className="db-empty-state">
                            <div className="db-empty-icon">🧹</div>
                            <div className="db-empty-text">No cleaning dues found in this date range.</div>
                        </div>
                    ) : (
                        <>
                            <div className="db-results-header">
                                <span className="db-results-title">Results</span>
                                <span className="db-results-count">{dueTasks.length} task{dueTasks.length !== 1 ? 's' : ''}</span>
                            </div>

                            <div className="db-due-grid">
                                {dueTasks.map((task, i) => {
                                    const days = getDaysUntil(task.nextCleaning);
                                    const urgency = getUrgencyStyle(days);
                                    const cardClass = days < 0 ? 'urgent' : days === 0 ? 'today' : days <= 2 ? 'soon' : 'normal';

                                    return (
                                        <div
                                            key={task._id}
                                            className={`db-due-card ${cardClass}`}
                                            style={{ animationDelay: `${i * 0.05}s` }}
                                        >

                                            <div className="db-card-top">
                                                <div className="db-location-name">{task.location}</div>
                                                <span
                                                    className="db-urgency-badge"
                                                    style={{ color: urgency.color, background: urgency.bg, border: `1px solid ${urgency.border}` }}
                                                >
                                                    {urgency.label}
                                                </span>
                                            </div>


                                            <div className="db-due-date-row">
                                                <svg className="db-calendar-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="1" y="2.5" width="14" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.4" />
                                                    <path d="M1 6.5h14" stroke="currentColor" strokeWidth="1.4" />
                                                    <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                                </svg>
                                                <span className="db-due-date-text">
                                                    Due {new Date(task.nextCleaning).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                </span>
                                            </div>


                                            <div className="db-info-rows">
                                                <div className="db-info-row">
                                                    <span className="db-info-icon">👤</span>
                                                    <span className="db-info-label">Client</span>
                                                    <span className="db-info-value">{task.client?.name || "N/A"}</span>
                                                </div>
                                                <div className="db-info-row">
                                                    <span className="db-info-icon">📍</span>
                                                    <span className="db-info-label">Area</span>
                                                    <span className="db-info-value">{task.client?.location || "N/A"}</span>
                                                </div>
                                                <div className="db-info-row">
                                                    <span className="db-info-icon">📞</span>
                                                    <span className="db-info-label">Phone</span>
                                                    <span className="db-info-value">{task.client?.phone || "N/A"}</span>
                                                </div>
                                                <div className="db-info-row">
                                                    <span className="db-info-icon">🏷️</span>
                                                    <span className="db-info-label">Team</span>
                                                    <span className="db-info-value">{task.assignedTeam?.name || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
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
                                    cx="50%" cy="50%"
                                    innerRadius="45%" outerRadius="60%"
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
                        <span className="db-card-title-dot" style={{ background: '#3b82f6' }}></span>
                        Members Per Team
                    </div>
                    <div className="db-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={teamMembersChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                                <Bar dataKey="members" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}