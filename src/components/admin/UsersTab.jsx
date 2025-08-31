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
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const dummyUsers = [
    { userId: 'U001', nic: '901234567V', name: 'Alice Johnson', email: 'alice@example.com', address: 'No. 12, Galle Road, Colombo 03', role: 'Admin' },
    { userId: 'U002', nic: '880123456V', name: 'Bob Smith', email: 'bob@example.com', address: 'No. 45, Kandy Road, Kandy', role: 'Customer' },
    { userId: 'U003', nic: '920987654V', name: 'Carol Lee', email: 'carol@example.com', address: 'No. 78, Main Street, Jaffna', role: 'Worker' },
    { userId: 'U004', nic: '200120981764', name: 'Dinithi Dewmini', email: 'dinithi000@gmail.com', address: 'No. 23, Lake Road, Kurunegala', role: 'Admin'}
];

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [search, setSearch] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ userId: '', nic: '', name: '', email: '', address: '', role: 'User' });

    useEffect(() => {
        setUsers(dummyUsers);
        setLoading(false);
    }, []);

    const handleDelete = (nic) => {
        setUsers(users.filter(user => user.nic !== nic));
        setSnackbar({ open: true, message: 'User deleted', severity: 'success' });
    };

    const handleOpenDialog = (user = null) => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser({ userId: '', nic: '', name: '', email: '', address: '', role: 'User' });
        }
        setDialogOpen(true);
    };

    const handleSaveUser = () => {
        if (!currentUser.nic || !currentUser.userId || !currentUser.name || !currentUser.email || !currentUser.address) return;

        const existingIndex = users.findIndex(u => u.nic === currentUser.nic);

        if (existingIndex !== -1) {
            // Edit existing
            const updatedUsers = [...users];
            updatedUsers[existingIndex] = currentUser;
            setUsers(updatedUsers);
            setSnackbar({ open: true, message: 'User updated', severity: 'success' });
        } else {
            // Add new
            setUsers([...users, currentUser]);
            setSnackbar({ open: true, message: 'User added', severity: 'success' });
        }

        setDialogOpen(false);
    };

    const filteredUsers = users.filter(user =>
        user.nic.toLowerCase().includes(search.toLowerCase()) ||
        user.userId.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Manage Users
            </Typography>

            {/* Search & Add */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <TextField
                    label="Search Users"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                    ➕ Add User
                </Button>
            </Box>

            {/* Loading */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell>NIC</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map(user => (
                                <TableRow key={user.nic}>
                                    <TableCell>{user.userId}</TableCell>
                                    <TableCell>{user.nic}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleOpenDialog(user)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(user.nic)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{currentUser.nic ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="User ID"
                        fullWidth
                        value={currentUser.userId}
                        onChange={e => setCurrentUser({ ...currentUser, userId: e.target.value })}
                    />
                    <TextField
                        label="NIC"
                        fullWidth
                        value={currentUser.nic}
                        onChange={e => setCurrentUser({ ...currentUser, nic: e.target.value })}
                    />
                    <TextField
                        label="Name"
                        fullWidth
                        value={currentUser.name}
                        onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={currentUser.email}
                        onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        value={currentUser.address}
                        onChange={e => setCurrentUser({ ...currentUser, address: e.target.value })}
                    />
                    <TextField
                        select
                        label="Role"
                        value={currentUser.role}
                        onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Moderator">Moderator</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveUser}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UsersTab;
