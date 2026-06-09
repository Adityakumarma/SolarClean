import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../services/api";
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


export default function Clients() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState([11.2588, 75.7804]);

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

    if (form.image) {
      formData.append("image", form.image);
    }

   const res = await createClient(formData);

    Swal.fire({
      icon: "success",
      title: "Client Added Successfully",
      text:
        "Customer can login using their email and default password 'sunbird'"
    });

    setForm({
      name: "",
      phone: "",
      email: "",
      location: "",
      image: null
    });

    setPreview(null);

    navigate("/clients-list");

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Failed",
      text:
        err.response?.data?.message ||
        "Unable to create client"
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .cl-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        .cl-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end; }
        .cl-header-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #316398; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .cl-header-eyebrow::before { content: ''; width: 16px; height: 1px; background: #316398; display: inline-block; }
        .cl-header h1 {
          font-family: 'Outfit', sans-serif; font-size: 2.75rem; font-weight: 800;
          color: #0F172A; letter-spacing: -1px; margin: 0;
        }
        .cl-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        .cl-btn-list-nav {
          background: #f1f5f9; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: background 0.15s; text-decoration: none;
        }
        .cl-btn-list-nav:hover { background: #cbd5e1; }

        /* FORM CARD */
        .cl-form-card {
          background: #fff; border: 0.5px solid #e2e8f0;
          border-radius: 16px; padding: 2rem; margin-bottom: 2.5rem;
        }
        .cl-form-title {
          font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700;
          color: #0F172A; letter-spacing: -0.3px; margin-bottom: 1.5rem;
          padding-bottom: 1rem; border-bottom: 0.5px solid #e2e8f0;
          display: flex; align-items: center; gap: 8px;
        }
        .cl-form-title-dot {
          width: 8px; height: 8px; background: #4596ab; border-radius: 50%; display: inline-block;
        }
        .cl-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .cl-field { display: flex; flex-direction: column; gap: 6px; }
        .cl-field label { font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
        .cl-input {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s;
        }
        .cl-input:focus { border-color: #4596ab; background: #fff; }
        .cl-input::placeholder { color: #94a3b8; }
        .cl-file-zone {
          border: 1px dashed #e2e8f0; border-radius: 10px; padding: 1.25rem;
          display: flex; align-items: center; gap: 1rem; background: #f8fafc;
          cursor: pointer; transition: border-color 0.15s;
        }
        .cl-file-zone:hover { border-color: #4596ab; }
        .cl-file-icon {
          width: 40px; height: 40px; background: #ebf4fa; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cl-file-input { display: none; }
        .cl-file-label { font-size: 14px; color: #64748b; }
        .cl-file-label span { color: #316398; font-weight: 500; }
        .cl-preview-wrap { margin-top: 0.75rem; }
        .cl-preview-img { height: 100px; width: 160px; object-fit: cover; border-radius: 8px; border: 0.5px solid #e2e8f0; }
        .cl-form-footer {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          border-top: 1px solid #f1f5f9;
          padding-top: 1.5rem;
        }
        .cl-btn-add {
          background: #316398; color: #fff; border: none;
          padding: 0.7rem 1.4rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.15s;
        }
        .cl-btn-add:hover {
          background: #4596ab;
        }
        .cl-btn-add:disabled { opacity: 0.5; cursor: not-allowed; }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 900px) {
          .cl-form-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .cl-page { padding: 1.5rem 1rem; }
          .cl-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      <div className="cl-page fade-in">
        <div className="cl-header">
          <div>
            <div className="cl-header-eyebrow">Client Management</div>
            <h1>Add Client</h1>
            <p>Manage your solar panel client information and panel images.</p>
          </div>
          <button className="cl-btn-list-nav" onClick={() => navigate("/clients-list")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            View Clients List
          </button>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#316398" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      </div>
    </div>
  );
}