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
} from '@mui/material';

const TasksTab = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Error fetching tasks', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleTaskStatusChange = async (taskId, status) => {
        setLoading(true);
        try {
            await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            setSnackbar({ open: true, message: 'Task status updated', severity: 'success' });
            fetchTasks();
        } catch (error) {
            setSnackbar({ open: true, message: 'Error updating task status', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Manage Tasks
            </Typography>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                </Box>
            )}
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
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.id}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => handleTaskStatusChange(task.id, 'completed')}
                                        disabled={loading || task.status === 'completed'}
                                    >
                                        Complete
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        size="small"
                                        onClick={() => handleTaskStatusChange(task.id, 'pending')}
                                        disabled={loading || task.status === 'pending'}
                                    >
                                        Set Pending
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {tasks.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No tasks found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TasksTab;