import { Divider, List, Grid, Stack} from '@mui/material';
import MainCard from 'components/MainCard';
import markets from './market-button/market-button-items/market-button-items';
import MarketButton from './market-button/index';
import IndustryDropdownButton from './industries/industry-dropdown-button/index';
import industries from './industries/industry-items';
import StocksTable from './stocks-table/index';

const Stocks = () => {
  const renderMarketButtons = () => markets.map((market) => (
    <Grid container item key={market.id} xs={12} sm={3} sx={{ mt: { xs: 2, sm: 0 } }}>
      <MarketButton
        title={market.title}
        svgIcon={market.icon}
        secondaryTitle={market.secondaryTitle}
        altText={market.altText}
        query={market.queryValue}
        height={{ xs: 100, sm: 60 }}
      />
      <Divider sx={{ margin: '0 15px' }} orientation="vertical" />
    </Grid>
  ));

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
              <IndustryDropdownButton  options={industries} height={{ xs: 100, sm: 60 }} />
            </Grid>
          </Grid>
        </List>
      </MainCard>
      <MainCard sx={{mt:2,}}>
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
          <Stack spacing={2} useFlexGap flexWrap="wrap" direction="row" divider={<Divider orientation="vertical" flexItem />}>
          </Stack>
        </List>
        <StocksTable/>
      </MainCard>
    </>
  );
};

export default Stocks;
