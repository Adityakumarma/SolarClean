import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'

// const API = "http://localhost:5000/api";

const API = "https://solarcleanbackend.onrender.com/api";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");

  const [member, setMember] = useState({
    name: "",
    phone: "",
    email: "",
    teamId: "",
  });

  const fetchTeams = async () => {
    const res = await axios.get(`${API}/teams`);
    setTeams(res.data);
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
      fetchTeams();
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Error creating team");
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
    } catch (error) {
      if (error.response && error.response.data.message) {
           Swal.fire({
  title: "Member Already exists in the Team!",
  icon: "info",
  draggable: true
});
      } else {
        alert("Error adding member");
      }
    }
    setMember({ name: "", phone: "", email: "", teamId: "" });
    fetchTeams();
  };

  const totalMembers = teams.reduce((acc, t) => acc + t.members.length, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

        .tm-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        /* HEADER */
        .tm-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; }
        .tm-header-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #B45309; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .tm-header-eyebrow::before { content: ''; width: 16px; height: 1px; background: #B45309; display: inline-block; }
        .tm-header h1 { font-family: "Oswald", sans-serif; font-size: 2.75rem; font-weight: 800; color: #0F172A; letter-spacing: -1px; margin: 0; }
        .tm-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        /* STAT ROW */
        .tm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .tm-stat {
          background: #fff; border: 0.5px solid #e2e8f0; border-radius: 12px;
          padding: 1.25rem 1.5rem; height: 110px;
        }
        .tm-stat-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem; }
        .tm-stat-val { font-family: 'Geist', sans-serif; font-size: 1.75rem; font-weight: 800; color: #0F172A; }
        .tm-stat-val span { font-size: 14px; font-weight: 400; color: #94a3b8; margin-left: 4px; font-family: 'DM Sans', sans-serif; }

        /* TWO COLUMN LAYOUT */
        .tm-forms-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2.5rem; }

        /* CARDS */
        .tm-card {
          background: #fff; border: 0.5px solid #e2e8f0; border-radius: 16px; padding: 1.75rem;
        }
        .tm-card-title {
          font-family: "Oswald", sans-serif; font-size: 1.25rem; font-weight: 700; color: #0F172A;
          letter-spacing: -0.3px; margin-bottom: 1.25rem; padding-bottom: 1rem;
          border-bottom: 0.5px solid #e2e8f0; display: flex; align-items: center; gap: 8px;
        }
        .tm-card-title-dot { width: 8px; height: 8px; background: #F59E0B; border-radius: 50%; display: inline-block; }

        /* INPUTS */
        .tm-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 0.85rem; }
        .tm-field:last-of-type { margin-bottom: 0; }
        .tm-field label { font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
        .tm-input {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; width: 100%;
        }
        .tm-input:focus { border-color: #F59E0B; background: #fff; }
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
        .tm-select:focus { border-color: #F59E0B; }

        /* BUTTONS */
        .tm-btn-primary {
          background: #0F172A; color: #fff; border: none;
          padding: 0.7rem 1.4rem; border-radius: 8px; width: 100%;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: 1.25rem; transition: background 0.15s;
        }
        .tm-btn-primary:hover { background: #1e293b; }

        /* TEAMS LIST */
        .tm-list-head {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;
        }
        .tm-list-title { font-family: "Oswald", sans-serif; font-size: 1.25rem; font-weight: 700; color: #0F172A; letter-spacing: -0.3px; }
        .tm-badge { background: #FEF3C7; color: #B45309; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 100px; }

        .tm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .tm-team-card {
          background: #fff; border: 0.5px solid #e2e8f0; border-radius: 14px; overflow: hidden;
        }
        .tm-team-header {
          padding: 1.25rem 1.5rem; border-bottom: 0.5px solid #e2e8f0;
          display: flex; align-items: center; justify-content: space-between; background: #fff;
        }
        .tm-team-name { font-family: "Oswald", sans-serif; font-size: 1rem; font-weight: 700; color: #0F172A; letter-spacing: -0.3px; }
        .tm-member-count { font-size: 12px; color: #64748b; background: #f1f5f9; padding: 3px 10px; border-radius: 100px; }
        .tm-team-body { padding: 0.5rem 0; }

        .tm-member-row {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0;
          padding: 0.75rem 1.5rem; border-bottom: 0.5px solid #f1f5f9;
          transition: background 0.1s;
        }
        .tm-member-row:last-child { border-bottom: none; }
        .tm-member-row:hover { background: #f8fafc; }
        .tm-member-name { font-size: 13px; font-weight: 500; color: #0F172A; }
        .tm-member-detail { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 5px; }

        .tm-no-members { padding: 1.5rem; text-align: center; font-size: 13px; color: #94a3b8; }

        .tm-empty {
          grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;
          font-size: 15px; background: #fff; border: 0.5px solid #e2e8f0; border-radius: 14px;
        }

        @media (max-width: 900px) {
          .tm-forms-row { grid-template-columns: 1fr; }
          .tm-grid { grid-template-columns: 1fr; }
          .tm-stats { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .tm-page { padding: 1.5rem 1rem; }
          .tm-member-row { grid-template-columns: 1fr; gap: 2px; }
        }
      `}</style>

      <div className="tm-page fade-in">

        
        <div className="tm-header">
          <div className="tm-header-eyebrow">Team Management</div>
          <h1>Teams</h1>
          <p>Create cleaning teams and assign members to manage solar panel maintenance.</p>
        </div>

        
        <div className="tm-stats">
          <div className="tm-stat">
            <div className="tm-stat-label">Total Teams</div>
            <div className="tm-stat-val">{teams.length}<span>teams</span></div>
          </div>
          <div className="tm-stat">
            <div className="tm-stat-label">Total Members</div>
            <div className="tm-stat-val">{totalMembers}<span>members</span></div>
          </div>
          <div className="tm-stat">
            <div className="tm-stat-label">Avg. per Team</div>
            <div className="tm-stat-val">
              {teams.length ? Math.round(totalMembers / teams.length) : 0}
              <span>members</span>
            </div>
          </div>
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

        
        <div className="tm-list-head">
          <div className="tm-list-title">Teams List</div>
          <span className="tm-badge">{teams.length} teams</span>
        </div>

        <div className="tm-grid">
          {teams.length === 0 && (
            <div className="tm-empty">No teams yet. Create your first team above.</div>
          )}

          {teams.map((team) => (
            <div key={team._id} className="tm-team-card">
              <div className="tm-team-header">
                <div className="tm-team-name">{team.name}</div>
                <span className="tm-member-count">
                  {team.members.length} {team.members.length === 1 ? "member" : "members"}
                </span>
              </div>

              <div className="tm-team-body">
                {team.members.length === 0 ? (
                  <div className="tm-no-members">No members assigned yet.</div>
                ) : (
                  team.members.map((m, i) => (
                    <div key={i} className="tm-member-row">
                      <div className="tm-member-name">{m.name}</div>
                      <div className="tm-member-detail">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.1 3.4 2 2 0 0 1 3.1 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/>
                        </svg>
                        {m.phone}
                      </div>
                      <div className="tm-member-detail">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        {m.email}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}