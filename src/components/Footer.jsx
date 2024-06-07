'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        top: 12,
        py: 3,
        textAlign: 'center',
        mt: 'auto',
        backgroundColor: '#f1f1f1',
        width: '100%',
        position: 'relative',
        bottom: 0,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} bitwisebeat.tech URL Shortener. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
