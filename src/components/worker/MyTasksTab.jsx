import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const DUMMY_ASSIGNED_TASKS = [
  {
    id: 1,
    title: "Clean Front Garden",
    description: "2 hours weeding and sweeping. Tools available.",
    reward: 2000,
    date: "2025-08-20",
    provider: "HomeOwner A",
    status: "In Progress",
    distanceKm: 1.2,
  },
  {
    id: 2,
    title: "Car Wash",
    description: "Exterior + vacuum. Preferred today evening.",
    reward: 1500,
    date: "2025-08-19",
    provider: "Thisul R.",
    status: "Completed",
    distanceKm: 3.8,
  },
  {
    id: 3,
    title: "Grocery Pickup",
    description: "Keells - list provided. Reimburse on delivery.",
    reward: 800,
    date: "2025-08-21",
    provider: "HomeOwner B",
    status: "Pending",
    distanceKm: 0.9,
  },
];

const MyTasksTab = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    setTimeout(() => {
      setTasks(DUMMY_ASSIGNED_TASKS);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkCompleted = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "Completed" } : t));
    setSnackbar({ open: true, message: "Task marked as completed!", severity: "success" });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => statusFilter === "All" || task.status === statusFilter);
  }, [tasks, statusFilter]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">My Tasks</Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          select
          size="small"
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {["All", "Pending", "In Progress", "Completed"].map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Typography>No tasks found 😢</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredTasks.map(task => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>{task.description}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip icon={<CalendarMonthIcon />} label={task.date} size="small" color="info" />
                    <Chip icon={<AttachMoneyIcon />} label={`Rs.${task.reward}`} size="small" color="success" />
                    <Chip label={task.status} size="small"
                      color={
                        task.status === "Completed" ? "success" :
                        task.status === "In Progress" ? "warning" : "primary"
                      }
                    />
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={task.status === "Completed"}
                    onClick={() => handleMarkCompleted(task.id)}
                  >
                    {task.status === "Completed" ? "Completed" : "Mark as Completed"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyTasksTab;
