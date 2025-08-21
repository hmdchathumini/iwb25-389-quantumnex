import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { getPayments, addPayment } from '../../api/client';

const USER_ID = 1;

export default function PaymentsTab() {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const res = await getPayments(USER_ID);
      setItems(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const handlePayNow = async (jobId, amount) => {
    try {
      await addPayment({ job_id: jobId, amount, status: 'paid' });
      load();
      alert('Payment recorded (mock)');
    } catch (err) {
      alert('Payment failed: ' + err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">Payments</Typography>
      <Grid container spacing={2}>
        {items.map(p => (
          <Grid item xs={12} md={6} key={p.id}>
            <Card>
              <CardContent>
                <Typography>Job ID: {p.job_id}</Typography>
                <Typography>Amount: Rs. {p.amount}</Typography>
                <Typography>Status: {p.status}</Typography>
                {p.status !== 'paid' && <Button sx={{ mt: 1 }} variant="contained" onClick={() => handlePayNow(p.job_id, p.amount)}>Pay Now</Button>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
