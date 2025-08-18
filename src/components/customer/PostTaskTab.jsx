import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const PostTaskTab = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    budget: "",
    date: ""
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handlePostTask = () => {
    if (!task.title || !task.description || !task.budget || !task.date) {
      setSnackbar({ open: true, message: "Please fill all fields!", severity: "error" });
      return;
    }

    console.log("Task Posted:", task);
    setSnackbar({ open: true, message: "Task posted successfully!", severity: "success" });
    setTask({ title: "", description: "", budget: "", date: "" });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <Typography variant="h5" gutterBottom color="primary">
          Post a New Task
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Task Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Task Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />
          <TextField
            label="Budget (Rs.)"
            name="budget"
            value={task.budget}
            onChange={handleChange}
            type="number"
            fullWidth
            required
          />
          <TextField
            label="Task Date"
            name="date"
            type="date"
            value={task.date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <CalendarTodayIcon sx={{ mr: 1 }} />
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handlePostTask}>
              Post Task
            </Button>
            <Button variant="outlined" fullWidth onClick={() => setTask({ title: "", description: "", budget: "", date: "" })}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Paper>

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

export default PostTaskTab;
