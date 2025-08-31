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
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const PROFILE_FIELDS = [
    { label: 'Full Name', name: 'name', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone', name: 'phone', type: 'tel' },
    { label: 'Address', name: 'address', type: 'text', multiline: true, minRows: 2 },
    { label: 'NIC Number', name: 'nic', type: 'text' },
];

export default function ProfileTab() {
    const [profile, setProfile] = useState({
        name: 'Dinithi Dewmini',
        email: 'dinithi000@gmail.com',
        phone: '0771234567',
        address: '123 Main St, Colombo, Sri Lanka',
        nic: '20012039874',
        avatar: '',
    });

    const [editing, setEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setEditProfile((prev) => ({
                    ...prev,
                    avatar: ev.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
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
        <Box sx={{ p: { xs: 1, sm: 3 }, minHeight: '100vh' }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 4,
                    maxWidth: 480,
                    mx: 'auto',
                    mt: 8,
                    boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
                    background: 'rgba(255,255,255,0.98)',
                }}
            >
                <Stack alignItems="center" spacing={2} mb={3}>
                    <Box position="relative">
                        <Avatar
                            src={editing ? editProfile.avatar : profile.avatar}
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'primary.main',
                                fontSize: 44,
                                boxShadow: 2,
                                border: '4px solid #fff',
                            }}
                        >
                            {(editing ? editProfile.avatar : profile.avatar)
                                ? ''
                                : profile.name.charAt(0)}
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
                                <IconButton
                                    component="span"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        bgcolor: 'primary.main',
                                        color: '#fff',
                                        boxShadow: 2,
                                        '&:hover': { bgcolor: 'primary.dark' },
                                    }}
                                >
                                    <PhotoCamera fontSize="small" />
                                </IconButton>
                            </label>
                        )}
                    </Box>
                    <Typography variant="h5" fontWeight={700} color="text.primary" textAlign="center">
                        {profile.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" textAlign="center">
                        Customer Profile
                    </Typography>
                    {!editing && (
                        <Tooltip title="Edit Profile">
                            <IconButton
                                color="primary"
                                onClick={() => setEditing(true)}
                                size="large"
                                sx={{ mt: 1 }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {!editing ? (
                    <Stack spacing={2} sx={{ px: 1 }}>
                        {PROFILE_FIELDS.map((field) => (
                            <Box
                                key={field.name}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    bgcolor: '#f7f9fc',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1.2,
                                }}
                            >
                                <Typography color="text.secondary" fontWeight={500} sx={{ minWidth: 110 }}>
                                    {field.label}
                                </Typography>
                                <Typography fontWeight={500} color="text.primary" sx={{ textAlign: 'right' }}>
                                    {profile[field.name]}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Stack spacing={2} sx={{ px: 1 }}>
                        {PROFILE_FIELDS.map((field) => (
                            <TextField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                value={editProfile[field.name]}
                                onChange={handleChange}
                                fullWidth
                                size="medium"
                                variant="outlined"
                                type={field.type}
                                multiline={field.multiline || false}
                                minRows={field.minRows || undefined}
                                InputLabelProps={{ shrink: true }}
                            />
                        ))}
                    </Stack>
                )}

                {editing && (
                    <Stack direction="row" spacing={2} mt={4} justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            sx={{ minWidth: 140, fontWeight: 600, letterSpacing: 1, borderRadius: 2 }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                            sx={{ minWidth: 120, fontWeight: 600, letterSpacing: 1, borderRadius: 2 }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Box>
    );
}
