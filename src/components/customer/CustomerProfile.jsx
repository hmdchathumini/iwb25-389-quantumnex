import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Stack,
    Avatar,
    Divider,
    IconButton,
    Tooltip,
    Grid,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ProfileTab() {
    const [profile, setProfile] = useState({
        name: 'Dinithi Perera',
        email: 'dinithi@example.com',
        phone: '0771234567',
        address: '123 Main St, Colombo, Sri Lanka',
    });

    const [editing, setEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setProfile(editProfile);
        setEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setEditProfile(profile);
        setEditing(false);
    };

    return (
        <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#f5f6fa', minHeight: '100vh' }}>
            <Paper
                elevation={4}
                sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 5,
                    maxWidth: 520,
                    mx: 'auto',
                    mt: 8,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                    background: 'rgba(255,255,255,0.95)',
                }}
            >
                <Stack direction="row" spacing={3} alignItems="center" mb={2}>
                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            bgcolor: 'primary.main',
                            fontSize: 40,
                            boxShadow: 3,
                        }}
                    >
                        {profile.name.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight={700} color="text.primary">
                            {profile.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Customer Profile
                        </Typography>
                    </Box>
                    {!editing && (
                        <Box flexGrow={1} textAlign="right">
                            <Tooltip title="Edit Profile">
                                <IconButton
                                    color="primary"
                                    onClick={() => setEditing(true)}
                                    size="large"
                                    sx={{ ml: 2 }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {!editing ? (
                    <Stack spacing={2} sx={{ px: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography color="text.secondary" fontWeight={500}>
                                    Full Name:
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography fontWeight={500}>{profile.name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="text.secondary" fontWeight={500}>
                                    Email:
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography fontWeight={500}>{profile.email}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="text.secondary" fontWeight={500}>
                                    Phone:
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography fontWeight={500}>{profile.phone}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color="text.secondary" fontWeight={500}>
                                    Address:
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography fontWeight={500}>{profile.address}</Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                ) : (
                    <Stack spacing={2} sx={{ px: 1 }}>
                        <TextField
                            label="Full Name"
                            name="name"
                            value={editProfile.name}
                            onChange={handleChange}
                            fullWidth
                            size="medium"
                            variant="outlined"
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            value={editProfile.email}
                            onChange={handleChange}
                            fullWidth
                            size="medium"
                            variant="outlined"
                            type="email"
                        />
                        <TextField
                            label="Phone Number"
                            name="phone"
                            value={editProfile.phone}
                            onChange={handleChange}
                            fullWidth
                            size="medium"
                            variant="outlined"
                            type="tel"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={editProfile.address}
                            onChange={handleChange}
                            fullWidth
                            size="medium"
                            variant="outlined"
                            multiline
                            minRows={2}
                        />
                    </Stack>
                )}

                {editing && (
                    <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            sx={{ minWidth: 140, fontWeight: 600, letterSpacing: 1 }}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                            sx={{ minWidth: 120, fontWeight: 600, letterSpacing: 1 }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Box>
    );
}
