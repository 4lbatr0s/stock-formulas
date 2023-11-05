// material-ui
import { Box, IconButton, Link, useMediaQuery, Stack } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useSelector } from 'react-redux';
import SignInButton from './SignInButton/index';
import SignUpButton from './SignUpButton/index';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { userInfo } = useSelector((state) => state.auth);

  const SignButtons = () => {
    return (
      <Stack mr={4} spacing={2} direction="row">
        <SignUpButton />
        <SignInButton />
      </Stack>
    );
  };

  const conditionalForProfileButton = () => {
    let returnValue;
    if (!matchesXs) {
      returnValue = userInfo ? <Profile /> : SignButtons();
    }
    return returnValue;
  };

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <IconButton
        component={Link}
        href="https://github.com/4lbatr0s"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton>

      {userInfo && <Notification />}
      {conditionalForProfileButton()}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
