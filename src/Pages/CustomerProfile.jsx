import React, { useEffect, useState } from 'react';
import { getClients } from '../services/api';
import { Box, Typography, Grid, Card, CardContent, Avatar, CircularProgress, Alert } from '@mui/material';
import { Phone, Mail, MapPin } from 'lucide-react';

const StatPill = ({ icon: Icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
    <Icon size={20} style={{ color: '#316398', flexShrink: 0 }} />
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b', wordBreak: 'break-all' }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default function CustomerProfile() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getClients();
        const clientData = res?.data?.data?.[0] || null;

        if (clientData) {
          setClient(clientData);
        } else {
          setError("Profile not found.");
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
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          View your account information.
        </Typography>
      </Box>

      {/* Hero Section */}
      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3, px: { xs: 2, md: 4 } }}>
          {client.image ? (
            <Avatar src={client.image} sx={{ width: 100, height: 100, mb: 2, border: '3px solid #ebf4fa', boxShadow: '0 4px 12px rgba(49,99,152,0.15)' }} />
          ) : (
            <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: '#ebf4fa', color: '#316398', fontSize: '2.5rem', fontWeight: 700 }}>
              {client.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Typography variant="h5" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
            {client.name}
          </Typography>
          <Box sx={{ bgcolor: '#ebf4fa', color: '#316398', px: 2, py: 0.75, borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem' }}>
            {client.customerCode || 'CUSTOMER'}
          </Box>
        </CardContent>
      </Card>

      {/* Stats Pills */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatPill icon={Mail} label="Email" value={client.email} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatPill icon={Phone} label="Phone" value={client.phone} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatPill icon={MapPin} label="Location" value={client.location} />
        </Grid>
      </Grid>


    </Box>
  );
}