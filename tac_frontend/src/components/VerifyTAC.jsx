import React, { useState } from 'react';
import axios from 'axios';

const VerifyTAC = () => {
    const [tacCode, setTacCode] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');

    const handleVerifyTAC = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verify-tac/', {
                tac_code: tacCode
            }, {
                headers: {
                    Authorization: `Token your_token_here`
                }
            });
            console.log(response.data); // Handle success response
            setVerificationStatus(response.data.status);
        } catch (error) {
            console.error('Verify TAC error:', error);
        }
    };

    return (
        <div>
            <h2>Verify TAC</h2>
            <input type="text" placeholder="Enter TAC Code" value={tacCode} onChange={(e) => setTacCode(e.target.value)} required />
            <button onClick={handleVerifyTAC}>Verify TAC</button>
            {verificationStatus && <p>Verification Status: {verificationStatus}</p>}
        </div>
    );
};

export default VerifyTAC;