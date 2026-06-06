import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";
import { getLeads, updateLead, deleteLead } from "../services/api";
import {
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  Award,
  AlertCircle,
  TrendingDown,
  BadgeX,
  UsersRound
} from "lucide-react";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLeadsData = async () => {
    try {
      setLoading(true);
      const res = await getLeads();
      setLeads(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed to load leads",
        text: err.response?.data?.message || err.message,
        icon: "error",
        confirmButtonColor: "#316398"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus });

      // Update local state directly to prevent full reload flicker
      setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Lead status updated to ${newStatus}`,
        showConfirmButton: false,
        timer: 2000
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed to update status",
        icon: "error",
        confirmButtonColor: "#316398"
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this lead entry!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        await deleteLead(id);
        setLeads(leads.filter(lead => lead._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The lead has been removed.",
          icon: "success",
          confirmButtonColor: "#316398"
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed to delete lead",
        icon: "error",
        confirmButtonColor: "#316398"
      });
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.location.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      lead.requirement.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // CRM Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "new").length;
  const inProgressLeads = leads.filter(l => l.status === "in_progress" || l.status === "contacted").length;
  const LostLeads = leads.filter(l => l.status === "lost").length;
  const qualifiedLeads = leads.filter(l => l.status === "qualified").length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return { bg: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" };
      case "contacted":
        return { bg: "#fef3c7", color: "#d97706", border: "1px solid #fde68a" };
      case "in_progress":
        return { bg: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" };
      case "qualified":
        return { bg: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" };
      case "lost":
        return { bg: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" };
      default:
        return { bg: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1" };
    }
  };

  if (loading) {
    return <Loader message="Loading Leads database..." />;
  }

  return (
    <div className="leads-page fade-in">
      <style>{`
        .leads-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem 2rem;
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
        .leads-header {
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .leads-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #316398;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.5rem;
        }
        .leads-eyebrow::before {
          content: '';
          width: 16px;
          height: 2px;
          background: #316398;
          display: inline-block;
          border-radius: 2px;
        }

        .leads-header h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -1px;
          margin: 0;
        }

        .leads-header p {
          font-size: 14px;
          color: #64748b;
          margin: 0.4rem 0 0 0;
        }

        /* STATS CARDS */
        .leads-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .lead-stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01);
        }

        .lead-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-blue { background: #eff6ff; color: #1d4ed8; }
        .icon-yellow { background: #fffbeb; color: #d97706; }
        .icon-purple { background: #faf5ff; color: #7c3aed; }
        .icon-green { background: #f0fdf4; color: #16a34a; }
        .icon-red { background: #fef2f2; color: #dc2626;}

        .lead-stat-info {
          display: flex;
          flex-direction: column;
        }

        .lead-stat-lbl {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 2px;
        }

        .lead-stat-val {
          font-family: 'Outfit', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
        }

        /* CONTROLS BAR */
        .leads-controls {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          gap: 1.25rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01);
        }

        .search-wrapper {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #316398;
          box-shadow: 0 0 0 3px rgba(49,99,152,0.1);
        }

        .filter-wrapper {
          width: 200px;
          position: relative;
        }

        .filter-select {
          width: 100%;
          padding: 0.75rem 1.5rem 0.75rem 2.5rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 10px;
          cursor: pointer;
        }

        .filter-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        /* TABLE VIEW */
        .table-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .leads-table th {
          background: #f8fafc;
          padding: 1rem 1.25rem;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
        }

        .leads-table td {
          padding: 1.25rem;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
        }

        .lead-name-cell {
          font-weight: 600;
          color: #0f172a;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          margin-top: 2px;
          font-size: 13px;
        }

        .info-row svg {
          color: #94a3b8;
        }

        .status-pill {
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          text-transform: capitalize;
        }

        .status-select {
          padding: 0.35rem 0.75rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          cursor: pointer;
          font-weight: 500;
        }

        .status-select:focus {
          outline: none;
          border-color: #316398;
        }

        .btn-delete {
          background: transparent;
          color: #ef4444;
          border: 1px solid #fecaca;
          padding: 0.45rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-delete:hover {
          background: #fef2f2;
          border-color: #fca5a5;
        }

        .leads-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: #64748b;
        }

        .leads-empty-icon {
          font-size: 3rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }

        .leads-empty-title {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .leads-controls {
            flex-direction: column;
          }
          .filter-wrapper {
            width: 100%;
          }
          .leads-header h1 {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .leads-page {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>

      <div className="leads-header">
        <div>
          <div className="leads-eyebrow">Lead CRM</div>
          <h1>Lead Enquiries</h1>
          <p>View and manage prospective client enquiries captured from the website.</p>
        </div>
      </div>

      {/* CRM STATS */}
      <div className="leads-stats-grid">
        <div className="lead-stat-card">
          <div className="lead-stat-icon icon-blue">
            <Layers size={22} />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-lbl">Total Leads</span>
            <span className="lead-stat-val">{totalLeads}</span>
          </div>
        </div>

        <div className="lead-stat-card">
          <div className="lead-stat-icon icon-yellow">
            <UsersRound size={22} />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-lbl">New Leads</span>
            <span className="lead-stat-val">{newLeads}</span>
          </div>
        </div>

        <div className="lead-stat-card">
          <div className="lead-stat-icon icon-purple">
            <TrendingUp size={22} />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-lbl">In Progress</span>
            <span className="lead-stat-val">{inProgressLeads}</span>
          </div>
        </div>

        <div className="lead-stat-card">
          <div className="lead-stat-icon icon-green">
            <Award size={22} />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-lbl">Qualified</span>
            <span className="lead-stat-val">{qualifiedLeads}</span>
          </div>
        </div>

        <div className="lead-stat-card">
          <div className="lead-stat-icon icon-red">
            <BadgeX size={22} />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-lbl">Lost</span>
            <span className="lead-stat-val">{LostLeads}</span>
          </div>
        </div>
      </div>



      {/* CONTROLS */}
      <div className="leads-controls">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search leads by name, location, requirement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-wrapper">
          <Filter className="filter-icon" size={16} />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* LEADS LIST TABLE */}
      <div className="table-card">
        {filteredLeads.length === 0 ? (
          <div className="leads-empty">
            <AlertCircle className="leads-empty-icon" size={40} />
            <div className="leads-empty-title">No Leads Found</div>
            <p>We couldn't find any lead matching your search or filters.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Lead Details</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Requirement</th>
                  <th>Date</th>
                  <th>Status Display</th>
                  <th>Update Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const statusStyle = getStatusStyle(lead.status);
                  return (
                    <tr key={lead._id}>
                      <td className="lead-name-cell">
                        {lead.name}
                       
                      </td>
                      <td>
                        <div className="info-row" style={{ fontWeight: 500, color: "#0f172a" }}>
                          <Phone size={12} /> {lead.phone}
                        </div>
                        <div className="info-row">
                          <Mail size={12} /> {lead.email}
                        </div>
                      </td>
                      <td style={{ fontWeight: 500 }}>
                        <div className="info-row" style={{ color: "#0f172a" }}>
                          <MapPin size={12} /> {lead.location}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, color: "#316398" }}>
                        {lead.requirement}
                      </td>
                      <td >
                         <div className="info-row">
                          <Calendar size={12} />
                          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </div>
                      </td>
                      <td>
                        <span
                          className="status-pill"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            border: statusStyle.border
                          }}
                        >
                          {lead.status === "in_progress" ? "In Progress" : lead.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="qualified">Qualified</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(lead._id)}
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
