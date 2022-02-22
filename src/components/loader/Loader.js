import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '90vh'}}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;