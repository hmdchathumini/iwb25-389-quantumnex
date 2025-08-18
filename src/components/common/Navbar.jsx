import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'primary.main',
                        fontWeight: 'bold',
                    }}
                >
                    TaskApp
                </Typography>
                {/* Desktop */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Button
                        component={RouterLink}
                        to="/customer-dashboard"
                        color="inherit"
                    >
                        Customer Dashboard
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/worker-dashboard"
                        color="inherit"
                    >
                        Worker Dashboard
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/admin-dashboard"
                        color="inherit"
                    >
                        Admin Dashboard
                    </Button>
                </Box>
                {/* Mobile */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem
                            component={RouterLink}
                            to="/customer-dashboard"
                            onClick={handleMenuClose}
                        >
                            Customer Dashboard
                        </MenuItem>
                        <MenuItem
                            component={RouterLink}
                            to="/worker-dashboard"
                            onClick={handleMenuClose}
                        >
                            Worker Dashboard
                        </MenuItem>
                        <MenuItem
                            component={RouterLink}
                            to="/admin-dashboard"
                            onClick={handleMenuClose}
                        >
                            Admin Dashboard
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;