import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from '../components/Layout';
import users from '../data/users.json'; // Correctly import users data

const ViewTransactions = () => {
    const { state } = useLocation();
    const user = state?.user;
    const transactions = state?.transactions || [];

    if (!user) {
        return null;
    }

    const getRecipientDetails = (accountNumber) => {
        const recipient = users.find(u => u.bankAccount === accountNumber);
        return recipient ? {
            name: recipient.name,
            email: recipient.email,
            username: recipient.username,
        } : { name: '', email: '', username: '' };
    };

    return (
        <Layout user={user} transactions={transactions}>
            <Container sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>Past Transactions</Typography>
                {transactions.length === 0 ? (
                    <Typography variant="body1">No transactions found.</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Account Number</TableCell>
                                    {/* <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Recipient Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Recipient Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Recipient Username</TableCell> */}
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Amount</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>TAN</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction, index) => {
                                    const recipientDetails = getRecipientDetails(transaction.account);
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{transaction.account}</TableCell>
                                            {/* <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{recipientDetails.name}</TableCell>
                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{recipientDetails.email}</TableCell>
                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{recipientDetails.username}</TableCell> */}
                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>${transaction.amount}</TableCell>
                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{transaction.tan}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Layout>
    );
};

export default ViewTransactions;
