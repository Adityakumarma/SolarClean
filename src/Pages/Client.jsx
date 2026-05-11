import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


// const API = "http://localhost:5000/api";
// const BASE = "http://localhost:5000";

const API = "https://solarcleanbackend.onrender.com/api";
const BASE = "https://solarcleanbackend.onrender.com";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState([11.2588, 75.7804]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);

  function LocationPicker() {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;

        setPosition([lat, lng]);

        try {
          const res = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
);

          const data = await res.json();

          setForm((prev) => ({
            ...prev,
            location: data.display_name || `${lat}, ${lng}`,
          }));

        } catch (err) {
          console.log(err);

          setForm((prev) => ({
            ...prev,
            location: `${lat}, ${lng}`,
          }));
        }
      },
    });

    return (
      <Marker position={position}>
        <Popup>Selected Location</Popup>
      </Marker>
    );
  }

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API}/clients`);
      const tk = await axios.get(`${API}/tasks`);

      setClients(res.data);
      setTasks(tk.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load clients");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const isValid = () => {
    const { name, phone, email, location } = form;
    if (!name || !phone || !email || !location) {
      Swal.fire({
        title: "All fields are required!",
        icon: "warning",
        draggable: true
      });
      return false;
    }
    return true;
  };

  const addClient = async () => {
    if (!isValid()) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("location", form.location);
      if (form.image) formData.append("image", form.image);
      await axios.post(`${API}/clients`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        title: "Client Added!",
        icon: "success",
        draggable: true
      });
      setForm({ name: "", phone: "", email: "", location: "", image: null });
      setPreview(null);
      fetchClients();
    } catch (err) {
      console.error(err);
      alert("Failed to add client");
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`${API}/clients/${id}`);
      Swal.fire({
        title: "Deleted entry!",
        icon: "error",
        draggable: true
      });
      fetchClients();
    } catch (err) {
      console.error(err);
      alert("Failed to delete client");
    }
  };

  const confirmTask = async (id) => {
    try {

      await axios.put(`${API}/tasks/${id}`, {
        status: "completed",
      });

      Swal.fire({
        title: "Task Confirmed!",
        icon: "success",
      });

      fetchClients();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .cl-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        .cl-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; }
        .cl-header-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #B45309; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .cl-header-eyebrow::before { content: ''; width: 16px; height: 1px; background: #B45309; display: inline-block; }
        .cl-header h1 {
          font-family: "Oswald", sans-serif; font-size: 2.75rem; font-weight: 800;
          color: #0F172A; letter-spacing: -1px; margin: 0;
        }
        .cl-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        /* FORM CARD */
        .cl-form-card {
          background: #fff; border: 0.5px solid #e2e8f0;
          border-radius: 16px; padding: 2rem; margin-bottom: 2.5rem;
        }
        .cl-form-title {
          font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700;
          color: #0F172A; letter-spacing: -0.3px; margin-bottom: 1.5rem;
          padding-bottom: 1rem; border-bottom: 0.5px solid #e2e8f0;
          display: flex; align-items: center; gap: 8px;
        }
        .cl-form-title-dot {
          width: 8px; height: 8px; background: #F59E0B; border-radius: 50%; display: inline-block;
        }
        .cl-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .cl-field { display: flex; flex-direction: column; gap: 6px; }
        .cl-field label { font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
        .cl-input {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s;
        }
        .cl-input:focus { border-color: #F59E0B; background: #fff; }
        .cl-input::placeholder { color: #94a3b8; }
        .cl-file-zone {
          border: 1px dashed #e2e8f0; border-radius: 10px; padding: 1.25rem;
          display: flex; align-items: center; gap: 1rem; background: #f8fafc;
          cursor: pointer; transition: border-color 0.15s;
        }
        .cl-file-zone:hover { border-color: #F59E0B; }
        .cl-file-icon {
          width: 40px; height: 40px; background: #FEF3C7; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cl-file-input { display: none; }
        .cl-file-label { font-size: 14px; color: #64748b; }
        .cl-file-label span { color: #B45309; font-weight: 500; }
        .cl-preview-wrap { margin-top: 0.75rem; }
        .cl-preview-img { height: 100px; width: 160px; object-fit: cover; border-radius: 8px; border: 0.5px solid #e2e8f0; }
        .cl-form-footer { margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; }
        .cl-btn-add {
          background: #0F172A; color: #fff; border: none;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 6px;
          transition: background 0.15s;
        }
        .cl-btn-add:hover { background: #1e293b; }
        .cl-btn-add:disabled { opacity: 0.5; cursor: not-allowed; }

        /* SECTION TITLE */
        .cl-section-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .cl-section-title {
          font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700;
          color: #0F172A; letter-spacing: -0.3px;
        }
        .cl-count-badge {
          background: #FEF3C7; color: #B45309; font-size: 12px; font-weight: 600;
          padding: 3px 10px; border-radius: 100px;
        }

        /* CLIENT CARDS */
        .cl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .cl-card {
          background: #fff; border: 0.5px solid #e2e8f0; border-radius: 14px;
          overflow: hidden; transition: box-shadow 0.15s;
        }
        .cl-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .cl-card-img { width: 100%; height: 160px; object-fit: cover; display: block; border-bottom: 0.5px solid #e2e8f0; }
        .cl-card-img-placeholder {
          width: 100%; height: 160px; background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 0.5px solid #e2e8f0;
        }
        .cl-card-body { padding: 1.25rem; }
        .cl-card-name {
          font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700;
          color: #0F172A; margin-bottom: 0.75rem; letter-spacing: -0.3px;
        }
        .cl-card-row {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; color: #64748b; margin-bottom: 5px;
        }
        .cl-card-row svg { flex-shrink: 0; color: #94a3b8; }
        .cl-card-footer {
          padding: 0.85rem 1.25rem; border-top: 0.5px solid #e2e8f0;
          display: flex; justify-content: flex-end;
        }
        .cl-btn-delete {
          background: transparent; color: #ef4444; border: 0.5px solid #fecaca;
          padding: 0.4rem 0.9rem; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: background 0.15s;
          display: flex; align-items: center; gap: 5px; margin-right : 110px;
        }
        .cl-btn-delete:hover { background: #fef2f2; }

        /* TASK ALERT */
        .cl-task-alert {
          background: #f8fafc; border-top: 0.5px solid #e2e8f0;
          padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;
        }
        .cl-task-text {
          font-size: 13px; color: #64748b; display: flex; align-items: center; gap: 6px; font-weight: 500;
        }
        .cl-btn-confirm {
          background: #16a34a; color: #fff; border: none;
          padding: 0.5rem 1rem; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: background 0.15s; width: 100%;
        }
        .cl-btn-confirm:hover { background: #15803d; }

        .cl-btn-view {
          background: #f1f5f9; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.5rem 1rem; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: background 0.15s; width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .cl-btn-view:hover { background: #ffffff; }

        /* MODAL */
        .cl-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
          display: flex; justify-content: center; align-items: center; z-index: 999;
          padding: 1rem;
        }
        .cl-modal {
          background: #fff; border-radius: 16px; width: 100%; max-width: 500px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }
        .cl-modal-header {
          padding: 1.5rem; border-bottom: 0.5px solid #e2e8f0;
          display: flex; justify-content: space-between; align-items: center;
        }
        .cl-modal-title {
          font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700;
          color: #0F172A; margin: 0; letter-spacing: -0.3px;
        }
        .cl-btn-close-icon {
          background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          color: #64748b; transition: all 0.15s;
        }
        .cl-btn-close-icon:hover { background: #e2e8f0; color: #0F172A; }
        .cl-modal-body { padding: 1.5rem; max-height: 70vh; overflow-y: auto; }
        .cl-modal-section { margin-bottom: 1.5rem; }
        .cl-modal-section:last-child { margin-bottom: 0; }
        .cl-modal-label {
          font-size: 12px; font-weight: 600; color: #64748b; letter-spacing: 0.5px;
          text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;
        }
        .cl-modal-list {
          list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem;
        }
        .cl-modal-list li {
          font-size: 14px; color: #0F172A; display: flex; align-items: flex-start; gap: 8px;
        }
        .cl-modal-list li::before {
          content: ''; width: 6px; height: 6px; background: #F59E0B; border-radius: 50%;
          margin-top: 6px; flex-shrink: 0;
        }
        .cl-modal-text { font-size: 14px; color: #0F172A; line-height: 1.5; margin: 0; }
        .cl-modal-footer {
          padding: 1.25rem 1.5rem; border-top: 0.5px solid #e2e8f0; background: #f8fafc;
          display: flex; justify-content: flex-end;
        }
        .cl-btn-close {
          background: #fff; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.6rem 1.25rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
        }
        .cl-btn-close:hover { background: #f1f5f9; border-color: #cbd5e1; }

        .cl-empty {
          grid-column: 1 / -1; text-align: center; padding: 4rem 0;
          color: #94a3b8; font-size: 15px;
        }
        .cl-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }

        @media (max-width: 900px) {
          .cl-grid { grid-template-columns: 1fr 1fr; }
          .cl-form-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .cl-grid { grid-template-columns: 1fr; }
          .cl-page { padding: 1.5rem 1rem; }
        }
      `}</style>

      <div className="cl-page">


        <div className="cl-header">
          <div className="cl-header-eyebrow">Client Management</div>
          <h1>Clients</h1>
          <p>Manage your solar panel client information and panel images.</p>
        </div>


        <div className="cl-form-card">
          <div className="cl-form-title">
            <span className="cl-form-title-dot"></span>
            Add New Client
          </div>

          <div className="cl-form-grid">
            <div className="cl-field">
              <label>Full Name</label>
              <input
                className="cl-input"
                name="name"
                placeholder="e.g. John Mathew"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="cl-field">
              <label>Phone Number</label>
              <input
                className="cl-input"
                name="phone"
                placeholder="e.g. +91 98765 43210"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="cl-field">
              <label>Email Address</label>
              <input
                className="cl-input"
                name="email"
                placeholder="e.g. john@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="cl-field" style={{ gridColumn: "1 / -1" }}>
              <label>Select Location From Map</label>

              <MapContainer
                center={position}
                zoom={13}
                style={{
                  height: "350px",
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <LayersControl position="topright">


                  <LayersControl.BaseLayer checked name="Street Map">
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer>


                  <LayersControl.BaseLayer name="Satellite View">
                    <TileLayer
                      attribution='&copy; Esri'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                  </LayersControl.BaseLayer>

                </LayersControl>

                <LocationPicker />
              </MapContainer>

              <input
                className="cl-input"
                value={form.location}
                readOnly
                style={{ marginTop: "10px" }}
                placeholder="Selected location "
              />
            </div>



            <div className="cl-field" style={{ gridColumn: "1 / -1" }}>
              <label>Solar Panel Image</label>
              <label className="cl-file-zone" htmlFor="cl-file-input">
                <div className="cl-file-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="cl-file-label">
                  {form.image ? form.image.name : <><span>Click to upload</span> a solar panel image</>}
                </div>
              </label>
              <input id="cl-file-input" className="cl-file-input" type="file" onChange={handleFile} />
              {preview && (
                <div className="cl-preview-wrap">
                  <img src={preview} alt="preview" className="cl-preview-img" />
                </div>
              )}
            </div>
          </div>

          <div className="cl-form-footer">
            <button className="cl-btn-add" onClick={addClient} disabled={loading}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {loading ? "Adding..." : "Add Client"}
            </button>
          </div>
        </div>


        <div className="cl-section-head">
          <div className="cl-section-title">Clients List</div>
          <span className="cl-count-badge">{clients.length} clients</span>
        </div>

        <div className="cl-grid">
          {clients.length === 0 && (
            <div className="cl-empty">
              <div className="cl-empty-icon">👥</div>
              No clients yet. Add your first client above.
            </div>
          )}

          {clients.map((c) => (
            <div key={c._id} className="cl-card">
              {c.image ? (
                <img src={`${BASE}/uploads/${c.image}`} alt="solar" className="cl-card-img" />
              ) : (
                <div className="cl-card-img-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}

              <div className="cl-card-body">
                <div className="cl-card-name">{c.name}</div>

                <div className="cl-card-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.1 3.4 2 2 0 0 1 3.1 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
                  </svg>
                  {c.phone}
                </div>

                <div className="cl-card-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                  {c.email}
                </div>

                <div className="cl-card-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {c.location}
                </div>
              </div>



              {tasks
                .filter(
                  (task) =>
                    task.client?._id === c._id &&
                    task.status === "waiting"
                )
                .map((task) => (
                  <div key={task._id} className="cl-task-alert">
                    <div className="cl-task-text">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Cleaning waiting for confirmation
                    </div>
                    <button className="cl-btn-confirm" onClick={() => confirmTask(task._id)}>
                      Confirm Completion
                    </button>
                  </div>
                ))}

    {tasks
  .filter(
    (task) =>
      task.client?._id === c._id &&
      task.jobCard &&
      (
        task.status === "waiting" ||
        task.status === "completed"
      )
  )
  .map((task) => (
    <div
      key={task._id}
      className="cl-task-alert"
      style={{
        borderTop: "none",
        paddingTop: 0
      }}
    >

      <button
        className="cl-btn-view"
        onClick={() => {

          setSelectedJobCard(task.jobCard);

          setShowViewModal(true);

        }}
      >

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        View Job Card

      </button>

    </div>
))}

              <div className="cl-card-footer">
                <button className="cl-btn-delete" onClick={() => deleteClient(c._id)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showViewModal && selectedJobCard && (
        <div className="cl-modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cl-modal-header">
              <h2 className="cl-modal-title">Job Card Details</h2>
              <button className="cl-btn-close-icon" onClick={() => setShowViewModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="cl-modal-body">
              {selectedJobCard.servicesDone && selectedJobCard.servicesDone.length > 0 && (
                <div className="cl-modal-section">
                  <div className="cl-modal-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Services Done
                  </div>
                  <ul className="cl-modal-list">
                    {selectedJobCard.servicesDone.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJobCard.complaints && selectedJobCard.complaints.length > 0 && (
                <div className="cl-modal-section">
                  <div className="cl-modal-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    Complaints
                  </div>
                  <ul className="cl-modal-list">
                    {selectedJobCard.complaints.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJobCard.remarks && (
                <div className="cl-modal-section">
                  <div className="cl-modal-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Remarks
                  </div>
                  <p className="cl-modal-text">{selectedJobCard.remarks}</p>
                </div>
              )}

              {selectedJobCard.completedBy && (
                <div className="cl-modal-section">
                  <div className="cl-modal-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Completed By
                  </div>
                  <p className="cl-modal-text">{selectedJobCard.completedBy}</p>
                </div>
              )}
            </div>

            <div className="cl-modal-footer">
              <button className="cl-btn-close" onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}