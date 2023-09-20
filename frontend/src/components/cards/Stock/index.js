import MainCard from 'components/MainCard';
import React from 'react';
import { Grid, Box, Stack, Card, Typography } from '@mui/material';
import StockPriceChart from './chart/price/index';
import { styled } from '@mui/material/styles';

const StockCard = ({ symbol }) => {
  const StockCardHeaderType = styled(Typography)({
    color: 'black',
    marginBottom: 12,
    marginLeft: 20
  });

  const ValuesContainer = styled(Card)(({ theme }) => ({
    border: `10px solid ${theme.palette.primary[200]}`,
    borderRadius: 10
  }));

  return (
    <MainCard>
      <Stack>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <ValuesContainer>
              <StockCardHeaderType my={1} variant="h5">{`${symbol} Chart`}</StockCardHeaderType>
              <Grid>
                {' '}
                {/* Adjusted width for sm */}
                <Box sx={{ maxWidth: '100%' }}>
                  {' '}
                  {/* Adjusted maxWidth */}
                  <StockPriceChart height={200} />
                </Box>
              </Grid>
              <Grid>
                {' '}
                {/* Adjusted width for sm */}
                <StockCardHeaderType variant="h5">Ratios</StockCardHeaderType>
                <Box sx={{display:"flex", flexWrap:"wrap"}}>
                                      
                </Box>
              </Grid>
            </ValuesContainer>
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default StockCard;
