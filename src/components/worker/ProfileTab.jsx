import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Chip,
  Avatar,
  Snackbar,
  Alert,
  LinearProgress,
  Divider,
  Grid,
  IconButton
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ProfileTab = () => {
  const [profile, setProfile] = useState({
    name: 'Dinithi Dewmini',
    email: 'dinithi000@gmail.com',
    nic: "200187654123",
    skills: "Cleaning, Gardening, Cooking",
    location: "Colombo",
    avatar: "",
    tasksCompleted: 15,
    rating: 4.7
  });

  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) setProfile(JSON.parse(storedProfile));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev) => ({ ...prev, avatar: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!profile.name || !profile.email || !profile.nic || !profile.skills || !profile.location) {
      setSnackbar({ open: true, message: "All fields are required!", severity: "error" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setSnackbar({ open: true, message: "Invalid email address!", severity: "error" });
      return;
    }
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setEditing(false);
    setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
  };

  const profileCompletion = () => {
    let completed = 0;
    if (profile.name) completed += 16.6;
    if (profile.email) completed += 16.6;
    if (profile.nic) completed += 16.6;
    if (profile.skills) completed += 16.6;
    if (profile.location) completed += 16.6;
    if (profile.avatar) completed += 16.6;
    return Math.round(completed);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={profile.avatar}
              sx={{ width: 100, height: 100, bgcolor: "primary.main", fontSize: 36 }}
            >
              {profile.name[0]}
            </Avatar>
            {editing && (
              <>
                <input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <IconButton
                    color="primary"
                    component="span"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "white",
                      boxShadow: 1,
                      "&:hover": { bgcolor: "grey.100" }
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {profile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {profile.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {profile.nic && <>NIC: {profile.nic}</>}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={profileCompletion()}
              sx={{ height: 10, borderRadius: 5, mt: 1, bgcolor: "#e0e0e0", "& .MuiLinearProgress-bar": { bgcolor: "primary.main" } }}
            />
            <Typography variant="caption" color="text.secondary">
              Profile completion: {profileCompletion()}%
            </Typography>
          </Box>
          {!editing && (
            <Button variant="outlined" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Editable Form */}
        {editing ? (
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="NIC Number"
              name="nic"
              value={profile.nic}
              onChange={handleChange}
              fullWidth
              helperText="Enter your National Identity Card number"
            />
            <TextField
              label="Skills"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              fullWidth
              helperText="Comma separated (e.g. Cleaning, Cooking)"
            />
            <TextField
              label="Location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Skills
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {profile.skills.split(",").map((skill, idx) => (
                      <Chip key={idx} label={skill.trim()} color="primary" size="small" />
                    ))}
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnIcon color="action" />
                    <Typography>{profile.location}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    NIC Number
                  </Typography>
                  <Typography>{profile.nic || "-"}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tasks Completed
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AssignmentTurnedInIcon color="action" />
                    <Typography>{profile.tasksCompleted}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Rating
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <StarIcon color="warning" />
                    <Typography>{profile.rating} / 5</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileTab;
