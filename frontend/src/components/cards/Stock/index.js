import MainCard from 'components/MainCard';
import React, {  memo, useMemo } from 'react';
import { Grid, Box, Stack, Card, Typography } from '@mui/material';
import StockPriceChart from './chart/price/index';
import { styled } from '@mui/material/styles';
import RatioKeyValueCard from './ratio/ratio-key-value/index';
import labelToNames from './ratio/ratio-key-value/labelToNames';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { CircularProgress, Tooltip } from '../../../../node_modules/@mui/material/index';
import { fetchHistoricalData, fetchStocksData, fetchStocksNews } from 'store/query/StockQueries';
import { useQuery } from '@tanstack/react-query';
import StockDetailNewsCard from '../news/StockDetailNewsCard';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';




const CurrentPrice = ({ currentPrice}) => (
  <Typography variant="h5">{`${parseFloat(currentPrice).toFixed(3)}$`}</Typography>
);

const MemoizedCurrentPrice = memo(CurrentPrice);

const StockCard = ({ symbol, currentPrice }) => {

  // const backendWebSocketURL = 'ws://localhost:5080';
  // const socket = new WebSocket(backendWebSocketURL);
  // socket.onopen = () => {
  //   socket.send(JSON.stringify(symbol));
  //   console.log('DATA BEING SENT: ', JSON.stringify(symbol));
  //   console.log('Connection is Establisted from frontend!!!!!!');
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setCurrentPrice(data);
  //   };
  // };
  const {
    data: stock,
    isError: isErrorStockData,
    isLoading: isLoadingStockData
  } = useQuery(['stockData', symbol], async () => {
    const response = await fetchStocksData(symbol);
    return response;
  });

  const { data: stockNews } = useQuery(['stockNews', symbol], async () => {
    const response = await fetchStocksNews(symbol);
    return response;
  });

  const {
    data: historicalData,
    isError: isErrorhistoricalData,
    isLoading: isLoadinghistoricalData
  } = useQuery(['historicalData', symbol], async () => {
    const response = await fetchHistoricalData(symbol);
    return response;
  });

  const theme = useTheme();
  const StockCardHeaderType = styled(Typography)({
    color: 'black',
    marginBottom: 12,
    marginLeft: 20
  });

  const ValuesContainer = styled(Card)(() => ({
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
    if (stock) {
      const result = Object.keys(stock)
        .filter((key) => !valuesNotToInclude.includes(key))
        .map((key) => {
          const value = stock[key]?.values?.[0] && stock[key]?.values?.[0] !== '-' ? stock[key].values[0] : 'N/A';
          return <RatioKeyValueCard theme={theme} key={key} ratioKey={labelToNames[key]} ratioValue={value} />;
        });

      return result;
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const renderStockNews = (news, isLoadingStockNews, isErrorStockNews) => {
    if (isLoadingStockNews) {
      return <CircularProgress />;
    } else if (isErrorStockNews) {
      return <div>Error fetching stock data</div>;
    } else if (news && news.length === 0) {
      return <div>No News</div>;
    } else if (news) {
      return (
        <SimpleBarReact style={{ maxHeight: 500 }}>
          {news.map((newsItem, index) => (
            <Link key={index} to={`/news/${newsItem._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <StockDetailNewsCard news={newsItem?.summary ? truncateText(newsItem.summary, 100) : 'N/A'} />
            </Link>
          ))}
        </SimpleBarReact>
      );
    }
  };
  

  const renderHistoricalData = (historicalData, isLoadinghistoricalData, isErrorhistoricalData) => {
    if (isLoadinghistoricalData) {
      return <CircularProgress />;
    } else if (isErrorhistoricalData) {
      return <div>Error fetching historical data</div>;
    } else if (historicalData && historicalData.length === 0) {
      return <div>No historical data. </div>;
    } else if (historicalData) {
      return <StockPriceChart height={180} historicalData={historicalData} />;
    }
  };
  

  const conditionalRendering = (isLoading, isError) => {
    if (isLoading) {
      return <CircularProgress />;
    } else if (isError) {
      return <div>Error fetching stock data</div>;
    }

    return (
      <Stack overflow="visible">
        <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Grid item>
            <StockCardHeaderType my={1} variant="h4">{`${symbol} Chart`}</StockCardHeaderType>
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ marginRight: '2px' }}>
              {'Current Price:'}
            </Typography>
            <MainCard
              sx={{
                backgroundColor: `${theme.palette.secondary[200]}`,
                border: `5px solid ${theme.palette.primary[400]} !important`,
                borderRadius: 10,
                marginLeft: 1
              }}
            >
              <MemoizedCurrentPrice currentPrice={currentPrice} />
            </MainCard>
          </Grid>
        </Grid>
        <Grid>
          <Box sx={{ maxWidth: '100%' }}> {renderHistoricalData(historicalData, isLoadinghistoricalData, isErrorhistoricalData)}</Box>
        </Grid>
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={8}>
            <ValuesContainer>
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
              <Box px={0.5}>{renderStockNews(stockNews)}</Box>
            </NewsContainer>
          </Grid>
        </Grid>
      </Stack>
    );
  };

    // Memoize the content that depends on currentPrice
    const memoizedContent = useMemo(() => {
      return conditionalRendering(isLoadingStockData, isErrorStockData);
    }, [isLoadingStockData, isErrorStockData, currentPrice]);
  

  // useEffect(() => {
  //   // Connect to the WebSocket on the backend and send the stock symbol

  //   return () => {
  //     socket.close();
  //   };
  // }, [symbol]);
  return (
    <MainCard sx={{ display: 'flex', justifyContent: 'center' }}>{memoizedContent}</MainCard>
  );
};

export default StockCard;
