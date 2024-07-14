import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [bankDetails, setBankDetails] = useState({});

    useEffect(() => {
        const fetchBankDetails = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/dashboard/${userId}/');
                setBankDetails(response.data);
            } catch (error) {
                console.error('Error fetching bank details', error);
            }
        };

        fetchBankDetails();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Bank Name: {bankDetails.bank_name}</p>
            <p>Account Number: {bankDetails.account_number}</p>
            <p>IFSC Code: {bankDetails.ifsc_code}</p>
            <p>Balance: {bankDetails.balance}</p>
            <button onClick={() => window.location.href = '/transfer'}>Transfer Money</button>
        </div>
    );
};

export default Dashboard;
