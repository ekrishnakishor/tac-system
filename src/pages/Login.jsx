import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.json';
import { Container, TextField, Button, Typography } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Attempting login with:', { username, password });
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            console.log('User found:', user);
            navigate('/dashboard', { state: { user } });
        } else {
            console.log('Invalid credentials');
            alert('Invalid credentials');
        }
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth margin="normal" />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </Container>
    );
};

export default Login;
