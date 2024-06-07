'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

import theme from '@app/theme';
import { forgotPassword } from '@/contexts/authService';

const ForgotPassword = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !email.includes('@') || !email.includes('.') || email.length < 5) {
      setError('Invalid email address');
      return;
    }

    try {
      const response = await forgotPassword(email);

      if (response.status === 200) {
        // Remove the access token from the cookie if it exists
        Cookies.remove('access_token', { path: '/' });

        router.push('/login');
      }
    } catch (error) {
      // Ensure error message is a string or extract the first error message from the array
      let errorMessage = 'Something went wrong';
      if (Array.isArray(error.response?.data?.message)) {
        errorMessage = error.response.data.message[0]?.message || errorMessage;
      } else if (typeof error.response?.data?.message === 'string') {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" mt={1}>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" mt={2}>
            Enter your email and we’ll send you an email with a link to reset your password.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send Reset Link
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Remembered? Sign in'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
