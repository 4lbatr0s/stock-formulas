import MainCard from 'components/MainCard';
import React from 'react';
import { Grid, Box, Stack, Card, Typography } from '@mui/material';
import StockPriceChart from './chart/price/index';
import { styled } from '@mui/material/styles';
import RatioKeyValueCard from './ratio/ratio-key-value/index';
import fakeRatioValues from './fakeRatioValues';
import labelToNames from './ratio/ratio-key-value/labelToNames';
import { useTheme } from '@mui/material/styles';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';
import { Tooltip } from '../../../../node_modules/@mui/material/index';

const StockCard = ({ symbol }) => {
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

  const valuesNotToInclude = ['updatedAt', 'ratioLink', 'createdAt', 'industry', 'stockSymbol', 'country'];

  const renderRatioKeysAndValues = () => {
    const sortedKeys = Object.keys(fakeRatioValues[0]) // Assuming all objects have the same keys
      .filter((key) => !valuesNotToInclude.includes(key)) // Exclude '_id' and 'ratioLink'
      .sort(); // Sort the keys alphabetically

    const result = sortedKeys.map((key, index) => {
      const components = fakeRatioValues.map((item, itemIndex) => {
        let value;
        const values = item[key].values;
        if (item[key]) {
          value = values
            ? values[0]
              ? values[0] === '-'
                ? 'N/A'
                : values[0]
              : values[1]
              ? values[1] === '-'
                ? 'N/A'
                : values[1]
              : 'N/A'
            : 'N/A';
        } else {
          value = 'N/A';
        }
        return <RatioKeyValueCard theme={theme} key={`${key}-${itemIndex}`} ratioKey={labelToNames[key]} ratioValue={value} />;
      });

      return <React.Fragment key={index}>{components}</React.Fragment>;
    });

    return result;
  };

  return (
    <MainCard>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{renderRatioKeysAndValues()}</Box>
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
                  to={fakeRatioValues[0]?.ratioLink}
                  target="_blank"
                >
                  {fakeRatioValues[0]?.ratioLink}
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
    </MainCard>
  );
};

export default StockCard;
