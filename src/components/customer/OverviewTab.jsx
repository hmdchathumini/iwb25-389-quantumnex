import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsIcon from "@mui/icons-material/Notifications";

const tasks = [
  {
    title: "Clean Living Room",
    status: "Pending",
    budget: 200,
    date: "2024-06-10",
    description: "Vacuum and dust the living room",
  },
  {
    title: "Grocery Shopping",
    status: "Pending",
    budget: 1500,
    date: "2024-06-12",
    description: "Buy weekly groceries",
  },
  {
    title: "Wash Dishes",
    status: "Completed",
    budget: 0,
    date: "2024-06-08",
    description: "Clean all dishes after dinner",
  },
];

const notifications = [
  {
    message: "Your task 'Clean Living Room' is due soon.",
    read: false,
    date: "2024-06-09",
  },
  {
    message: "Task 'Wash Dishes' marked as completed.",
    read: true,
    date: "2024-06-08",
  },
];

export default function OverviewTab() {
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const totalBudget = tasks.reduce((sum, t) => sum + (Number(t.budget) || 0), 0);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const upcomingTasks = tasks
    .filter((t) => t.status !== "Completed")
    .slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Welcome Back!
        </Typography>
      </Stack>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        You have <b>{pendingTasks}</b> pending tasks today. 
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <AssignmentIcon color="primary" />
              <Box>
                <Typography variant="h6">{pendingTasks}</Typography>
                <Typography variant="body2">Pending Tasks</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <DoneAllIcon color="success" />
              <Box>
                <Typography variant="h6">{completedTasks}</Typography>
                <Typography variant="body2">Completed Tasks</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <NotificationsActiveIcon color="warning" />
              <Box>
                <Typography variant="h6">{unreadNotifications}</Typography>
                <Typography variant="body2">New Notifications</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <AccountBalanceWalletIcon color="secondary" />
              <Box>
                <Typography variant="h6">Rs. {totalBudget}</Typography>
                <Typography variant="body2">Total Budget</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming Tasks */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Tasks
                </Typography>
              </Stack>
              {upcomingTasks.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No upcoming tasks.
                </Typography>
              ) : (
                upcomingTasks.map((t, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          {t.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t.date || "No date"} • Rs. {t.budget || "-"}
                        </Typography>
                      </Box>
                      <Chip
                        label={t.status}
                        size="small"
                        color={
                          t.status === "Completed"
                            ? "success"
                            : t.status === "Pending"
                            ? "primary"
                            : "warning"
                        }
                      />
                    </Stack>
                    {i < upcomingTasks.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Notifications */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <NotificationsIcon color="warning" />
                <Typography variant="h6" gutterBottom>
                  Recent Notifications
                </Typography>
              </Stack>
              {recentNotifications.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No new notifications.
                </Typography>
              ) : (
                recentNotifications.map((n, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography variant="body1">{n.message}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {n.date || "Today"}
                    </Typography>
                    {i < recentNotifications.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
