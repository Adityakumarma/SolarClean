import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from "../Components/Loader";
import { getQuotations, deleteQuotation } from "../services/api";
import { pdf } from '@react-pdf/renderer';
import SolarProposalPDF, { getBlackLogo } from "./SolarProposalPDF";
import companyLogo from "../assets/companylogo.png";

export default function QuotationHistory() {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blackLogo, setBlackLogo] = useState(null);

  // Fetch all quotations from backend
  const fetchQuotationsList = async () => {
    try {
      setLoading(true);
      const res = await getQuotations();
      setQuotations(res.data);
    } catch (err) {
      console.error("Load Quotations Error:", err);
      console.log("Detailed Server Error Payload:", err.response?.data);
      Swal.fire({
        title: "Failed to load quotations",
        text: err.response?.data?.message || "Check your backend connection.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotationsList();

    if (companyLogo) {
      getBlackLogo(companyLogo).then((inverted) => {
        setBlackLogo(inverted);
      }).catch(err => {
        console.error("Failed to generate black logo:", err);
      });
    }
  }, []);

  // Action: Delete Quotation
  const handleDelete = async (id, quotationNo) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: ` This cannot be reverted.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        setLoading(true);
        await deleteQuotation(id);
        Swal.fire({
          title: "Deleted!",
          text: "Quotation has been removed successfully!",
          icon: "success",
          confirmButtonColor: "#316398"
        });
        fetchQuotationsList();
      }
    } catch (err) {
      console.error("Delete Quotation Error:", err);
      console.log("Detailed Server Error Payload:", err.response?.data);
      Swal.fire({
        title: "Failed to delete",
        text: err.response?.data?.message || "Could not remove quotation. Please try again.",
        icon: "error"
      });
      setLoading(false);
    }
  };

  // Action: View PDF (opens in new tab)
  const handleViewPDF = async (quotation) => {
    try {
      setLoading(true);
      const blob = await pdf(<SolarProposalPDF data={quotation} logo={blackLogo} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Could not generate PDF for preview.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Action: Download PDF
  const handleDownloadPDF = async (quotation) => {
    try {
      setLoading(true);
      const blob = await pdf(<SolarProposalPDF data={quotation} logo={blackLogo} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Solar_Proposal_${quotation.quotationNo}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      Swal.fire({
        title: "Downloaded!",
        text: "PDF proposal file downloaded successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Download failed",
        text: "Could not download solar proposal document.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && quotations.length === 0) {
    return <Loader message="Fetching quotation history..." />;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .qh-page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem; }

        .qh-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 0.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end; }
        .qh-header-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #316398; display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;
        }
        .qh-header-eyebrow::before { content: ''; width: 16px; height: 1px; background: #316398; display: inline-block; }
        .qh-header h1 {
          font-family: 'Outfit', sans-serif; font-size: 2.75rem; font-weight: 800;
          color: #0F172A; letter-spacing: -1px; margin: 0;
        }
        .qh-header p { font-size: 14px; color: #64748b; margin: 0.4rem 0 0 0; }

        .qh-btn-add-nav {
          background: #316398; color: #fff; border: none;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; gap: 6px;
          transition: background 0.15s; text-decoration: none;
        }
        .qh-btn-add-nav:hover { background: #4596ab; }

        /* TABLE CONTAINER */
        .qh-table-container {
          background: #fff;
          border: 0.5px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          margin-bottom: 2rem;
          max-width: 100%;
          overflow-x: auto;
        }
        .qh-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .qh-table th {
          background: #f8fafc;
          padding: 1.1rem 1.5rem;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }
        .qh-table td {
          padding: 1.1rem 1.5rem;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .qh-table tr:last-child td { border-bottom: none; }
        .qh-table tr:hover td { background: #f8fafc; }

        .qh-no-badge {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          color: #316398;
          font-size: 13.5px;
        }
        
        .qh-client-name {
          font-weight: 500;
          color: #0f172a;
        }

        .qh-capacity-badge {
          background: #ebf4fa;
          color: #316398;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          display: inline-block;
        }

        .qh-amount-value {
          font-weight: 600;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
        }

        .qh-actions-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ACTIONS BUTTONS */
        .qh-btn-action {
          border: 0.5px solid #cbd5e1;
          background: #fff;
          color: #475569;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.15s;
        }
        .qh-btn-action:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }

        .qh-btn-delete {
          color: #ef4444;
          border-color: #fecaca;
        }
        .qh-btn-delete:hover {
          background: #fef2f2;
          border-color: #ef4444;
          color: #ef4444;
        }

        .qh-empty {
          text-align: center;
          padding: 5rem 2rem;
          color: #94a3b8;
        }
        .qh-empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 600px) {
          .qh-page { padding: 1.5rem 1rem; }
          .qh-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      {loading && <Loader message="Working..." fullPage={true} />}

      <div className="qh-page fade-in">
        <div className="qh-header">
          <div>
            <div className="qh-header-eyebrow">Quotation Management</div>
            <h1>Quotation History</h1>
            <p>Access, preview, and download previously generated solar energy quotations.</p>
          </div>
          <button className="qh-btn-add-nav" onClick={() => navigate("/quotations/create")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create Quotation
          </button>
        </div>

        <div className="qh-table-container">
          {quotations.length === 0 ? (
            <div className="qh-empty">
              <div className="qh-empty-icon">📄</div>
              <h3>No quotations found</h3>
              <p style={{ fontSize: "14px", marginTop: "4px" }}>Start by generating your first solar proposal quotation.</p>
            </div>
          ) : (
            <table className="qh-table">
              <thead>
                <tr>
                  <th>Quotation Number</th>
                  <th>Client Name</th>
                  <th>Capacity</th>
                  <th>Amount</th>
                  <th>Created Date</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((q) => {
                  const formattedDate = q.createdAt
                    ? new Date(q.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : "-";
                  
                  const formattedAmount = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                  }).format(q.totalAmount);

                  return (
                    <tr key={q._id}>
                      <td>
                        <span className="qh-no-badge">{q.quotationNo}</span>
                      </td>
                      <td>
                        <span className="qh-client-name">{q.customerName}</span>
                      </td>
                      <td>
                        <span className="qh-capacity-badge">{q.capacity} KWp</span>
                      </td>
                      <td>
                        <span className="qh-amount-value">{formattedAmount}</span>
                      </td>
                      <td>{formattedDate}</td>
                      <td style={{ textAlign: "center" }}>
                        <div className="qh-actions-wrap" style={{ justifyContent: "center" }}>
                          <button className="qh-btn-action" onClick={() => handleViewPDF(q)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View
                          </button>
                          
                          <button className="qh-btn-action" onClick={() => handleDownloadPDF(q)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download PDF
                          </button>

                          <button className="qh-btn-action qh-btn-delete" onClick={() => handleDelete(q._id, q.quotationNo)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
