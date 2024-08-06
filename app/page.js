// pages/index.js
"use client";
import * as React from 'react';
import { Container, Grid, Paper, Typography, Box, CssBaseline, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login'); // Adjust the path based on your actual login route
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 8,
        mb: 4,
        textAlign: 'center',
        backgroundImage: 'url(/path/to/your/image.jpg)', // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to PAK PANTRY
          </Typography>
          <Typography variant="h5" paragraph>
            Your ultimate pantry management solution.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            onClick={handleGetStarted}
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Track Your Pantry
              </Typography>
              <Typography>
                Easily keep track of what you have in your pantry and avoid unnecessary purchases.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Plan Your Meals
              </Typography>
              <Typography>
                Plan meals based on the ingredients you already have and reduce food waste.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Shop Smart
              </Typography>
              <Typography>
                Create smart shopping lists that help you buy only what you need.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
