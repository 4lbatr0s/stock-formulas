import MainCard from 'components/MainCard';
import React from 'react';
import { Grid, Box, Stack, Card, Typography } from '@mui/material';
import StockPriceChart from './chart/price/index';
import { styled } from '@mui/material/styles';
import RatioKeyValueCard from './ratio/ratio-key-value/index';
import labelToNames from './ratio/ratio-key-value/labelToNames';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { CircularProgress, Tooltip } from '../../../../node_modules/@mui/material/index';
import { fetchStocksData } from 'store/query/StockQueries';
import { useQuery } from '@tanstack/react-query';

const StockCard = ({ symbol }) => {
  const {
    data: stock,
    isError,
    isLoading
  } = useQuery(['stockData'], async () => {
    const response = await fetchStocksData(symbol);
    console.log('RESPONSE DATA: ', response);
    return response;
  });

  const theme = useTheme();
  const StockCardHeaderType = styled(Typography)({
    color: 'black',
    marginBottom: 12,
    marginLeft: 20
  });

  const ValuesContainer = styled(Card)(({ theme }) => ({
    border: `5px solid ${theme.palette.primary[400]}`,
    borderRadius: 10,
    marginBottom: 15
  }));

  const NewsContainer = styled(Card)(({ theme }) => ({
    border: `5px solid ${theme.palette.primary[400]}`,
    borderRadius: 10
  }));

  const MoreInformationContainer = styled(Card)(({ theme }) => ({
    border: `5px solid ${theme.palette.primary[400]}`,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }));

  const valuesNotToInclude = ['updatedAt', 'ratioLink', 'createdAt', 'industry', 'stockSymbol', 'country', '_id', 'ratioLink', 'market'];

  const renderRatioKeysAndValues = (stock) => {
    const result = Object.keys(stock)
      .filter((key) => !valuesNotToInclude.includes(key))
      .map((key) => {
        const value = stock[key]?.values?.[0] && stock[key]?.values?.[0] !== '-' ? stock[key].values[0] : 'N/A';
        return <RatioKeyValueCard theme={theme} key={key} ratioKey={labelToNames[key]} ratioValue={value} />;
      });

    return result;
  };

  const conditionalRendering = (isLoading, isError) => {
    if (isLoading) {
      return <CircularProgress />;
    } else if (isError) {
      return <div>Error fetching stock data</div>;
    }
    return (
      <Stack>
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={8}>
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
                {/* Adjusted width for sm */}
                <StockCardHeaderType variant="h5">Ratios</StockCardHeaderType>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{renderRatioKeysAndValues(stock)}</Box>
              </Grid>
            </ValuesContainer>
            <MoreInformationContainer>
              <StockCardHeaderType my={1} variant="h5">
                {'For More Information:'}
              </StockCardHeaderType>
              <Tooltip title={'Go to website'}>
                <StockCardHeaderType
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.primary[200],
                      padding: 2,
                      borderRadius: 5,
                      cursor: 'pointer'
                    }
                  }}
                  component={Link}
                  my={1}
                  variant="h6"
                  to={stock?.ratioLink}
                  target="_blank"
                >
                  {stock?.ratioLink}
                </StockCardHeaderType>
              </Tooltip>
            </MoreInformationContainer>
          </Grid>
          <Grid item xs={3}>
            <NewsContainer>
              <StockCardHeaderType my={1} variant="h5">
                {`News About ${symbol}`}
              </StockCardHeaderType>
            </NewsContainer>
          </Grid>
        </Grid>
      </Stack>
    );
  };

  return <MainCard sx={{ display: 'flex', justifyContent: 'center' }}>{conditionalRendering(isLoading, isError)}</MainCard>;
};

export default StockCard;
