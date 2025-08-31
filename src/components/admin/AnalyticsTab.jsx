import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  LinearProgress,
} from '@mui/material';

// Dummy analytics numbers
const dummyAnalyticsData = {
  activeUsers: 4,          // Number of dummy users
  completedJobs: 2,        // Number of completed tasks
  pendingJobs: 2,          // Pending tasks
  revenue: 520,            // Sum of dummy payments
  totalUsers: 4,           // Total users
};

const AnalyticsCard = ({ title, value, subtitle, progress }) => (
  <Card sx={{ minWidth: 220, height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" color="primary" gutterBottom>
        {value}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary" variant="body2" gutterBottom>
          {subtitle}
        </Typography>
      )}
      {progress !== undefined && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="text.secondary">
            {progress}% completed
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const AnalyticsTab = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setData(dummyAnalyticsData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AnalyticsCard
              title="Active Users"
              value={data.activeUsers}
              subtitle={`Total registered: ${data.totalUsers}`}
              progress={(data.activeUsers / data.totalUsers) * 100}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AnalyticsCard
              title="Completed Jobs"
              value={data.completedJobs}
              subtitle={`Pending Jobs: ${data.pendingJobs}`}
              progress={(data.completedJobs / (data.completedJobs + data.pendingJobs)) * 100}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AnalyticsCard
              title="Revenue"
              value={`$${data.revenue.toLocaleString()}`}
              subtitle="Total generated"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AnalyticsTab;
