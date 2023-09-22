import React from 'react';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
// import { useTheme } from '@mui/material/styles';

const RatioKeyValueCard = ({ ratioKey, ratioValue, theme }) => {
  // const theme = useTheme();

  return (
    <MainCard sx={{ m: 1 }} contentSX={{ p: 1 }}>
      <Stack spacing={0.5}>
        <Grid container alignItems="center">
          <Grid item mx={0.4}>
            <Typography variant="h5" color="inherit">
              {`${ratioKey}:`}
            </Typography>
          </Grid>
          {ratioValue && (
            <Typography
              sx={{
                padding: 0.2,
                borderRadius: 2,
                backgroundColor: ratioValue === 'N/A' ? theme.palette.error.main : theme.palette.primary[200]
              }}
              variant="h5"
            >
              {' '}
              {ratioValue}
            </Typography>
          )}
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default RatioKeyValueCard;
