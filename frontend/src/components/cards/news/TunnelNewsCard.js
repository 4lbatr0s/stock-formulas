import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { Box, CardMedia, Tooltip } from '../../../../node_modules/@mui/material/index';

import { Link } from '../../../../node_modules/@mui/material/index';
// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const TunnelNewsCard = ({ id, headline, image, imageAlt = 'news-image' }) => {
  const theme = useTheme();
  return (
    <Box my={1}>
      <Link color="inherit" underline="none" href={`/news/${id}`}>
        <MainCard
          sx={{
            backgroundColor: theme.palette.primary.lighter,
            '&:hover': {
              backgroundColor: theme.palette.primary[200],
              cursor: 'pointer'
            }
          }}
          boxShadow={12}
          contentSX={{ p: 2.25 }}
        >
          <Stack spacing={0.5} direction="column" justifyContent="center">
            <Grid container alignItems="center">
              <Grid item>
                <Tooltip title={'Go to news'}>
                  <CardMedia component="img" alt={imageAlt} image={image} sx={{ objectFit: 'contain', borderRadius: '10px' }}></CardMedia>
                </Tooltip>
              </Grid>
              <Stack spacing={0.25} direction="column">
                <Grid item>
                  <Typography variant="h5" sx={{ textWrap: 'wrap' }}>
                    {headline}
                  </Typography>
                </Grid>
              </Stack>
            </Grid>
          </Stack>
        </MainCard>
      </Link>
    </Box>
  );
};

TunnelNewsCard.propTypes = {
  color: PropTypes.string,
  headline: PropTypes.string,
  image: PropTypes.string,
  hoverText: PropTypes.string
};

TunnelNewsCard.defaultProps = {
  color: 'primary'
};

export default TunnelNewsCard;
