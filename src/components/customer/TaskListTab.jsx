import React, { useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Button, TextField,
  MenuItem, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Tooltip, InputAdornment, Slide, Paper, Rating
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const DUMMY_TASKS = [
  { id: 1, title: 'Clean Living Room', description: 'Vacuum and mop the living room floor, dust furniture.', budget: 500, date: '2024-06-10', category: 'Cleaning', priority: 'High', address: '123 Main St', estimatedTime: 2, status: 'Pending' },
  { id: 2, title: 'Cook Dinner', description: 'Prepare a vegetarian meal for 4 people.', budget: 700, date: '2024-06-11', category: 'Cooking', priority: 'Medium', address: '456 Oak Ave', estimatedTime: 1.5, status: 'Completed' },
  { id: 3, title: 'Garden Maintenance', description: 'Trim hedges and water plants.', budget: 400, date: '2024-06-12', category: 'Gardening', priority: 'Low', address: '789 Pine Rd', estimatedTime: 1, status: 'Pending' }
];

const categories = ['Cleaning', 'Cooking', 'Laundry', 'Gardening', 'Babysitting', 'Other'];
const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Pending', 'Completed'];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TaskManager() {
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [taskForm, setTaskForm] = useState({ title: '', description: '', budget: '', date: '', category: '', priority: '', address: '', estimatedTime: '' });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePostTask = () => {
    const requiredFields = ['title', 'description', 'budget', 'date', 'category', 'priority', 'address', 'estimatedTime'];
    for (let field of requiredFields) {
      if (!taskForm[field]) { alert(`Please fill the ${field} field!`); return; }
    }
    const newTask = { id: Date.now(), ...taskForm, status: 'Pending' };
    setTasks(prev => [newTask, ...prev]);
    setTaskForm({ title: '', description: '', budget: '', date: '', category: '', priority: '', address: '', estimatedTime: '' });
    setShowForm(false);
  };

  const handleMarkCompleted = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
  };

  const filteredTasks = tasks.filter(t => statusFilter === 'All' || t.status === statusFilter);

  const getPriorityColor = (priority) => priority === 'High' ? 'error' : priority === 'Medium' ? 'warning' : 'success';
  const getStatusColor = (status) => status === 'Completed' ? 'success' : 'primary';

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#f7fafd', minHeight: '100vh' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" letterSpacing={1}>
          My Tasks
        </Typography>
        <Tooltip title="Post New Task">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setShowForm(true)}
            sx={{ borderRadius: 3, fontWeight: 600, px: 3, boxShadow: 2 }}
          >
            Post New Task
          </Button>
        </Tooltip>
      </Stack>

      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 5,
            boxShadow: 12,
            bgcolor: '#f9fbfd',
            p: 0
          }
        }}
      >
        <DialogTitle sx={{
          fontWeight: 700,
          color: 'primary.main',
          bgcolor: '#e3f2fd',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          pb: 2
        }}>
          Post a New Task
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Paper elevation={0} sx={{ bgcolor: 'transparent', p: 0 }}>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                label="Title"
                name="title"
                value={taskForm.title}
                onChange={handleChange}
                fullWidth
                autoFocus
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 3, bgcolor: '#fff' }
                }}
              />
              <TextField
                label="Description"
                name="description"
                value={taskForm.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 3, bgcolor: '#fff' }
                }}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={taskForm.category}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 3, bgcolor: '#fff' }
                  }}
                >
                  {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </TextField>
                <TextField
                  select
                  label="Priority"
                  name="priority"
                  value={taskForm.priority}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 3, bgcolor: '#fff' }
                  }}
                >
                  {priorities.map(pr => <MenuItem key={pr} value={pr}>{pr}</MenuItem>)}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Estimated Time"
                  name="estimatedTime"
                  type="number"
                  value={taskForm.estimatedTime}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">hrs</InputAdornment>,
                    sx: { borderRadius: 3, bgcolor: '#fff' }
                  }}
                />
                <TextField
                  label="Budget"
                  name="budget"
                  type="number"
                  value={taskForm.budget}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonetizationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">Rs.</InputAdornment>,
                    sx: { borderRadius: 3, bgcolor: '#fff' }
                  }}
                />
              </Stack>
              <TextField
                label="Address"
                name="address"
                value={taskForm.address}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3, bgcolor: '#fff' }
                }}
              />
              <TextField
                label="Task Date"
                name="date"
                type="date"
                value={taskForm.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3, bgcolor: '#fff' }
                }}
              />
            </Stack>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 3, pt: 2, bgcolor: '#f5faff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostTask}
            sx={{ borderRadius: 3, fontWeight: 600, px: 4, boxShadow: 2 }}
          >
            Post Task
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTaskForm({ title: '', description: '', budget: '', date: '', category: '', priority: '', address: '', estimatedTime: '' })}
            sx={{ borderRadius: 3, px: 3 }}
          >
            Reset
          </Button>
          <Button
            onClick={() => setShowForm(false)}
            sx={{ borderRadius: 3, px: 3 }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <TextField
          select
          size="small"
          label="Filter by Status"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          sx={{ minWidth: 200, bgcolor: '#fff', borderRadius: 2 }}
        >
          {['All', ...statuses].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
      </Stack>

      <Grid container spacing={4}>
        {filteredTasks.length === 0 ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <AssignmentTurnedInIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">No tasks found.</Typography>
            </Box>
          </Grid>
        ) : filteredTasks.map(t => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <Card sx={{
              borderRadius: 4,
              boxShadow: 8,
              p: 0,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 320,
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.025)', boxShadow: 16 },
              opacity: t.status === 'Completed' ? 0.7 : 1,
              background: t.priority === 'High' ? 'linear-gradient(135deg, #fff3f3 60%, #fff)' : '#fff',
              borderLeft: `6px solid ${t.priority === 'High' ? '#d32f2f' : t.priority === 'Medium' ? '#ed6c02' : '#2e7d32'}`
            }}>
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                  <Typography variant="h6" sx={{ textDecoration: t.status === 'Completed' ? 'line-through' : 'none', fontWeight: 700 }}>
                    {t.title}
                  </Typography>
                  <Chip label={t.priority} color={getPriorityColor(t.priority)} size="small" sx={{ fontWeight: 600 }} />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>{t.description}</Typography>
                <Divider sx={{ mb: 1 }} />
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" useFlexGap>
                  <Chip icon={<CalendarTodayIcon />} label={t.date} size="small" sx={{ bgcolor: '#f5f5f5' }} />
                  <Chip icon={<AccessTimeIcon />} label={`${t.estimatedTime} hrs`} size="small" sx={{ bgcolor: '#f5f5f5' }} />
                  <Chip icon={<MonetizationOnIcon />} label={`Rs. ${t.budget}`} size="small" sx={{ bgcolor: '#f5f5f5' }} />
                  <Chip icon={<LocationOnIcon />} label={t.address} size="small" sx={{ bgcolor: '#f5f5f5' }} />
                </Stack>
              </CardContent>
              <Divider />
              <Box sx={{ p: 2, pt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                  <Chip label={t.status} color={getStatusColor(t.status)} size="small" sx={{ fontWeight: 600, px: 2 }} />
                  {t.status === 'Pending' ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleMarkCompleted(t.id)}
                      sx={{ borderRadius: 2, fontWeight: 600, minWidth: 140 }}
                    >
                      Mark as Completed
                    </Button>
                  ) : (
                    <Button fullWidth variant="outlined" disabled sx={{ borderRadius: 2, minWidth: 140 }}>Completed</Button>
                  )}
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
