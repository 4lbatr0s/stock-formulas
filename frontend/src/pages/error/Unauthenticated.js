import React from 'react';
import { Box } from '@mui/material';
import UnauthenticatedGif from '../../assets/gifs/401.gif';

const Unauthenticated = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
      <img src={UnauthenticatedGif} alt="Unauthenticated GIF" />
    </Box>
  );
};

export default Unauthenticated;
