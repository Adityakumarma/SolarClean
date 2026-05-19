import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

const API = "https://solarcleanbackend.onrender.com/api";

export default function Teams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");

  const [member, setMember] = useState({
    name: "",
    phone: "",
    email: "",
    teamId: "",
  });

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API}/teams`);
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const createTeam = async () => {
    if (!teamName) return;
    try {
      await axios.post(`${API}/teams`, { name: teamName });
      setTeamName("");
      Swal.fire({
        title: "Team Created Successfully!",
        icon: "success",
        draggable: true
      });
      navigate("/teams-list");
    } catch (err) {
      if (err.response && err.response.data.message) {
        Swal.fire({
          title: err.response.data.message,
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "Error creating team",
          icon: "error"
        });
      }
    }
  };

  const addMember = async () => {
    const { name, phone, email, teamId } = member;
    if (!name || !phone || !email || !teamId) return;
    try {
      await axios.post(`${API}/teams/${teamId}/member`, { name, phone, email });
      Swal.fire({
        title: "A New Member is Added!",
        icon: "success",
        draggable: true
      });
      setMember({ name: "", phone: "", email: "", teamId: "" });
      navigate("/teams-list");
    } catch (error) {
      if (error.response && error.response.data.message) {
        Swal.fire({
          title: "Member Already exists in the Team!",
          icon: "info",
          draggable: true
        });
      } else {
        Swal.fire({
          title: "Error adding member",
          icon: "error"
        });
      }
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .tm-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        /* HEADER */
        .tm-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end; }
        .tm-header-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #316398; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .tm-header-eyebrow::before { content: ''; width: 16px; height: 1px; background: #316398; display: inline-block; }
        .tm-header h1 { font-family: 'Outfit', sans-serif; font-size: 2.75rem; font-weight: 800; color: #0F172A; letter-spacing: -1px; margin: 0; }
        .tm-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        .tm-btn-list-nav {
          background: #f1f5f9; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: background 0.15s; text-decoration: none;
        }
        .tm-btn-list-nav:hover { background: #cbd5e1; }

        /* TWO COLUMN LAYOUT */
        .tm-forms-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2.5rem; }

        /* CARDS */
        .tm-card {
          background: #fff; border: 0.5px solid #e2e8f0; border-radius: 16px; padding: 1.75rem;
        }
        .tm-card-title {
          font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: #0F172A;
          letter-spacing: -0.3px; margin-bottom: 1.25rem; padding-bottom: 1rem;
          border-bottom: 0.5px solid #e2e8f0; display: flex; align-items: center; gap: 8px;
        }
        .tm-card-title-dot { width: 8px; height: 8px; background: #4596ab; border-radius: 50%; display: inline-block; }

        /* INPUTS */
        .tm-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 0.85rem; }
        .tm-field:last-of-type { margin-bottom: 0; }
        .tm-field label { font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
        .tm-input {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; width: 100%;
        }
        .tm-input:focus { border-color: #4596ab; background: #fff; }
        .tm-input::placeholder { color: #94a3b8; }
        .tm-select {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s; width: 100%;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 2rem;
        }
        .tm-select:focus { border-color: #4596ab; }

        /* BUTTONS */
        .tm-btn-primary {
          background: #316398; color: #fff; border: none;
          padding: 0.7rem 1.4rem; border-radius: 8px; width: 100%;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: 1.25rem; transition: background 0.15s;
        }
        .tm-btn-primary:hover { background: #4596ab; }

        @media (max-width: 900px) {
          .tm-forms-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .tm-page { padding: 1.5rem 1rem; }
          .tm-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      <div className="tm-page fade-in">
        <div className="tm-header">
          <div>
            <div className="tm-header-eyebrow">Team Management</div>
            <h1>Add Team</h1>
            <p>Create cleaning teams and assign members to manage solar panel maintenance.</p>
          </div>
          <button className="tm-btn-list-nav" onClick={() => navigate("/teams-list")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            View Teams List
          </button>
        </div>

        <div className="tm-forms-row">
          <div className="tm-card">
            <div className="tm-card-title">
              <span className="tm-card-title-dot"></span>
              Create New Team
            </div>
            <div className="tm-field">
              <label>Team Name</label>
              <input
                className="tm-input"
                placeholder="e.g. Greenhouse Cleaning"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <button className="tm-btn-primary" onClick={createTeam}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Create Team
            </button>
          </div>

          <div className="tm-card">
            <div className="tm-card-title">
              <span className="tm-card-title-dot"></span>
              Add Member
            </div>

            <div className="tm-field">
              <label>Member Name</label>
              <input
                className="tm-input"
                placeholder="e.g. Aditya Kumar"
                value={member.name}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
              />
            </div>

            <div className="tm-field">
              <label>Phone</label>
              <input
                className="tm-input"
                placeholder="e.g. +91 9745707047"
                value={member.phone}
                onChange={(e) => setMember({ ...member, phone: e.target.value })}
              />
            </div>

            <div className="tm-field">
              <label>Email</label>
              <input
                className="tm-input"
                placeholder="e.g. aditya@gmail.com"
                value={member.email}
                onChange={(e) => setMember({ ...member, email: e.target.value })}
              />
            </div>

            <div className="tm-field">
              <label>Assign to Team</label>
              <select
                className="tm-select"
                value={member.teamId}
                onChange={(e) => setMember({ ...member, teamId: e.target.value })}
              >
                <option value="">Select a team</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button className="tm-btn-primary" onClick={addMember}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M19 8v6M22 11h-6"/>
              </svg>
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}