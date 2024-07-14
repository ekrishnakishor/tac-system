import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/transactions/${userId}/`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <button onClick={fetchTransactions}>Refresh</button>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.timestamp} - Sent {transaction.amount} to {transaction.receiver_account}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
