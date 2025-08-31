import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';

const dummyTasks = [
  { id: 1, description: 'Clean 3-bedroom house', status: 'pending' },
  { id: 2, description: 'Fix leaking faucet', status: 'completed' },
  { id: 3, description: 'Garden maintenance', status: 'pending' },
  { id: 4, description: 'Paint the living room', status: 'completed' },
];

const TasksTab = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [search, setSearch] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ description: '', status: 'pending' });

  useEffect(() => {
    // Load dummy data on mount
    setTasks(dummyTasks);
  }, []);

  const handleTaskStatusChange = (taskId, status) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    setSnackbar({ open: true, message: 'Task status updated', severity: 'success' });
  };

  const handleAddTask = () => {
    if (!newTask.description) return;
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const taskToAdd = { id: newId, ...newTask };
    setTasks([...tasks, taskToAdd]);
    setSnackbar({ open: true, message: 'Task added', severity: 'success' });
    setAddDialogOpen(false);
    setNewTask({ description: '', status: 'pending' });
  };

  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Manage Tasks
      </Typography>

      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Tasks"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
          ➕ Add Task
        </Button>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Task Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell
                  sx={{
                    color: task.status === 'completed' ? 'green' : 'orange',
                    fontWeight: 'bold',
                  }}
                >
                  {task.status}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleTaskStatusChange(task.id, 'completed')}
                    disabled={task.status === 'completed'}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => handleTaskStatusChange(task.id, 'pending')}
                    disabled={task.status === 'pending'}
                  >
                    Set Pending
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Task Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Task Description"
            fullWidth
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            select
            label="Status"
            value={newTask.status}
            onChange={e => setNewTask({ ...newTask, status: e.target.value })}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TasksTab;
