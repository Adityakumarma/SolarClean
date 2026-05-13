import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

// const API = "http://localhost:5000/api";
// const BASE = "http://localhost:5000";

const API = "https://solarcleanbackend.onrender.com/api";
const BASE = "https://solarcleanbackend.onrender.com";

export default function Tasks() {
  const [teams, setTeams] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    location: "",
    panels: "",
    assignedTeam: "",
    client: "",
    date: "",
    duration: "",
  });

  const fetchData = async () => {
    try {
      const t = await axios.get(`${API}/teams`);
      const c = await axios.get(`${API}/clients`);
      const tk = await axios.get(`${API}/tasks`);
      setTeams(t.data);
      setClients(c.data);
      setTasks(tk.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const createTask = async () => {
    const { location, panels, assignedTeam, client, date, duration } = form;
    if (!location || !panels || !assignedTeam || !client || !date || !duration) {
      return Swal.fire({
        title: "All fields are required!",
        icon: "warning",
        draggable: true
      });
    }
    try {
      await axios.post(`${API}/tasks`, form);
      setForm({ location: "", panels: "", assignedTeam: "", client: "", date: "", duration: "" });
      Swal.fire({
        title: "Task Added Successfully!",
        icon: "success",
        draggable: true
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {

      await axios.put(`${API}/tasks/${id}`, {
        status,
      });

      Swal.fire({
        title: "wait for confirmation!",
        icon: "info",
      });

      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    Swal.fire({
      title: "Task deleted!",
      icon: "error",
      draggable: true
    });
    fetchData();
  };

  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [jobCard, setJobCard] = useState({
    servicesDone: "",
    complaints: "",
    remarks: "",
    completedBy: ""
  });

  const submitJobCard = async () => {
    try {
      await axios.put(
        `${API}/tasks/${selectedTask._id}/jobcard`,
        {
          servicesDone: jobCard.servicesDone.split(",").map((s) => s.trim()).filter(Boolean),
          complaints: jobCard.complaints.split(",").map((s) => s.trim()).filter(Boolean),
          remarks: jobCard.remarks,
          completedBy: jobCard.completedBy
        }
      );
      Swal.fire({
        title: "Job Card Added!",
        icon: "success"
      });
      setShowJobModal(false);
      setJobCard({ servicesDone: "", complaints: "", remarks: "", completedBy: "" });

      fetchData();
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error Adding Job Card",
        icon: "error"
      });
    }
  };

  const pending = tasks.filter((t) => t.status == "pending").length;
  const waiting = tasks.filter((t) => t.status === "waiting").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .tk-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        /* HEADER */
        .tk-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; }
        .tk-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #B45309; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .tk-eyebrow::before { content: ''; width: 16px; height: 1px; background: #B45309; display: inline-block; }
        .tk-header h1 { font-family: "Oswald", sans-serif; font-size: 2.75rem; font-weight: 800; color: #0F172A; letter-spacing: -1px; margin: 0; }
        .tk-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        /* STATS */
        .tk-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .tk-stat { background: #fff; border: 0.5px solid #e2e8f0; border-radius: 12px; padding: 1.25rem 1.5rem; height: 100px; }
        .tk-stat-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem; }
        .tk-stat-val { font-family: 'Geist', sans-serif; font-size: 1.75rem; font-weight: 800; color: #0F172A; }
        .tk-stat-val span { font-size: 14px; font-weight: 400; color: #94a3b8; margin-left: 4px; font-family: 'DM Sans', sans-serif; }
        .tk-stat-pending .tk-stat-val { color: #B45309; }
        .tk-stat-waiting .tk-stat-val { color: #4169e1; }
        .tk-stat-done .tk-stat-val { color: #16a34a; }

        /* FORM CARD */
        .tk-form-card { background: #fff; border: 0.5px solid #e2e8f0; border-radius: 16px; padding: 2rem; margin-bottom: 2.5rem; }
        .tk-form-title {
          font-family: "Oswald", sans-serif; font-size: 1.25rem; font-weight: 700; color: #0F172A;
          letter-spacing: -0.3px; margin-bottom: 1.5rem; padding-bottom: 1rem;
          border-bottom: 0.5px solid #e2e8f0; display: flex; align-items: center; gap: 8px;
        }
        .tk-form-dot { width: 8px; height: 8px; background: #F59E0B; border-radius: 50%; display: inline-block; }
        .tk-form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .tk-field { display: flex; flex-direction: column; gap: 6px; }
        .tk-field label { font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
        .tk-input {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; width: 100%;
        }
        .tk-input:focus { border-color: #F59E0B; background: #fff; }
        .tk-input::placeholder { color: #94a3b8; }
        .tk-select {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; width: 100%;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; padding-right: 2rem;
          transition: border-color 0.15s;
        }
        .tk-select:focus { border-color: #F59E0B; }
        .tk-form-footer { margin-top: 1.5rem; }
        .tk-btn-create {
          background: #0F172A; color: #fff; border: none;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
          transition: background 0.15s;
        }
        .tk-btn-create:hover { background: #1e293b; }

        /* TASKS LIST */
        .tk-list-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
        .tk-list-title { font-family: "Oswald", sans-serif; font-size: 1.25rem; font-weight: 700; color: #0F172A; letter-spacing: -0.3px; }
        .tk-badge { background: #FEF3C7; color: #B45309; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 100px; }

        .tk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }

        /* TASK CARD */
        .tk-card { background: #fff; border: 0.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: box-shadow 0.15s; }
        .tk-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .tk-card.completed { border-color: #bbf7d0; }

        .tk-card-img { width: 100%; height: 140px; object-fit: cover; display: block; border-bottom: 0.5px solid #e2e8f0; }
        .tk-card-img-placeholder {
          width: 100%; height: 140px; background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 0.5px solid #e2e8f0;
        }

        .tk-card-header {
          padding: 1.1rem 1.25rem 0.75rem 1.25rem;
          display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem;
          border-bottom: 0.5px solid #f1f5f9;
        }
        .tk-card-location { font-family: "Oswald", sans-serif; font-size: 1rem; font-weight: 700; color: #0F172A; letter-spacing: -0.3px; }
        .tk-status-pill {
          font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
          white-space: nowrap; flex-shrink: 0;
        }
        .tk-status-pending { background: #FEF3C7; color: #B45309; }
        .tk-status-completed { background: #dcfce7; color: #16a34a; }

        .tk-card-body { padding: 0.85rem 1.25rem; display: flex; flex-direction: column; gap: 6px; }
        .tk-card-row { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #64748b; }
        .tk-card-row svg { flex-shrink: 0; color: #94a3b8; }
        .tk-card-row strong { color: #0F172A; font-weight: 500; }

        .tk-next-clean {
          margin: 0.5rem 1.25rem; padding: 0.6rem 0.9rem;
          background: #f8fafc; border-radius: 8px; border: 0.5px solid #e2e8f0;
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #64748b;
        }
        .tk-next-clean strong { color: #0F172A; font-weight: 500; }

        .tk-card-footer {
          padding: 0.85rem 1.25rem; border-top: 0.5px solid #f1f5f9;
          display: flex; gap: 0.6rem; align-items: center;
        }
        .tk-btn-complete {
          background: #0F172A; color: #fff; border: none;
          padding: 0.45rem 0.9rem; border-radius: 7px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 5px;
          transition: background 0.15s;
        }
        .tk-btn-complete:hover { background: #1e293b; }
        .tk-btn-delete {
          background: transparent; color: #ef4444; border: 0.5px solid #fecaca;
          padding: 0.45rem 0.9rem; border-radius: 7px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center;  gap: 5px;
          transition: background 0.15s;
        }
        .tk-btn-delete:hover { background: #fef2f2; }

        .tk-btn-job {
          background: #f1f5f9; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.45rem 0.9rem; border-radius: 7px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 5px;
          transition: background 0.15s;
        }
        .tk-btn-job:hover { background: #e2e8f0; }

        /* MODAL */
        .tk-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
          display: flex; justify-content: center; align-items: center; z-index: 999;
          padding: 1rem;
        }
        .tk-modal {
          background: #fff; border-radius: 16px; width: 100%; max-width: 500px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }
        .tk-modal-header {
          padding: 1.5rem; border-bottom: 0.5px solid #e2e8f0;
          display: flex; justify-content: space-between; align-items: center;
        }
        .tk-modal-title {
          font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700;
          color: #0F172A; margin: 0; letter-spacing: -0.3px;
        }
        .tk-btn-close-icon {
          background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          color: #64748b; transition: all 0.15s;
        }
        .tk-btn-close-icon:hover { background: #e2e8f0; color: #0F172A; }
        .tk-modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; max-height: 70vh; overflow-y: auto; }
        .tk-textarea, .tk-modal-input {
          border: 0.5px solid #e2e8f0; padding: 0.85rem 1rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; width: 100%;
        }
        .tk-textarea { resize: vertical; min-height: 90px; }
        .tk-textarea:focus, .tk-modal-input:focus { border-color: #F59E0B; background: #fff; }
        .tk-textarea::placeholder, .tk-modal-input::placeholder { color: #94a3b8; }
        .tk-modal-footer {
          padding: 1.25rem 1.5rem; border-top: 0.5px solid #e2e8f0; background: #f8fafc;
          display: flex; gap: 1rem;
        }
           .tk-btn-save {
          flex: 1; background: #16a34a; color: #fff; border: none;
          padding: 0.75rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: background 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .tk-btn-save:hover { background: #15803d; }
        .tk-btn-cancel {
          flex: 1; background: #fff; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.75rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .tk-btn-cancel:hover { background: #f1f5f9; border-color: #cbd5e1; }

        .tk-empty {
          grid-column: 1 / -1; text-align: center; padding: 4rem;
          color: #94a3b8; font-size: 15px; background: #fff;
          border: 0.5px solid #e2e8f0; border-radius: 14px;
        }
        .tk-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }

        @media (max-width: 900px) {
          .tk-form-grid { grid-template-columns: 1fr 1fr; }
          .tk-grid { grid-template-columns: 1fr; }
          .tk-stats { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .tk-page { padding: 1.5rem 1rem; }
          .tk-form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="tk-page">


        <div className="tk-header">
          <div className="tk-eyebrow">Task Management</div>
          <h1>Tasks</h1>
          <p>Schedule, assign, and track all solar panel cleaning tasks.</p>
        </div>


        <div className="tk-stats">
          <div className="tk-stat">
            <div className="tk-stat-label">Total Tasks</div>
            <div className="tk-stat-val">{tasks.length}<span>tasks</span></div>
          </div>
          <div className="tk-stat tk-stat-pending">
            <div className="tk-stat-label">Pending</div>
            <div className="tk-stat-val">{pending}<span>tasks</span></div>
          </div>
          <div className="tk-stat tk-stat-waiting">
            <div className="tk-stat-label">Waiting </div>
            <div className="tk-stat-val">{waiting}<span>tasks</span></div>
          </div>
          <div className="tk-stat tk-stat-done">
            <div className="tk-stat-label">Completed</div>
            <div className="tk-stat-val">{completed}<span>tasks</span></div>
          </div>
        </div>


        <div className="tk-form-card">
          <div className="tk-form-title">
            <span className="tk-form-dot"></span>
            Create New Task
          </div>

          <div className="tk-form-grid">
            <div className="tk-field">
              <label>Location</label>
              <input
                className="tk-input"
                name="location"
                placeholder="e.g. Kochi, Kerala"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="tk-field">
              <label>No. of Panels</label>
              <input
                className="tk-input"
                name="panels"
                placeholder="e.g. 24"
                value={form.panels}
                onChange={handleChange}
              />
            </div>

            <div className="tk-field">
              <label>Cleaning Date</label>
              <input
                className="tk-input"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className="tk-field">
              <label>Duration Needed (in months)</label>
              <input
                className="tk-input"
                type="number"
                name="duration"
                placeholder="e.g. 3"
                value={form.duration}
                onChange={handleChange}
              />
            </div>

            <div className="tk-field">
              <label>Assign Team</label>
              <select
                className="tk-select"
                name="assignedTeam"
                value={form.assignedTeam}
                onChange={handleChange}
              >
                <option value="">Select a team</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="tk-field">
              <label>Client</label>
              <select
                className="tk-select"
                name="client"
                value={form.client}
                onChange={handleChange}
              >
                <option value="">Select a client</option>
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="tk-form-footer">
            <button className="tk-btn-create" onClick={createTask}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create Task
            </button>
          </div>
        </div>


        <div className="tk-list-head">
          <div className="tk-list-title">All Tasks</div>
          <span className="tk-badge">{tasks.length} tasks</span>
        </div>

        <div className="tk-grid">
          {tasks.length === 0 && (
            <div className="tk-empty">
              <div className="tk-empty-icon">📋</div>
              No tasks yet. Create your first task above.
            </div>
          )}

          {tasks.map((task) => (
            <div key={task._id} className={`tk-card${task.status === "completed" ? " completed" : ""}`}>

              {task.client?.image ? (
                <img src={task.client.image} className="tk-card-img" alt="panel" />
              ) : (
                <div className="tk-card-img-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}

              <div className="tk-card-header">
                <div className="tk-card-location">{task.location}</div>
                <span
                  className={`tk-status-pill ${task.status === "completed"
                    ? " completed"
                    : "pending"
                    }`}
                >

                  {task.status === "pending" &&
                    <span className="text-amber-600">Pending</span>}

                  {task.status === "waiting" &&
                    <span className="text-blue-500">Waiting for Confirmation</span>}

                  {task.status === "completed" &&
                    <span className="text-green-700">✓ Completed</span>}

                </span>
              </div>

              <div className="tk-card-body">
                <div className="tk-card-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <strong>{task.panels}</strong>&nbsp;panels
                </div>

                <div className="tk-card-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Team:&nbsp;<strong>{task.assignedTeam?.name || "—"}</strong>
                </div>

                <div className="tk-card-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Client:&nbsp;<strong>{task.client?.name || "—"}</strong>
                </div>
                <div className="tk-card-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Phone:&nbsp;<strong>{task.client?.phone || "—"}</strong>
                </div>
                <div className="tk-card-row" style={{ alignItems: 'flex-start' }}>
                  <svg style={{ marginTop: '3px' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span style={{ lineHeight: '1.4' }}>Address:&nbsp;<strong>{task.client?.location || "—"}</strong></span>
                </div>
              </div>

              <div className="tk-next-clean">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Next cleaning:&nbsp;<strong>{task.nextCleaning ? new Date(task.nextCleaning).toLocaleDateString("en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }
                )
                  : "Cleaning not Completed yet!"}
                </strong>              </div>

              <div className="tk-card-footer">

                {task.status === "pending" && (

                  <button
                    className="tk-btn-complete"
                    onClick={() =>
                      updateStatus(task._id, "waiting")
                    }
                  >

                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>

                    Mark Complete

                  </button>

                )}

                {task.status === "pending" ? (

                  <button
                    className="tk-btn-job"
                    onClick={() => {
                      setSelectedTask(task);
                      setShowJobModal(true);
                    }}
                  >

                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>

                    Add Job Card

                  </button>

                ) : (

                  <div
                    style={{
                      background: "#dcfce7",
                      color: "#166534",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      border: "1px solid #bbf7d0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>

                    Job Card Added

                  </div>

                )}

                <button
                  className="tk-btn-delete"
                  onClick={() => deleteTask(task._id)}
                >

                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                  </svg>

                  Delete

                </button>

              </div>
            </div>
          ))}
        </div>

      </div>

      {showJobModal && (
        <div className="tk-modal-overlay" onClick={() => setShowJobModal(false)}>
          <div className="tk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tk-modal-header">
              <h2 className="tk-modal-title">Add Job Card</h2>
              <button className="tk-btn-close-icon" onClick={() => setShowJobModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="tk-modal-body">
              <textarea
                className="tk-textarea"
                placeholder="Services Done "
                value={jobCard.servicesDone}
                onChange={(e) => setJobCard({ ...jobCard, servicesDone: e.target.value })}
              />

              <textarea
                className="tk-textarea"
                placeholder="Complaints"
                value={jobCard.complaints}
                onChange={(e) => setJobCard({ ...jobCard, complaints: e.target.value })}
              />

              <textarea
                className="tk-textarea"
                placeholder="Remarks"
                value={jobCard.remarks}
                onChange={(e) => setJobCard({ ...jobCard, remarks: e.target.value })}
              />

              <input
                className="tk-modal-input"
                type="text"
                placeholder="Completed By"
                value={jobCard.completedBy}
                onChange={(e) => setJobCard({ ...jobCard, completedBy: e.target.value })}
              />
            </div>

              <div className="tk-modal-footer">
              <button className="tk-btn-save" onClick={submitJobCard}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Job Card
              </button>
              <button className="tk-btn-cancel" onClick={() => setShowJobModal(false)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}