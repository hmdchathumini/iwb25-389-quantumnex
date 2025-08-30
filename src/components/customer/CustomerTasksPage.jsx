import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PostTaskTab from "./PostTaskTab";
import TaskListTab from "./TaskListTab";
import { getJobs } from "../../api/client";

const USER_ID = 1;

export default function CustomerTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from backend
  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await getJobs(USER_ID);
      setTasks(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handlePosted = (newTask) => {
    // Immediately add new task to list
    setTasks(prev => [newTask, ...prev]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Post a Task
      </Typography>

      {/* Post Task Form */}
      <PostTaskTab onPosted={handlePosted} />

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Your Tasks
        </Typography>

        {/* Task List */}
        <TaskListTab tasks={tasks} loading={loading} reloadTasks={loadTasks} />
      </Box>
    </Box>
  );
}
