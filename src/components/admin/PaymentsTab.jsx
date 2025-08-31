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
  CircularProgress,
  Chip,
  TextField
} from '@mui/material';

const statusColors = {
  Paid: 'success',
  Pending: 'warning',
  Failed: 'error',
  Refunded: 'info'
};

const dummyPayments = [
  { id: 1, customerName: 'Alice Johnson', workerName: 'Bob Smith', amount: 120, status: 'Paid' },
  { id: 2, customerName: 'Carol Lee', workerName: 'David Kim', amount: 80, status: 'Pending' },
  { id: 3, customerName: 'Eve Martin', workerName: 'Frank White', amount: 150, status: 'Failed' },
  { id: 4, customerName: 'George Hall', workerName: 'Hannah Lee', amount: 200, status: 'Refunded' },
  { id: 5, customerName: 'Ivy Brown', workerName: 'Jack Black', amount: 50, status: 'Paid' }
];

const PaymentsTab = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Load dummy payments
    setPayments(dummyPayments);
    setLoading(false);
  }, []);

  const filteredPayments = payments.filter(
    p =>
      p.customerName.toLowerCase().includes(search.toLowerCase()) ||
      p.workerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payments Management
      </Typography>

      {/* Search */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Customer or Worker"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Worker</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map(payment => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.customerName}</TableCell>
                  <TableCell>{payment.workerName}</TableCell>
                  <TableCell>
                    {payment.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={statusColors[payment.status] || 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No payments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PaymentsTab;
