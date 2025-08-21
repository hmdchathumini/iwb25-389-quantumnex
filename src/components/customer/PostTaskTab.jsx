import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Stack, Snackbar, Alert
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { createJob } from '../../api/client';

const USER_ID = 1;

export default function PostTaskTab({ onPosted }) {
  const [task, setTask] = useState({ title: '', description: '', budget: '', date: '' });
  const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handlePostTask = async () => {
    if (!task.title || !task.description || !task.budget || !task.date) {
      setSnack({ open: true, msg: 'Please fill all fields', sev: 'error' });
      return;
    }
    try {
      await createJob({
        customer_id: USER_ID,
        description: `${task.title} - ${task.description}`,
      });
      setSnack({ open: true, msg: 'Task posted!', sev: 'success' });
      setTask({ title: '', description: '', budget: '', date: '' });
      if (onPosted) onPosted();
    } catch (err) {
      setSnack({ open: true, msg: err.message || 'Failed to post', sev: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">Post a New Task</Typography>
        <Stack spacing={2}>
          <TextField label="Task Title" name="title" value={task.title} onChange={handleChange} fullWidth />
          <TextField label="Task Description" name="description" value={task.description} onChange={handleChange} fullWidth multiline rows={4} />
          <TextField label="Budget (Rs.)" name="budget" value={task.budget} onChange={handleChange} type="number" fullWidth />
          <TextField
            label="Task Date"
            name="date"
            type="date"
            value={task.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{ startAdornment: <CalendarTodayIcon sx={{ mr: 1 }} /> }}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handlePostTask}>Post Task</Button>
            <Button variant="outlined" fullWidth onClick={() => setTask({ title: '', description: '', budget: '', date: '' })}>Reset</Button>
          </Stack>
        </Stack>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.sev} sx={{ width: '100%' }}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
