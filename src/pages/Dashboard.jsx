import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Paper } from '@mui/material';
import Layout from '../components/Layout';

const Dashboard = () => {
    const { state } = useLocation();
    const user = state?.user;
    const transactions = state?.transactions || [];

    if (!user) {
        return null;
    }

    return (
        <Layout user={user} transactions={transactions}>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 500, padding: 2, textAlign: 'left', margin: 'auto' }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
                    <Typography variant="body1"><strong>Username:</strong> {user.username}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                    <Typography variant="body1"><strong>Bank Account:</strong> {user.account}</Typography>
                    <Typography variant="body1"><strong>IFSC Code:</strong> {user.ifsc}</Typography>
                    <Typography variant="body1"><strong>Account Balance:</strong> ${user.balance}</Typography>
                    <Typography variant="body1"><strong>TAN:</strong> {user.tan}</Typography>
                </Box>
            </Paper>
        </Layout>
    );
};

export default Dashboard;
