import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from "../Components/Loader";
import { getClients, createQuotation } from "../services/api";
import { pdf } from '@react-pdf/renderer';
import SolarProposalPDF, { getBlackLogo } from "./SolarProposalPDF";
import companyLogo from "../assets/companylogo.png";

// Leaflet styles or markers are not required for this form, keeping it clean and responsive.
export default function CreateQuotation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  // PDF Preview modal state
  const [previewQuotation, setPreviewQuotation] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [blackLogo, setBlackLogo] = useState(null);

  // Form State
  const [form, setForm] = useState({
    client: "",
    customerName: "",
    phone: "",
    email: "",
    location: "",
    capacity: "5",
    inverter: "Solis Grid-Tie Inverter", // standard defaults
    panelType: "Mono PERC Half-Cut Bifacial Panels",
    moduleCompany: "Waaree Energies",
    projectSite: "Residential Rooftop",
    district: "Kozhikode",
    systemType: "4.2KW On-Grid system",
    moduleCapacity: "4200Wp",
    moduleArea: "378Sqft",
    eachModuleCapacity: "600",
    inverterCapacity: "5000 watts",
    inverterModel: "STS-5KTL",
    inverterTotalling: "30% overloading",
    wifiLogger: "Web connect- Data storage and online monitoring",
    dcdb: "Mersen/Finder SPD- 600V – 1 nos & Havells/Chint MCB 16 A 500v- 1 nos , Havells 30 A 1000vdc Fuse –1 nos",
    acdb: "Mersen /Finder AC SPD 320V & L&T/ABB/Havells C32 - 400V",
    dcCable: "60 Mtr( Microtek/Polycab)",
    acCable: "30 Mtr( Microtek/Vguard)",
    mountingStructure: "OPEN TERRACE BASIC STRUCTURE IS CONSIDERED",
    anchorBolt: "CIPY Epoxy + Anchor Bolt",
    isolator: "32 A – L&T / ABB/Havells",
    pvBolt: "Stainless steel Nut & Bolt",
    meterBox: "1 Nos",
    earthingLA: "Excel Earthings",
    copperWire: "10 SWG",
    conduitFitting: "Ivory /Black ISI",
    systemCost: "",
    subsidy: "",
    registrationFee: "6500", // standard default
    totalAmount: 0
  });

  // Fetch all clients on load
  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        setLoading(true);
        const res = await getClients();
        setClients(res.data.data || []);
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to load clients. Please check connection.",
          icon: "error"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchClientsData();

    if (companyLogo) {
      getBlackLogo(companyLogo).then((inverted) => {
        setBlackLogo(inverted);
      }).catch(err => {
        console.error("Failed to generate black logo:", err);
      });
    }
  }, []);

  // Handle Client selection dropdown change
  const handleClientChange = (e) => {
    const clientId = e.target.value;
    if (!clientId) {
      setForm((prev) => ({
        ...prev,
        client: "",
        customerName: "",
        phone: "",
        email: "",
        location: ""
      }));
      return;
    }

    const selectedClient = clients.find(c => c._id === clientId);
    if (selectedClient) {
      setForm((prev) => ({
        ...prev,
        client: clientId,
        customerName: selectedClient.name || "",
        phone: selectedClient.phone || "",
        email: selectedClient.email || "",
        location: selectedClient.location || ""
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate specifications based on Capacity input
      if (name === "capacity") {
        const cap = parseFloat(value) || 0;
        updated.systemType = cap ? `${cap}KW On-Grid system` : "";
        updated.moduleCapacity = cap ? `${cap * 1000}Wp` : "";
        updated.moduleArea = cap ? `${cap * 90}Sqft` : "";
        updated.inverterCapacity = cap ? `${Math.ceil(cap) * 1000} watts` : "";
        updated.inverterModel = cap ? `STS-${Math.ceil(cap)}KTL` : "";
      }

      // Auto-calculate Total Amount if money inputs change
      if (name === "systemCost" || name === "subsidy" || name === "registrationFee") {
        const cost = parseFloat(updated.systemCost) || 0;
        const fee = parseFloat(updated.registrationFee) || 0;
        updated.totalAmount = Math.max(0, cost + fee);
      }
      return updated;
    });
  };

  // Validation function
  const validateForm = () => {
    const {
      client,
      customerName,
      phone,
      email,
      location,
      capacity,
      inverter,
      panelType,
      moduleCompany,
      projectSite,
      district,
      systemType,
      moduleCapacity,
      moduleArea,
      eachModuleCapacity,
      inverterCapacity,
      inverterModel,
      systemCost,
      subsidy,
      registrationFee
    } = form;

    if (
      !client ||
      !customerName ||
      !phone ||
      !email ||
      !location ||
      !capacity ||
      !inverter ||
      !panelType ||
      !moduleCompany ||
      !projectSite ||
      !district ||
      !systemType ||
      !moduleCapacity ||
      !moduleArea ||
      !eachModuleCapacity ||
      !inverterCapacity ||
      !inverterModel ||
      systemCost === "" ||
      subsidy === "" ||
      registrationFee === ""
    ) {
      Swal.fire({
        text: "Please fill out all fields before proceeding.",
        icon: "warning",
        confirmButtonColor: "#316398"
      });
      return false;
    }
    return true;
  };

  // Save Quotation to database helper
  const saveQuotationToDB = async () => {
    if (!validateForm()) return null;
    try {
      setLoading(true);
      const res = await createQuotation({
        ...form,
        capacity: parseFloat(form.capacity),
        systemCost: parseFloat(form.systemCost),
        subsidy: parseFloat(form.subsidy),
        registrationFee: parseFloat(form.registrationFee),
        totalAmount: parseFloat(form.totalAmount)
      });
      return res.data.data; // returns populated quotation details with quotationNo
    } catch (err) {
      console.error("Save Quotation Error:", err);
      console.log("Detailed Server Error Payload:", err.response?.data);
      Swal.fire({
        title: "Error Saving Quotation",
        text: err.response?.data?.message || "Something went wrong on the server.",
        icon: "error"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Button Action: Save Only
  const handleSaveOnly = async () => {
    await saveQuotationToDB();

    Swal.fire({
      title: "Saved!",
      text: `Quotation saved successfully!`,
      icon: "success",
      confirmButtonColor: "#316398"
    });

    navigate("/quotations/history");
  };

  // Button Action: Generate PDF (opens a blob URL in a new tab)
const handleGeneratePDF = async () => {
  try {
    setLoading(true);

    const blob = await pdf(
      <SolarProposalPDF
        data={form}
        logo={blackLogo || companyLogo}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

  } catch (err) {
    console.error("PDF Error:", err);

    Swal.fire({
      title: "PDF Error",
      text: err.message || "Failed to compile PDF document.",
      icon: "error"
    });
  } finally {
    setLoading(false);
  }
};
  // Button Action: Generate & Download PDF
  const handleDownloadPDF = async () => {
  try {
    setLoading(true);

    const blob = await pdf(
      <SolarProposalPDF
        data={form}
        logo={blackLogo || companyLogo}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Solar_Proposal.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setLoading(false);

    await Swal.fire({
      title: "Downloaded!",
      text: "Solar proposal PDF downloaded successfully.",
      icon: "success",
      confirmButtonColor: "#316398"
    });


  } catch (err) {
    setLoading(false);

    console.error("Download Error:", err);

    Swal.fire({
      title: "Download Failed",
      text: err.message || "Could not generate file download.",
      icon: "error"
    });
  }
};

  if (loading && clients.length === 0) {
    return <Loader message="Loading quotation form data..." />;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .q-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        .q-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end; }
        .q-header-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #316398; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .q-header-eyebrow::before { content: ''; width: 16px; height: 1px; background: #316398; display: inline-block; }
        .q-header h1 {
          font-family: 'Outfit', sans-serif; font-size: 2.75rem; font-weight: 800;
          color: #0F172A; letter-spacing: -1px; margin: 0;
        }
        .q-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        .q-btn-list-nav {
          background: #f1f5f9; color: #0F172A; border: 0.5px solid #e2e8f0;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: background 0.15s; text-decoration: none;
        }
        .q-btn-list-nav:hover { background: #cbd5e1; }

        /* FORM CARD */
        .q-form-card {
          background: #fff; border: 0.5px solid #e2e8f0;
          border-radius: 16px; padding: 2.5rem; margin-bottom: 2.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .q-form-section-title {
          font-family: 'Outfit', sans-serif; font-size: 1.15rem; font-weight: 700;
          color: #316398; margin-top: 1.5rem; margin-bottom: 1rem;
          display: flex; align-items: center; gap: 8px;
        }
        .q-form-section-title::after {
          content: ''; flex: 1; height: 1px; background: #f1f5f9; margin-left: 8px;
        }
        .q-form-title {
          font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700;
          color: #0F172A; letter-spacing: -0.3px; margin-bottom: 1.5rem;
          padding-bottom: 1rem; border-bottom: 0.5px solid #e2e8f0;
          display: flex; align-items: center; gap: 8px;
        }
        .q-form-title-dot {
          width: 8px; height: 8px; background: #4596ab; border-radius: 50%; display: inline-block;
        }
        .q-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .q-form-grid-three { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; }
        .q-field { display: flex; flex-direction: column; gap: 6px; }
        .q-field label { font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
        
        .q-select, .q-input {
          border: 0.5px solid #e2e8f0; padding: 0.65rem 0.9rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0F172A;
          background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s;
          width: 100%;
        }
        .q-select:focus, .q-input:focus { border-color: #4596ab; background: #fff; }
        .q-input:disabled { background: #f1f5f9; color: #64748b; cursor: not-allowed; }
        .q-input::placeholder { color: #94a3b8; }
        
        .q-form-footer {
          margin-top: 2.5rem;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid #f1f5f9;
          padding-top: 1.5rem;
        }

        .q-btn-primary {
          background: #316398; color: #fff; border: none;
          padding: 0.75rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.15s;
        }
        .q-btn-primary:hover { background: #1e3f60; }

        .q-btn-secondary {
          background: #4596ab; color: #fff; border: none;
          padding: 0.75rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.15s;
        }
        .q-btn-secondary:hover { background: #377d8e; }

        .q-btn-outline {
          background: #fff; color: #0F172A; border: 0.5px solid #cbd5e1;
          padding: 0.75rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.15s;
        }
        .q-btn-outline:hover { background: #f8fafc; border-color: #94a3b8; }
        
        .q-total-card {
          grid-column: 1 / -1;
          background: #ebf4fa;
          border: 1px dashed #316398;
          border-radius: 10px;
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }
        .q-total-label { font-size: 15px; font-weight: 700; color: #316398; }
        .q-total-value { font-size: 20px; font-weight: 800; color: #316398; font-family: 'Outfit', sans-serif; }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 900px) {
          .q-form-grid { grid-template-columns: 1fr; }
          .q-form-grid-three { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .q-page { padding: 1.5rem 1rem; }
          .q-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .q-form-footer { flex-direction: column; width: 100%; }
          .q-form-footer button { width: 100%; }
        }
      `}</style>

      {loading && <Loader message="Processing request..." fullPage={true} />}

      <div className="q-page fade-in">
        <div className="q-header">
          <div>
            <div className="q-header-eyebrow">Quotation Management</div>
            <h1>Create Quotation</h1>
            <p>Generate highly professional solar PV project proposals for your clients.</p>
          </div>
          <button className="q-btn-list-nav" onClick={() => navigate("/quotations/history")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            Quotation History
          </button>
        </div>

        <div className="q-form-card">
          <div className="q-form-title">
            <span className="q-form-title-dot"></span>
            Proposal Quotation Form
          </div>

          {/* Section: Client Selection */}
          <div className="q-form-section-title">Client Details</div>
          <div className="q-form-grid" style={{ marginBottom: "1.5rem" }}>
            <div className="q-field" style={{ gridColumn: "1 / -1" }}>
              <label>Select Associated Client</label>
              <select className="q-select" value={form.client} onChange={handleClientChange}>
                <option value="">-- Choose Client --</option>
                {clients.map(c => (
                  <option key={c._id} value={c._id}>{c.name} ({c.phone})</option>
                ))}
              </select>
            </div>

            <div className="q-field">
              <label>Customer Name</label>
              <input
                className="q-input"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="Client name (Autofilled)"
                disabled={!!form.client}
              />
            </div>

            <div className="q-field">
              <label>Phone Number</label>
              <input
                className="q-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number (Autofilled)"
                disabled={!!form.client}
              />
            </div>

            <div className="q-field">
              <label>Email Address</label>
              <input
                className="q-input"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address (Autofilled)"
                disabled={!!form.client}
              />
            </div>

            <div className="q-field">
              <label>Project Location</label>
              <input
                className="q-input"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location (Autofilled)"
                disabled={!!form.client}
              />
            </div>
          </div>

          {/* Section: Solar Tech Details */}
          <div className="q-form-section-title">Technical Specifications</div>
          <div className="q-form-grid" style={{ marginBottom: "1.5rem" }}>
            <div className="q-field">
              <label>Capacity (KWp)</label>
              <input
                className="q-input"
                type="number"
                step="0.01"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g. 5"
              />
            </div>

            <div className="q-field">
              <label>Inverter Specifications</label>
              <input
                className="q-input"
                name="inverter"
                value={form.inverter}
                onChange={handleChange}
                placeholder="e.g. Solis Grid-Tie Inverter"
              />
            </div>

            <div className="q-field">
              <label>PV Module / Panel Type</label>
              <input
                className="q-input"
                name="panelType"
                value={form.panelType}
                onChange={handleChange}
                placeholder="e.g. Mono PERC Half-Cut Bifacial"
              />
            </div>

            <div className="q-field">
              <label>Module Brand / Company</label>
              <input
                className="q-input"
                name="moduleCompany"
                value={form.moduleCompany}
                onChange={handleChange}
                placeholder="e.g. Waaree Energies"
              />
            </div>

            <div className="q-field">
              <label>Project Site Type</label>
              <input
                className="q-input"
                name="projectSite"
                value={form.projectSite}
                onChange={handleChange}
                placeholder="e.g. Residential Rooftop"
              />
            </div>

            <div className="q-field">
              <label>District</label>
              <input
                className="q-input"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="e.g. Kozhikode"
              />
            </div>

            <div className="q-field">
              <label>Type of System</label>
              <input
                className="q-input"
                name="systemType"
                value={form.systemType}
                onChange={handleChange}
                placeholder="e.g. 4.2KW On-Grid system"
              />
            </div>

            <div className="q-field">
              <label>Proposed PV Capacity</label>
              <input
                className="q-input"
                name="moduleCapacity"
                value={form.moduleCapacity}
                onChange={handleChange}
                placeholder="e.g. 4200Wp"
              />
            </div>

            <div className="q-field">
              <label>Projected Module Area</label>
              <input
                className="q-input"
                name="moduleArea"
                value={form.moduleArea}
                onChange={handleChange}
                placeholder="e.g. 378Sqft"
              />
            </div>

            <div className="q-field">
              <label>Capacity of Each Module</label>
              <input
                className="q-input"
                name="eachModuleCapacity"
                value={form.eachModuleCapacity}
                onChange={handleChange}
                placeholder="e.g. 600"
              />
            </div>

            <div className="q-field">
              <label>Inverter Capacity</label>
              <input
                className="q-input"
                name="inverterCapacity"
                value={form.inverterCapacity}
                onChange={handleChange}
                placeholder="e.g. 5000 watts"
              />
            </div>

            <div className="q-field">
              <label>Inverter Model and Capacity</label>
              <input
                className="q-input"
                name="inverterModel"
                value={form.inverterModel}
                onChange={handleChange}
                placeholder="e.g. STS-5KTL"
              />
            </div>
          </div>

          {/* Section: System Components */}
          <div className="q-form-section-title">System Components (Bill of Materials)</div>
          <div className="q-form-grid" style={{ marginBottom: "1.5rem" }}>
            <div className="q-field">
              <label>Inverter Totalling</label>
              <input
                className="q-input"
                name="inverterTotalling"
                value={form.inverterTotalling}
                onChange={handleChange}
                placeholder="e.g. 30% overloading"
              />
            </div>

            <div className="q-field">
              <label>WIFI Data Logger</label>
              <input
                className="q-input"
                name="wifiLogger"
                value={form.wifiLogger}
                onChange={handleChange}
                placeholder="e.g. Web connect- Data storage..."
              />
            </div>

            <div className="q-field">
              <label>DCDB</label>
              <input
                className="q-input"
                name="dcdb"
                value={form.dcdb}
                onChange={handleChange}
                placeholder="e.g. Mersen/Finder SPD..."
              />
            </div>

            <div className="q-field">
              <label>ACDB</label>
              <input
                className="q-input"
                name="acdb"
                value={form.acdb}
                onChange={handleChange}
                placeholder="e.g. Mersen /Finder AC SPD..."
              />
            </div>

            <div className="q-field">
              <label>DC Cable / Wire</label>
              <input
                className="q-input"
                name="dcCable"
                value={form.dcCable}
                onChange={handleChange}
                placeholder="e.g. 60 Mtr( Microtek/Polycab)"
              />
            </div>

            <div className="q-field">
              <label>AC Cable / Wire</label>
              <input
                className="q-input"
                name="acCable"
                value={form.acCable}
                onChange={handleChange}
                placeholder="e.g. 30 Mtr( Microtek/Vguard)"
              />
            </div>

            <div className="q-field">
              <label>Module Mounting Structure</label>
              <input
                className="q-input"
                name="mountingStructure"
                value={form.mountingStructure}
                onChange={handleChange}
                placeholder="e.g. OPEN TERRACE BASIC STRUCTURE..."
              />
            </div>

            <div className="q-field">
              <label>Anchor Bolt M8</label>
              <input
                className="q-input"
                name="anchorBolt"
                value={form.anchorBolt}
                onChange={handleChange}
                placeholder="e.g. CIPY Epoxy + Anchor Bolt"
              />
            </div>

            <div className="q-field">
              <label>Isolator</label>
              <input
                className="q-input"
                name="isolator"
                value={form.isolator}
                onChange={handleChange}
                placeholder="e.g. 32 A – L&T / ABB/Havells"
              />
            </div>

            <div className="q-field">
              <label>PV Mounting Bolt</label>
              <input
                className="q-input"
                name="pvBolt"
                value={form.pvBolt}
                onChange={handleChange}
                placeholder="e.g. Stainless steel Nut & Bolt"
              />
            </div>

            <div className="q-field">
              <label>Meter Box</label>
              <input
                className="q-input"
                name="meterBox"
                value={form.meterBox}
                onChange={handleChange}
                placeholder="e.g. 1 Nos"
              />
            </div>

            <div className="q-field">
              <label>Earthing Rod & LA</label>
              <input
                className="q-input"
                name="earthingLA"
                value={form.earthingLA}
                onChange={handleChange}
                placeholder="e.g. Excel Earthings"
              />
            </div>

            <div className="q-field">
              <label>Copper Wire</label>
              <input
                className="q-input"
                name="copperWire"
                value={form.copperWire}
                onChange={handleChange}
                placeholder="e.g. 10 SWG"
              />
            </div>

            <div className="q-field">
              <label>Conduit & Fitting</label>
              <input
                className="q-input"
                name="conduitFitting"
                value={form.conduitFitting}
                onChange={handleChange}
                placeholder="e.g. Ivory /Black ISI"
              />
            </div>
          </div>

          {/* Section: Costing */}
          <div className="q-form-section-title">Commercial costing details</div>
          <div className="q-form-grid-three">
            <div className="q-field">
              <label>System Cost (INR)</label>
              <input
                className="q-input"
                type="number"
                name="systemCost"
                value={form.systemCost}
                onChange={handleChange}
                placeholder="e.g. 350000"
              />
            </div>

            <div className="q-field">
              <label>Govt Subsidy (INR)</label>
              <input
                className="q-input"
                type="number"
                name="subsidy"
                value={form.subsidy}
                onChange={handleChange}
                placeholder="e.g. 78000"
              />
            </div>

            <div className="q-field">
              <label>Registration & Connection Fee (INR)</label>
              <input
                className="q-input"
                type="number"
                name="registrationFee"
                value={form.registrationFee}
                onChange={handleChange}
                placeholder="e.g. 6500"
              />
            </div>

            <div className="q-total-card">
              <span className="q-total-label">Net Payable Total Amount:</span>
              <span className="q-total-value">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(form.totalAmount)}
              </span>
            </div>
          </div>

          <div className="q-form-footer">
            <button className="q-btn-outline" onClick={handleSaveOnly}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Quotation
            </button>

            <button className="q-btn-secondary" onClick={handleGeneratePDF}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Generate PDF (Preview)
            </button>

            <button className="q-btn-primary" onClick={handleDownloadPDF}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Generate & Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
