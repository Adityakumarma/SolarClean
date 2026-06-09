import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerSchedule = () => {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Fetch tasks (could be filtered for the logged‑in client later)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Calendar navigation helpers
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // Group tasks by date for the current month
  const tasksByDate = {};
  tasks.forEach((task) => {
    const target = task.nextCleaning || task.date;
    if (target) {
      const d = new Date(target);
      if (d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()) {
        const day = d.getDate();
        if (!tasksByDate[day]) tasksByDate[day] = [];
        tasksByDate[day].push(task);
      }
    }
  });

  // Helper to build month calendar matrix
  const buildCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIdx = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = Sun
    const weeks = [];
    let week = [];
    // prepend empty cells
    for (let i = 0; i < firstDayIdx; i++) week.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    // fill remaining cells
    while (week.length && week.length < 7) week.push(null);
    if (week.length) weeks.push(week);
    return weeks;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="db-page fade-in" style={{ padding: '2rem' }}>
      <style>{`
        .db-calendar-card { background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:2rem; box-shadow:0 4px 6px rgba(0,0,0,0.02); }
        .db-calendar-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; font-weight:600; }
        .db-calendar-nav { display:flex; gap:8px; }
        .db-cal-nav-btn { width:36px; height:36px; border:1px solid #e2e8f0; background:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#64748b; transition:all .2s; }
        .db-cal-nav-btn:hover { background:#f8fafc; color:#0f172a; }
        .db-calendar-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:1px; background:#e2e8f0; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; }
        .db-cal-day-name { background:#f8fafc; text-align:center; padding:.5rem 0; font-weight:600; font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:1px; }
        .db-cal-cell { background:#fff; min-height:70px; padding:6px; display:flex; flex-direction:column; }
        .db-cal-cell.empty { background:#f8fafc; }
        .db-cal-date { width:24px; height:24px; display:flex; align-items:center; justify-content:center; border-radius:50%; font-size:12px; font-weight:600; color:#334155; margin-bottom:4px; }
        .db-cal-cell.today .db-cal-date { background:#4596ab; color:#fff; font-weight:700; }
        .db-cal-task-pill { font-size:11px; padding:4px 6px; border-radius:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:600; background:#fffbeb; color:#b45309; border-left:2px solid #f59e0b; margin-bottom:2px; }
        .db-cal-task-pill.completed { background:#f0fdf4; color:#15803d; border-left-color:#22c55e; }
        .db-cal-task-pill.waiting { background:#eff6ff; color:#1d4ed8; border-left-color:#3b82f6; }
      `}</style>
      <div className="db-calendar-card">
        <div className="db-calendar-header">
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <div className="db-calendar-nav">
            <button className="db-cal-nav-btn" onClick={prevMonth}><ChevronLeft size={20} /></button>
            <button className="db-cal-nav-btn" onClick={nextMonth}><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="db-calendar-grid">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="db-cal-day-name">{d}</div>
          ))}
          {buildCalendar().map((week, wi) => (
            week.map((day, di) => {
              const isToday = day && new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
              const cellClasses = day ? "db-cal-cell" + (isToday ? " today" : "") : "db-cal-cell empty";
              return (
                <div key={`${wi}-${di}`} className={cellClasses}>
                  {day && <div className="db-cal-date">{day}</div>}
                  {day && tasksByDate[day] && tasksByDate[day].map((t) => (
                    <span key={t._id} className={`db-cal-task-pill ${t.status}`}>Cleaning ({t.panels} Panels)</span>
                  ))}
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSchedule;
