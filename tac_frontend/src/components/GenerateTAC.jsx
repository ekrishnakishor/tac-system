import React, { useState } from 'react';
import axios from 'axios';

const GenerateTAC = () => {
    const [tacCode, setTacCode] = useState('');

    const handleGenerateTAC = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/generate-tac/', null, {
                headers: {
                    Authorization: `Token your_token_here`
                }
            });
            console.log(response.data); // Handle success response
            setTacCode(response.data.tac_code); // Update state with generated TAC code
        } catch (error) {
            console.error('Generate TAC error:', error);
        }
    };

    return (
        <div>
            <h2>Generate TAC</h2>
            <button onClick={handleGenerateTAC}>Generate TAC</button>
            {tacCode && <p>TAC Code: {tacCode}</p>}
        </div>
    );
};

export default GenerateTAC;