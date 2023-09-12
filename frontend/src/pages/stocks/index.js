import React, { useEffect, useState } from 'react';
import { Divider, List, Grid, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import markets from './market-button/market-button-items/market-button-items';
import MarketButton from './market-button/index';
import IndustryDropdownButton from './industries/industry-dropdown-button/index';
import industries from './industries/industry-items';
import StocksTable from './stocks-table/index';
import ScriptHelper from 'utils/helpers/ScriptHelper';
import { fetchStockInformationsQuery } from 'store/query/StockQueries';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Stocks = () => {
  const [activeMarket, setActiveMarket] = useState(markets[0].queryValue); // Initialize to the queryValue of the first market button
  const [industry, setIndustry] = useState('');
  const [rows, setRows] = useState([]);
  const handleActiveMarketChange = (newMarket) => {
    setActiveMarket(newMarket);
  };

  const handleIndustryChange = (newIndustry) => {
    setIndustry(newIndustry);
  };

  const handleRows = (values) => {
    setRows(values);
  };

  // Function to check if a market button is selected
  const isMarketSelected = (marketValue) => activeMarket === marketValue;
  const renderMarketButtons = () =>
    markets.map((marketItem) => (
      <Grid
        container
        item
        key={marketItem.id}
        xs={12}
        sm={3}
        sx={{ mt: { xs: 2, sm: 0 } }}
        onClick={() => handleActiveMarketChange(marketItem.queryValue)} // Pass the queryValue here
      >
        <MarketButton
          title={marketItem.title}
          svgIcon={marketItem.icon}
          secondaryTitle={marketItem.secondaryTitle}
          altText={marketItem.altText}
          height={{ xs: isMarketSelected(marketItem.queryValue) ? 120 : 100, sm: 60 }}
          isActive={activeMarket === marketItem.queryValue}
        />
        <Divider sx={{ margin: '0 15px' }} orientation="vertical" />
      </Grid>
    ));

  // Update the query whenever market or industry changes
  useEffect(() => {
    const newQuery = ScriptHelper.queryBuilder(activeMarket, industry.query || '');
    const fetchStocks = async () => {
      const results = await fetchStockInformationsQuery(newQuery);
      console.log('IT WORKED:', results);
      handleRows(results?.data);
    };
    fetchStocks();
  }, [activeMarket, industry]);

  return (
    <>
      <MainCard>
        <List
          component="nav"
          sx={{
            px: 0,
            py: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Grid container justifyContent="center">
            {renderMarketButtons()}
            <Grid item xs={12} sm={4} sx={{ mt: { xs: 2, sm: 0 } }}>
              <IndustryDropdownButton onChange={handleIndustryChange} options={industries} height={{ xs: 100, sm: 60 }} />
            </Grid>
          </Grid>
        </List>
      </MainCard>
      <MainCard sx={{ mt: 2 }}>
        <List
          component="nav"
          sx={{
            px: 0,
            py: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {rows.length > 0 ? (
            <Stack spacing={2} useFlexGap flexWrap="wrap" direction="row" divider={<Divider orientation="vertical" flexItem />} />
          ) : (
            // You can render a loading indicator or placeholder here while the data is being fetched.
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}{' '}
        </List>
        {rows.length > 0 && <StocksTable rows={rows} />}
      </MainCard>
    </>
  );
};

export default Stocks;
