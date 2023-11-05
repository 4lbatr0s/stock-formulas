import React from 'react';
import { Box } from '@mui/material';
import UnAuthorizedGif from '../../assets/gifs/403.gif';

const Unauthorized = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
      <img src={UnAuthorizedGif} alt="Unauthorized GIF" />
    </Box>
  );
};

export default Unauthorized;
