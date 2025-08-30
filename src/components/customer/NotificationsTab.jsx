import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "worker_accept",
      worker: {
        name: "Nipun Silva",
        telephone: "+94 77 123 4567", // Added telephone
        rating: 4.5,
        skills: ["Cleaning", "Cooking"],
        experience: "2 years",
        completedTasks: 45,
        reviews: 20,
      },
      task: "Cleaning",
      time: "10 mins ago",
      status: "pending", // pending | accepted | rejected
    },
    {
      id: 2,
      type: "reminder",
      text: "Cooking task scheduled tomorrow at 10 AM.",
      time: "5 hours ago",
    },
  ]);

  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleDecision = (id, decision) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: decision } : n))
    );
    setSelectedWorker(null); // close modal after decision
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={6}
        sx={{ p: 3, borderRadius: 4, maxWidth: 700, mx: "auto" }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          🔔 Notifications
        </Typography>

        <List>
          {notifications.map((n, index) => (
            <React.Fragment key={n.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {n.type === "worker_accept" ? <PersonIcon /> : "!"}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    n.type === "worker_accept"
                      ? `${n.worker.name} wants to take your "${n.task}" task`
                      : n.text
                  }
                  secondary={n.time}
                />

                {n.type === "worker_accept" && (
                  <Stack direction="row" spacing={1}>
                    {n.status === "pending" ? (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<InfoIcon />}
                          onClick={() => setSelectedWorker({ ...n.worker, notifId: n.id })}
                        >
                          View Details
                        </Button>
                      </>
                    ) : n.status === "accepted" ? (
                      <Typography color="green" fontWeight="bold">
                        ✅ Worker Accepted
                      </Typography>
                    ) : (
                      <Typography color="error" fontWeight="bold">
                        ❌ Worker Rejected
                      </Typography>
                    )}
                  </Stack>
                )}
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Worker Details Modal */}
      {selectedWorker && (
        <Dialog open onClose={() => setSelectedWorker(null)} maxWidth="sm" fullWidth>
          <DialogTitle>👨‍🔧 Worker Details</DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6">{selectedWorker.name}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Telephone:</strong> {selectedWorker.telephone}
            </Typography>
            <Rating value={selectedWorker.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ⭐ {selectedWorker.rating} ({selectedWorker.reviews} reviews)
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>Skills:</strong> {selectedWorker.skills.join(", ")}
            </Typography>
            <Typography>
              <strong>Experience:</strong> {selectedWorker.experience}
            </Typography>
            <Typography>
              <strong>Completed Tasks:</strong> {selectedWorker.completedTasks}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={() => handleDecision(selectedWorker.notifId, "accepted")}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={() => handleDecision(selectedWorker.notifId, "rejected")}
            >
              Reject
            </Button>
            <Button onClick={() => setSelectedWorker(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
