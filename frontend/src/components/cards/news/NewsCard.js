import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { Tooltip } from '../../../../node_modules/@mui/material/index';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const NewsCard = ({ title, image, imageAlt, content }) => (
  <>
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5} direction="column">
        <Grid container alignItems="center">
          <Grid item>
            <Tooltip title={'Go to news'}>
              <img src={image} alt={imageAlt} />
            </Tooltip>
          </Grid>
          <Stack spacing={0.25} direction="column">
            <Grid item>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="span">{content}</Typography>
            </Grid>
          </Stack>
        </Grid>
      </Stack>
    </MainCard>
  </>
);

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
