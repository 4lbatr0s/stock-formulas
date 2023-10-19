import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Box, Divider, Stack, Tooltip, Typography } from '../../../../node_modules/@mui/material/index';
import { useNavigate } from 'react-router-dom';
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

const SymbolCard = ({ symbols }) => {
  const navigate = useNavigate();
  const handleButtonClick = (symbol) => {
    return navigate(`/stock/${symbol}`);
  };

  return (
    <Stack direction="column">
      <Box sx={{ flexDirection: 'column', flexWrap: 'wrap' }} my={1}>
        <Typography variant="h5">{'Stocks mentioned in this news:'}</Typography>
      </Box>
      <Divider />
      <Box sx={{ flexDirection: 'column', flexWrap: 'wrap'}} my={1}>
        {symbols.map((symbol, index) => {
          return (
            <Tooltip  key={index} title="Go to stock details">
              <StyledButton variant="contained" color="primary" onClick={()=> handleButtonClick(symbol)}>
                {symbol}
              </StyledButton>
            </Tooltip>
          );
        })}
      </Box>
    </Stack>
  );
};

SymbolCard.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default SymbolCard;
