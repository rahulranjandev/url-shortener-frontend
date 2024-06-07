import React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import Cookies from 'js-cookie';

import { logout } from '@contexts/authService';
import { getUser } from '@contexts/userService';

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = React.useState('');

  const token = Cookies.get('access_token');

  React.useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await getUser(token);

          if (response.status === 200 && response.data.data) {
            setUser(response.data.data);
          } else {
            router.push('/login');
          }
        } catch (error) {
          setError(error.message);
        }
      };
      fetchUser();
    }
  }, [router, token]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      const response = await logout(token);

      if (response.status === 200) {
        setUser(null); // Clear user data
        Cookies.remove('access_token');
        router.push('/login');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSettings = () => {
    handleClose();
    router.push('/settings/profile');
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleRegister = () => {
    router.push('/signup');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          {user ? (
            <>
              <IconButton onClick={handleHome} color="inherit">
                <HomeIcon />
              </IconButton>
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar alt={user.name} src={user.avatar} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleRegister}>
                Register
              </Button>
              <Button color="inherit" href="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
