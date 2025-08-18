import { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ensure leaflet CSS is loaded in the document head (for some setups)
if (typeof window !== "undefined" && !document.getElementById("leaflet-css")) {
  const link = document.createElement("link");
  link.id = "leaflet-css";
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet/dist/leaflet.css";
  document.head.appendChild(link);
}

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DUMMY_TASKS = [
  {
    id: 1,
    title: "Clean Front Garden",
    description: "2 hours weeding and sweeping. Tools available.",
    budget: 2000,
    lat: 6.9271,
    lng: 79.8612,
    status: "Pending",
  },
  {
    id: 2,
    title: "Car Wash",
    description: "Exterior + vacuum. Preferred today evening.",
    budget: 1500,
    lat: 6.9291,
    lng: 79.8625,
    status: "Pending",
  },
  {
    id: 3,
    title: "Grocery Pickup",
    description: "Keells - list provided. Reimburse on delivery.",
    budget: 800,
    lat: 6.9300,
    lng: 79.8640,
    status: "In Progress",
  },
];

const MapViewTab = () => {
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAcceptTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "In Progress" } : task
      )
    );
    setSnackbar({
      open: true,
      message: "Task accepted!",
      severity: "success",
    });
  };

  return (
    <Box sx={{ p: 3, height: "100%" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Nearby Tasks
      </Typography>
      <Box sx={{ height: "500px", width: "100%", borderRadius: 2, overflow: "hidden", mb: 2 }}>
        <MapContainer
          center={[6.9271, 79.8612]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {tasks.map((task) => (
            <Marker key={task.id} position={[task.lat, task.lng]}>
              <Popup>
                <Typography variant="subtitle1">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="body2" fontWeight="bold">
                  Rs. {task.budget}
                </Typography>
                <Typography variant="body2">Status: {task.status}</Typography>
                {task.status === "Pending" && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => handleAcceptTask(task.id)}
                  >
                    Accept Task
                  </Button>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
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

export default MapViewTab;
