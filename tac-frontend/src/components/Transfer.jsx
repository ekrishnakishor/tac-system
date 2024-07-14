import React, { useState } from 'react';
import axios from 'axios';

const Transfer = () => {
    const [receiverAccount, setReceiverAccount] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [amount, setAmount] = useState('');
    const [tan, setTan] = useState('');

    const handleGenerateTan = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/generate_tan/${userId}/`);
            setTan(response.data.tan);
        } catch (error) {
            console.error('Error generating TAN', error);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        try {
            await axios.post('http://localhost:8000/api/transfer/', {
                sender_id: userId,
                receiver_account: receiverAccount,
                ifsc,
                amount,
                tan
            });
            alert('Transfer successful');
        } catch (error) {
            console.error('Error transferring money', error);
        }
    };

    return (
        <div>
            <h2>Transfer Money</h2>
            <form onSubmit={handleTransfer}>
                <input
                    type="text"
                    placeholder="Receiver Account Number"
                    value={receiverAccount}
                    onChange={(e) => setReceiverAccount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="IFSC Code"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                />
                <button type="button" onClick={handleGenerateTan}>Generate TAN</button>
                <p>TAN: {tan}</p>
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Transfer;
