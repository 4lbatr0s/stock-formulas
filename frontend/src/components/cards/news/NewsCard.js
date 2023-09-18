import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { Box, CardMedia } from '../../../../node_modules/@mui/material/index';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const NewsCard = ({ title, image, imageAlt }) => {
  const theme = useTheme();
  return (
    <Box my={1}>
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
              <CardMedia
                component="img"
                alt={imageAlt}
                image={image}
                title={'titleasdasdsada'}
                sx={{ objectFit: 'contain', borderRadius: '10px' }}
              ></CardMedia>
            </Grid>
            <Stack spacing={0.25} direction="column">
              <Grid item>
                <Typography variant="h5" sx={{ textWrap: 'wrap' }}>
                  {title}
                </Typography>
              </Grid>
            </Stack>
          </Grid>
        </Stack>
      </MainCard>
    </Box>
  );
};

NewsCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  hoverText: PropTypes.string
};

NewsCard.defaultProps = {
  color: 'primary'
};

export default NewsCard;
