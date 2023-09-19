import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Box, Divider, Stack, Typography } from '../../../../node_modules/@mui/material/index';

// Custom styled Button using the provided Button function
const StyledButton = styled(MuiButton)(({ theme }) => {
  const disabledStyle = {
    padding: 10,
    mx: 5
  };

  return {
    fontWeight: 400,
    '&:hover': {
      backgroundColor: theme.palette.primary[400]
    },
    width: '40px',
    '&.MuiButton-contained': {
      ...disabledStyle
    },
    '&.MuiButton-outlined': {
      ...disabledStyle
    }
  };
});

const SymbolCard = ({ symbol }) => {
  return (
    <Stack direction="column">
      <Box sx={{ flexDirection: 'column', flexWrap: 'wrap' }} my={1}>
        <Typography variant="h5">{'Stocks mentioned in this news:'}</Typography>
      </Box>
      <Divider />
      <Box sx={{ flexDirection: 'column', flexWrap: 'wrap' }} my={1}>
        <StyledButton variant="contained" color="primary">
          {symbol}
        </StyledButton>
      </Box>
    </Stack>
  );
};

SymbolCard.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default SymbolCard;
