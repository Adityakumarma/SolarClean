import React, { useState, useEffect } from 'react';
import { getQuotations } from '../services/api';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import SolarProposalPDF, { getBlackLogo } from './SolarProposalPDF';
import companyLogo from '../assets/companylogo.png';
import Swal from 'sweetalert2';

export default function CustomerQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [error, setError] = useState('');
  const [blackLogo, setBlackLogo] = useState(null);

  useEffect(() => {
    const fetchQuotationsList = async () => {
      try {
        setLoading(true);
        const res = await getQuotations();
        setQuotations(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load quotations history.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotationsList();

    if (companyLogo) {
      getBlackLogo(companyLogo).then((inverted) => {
        setBlackLogo(inverted);
      }).catch(err => {
        console.error("Failed to generate black logo:", err);
      });
    }
  }, []);

  const handleViewPDF = async (quotation) => {
    try {
      setPdfGenerating(true);
      const blob = await pdf(<SolarProposalPDF data={quotation} logo={blackLogo} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Could not generate PDF proposal.",
        icon: "error"
      });
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleDownloadPDF = async (quotation) => {
    try {
      setPdfGenerating(true);
      const blob = await pdf(<SolarProposalPDF data={quotation} logo={blackLogo} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Solar_Proposal_${quotation.quotationNo || 'Quotation'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      Swal.fire({
        title: "Downloaded!",
        text: "Your proposal PDF downloaded successfully.",
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
      setPdfGenerating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={50} sx={{ color: '#316398' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: 'Inter, sans-serif' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A', mb: 1 }}>
          My Quotations
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          View and download your official Sunbird solar energy quotations and system cost estimates.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {pdfGenerating && <Alert severity="info" sx={{ mb: 3 }}>Generating PDF Document. Please wait...</Alert>}

      {quotations.length === 0 ? (
        <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', p: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
            No quotations found for your account.
          </Typography>
        </Card>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Quotation No</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Capacity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>District</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Total Cost</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                  <TableRow key={q._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FileText size={18} style={{ color: '#316398' }} />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#316398' }}>
                          {q.quotationNo}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ bgcolor: '#ebf4fa', color: '#316398', fontWeight: 600, px: 1.5, py: 0.5, borderRadius: '6px', display: 'inline-block' }}>
                        {q.capacity} KWp
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: '#334155' }}>{q.district}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{formattedAmount}</TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{formattedDate}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewPDF(q)}
                          startIcon={<ExternalLink size={14} />}
                          sx={{
                            textTransform: 'none',
                            borderColor: '#cbd5e1',
                            color: '#475569',
                            borderRadius: '8px',
                            '&:hover': { bgcolor: '#f8fafc', borderColor: '#94a3b8' }
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleDownloadPDF(q)}
                          startIcon={<Download size={14} />}
                          sx={{
                            textTransform: 'none',
                            bgcolor: '#316398',
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#4596ab', boxShadow: 'none' }
                          }}
                        >
                          Download PDF
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
