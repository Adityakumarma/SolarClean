import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ClipboardList, Calendar, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';

export default function CustomerTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [showJobCardModal, setShowJobCardModal] = useState(false);

  useEffect(() => {
    const fetchTasksList = async () => {
      try {
        setLoading(true);
        const res = await getTasks();
        setTasks(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load tasks list.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasksList();
  }, []);

  const handleOpenJobCard = (jobCard) => {
    setSelectedJobCard(jobCard);
    setShowJobCardModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <Typography variant="caption" sx={{ bgcolor: '#f0fdf4', color: '#166534', fontWeight: 600, px: 1.5, py: 0.5, borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <CheckCircle2 size={12} /> Completed
          </Typography>
        );
      case 'waiting':
        return (
          <Typography variant="caption" sx={{ bgcolor: '#fffbeb', color: '#b45309', fontWeight: 600, px: 1.5, py: 0.5, borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <Clock size={12} /> Waiting Confirmation
          </Typography>
        );
      default:
        return (
          <Typography variant="caption" sx={{ bgcolor: '#eff6ff', color: '#1e40af', fontWeight: 600, px: 1.5, py: 0.5, borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <AlertCircle size={12} /> Scheduled
          </Typography>
        );
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
          My Tasks
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Monitor solar panel cleaning schedule, execution history, and details.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {tasks.length === 0 ? (
        <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', p: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
            No cleaning tasks scheduled or executed yet.
          </Typography>
        </Card>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Panels</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Frequency (Months)</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Job Card</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                const formattedDate = task.date
                  ? new Date(task.date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                  : "-";

                return (
                  <TableRow key={task._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Calendar size={16} style={{ color: '#64748b' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                          {formattedDate}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#334155' }}>{task.location}</TableCell>
                    <TableCell sx={{ color: '#334155', fontWeight: 500 }}>{task.panels} panels</TableCell>
                    <TableCell sx={{ color: '#334155' }}>{task.duration} months</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell align="right">
                      {task.jobCard ? (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenJobCard(task.jobCard)}
                          startIcon={<Eye size={14} />}
                          sx={{
                            textTransform: 'none',
                            borderColor: '#316398',
                            color: '#316398',
                            borderRadius: '8px',
                            '&:hover': { bgcolor: '#ebf4fa', borderColor: '#4596ab' }
                          }}
                        >
                          View Job Card
                        </Button>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
                          Not Available
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Job Card Dialog */}
      {selectedJobCard && (
        <Dialog open={showJobCardModal} onClose={() => setShowJobCardModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, pb: 1 }}>
            Job Card Details
          </DialogTitle>
          <DialogContent dividers sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {selectedJobCard.servicesDone && selectedJobCard.servicesDone.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle2 size={16} style={{ color: '#16a34a' }} /> Services Executed
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
                    {selectedJobCard.servicesDone.map((srv, idx) => (
                      <li key={idx} style={{ fontSize: '0.875rem', marginBottom: '4px' }}>{srv}</li>
                    ))}
                  </ul>
                </Box>
              )}

              {selectedJobCard.complaints && selectedJobCard.complaints.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AlertCircle size={16} style={{ color: '#dc2626' }} /> Complaints / Issues
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
                    {selectedJobCard.complaints.map((comp, idx) => (
                      <li key={idx} style={{ fontSize: '0.875rem', marginBottom: '4px', color: '#b91c1c' }}>{comp}</li>
                    ))}
                  </ul>
                </Box>
              )}

              {selectedJobCard.remarks && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 0.5 }}>
                    Remarks
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#334155', bgcolor: '#f8fafc', p: 1.5, borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    {selectedJobCard.remarks}
                  </Typography>
                </Box>
              )}

              {selectedJobCard.completedBy && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#ebf4fa', p: 2, borderRadius: '10px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#316398' }}>
                    Executed By:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                    {selectedJobCard.completedBy}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowJobCardModal(false)} variant="contained" sx={{ bgcolor: '#316398', '&:hover': { bgcolor: '#4596ab' } }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
