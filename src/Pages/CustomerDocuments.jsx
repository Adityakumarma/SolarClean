import React, { useEffect, useState } from 'react';
import { getClients } from '../services/api';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function CustomerDocuments() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const res = await getClients();
        if (res.data && res.data.length > 0) {
          setClient(res.data[0]);
        } else {
          setError('Client details not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load documents.');
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={50} sx={{ color: '#316398' }} />
      </Box>
    );
  }

  if (error || !client) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error || 'Unable to load documents.'}</Alert>
      </Box>
    );
  }

  // Map the client documents to a clean list
  const documents = [
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      fileUrl: client.aadhaar,
      type: 'Identity Proof',
    },
    {
      id: 'pan',
      name: 'PAN Card',
      fileUrl: client.pan,
      type: 'Tax Identification Proof',
    },
    {
      id: 'bill',
      name: 'Electricity Bill',
      fileUrl: client.electricityBill,
      type: 'Utility Bill / Address Proof',
    }
  ].filter(doc => doc.fileUrl); // Only show uploaded documents

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: 'Inter, sans-serif' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A', mb: 1 }}>
          My Documents
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Access and download your registration and compliance documents.
        </Typography>
      </Box>

      {documents.length === 0 ? (
        <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', p: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
            No documents uploaded yet. Contact Sunbird administrator to upload documents.
          </Typography>
        </Card>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Document Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Document Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} hover sx={{ '&:last-child cell': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FileText size={20} style={{ color: '#316398' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        {doc.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#64748b', fontSize: '0.875rem' }}>{doc.type}</TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ bgcolor: '#f0fdf4', color: '#166534', fontWeight: 600, px: 1.5, py: 0.5, borderRadius: '12px' }}>
                      Verified
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      component="a"
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<ExternalLink size={14} />}
                      sx={{
                        textTransform: 'none',
                        bgcolor: '#316398',
                        borderRadius: '8px',
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#4596ab', boxShadow: 'none' }
                      }}
                    >
                      View / Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
