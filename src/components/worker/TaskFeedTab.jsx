import { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
Box,
Typography,
Grid,
Card,
CardContent,
CardActions,
Button,
Chip,
TextField,
MenuItem,
Snackbar,
Alert,
Skeleton,
createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// Example theme, you can customize as needed
const theme = createTheme({
palette: {
    primary: {
        main: "#1976d2",
    },
    background: {
        default: "#f4f6fa",
    },
},
shape: {
    borderRadius: 16,
},
});

const mockTasks = [
{
    id: 1,
    title: "Clean Living Room",
    description: "Vacuum and dust all surfaces in the living room.",
    date: "2024-06-10",
    provider: "John Doe",
    reward: 200,
    status: "Pending",
    distanceKm: 2.5,
},
{
    id: 2,
    title: "Wash Dishes",
    description: "Wash and dry all dishes in the kitchen sink.",
    date: "2024-06-11",
    provider: "Jane Smith",
    reward: 100,
    status: "In Progress",
    distanceKm: 1.2,
},
{
    id: 3,
    title: "Laundry",
    description: "Wash, dry, and fold clothes.",
    date: "2024-06-12",
    provider: "Alice Johnson",
    reward: 250,
    status: "Completed",
    distanceKm: 3.8,
},
];

export default function TaskFeedTab() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
});

useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setTasks(mockTasks);
        setLoading(false);
    }, 900);
}, []);

const handleAcceptTask = (taskId) => {
    setTasks((prev) =>
        prev.map((t) =>
            t.id === taskId && t.status === "Pending"
                ? { ...t, status: "In Progress" }
                : t
        )
    );
    setSnackbar({
        open: true,
        message: "Task accepted!",
        severity: "success",
    });
};

const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
        statusFilter === "All" ? true : task.status === statusFilter;
    return matchesSearch && matchesStatus;
});

return (
    <ThemeProvider theme={theme}>
        <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "background.default", minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
                Available Tasks
            </Typography>

            {/* Filters */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1, minWidth: 200 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                    select
                    size="small"
                    label="Filter by Status"
                    sx={{ minWidth: 160 }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    {["All", "Pending", "In Progress", "Completed"].map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            {loading ? (
                <Grid container spacing={3}>
                    {[1, 2, 3].map((n) => (
                        <Grid item xs={12} sm={6} md={4} key={n}>
                            <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 4 }} />
                        </Grid>
                    ))}
                </Grid>
            ) : filteredTasks.length === 0 ? (
                <Typography sx={{ mt: 5, textAlign: "center" }}>No tasks found 😢</Typography>
            ) : (
                <Grid container spacing={4}>
                    {filteredTasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    boxShadow: 6,
                                    transition: "0.3s",
                                    "&:hover": { boxShadow: 12, transform: "translateY(-8px) scale(1.02)" },
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%",
                                    bgcolor: "#fff",
                                    p: 2,
                                }}
                            >
                                <CardContent sx={{ pb: 1 }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                            background: "linear-gradient(90deg, #2196f3, #21cbf3)",
                                            WebkitBackgroundClip: "text",
                                            color: "transparent",
                                            fontWeight: 700,
                                            mb: 1,
                                            letterSpacing: 0.5,
                                        }}
                                    >
                                        {task.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        component="p"
                                        sx={{ mb: 2, minHeight: 48 }}
                                    >
                                        {task.description}
                                    </Typography>

                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, mb: 1 }}>
                                        <Chip
                                            icon={<CalendarMonthIcon />}
                                            label={task.date}
                                            size="small"
                                            color="info"
                                            sx={{ fontWeight: 500, px: 1.2 }}
                                        />
                                        <Chip
                                            icon={<PersonIcon />}
                                            label={task.provider}
                                            size="small"
                                            color="primary"
                                            sx={{ fontWeight: 500, px: 1.2 }}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
                                        <Chip
                                            icon={<AttachMoneyIcon />}
                                            label={`Rs.${task.reward}`}
                                            size="small"
                                            color="success"
                                            sx={{ fontWeight: 500, px: 1.2 }}
                                        />
                                        <Chip
                                            label={task.status}
                                            size="small"
                                            color={
                                                task.status === "Completed"
                                                    ? "success"
                                                    : task.status === "In Progress"
                                                    ? "warning"
                                                    : "primary"
                                            }
                                            sx={{
                                                fontWeight: 500,
                                                px: 1.2,
                                                bgcolor:
                                                    task.status === "Completed"
                                                        ? "#e8f5e9"
                                                        : task.status === "In Progress"
                                                        ? "#fff3e0"
                                                        : "#e3f2fd",
                                                color:
                                                    task.status === "Completed"
                                                        ? "#2e7d32"
                                                        : task.status === "In Progress"
                                                        ? "#ed6c02"
                                                        : "#1976d2",
                                            }}
                                        />
                                        <Chip
                                            label={`${task.distanceKm} km`}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 500, px: 1.2 }}
                                        />
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ pt: 0, pb: 1, px: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleAcceptTask(task.id)}
                                        disabled={task.status !== "Pending"}
                                        sx={{
                                            borderRadius: 3,
                                            fontWeight: 600,
                                            py: 1.2,
                                            fontSize: "1rem",
                                            boxShadow: "none",
                                            textTransform: "none",
                                            bgcolor: task.status === "Pending" ? "primary.main" : "grey.300",
                                            color: task.status === "Pending" ? "#fff" : "grey.700",
                                            "&:hover": {
                                                bgcolor: task.status === "Pending" ? "primary.dark" : "grey.400",
                                            },
                                            transition: "background 0.2s",
                                        }}
                                    >
                                        {task.status === "Pending" ? "Accept Task" : "Assigned"}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

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
    </ThemeProvider>
);
}
