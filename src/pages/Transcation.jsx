import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { generateTAN } from '../utils/vigenereCipher';
import Layout from '../components/Layout';

const Transaction = () => {
    const { state } = useLocation();
    const user = state?.user;
    const transactions = state?.transactions || [];
    const navigate = useNavigate();
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [tan, setTan] = useState('');

    if (!user) {
        navigate('/');
        return null;
    }

    const handleGenerateTAN = () => {
        const newTAN = generateTAN(user.username, user.tan); // Generate a TAN using Vigenère cipher
        setTan(newTAN);
    };

    const handleTransfer = () => {
        const transferAmount = parseFloat(amount);
        if (transferAmount > user.balance) {
            alert('Insufficient balance.');
            return;
        }

        const newTransaction = {
            account,
            amount: transferAmount,
            tan,
            recipient: {
                name: 'Recipient Name', // Fetch or hardcode recipient details
                email: 'recipient@example.com',
                username: 'recipient_username'
            }
        };

        // Update user's balance
        const updatedUser = { ...user, balance: user.balance - transferAmount };
        const updatedTransactions = [...transactions, newTransaction];

        alert(`Transferred ${amount} to account ${account}`);
        navigate('/dashboard', { state: { user: updatedUser, transactions: updatedTransactions } });
    };

    return (
        <Layout user={user} transactions={transactions}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h4" gutterBottom>Transfer Money</Typography>
                <Paper elevation={3} sx={{ width: '100%', maxWidth: 500, padding: 2 }}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            label="Recipient Account"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleGenerateTAN} fullWidth sx={{ mt: 2 }}>
                            Generate TAN
                        </Button>
                        <TextField
                            label="TAN"
                            value={tan}
                            onChange={(e) => setTan(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{ mt: 2 }}
                        />
                    </Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleTransfer} 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Pay
                    </Button>
                </Paper>
            </Container>
        </Layout>
    );
};

export default Transaction;
