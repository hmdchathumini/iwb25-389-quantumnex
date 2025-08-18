import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Avatar, Divider } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MapIcon from '@mui/icons-material/Map';
import FeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import BarChartIcon from '@mui/icons-material/BarChart';

const tabConfig = {
    customer: [
        { key: 'postTask', label: 'Post a Task', icon: <AssignmentIcon /> },
        { key: 'taskList', label: 'My Tasks', icon: <ListAltIcon /> },
        { key: 'mapView', label: 'Map View', icon: <MapIcon /> },
    ],
    worker: [
        { key: 'taskfeed', label: 'Available Tasks', icon: <FeedIcon /> },
        { key: 'profile', label: 'Profile', icon: <PersonIcon /> },
        { key: 'mytasks', label: 'My Tasks', icon: <ListAltIcon /> }, // Add this if needed
    ],
    admin: [
        { key: 'users', label: 'Manage Users', icon: <GroupIcon /> },
        { key: 'tasks', label: 'Manage Tasks', icon: <ListAltIcon /> },
        { key: 'payments', label: 'Manage Payments', icon: <PaymentIcon /> },
        { key: 'analytics', label: 'Analytics', icon: <BarChartIcon /> },
    ],
};

const Sidebar = ({ type, activeTab, setActiveTab }) => {
    const tabs = tabConfig[type] || [];
    const drawerWidth = 260;

    return (
        <Drawer
            variant="permanent"
            slotProps={{
                paper: {
                    sx: {
                        width: drawerWidth,
                        bgcolor: 'background.paper',
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                        boxShadow: 6,
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
                    {type && type[0] && type[0].toUpperCase()}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Dashboard
                </Typography>
            </Box>
            <Divider />
            <List sx={{ flexGrow: 1, mt: 2 }}>
                {tabs.map(tab => (
                    <ListItem key={tab.key} disablePadding>
                        <ListItemButton
                            selected={activeTab === tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            sx={{
                                borderRadius: 2,
                                mx: 1,
                                my: 0.5,
                                transition: 'all 0.2s',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'common.white',
                                    boxShadow: 3,
                                    transform: 'scale(1.05)',
                                    '& .MuiListItemIcon-root': { color: 'common.white' },
                                },
                                '&:hover': {
                                    bgcolor: 'primary.light',
                                    color: 'common.white',
                                    transform: 'scale(1.05)',
                                    '& .MuiListItemIcon-root': { color: 'common.white' },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {tab.icon}
                            </ListItemIcon>
                            <ListItemText primary={tab.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 'auto', mb: 2, px: 2 }}>
                <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ opacity: 0.8 }}>
                    &copy; {new Date().getFullYear()} WorkNest
                </Typography>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
