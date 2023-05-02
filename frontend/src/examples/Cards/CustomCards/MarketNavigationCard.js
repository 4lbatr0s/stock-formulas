import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function MarketNavigationCard({ content, market}) {
  return (
    <Card
      className='flag-box'
      sx={{
        maxWidth: 600,
        borderRadius: 2,
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)', // add shadow
        transition: 'transform 0.1s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ position: 'relative' }}>
        <Grid item xs={12}>
          <MDBox p={4} sx={{ position: 'relative' }}>
            <MDTypography variant="h5" fontSize="25px" sx={{ textAlign: 'center' }}>
              {content}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
      <style jsx>{`
        .flag-box:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #1A73E8;
          z-index: -1;
          transition: background-color 0.1s ease-in-out;
          border-radius: inherit;
        }

        .flag-box:hover:before {
          background-color: #1A73E8;
        }

        .flag-box:hover {
          transform: scale(1.02);
          cursor: pointer;
        }
        .flag-box:active{
          transform: scale(1.2);
        }

      `}</style>
    </Card>
  );
}

export default MarketNavigationCard;
