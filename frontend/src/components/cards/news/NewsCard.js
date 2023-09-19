import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { Box, CardMedia } from '@mui/material';
import genericNewsImage from '../../../assets/images/news/generic.webp';
import SymbolCard from './SymbolCard';
import SimpleBarScroll from 'components/third-party/SimpleBar';

const NewsCard = ({ headline, content, imageAlt = 'news-image', symbols }) => {
  function cleanNewsContent(content) {
    // Remove unwanted HTML tags except specified ones
    const cleanedContent = content.replace(/<\/?(?!strong|a|h3)\b[^>]*>/g, '');

    // Remove text between parentheses and replace &nbsp; with space
    const plainTextContent = cleanedContent.replace(/\([^)]*\)/g, '').replace(/&nbsp;/g, ' ');

    return plainTextContent;
  }

  const returnSymbolCards = (symbols) => {
    return symbols.reduce((acc, symbol) => {
      acc.push(<SymbolCard symbol={symbol} />);
      return acc;
    }, []);
  };

  return (
    <SimpleBarScroll>
      <Box my={1}>
        <MainCard boxShadow={12} contentSX={{ p: 2.25 }}>
          <Stack spacing={0.5} direction="column" justifyContent="center">
            <Grid container>
              <Grid item xs={12} md={9}>
                <CardMedia
                  component="img"
                  alt={imageAlt}
                  height="400px"
                  maxWidth="100%"
                  image={genericNewsImage}
                  sx={{ objectFit: 'contain', borderRadius: '10px' }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <MainCard>
                  <Stack direction="column">{returnSymbolCards(symbols)}</Stack>
                </MainCard>
              </Grid>
              <Stack mt={2} spacing={2.25} direction="column" xs={12}>
                <Grid item>
                  <Typography variant="h3" sx={{ textWrap: 'wrap', mt: 2 }}>
                    {headline}
                  </Typography>
                  <Typography variant="body1" sx={{ textWrap: 'wrap', mt: 2 }}>
                    {cleanNewsContent(content)}
                  </Typography>
                </Grid>
              </Stack>
            </Grid>
          </Stack>
        </MainCard>
      </Box>
    </SimpleBarScroll>
  );
};

NewsCard.propTypes = {
  color: PropTypes.string,
  headline: PropTypes.string,
  image: PropTypes.string,
  hoverText: PropTypes.string
};

NewsCard.defaultProps = {
  color: 'primary'
};

export default NewsCard;
