import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 500, padding: 2, textAlign: "center" }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to ABC Bank
        </Typography>
        <Box sx={{ my: 2 }}>
          <img
            src="https://t3.ftcdn.net/jpg/02/05/99/96/360_F_205999626_lROBmyXNcy9LummfETWbEI0XvFBhxpEZ.jpg"
            alt="ABC Bank"
            style={{ maxWidth: "100%" }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
          fullWidth
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Landing;
