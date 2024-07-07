// src/pages/notFound/NotFound.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
    </Box>
  );
};

export default PageNotFound;
