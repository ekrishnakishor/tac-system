import React from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import GenerateTAC from './components/GenerateTAC';
import VerifyTAC from './components/VerifyTAC';

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <GenerateTAC />
      <VerifyTAC />
    </div>
  );
}

export default App;