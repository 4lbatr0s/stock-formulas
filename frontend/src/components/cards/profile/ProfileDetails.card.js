import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { Box } from '@mui/material';
import SimpleBarScroll from 'components/third-party/SimpleBar';

const ProfileDetailsCard = ({ fullName, email, roles, id }) => {
  console.log(fullName, email, roles, id);

  return (
    <SimpleBarScroll>
      <Box my={1}>
        <MainCard boxShadow={12} contentSX={{ p: 2.25 }}>
          <Stack spacing={0.5} direction="column" justifyContent="center">
            <Grid container>
              <Grid item xs={12} md={9}></Grid>
              <Grid item xs={12} md={3}>
                <MainCard sx={{ border: '10px solid #91d5ff' }}></MainCard>
              </Grid>
              <Stack mt={2} spacing={2.25} direction="column" xs={12}>
                <Grid item>
                  <Typography variant="h3" sx={{ textWrap: 'wrap', mt: 2 }}>
                    {fullName}
                  </Typography>
                  <Typography variant="body1" sx={{ textWrap: 'wrap', mt: 2 }}></Typography>
                </Grid>
              </Stack>
            </Grid>
          </Stack>
        </MainCard>
      </Box>
    </SimpleBarScroll>
  );
};

ProfileDetailsCard.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string)
};

ProfileDetailsCard.defaultProps = {
  color: 'primary'
};

export default ProfileDetailsCard;
