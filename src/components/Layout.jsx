import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';

const Layout = ({ children, user, transactions }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleNavigation = (path) => {
        navigate(path, { state: { user, transactions } });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        ABC Bank
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button onClick={() => handleNavigation('/dashboard')}>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/transaction')}>
                            <ListItemText primary="Transfer Money" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/view-transactions')}>
                            <ListItemText primary="View Transactions" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
