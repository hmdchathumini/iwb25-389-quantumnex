import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Stack
} from "@mui/material";

const DUMMY_TASKS = [
  { id: 1, title: "Clean my garden", price: 2000, status: "Pending" },
  { id: 2, title: "Paint the house", price: 5000, status: "Completed" },
  { id: 3, title: "Fix the leaky faucet", price: 1500, status: "In Progress" },
];

const TaskListTab = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setTasks(DUMMY_TASKS);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkCompleted = (taskId) => {
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, status: "Completed" } : t)
    );
    setSnackbar({ open: true, message: "Task marked as completed!", severity: "success" });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => statusFilter === "All" || task.status === statusFilter);
  }, [tasks, statusFilter]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Your Tasks
      </Typography>

      {/* Filter */}
      <TextField
        select
        size="small"
        label="Filter by Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        sx={{ mb: 3, minWidth: 180 }}
      >
        {["All", "Pending", "In Progress", "Completed"].map(status => (
          <MenuItem key={status} value={status}>{status}</MenuItem>
        ))}
      </TextField>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
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
                  <Typography variant="body2" color="text.secondary">
                    Price: Rs.{task.price}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                    <Chip
                      label={task.status}
                      size="small"
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
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskListTab;
