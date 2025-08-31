import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Avatar,
    Divider,
    IconButton,
    Tooltip,
    Grid,
    TextField,
    Snackbar,
    Alert,
    Fade,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function ProfileTab() {
    const [profile, setProfile] = useState({
        name: 'Dinithi Dewmini',
        email: 'dinithi000@gmail.com',
        nic: '200280298763',
        avatar: '',
    });

    const [editing, setEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditProfile((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setProfile(editProfile);
        setEditing(false);
        setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    };

    const handleCancel = () => {
        setEditProfile(profile);
        setEditing(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ p: 2, bgcolor: '#f5f6fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 4, boxShadow: 6 }}>
                <CardContent>
                    <Stack alignItems="center" spacing={2}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={editing ? editProfile.avatar : profile.avatar}
                                alt={profile.name}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: 'primary.main',
                                    fontSize: 40,
                                    boxShadow: 3,
                                    border: '3px solid #e3e6f0',
                                }}
                            >
                                {!profile.avatar && profile.name.charAt(0)}
                            </Avatar>
                            {editing && (
                                <label htmlFor="avatar-upload">
                                    <input
                                        accept="image/*"
                                        id="avatar-upload"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleAvatarChange}
                                    />
                                    <Tooltip title="Change Avatar">
                                        <IconButton
                                            color="primary"
                                            component="span"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                bgcolor: 'white',
                                                boxShadow: 1,
                                                '&:hover': { bgcolor: 'grey.100' },
                                            }}
                                        >
                                            <PhotoCamera fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </label>
                            )}
                        </Box>
                        <Typography variant="h5" fontWeight={700}>
                            {profile.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Admin Profile
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {!editing ? (
                        <Fade in>
                            <Stack spacing={2}>
                                <Grid container spacing={1}>
                                    <Grid item xs={5}>
                                        <Typography color="text.secondary" fontWeight={600}>
                                            Full Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography fontWeight={500}>{profile.name}</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography color="text.secondary" fontWeight={600}>
                                            Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography fontWeight={500}>{profile.email}</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography color="text.secondary" fontWeight={600}>
                                            NIC Number
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography fontWeight={500}>{profile.nic || '-'}</Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Fade>
                    ) : (
                        <Stack spacing={2}>
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
                                label="NIC Number"
                                name="nic"
                                value={editProfile.nic}
                                onChange={handleChange}
                                fullWidth
                                size="medium"
                                variant="outlined"
                            />
                        </Stack>
                    )}

                    <Stack direction="row" spacing={2} mt={editing ? 4 : 3} justifyContent="center">
                        {!editing ? (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={() => setEditing(true)}
                                sx={{ minWidth: 140, fontWeight: 600, letterSpacing: 1 }}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSave}
                                    sx={{ minWidth: 120, fontWeight: 600, letterSpacing: 1 }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<CancelIcon />}
                                    onClick={handleCancel}
                                    sx={{ minWidth: 100, fontWeight: 600, letterSpacing: 1 }}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </Stack>
                </CardContent>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Card>
        </Box>
    );
}
