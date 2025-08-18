import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';

const fetchAnalyticsData = async () => {
    // Replace with real API calls
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                activeUsers: 124,
                completedJobs: 87,
                revenue: 15420.75,
            });
        }, 1000);
    });
};

const AnalyticsCard = ({ title, value, subtitle }) => (
    <Card sx={{ minWidth: 220 }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
                {value}
            </Typography>
            {subtitle && (
                <Typography color="text.secondary" variant="body2">
                    {subtitle}
                </Typography>
            )}
        </CardContent>
    </Card>
);

const AnalyticsTab = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData().then((res) => {
            setData(res);
            setLoading(false);
        });
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
                            subtitle="Currently online"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticsCard
                            title="Completed Jobs"
                            value={data.completedJobs}
                            subtitle="All time"
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