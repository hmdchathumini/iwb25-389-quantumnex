import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Button, TextField, MenuItem, CircularProgress, Snackbar, Alert, Stack
} from '@mui/material';
import { getJobs, updateJobStatus } from '../../api/client';

const USER_ID = 1;

export default function TaskListTab() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await getJobs(USER_ID);
      // res is array of job records
      setTasks(res.map(r => ({ id: r.id, description: r.description, status: r.status })));
    } catch (err) {
      setSnack({ open: true, msg: err.message || 'Failed to load', sev: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleMarkCompleted = async (id) => {
    try {
      await updateJobStatus(id, 'Completed');
      setSnack({ open: true, msg: 'Marked completed', sev: 'success' });
      load();
    } catch (err) {
      setSnack({ open: true, msg: err.message || 'Failed', sev: 'error' });
    }
  };

  const filtered = tasks.filter(t => statusFilter === 'All' || t.status === statusFilter);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">Your Tasks</Typography>

      <TextField select size="small" label="Filter by Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ mb: 3, minWidth: 180 }}>
        {['All', 'Pending', 'In Progress', 'Completed'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </TextField>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : filtered.length === 0 ? (
        <Typography>No tasks found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map(t => (
            <Grid item xs={12} md={6} lg={4} key={t.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{t.description.split(' - ')[0]}</Typography>
                  <Typography variant="body2" color="text.secondary">{t.description}</Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip label={t.status} size="small" color={t.status === 'Completed' ? 'success' : t.status === 'In Progress' ? 'warning' : 'primary'} />
                  </Stack>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button variant="contained" fullWidth disabled={t.status === 'Completed'} onClick={() => handleMarkCompleted(t.id)}>
                    {t.status === 'Completed' ? 'Completed' : 'Mark as Completed'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.sev} sx={{ width: '100%' }}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
