import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { useTheme } from '@mui/material/styles';

const StockDetailNewsCard = ({ news }) => {
  const theme = useTheme();

  const symbolCellStyle = {
    '&:hover': {
      backgroundImage: `linear-gradient(to right, ${theme.palette.primary[700]}, ${theme.palette.primary[200]})`,
      borderRadius: '25px 0 0 25px', // Set border radius for each corner
      cursor: 'pointer',
      transition: 'background-image 0.3s transform 0.3s ease-in-out',
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: 'black'
    },
    my: 2
  };

  const newsTypographyStyle = {
    textWrap: 'wrap'
  };

  return (
    <MainCard sx={symbolCellStyle} boxShadow={12} contentSX={{ p: 2.25 }}>
      <Grid sx={newsTypographyStyle} item>
        {news}
      </Grid>
    </MainCard>
  );
};

StockDetailNewsCard.propTypes = {
  color: PropTypes.string,
  news: PropTypes.string,
  image: PropTypes.string,
  hoverText: PropTypes.string
};

StockDetailNewsCard.defaultProps = {
  color: 'primary'
};

export default StockDetailNewsCard;
