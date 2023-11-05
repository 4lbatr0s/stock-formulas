import PropTypes from 'prop-types';

// material-ui
import { Box, ButtonBase, Typography } from '@mui/material';
import { Stack } from '@mui/material/index';
import { useNavigate } from 'react-router-dom';
// project import

// assets

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const SignUpButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/register');
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75, }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: 'primary.lighter' }
        }}
        aria-label="open profile"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Stack  direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Typography variant="subtitle1">Sign Up</Typography>
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default SignUpButton;
