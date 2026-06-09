import React, { useEffect, useState } from 'react';
import { getClients } from '../services/api';
import { Box, Typography, Grid, Card, CardContent, Divider, Avatar, Button, CircularProgress, Alert } from '@mui/material';
import { User, Phone, Mail, MapPin, CreditCard, Zap, FileText, Download } from 'lucide-react';

export default function CustomerProfile() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getClients();
        if (res.data && res.data.length > 0) {
          setClient(res.data[0]);
        } else {
          setError('Profile not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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
        <Alert severity="error">{error || 'Unable to retrieve profile.'}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A', mb: 1 }}>
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Manage your personal details and view uploaded documentation.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Side: Avatar and Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              {client.image ? (
                <Avatar src={client.image} sx={{ width: 120, height: 120, mb: 2, border: '4px solid #ebf4fa', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} />
              ) : (
                <Avatar sx={{ width: 120, height: 120, mb: 2, bgcolor: '#ebf4fa', color: '#316398', fontSize: '3rem', fontWeight: 700 }}>
                  {client.name.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Typography variant="h5" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                {client.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#316398', fontWeight: 600, bgcolor: '#ebf4fa', px: 2, py: 0.5, borderRadius: '20px', mb: 3 }}>
                {client.customerCode || 'CUSTOMER'}
              </Typography>

              <Divider sx={{ width: '100%', mb: 3 }} />

              <Box sx={{ width: '100%', px: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Mail size={18} style={{ color: '#64748b' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Email Address</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', wordBreak: 'break-all' }}>{client.email}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Phone size={18} style={{ color: '#64748b' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Phone Number</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155' }}>{client.phone}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MapPin size={18} style={{ color: '#64748b' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Service Location</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155' }}>{client.location}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Detailed Sections */}
        <Grid item xs={12} md={8} container spacing={3}>
          {/* Address Details */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#0F172A', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MapPin size={20} style={{ color: '#316398' }} /> Address Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Street Address</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.address || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>District</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.district || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>State</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.state || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Pincode</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.pincode || 'Not Provided'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Electricity Connection Details */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#0F172A', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Zap size={20} style={{ color: '#eab308' }} /> Electricity Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Consumer Number</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.consumerNumber || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Electricity Board</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.electricityBoard || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Section Office</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.sectionOffice || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Phase Type</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.phaseType || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Connected Load</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.connectedLoad || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Average Monthly Bill</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>{client.averageMonthlyBill ? `₹${client.averageMonthlyBill}` : 'Not Provided'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Verification Documents */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#0F172A', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileText size={20} style={{ color: '#316398' }} /> Verification Documents
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {/* Aadhaar Card */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>Aadhaar Card</Typography>
                    {client.aadhaar ? (
                      <Button
                        variant="outlined"
                        component="a"
                        href={client.aadhaar}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Download size={16} />}
                        fullWidth
                        sx={{ textTransform: 'none', borderColor: '#316398', color: '#316398', '&:hover': { bgcolor: '#ebf4fa' } }}
                      >
                        View Aadhaar
                      </Button>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>Not Uploaded</Typography>
                    )}
                  </Grid>

                  {/* PAN Card */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>PAN Card</Typography>
                    {client.pan ? (
                      <Button
                        variant="outlined"
                        component="a"
                        href={client.pan}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Download size={16} />}
                        fullWidth
                        sx={{ textTransform: 'none', borderColor: '#316398', color: '#316398', '&:hover': { bgcolor: '#ebf4fa' } }}
                      >
                        View PAN
                      </Button>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>Not Uploaded</Typography>
                    )}
                  </Grid>

                  {/* Electricity Bill */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>Electricity Bill</Typography>
                    {client.electricityBill ? (
                      <Button
                        variant="outlined"
                        component="a"
                        href={client.electricityBill}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Download size={16} />}
                        fullWidth
                        sx={{ textTransform: 'none', borderColor: '#316398', color: '#316398', '&:hover': { bgcolor: '#ebf4fa' } }}
                      >
                        View Bill
                      </Button>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>Not Uploaded</Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
