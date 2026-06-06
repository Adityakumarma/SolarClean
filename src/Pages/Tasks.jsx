import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from "../Components/Loader";
import { api } from "../services/api";

export default function Tasks() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const t = await api.get('/teams');
      const c = await api.get('/clients');
      setTeams(t.data);
      setClients(c.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      await api.post('/tasks', form);
      setForm({ location: "", panels: "", assignedTeam: "", client: "", date: "", duration: "" });
      Swal.fire({
        title: "Task Added Successfully!",
        icon: "success",
        draggable: true
      });
      navigate("/tasks-list");
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error Creating Task",
        icon: "error"
      });
    }
  };

  if (loading) {
    return <Loader message="Loading task schedules..." />;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .tk-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        /* HEADER */
        .tk-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end; }
        .tk-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #316398; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .tk-eyebrow::before { content: ''; width: 16px; height: 1px; background: #316398; display: inline-block; }
        .tk-header h1 { font-family: 'Outfit', sans-serif; font-size: 2.75rem; font-weight: 800; color: #0F172A; letter-spacing: -1px; margin: 0; }
        .tk-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        .tk-btn-list-nav {
          background: #f1f5f9; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: background 0.15s; text-decoration: none;
        }
        .tk-btn-list-nav:hover { background: #cbd5e1; }

        /* FORM CARD */
        .tk-form-card { background: #fff; border: 0.5px solid #e2e8f0; border-radius: 16px; padding: 2rem; margin-bottom: 2.5rem; }
        .tk-form-title {
          font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: #0F172A;
          letter-spacing: -0.3px; margin-bottom: 1.5rem; padding-bottom: 1rem;
          border-bottom: 0.5px solid #e2e8f0; display: flex; align-items: center; gap: 8px;
        }
        .tk-form-dot { width: 8px; height: 8px; background: #4596ab; border-radius: 50%; display: inline-block; }
        .tk-form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .tk-field { display: flex; flex-direction: column; gap: 6px; }
        .tk-field label { font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
        .tk-input {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; width: 100%;
        }
        .tk-input:focus { border-color: #4596ab; background: #fff; }
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
        .tk-select:focus { border-color: #4596ab; }
        .tk-form-footer {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          border-top: 1px solid #f1f5f9;
          padding-top: 1.5rem;
        }
        .tk-btn-create {
          background: #316398; color: #fff; border: none;
          padding: 0.7rem 1.4rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.15s;
        }
        .tk-btn-create:hover {
          background: #4596ab;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 900px) {
          .tk-form-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .tk-page { padding: 1.5rem 1rem; }
          .tk-form-grid { grid-template-columns: 1fr; }
          .tk-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      <div className="tk-page fade-in">
        <div className="tk-header">
          <div>
            <div className="tk-eyebrow">Task Management</div>
            <h1>Create Task</h1>
            <p>Schedule, assign, and track all solar panel cleaning tasks.</p>
          </div>
          <button className="tk-btn-list-nav" onClick={() => navigate("/tasks-list")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            View Tasks List
          </button>
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
      </div>
    </div>
  );
}