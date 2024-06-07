'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

import theme from '@app/theme';
import { createUrl, getUrls, deleteUrl, updateUrl } from '@contexts/urlService';
import Navbar from '@/components/Navbar';
import Footer from '@components/Footer';

const URLShortener = () => {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [urls, setUrls] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editingUrl, setEditingUrl] = useState('');

  const token = Cookies.get('access_token');

  useEffect(() => {
    const fetchUrls = async () => {
      if (token) {
        try {
          const response = await getUrls(token);

          if (response.data.data && Array.isArray(response.data.data)) {
            setUrls(response.data.data);
          } else {
            console.error('Unexpected response format:', response.data.message);
            setError(response.data.message);
          }
        } catch (error) {
          console.error('Failed to fetch URLs:', error);
        }
      } else {
        router.push('/login');
      }
    };
    fetchUrls();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!url || url.length < 5 || !url.includes('.')) {
      setError('URL is required');
      return;
    }
    if (url.length > 2048) {
      setError('URL must be less than 2048 characters');
      return;
    }

    if (token) {
      try {
        const response = await createUrl(token, { originalUrl: url });

        setShortUrl(response.data.data.shortUrl);
        setUrls([...urls, response.data.data]);

        setUrl('');
        setError('');
      } catch (error) {
        let errorMessage = 'Something went wrong';
        if (Array.isArray(error.response?.data?.message)) {
          errorMessage = error.response.data.message[0]?.message || errorMessage;
        } else if (typeof error.response?.data?.message === 'string') {
          errorMessage = error.response.data.message;
        }
        setError(errorMessage);
        setShortUrl('');
      }
    } else {
      router.push('/login');
    }
  };

  const handleUpdate = async (urlCode) => {
    if (editingUrl === urls.find((url) => url.urlCode === urlCode).originalUrl) {
      setEditing(null);
      return;
    }

    if (!editingUrl || editingUrl.length < 5 || !editingUrl.includes('.')) {
      setError('URL is required');
      return;
    }

    if (editingUrl.length > 2048) {
      setError('URL must be less than 2048 characters');
      return;
    }

    if (token) {
      try {
        const response = await updateUrl(token, urlCode, { originalUrl: editingUrl });

        setUrls(urls.map((url) => (url.urlCode === urlCode ? response.data : url)));
        setEditing(null);

        setEditingUrl('');
        setError('');
      } catch (error) {
        let errorMessage = 'Something went wrong';
        if (Array.isArray(error.response?.data?.message)) {
          errorMessage = error.response.data.message[0]?.message || errorMessage;
        } else if (typeof error.response?.data?.message === 'string') {
          errorMessage = error.response.data.message;
        }
        setError(errorMessage);
      }
    } else {
      router.push('/login');
    }
  };

  const handleDelete = async (urlCode) => {
    if (token) {
      try {
        await deleteUrl(token, urlCode);
        setUrls(urls.filter((url) => url.urlCode !== urlCode));
        setError('');
      } catch (error) {
        let errorMessage = 'Something went wrong';
        if (Array.isArray(error.response?.data?.message)) {
          errorMessage = error.response.data.message[0]?.message || errorMessage;
        } else if (typeof error.response?.data?.message === 'string') {
          errorMessage = error.response.data.message;
        }
        setError(errorMessage);
      }
    } else {
      router.push('/login');
    }
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard');
    } catch (err) {
      setError('Failed to copy URL');
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
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            URL Shortener
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="url"
              label="Enter URL"
              name="url"
              autoComplete="url"
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create URL
            </Button>
          </Box>
          {shortUrl && (
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">Shortened URL:</Typography>
              <Typography variant="body1" color="primary" sx={{ ml: 2 }}>
                <Link href={shortUrl} underline="hover" target="_blank" rel="noopener">
                  {shortUrl}
                </Link>
              </Typography>
              <IconButton color="primary" onClick={() => handleCopy(shortUrl)} sx={{ ml: 2 }}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ mt: 5, width: '100%' }}>
            <Typography component="h2" variant="h6">
              Your URLs
            </Typography>
            {urls.map((urlItem) => (
              <Card key={urlItem.urlCode} sx={{ mt: 2, width: '100%' }}>
                <CardContent>
                  {editing === urlItem.urlCode ? (
                    <>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={`url-${urlItem.urlCode}`}
                        label="Edit URL"
                        name={`url-${urlItem.urlCode}`}
                        autoComplete="url"
                        value={editingUrl}
                        onChange={(e) => setEditingUrl(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(urlItem.urlCode)}
                        sx={{ mt: 2 }}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1">
                        <strong>Original URL:</strong> {urlItem.originalUrl}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Short URL: </strong>
                        <Link href={urlItem.shortUrl} underline="hover" target="_blank" rel="noopener">
                          {' '}
                          {urlItem.shortUrl}
                        </Link>
                        <IconButton color="primary" onClick={() => handleCopy(urlItem.shortUrl)} sx={{ ml: 1 }}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Typography>
                      <Typography variant="body1">
                        <strong>Click Count:</strong> {urlItem.clickCount}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Created:</strong> {dayjs(urlItem.createdAt).format('MMMM D, YYYY h:mm A')}
                      </Typography>
                    </>
                  )}
                </CardContent>
                <CardActions>
                  {editing !== urlItem.urlCode && (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditing(urlItem.urlCode);
                          setEditingUrl(urlItem.originalUrl);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(urlItem.urlCode)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default URLShortener;
