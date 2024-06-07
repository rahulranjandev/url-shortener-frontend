'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

import theme from '@app/theme';
import Navbar from '@/components/Navbar';
import Footer from '@components/Footer';
import { getUser, updateUser } from '@contexts/userService';

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = Cookies.get('access_token');

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await getUser(token);

          if (response.status === 200 && response.data.data) {
            setUser(response.data.data);
            setEmail(response.data.data.email);
          } else {
            router.push('/login');
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      } else {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  useEffect(() => {
    if (user) {
      setIsEmailChanged(email !== user.email);
    }
  }, [email, user]);

  useEffect(() => {
    setIsPasswordChanged(currentPassword !== '' || newPassword !== '' || confirmNewPassword !== '');
  }, [currentPassword, newPassword, confirmNewPassword]);

  const handleEmailUpdate = async () => {
    if (email === user.email) {
      setErrorMessage('Email address has not been changed');
      return;
    } else if (!email || !email.includes('@')) {
      setErrorMessage('Invalid email address');
      return;
    }

    if (token) {
      try {
        const response = await updateUser(token, { email });

        if (response.status === 200 && response.data.data) {
          setEmail(response.data.data.email);

          setSuccessMessage('Verification email has been sent to your new email address.');
        }
      } catch (error) {
        // Ensure error message is a string or extract the first error message from the array
        let errorMessage = 'Something went wrong';
        if (Array.isArray(error.response?.data?.message)) {
          errorMessage = error.response.data.message[0]?.message || errorMessage;
        } else if (typeof error.response?.data?.message === 'string') {
          errorMessage = error.response.data.message;
        }
        setErrorMessage(errorMessage);
      }
    } else {
      router.push('/login');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords don't match");
      return;
    }

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage('New password must be different from the current password');
      return;
    }

    if (token) {
      try {
        const response = await updateUser(token, { currentPassword, newPassword });

        if (response.status === 200) {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');

          setSuccessMessage(response.data.message || 'Password updated successfully.');
        }
      } catch (error) {
        // Ensure error message is a string or extract the first error message from the array
        let errorMessage = 'Something went wrong';
        if (Array.isArray(error.response?.data?.message)) {
          errorMessage = error.response.data.message[0]?.message || errorMessage;
        } else if (typeof error.response?.data?.message === 'string') {
          errorMessage = error.response.data.message;
        }
        setErrorMessage(errorMessage);
      }
    } else {
      router.push('/login');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  if (!user) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4">
            Profile
          </Typography>
          <Card sx={{ width: '100%', mt: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar src={user.avatar} sx={{ width: 96, height: 96, mr: 3 }} />
                <Box>
                  <Typography component="h2" variant="h5">
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {user.verified ? 'Verified Account' : 'Unverified Account'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Since: {new Date(user.resgisteredDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Typography component="h2" variant="h6" sx={{ mt: 4 }}>
                Preferences
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 3 }}>
                <Typography component="h3" variant="subtitle1">
                  Email addresses
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleEmailUpdate}
                  disabled={!isEmailChanged}
                >
                  Update Email
                </Button>
              </Box>
              <Typography component="h2" variant="h6" sx={{ mt: 4 }}>
                Security & authentication
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box component="form" onSubmit={handlePasswordChange} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Current password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="New password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Confirm new password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={!isPasswordChanged}>
                  Change password
                </Button>
              </Box>
              <Button variant="outlined" color="error" sx={{ mt: 2 }}>
                Delete account
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Footer />
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Profile;
