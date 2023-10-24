import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import MiniDrawerStyled from './MiniDrawerStyled';
import { drawerWidth } from 'config';
import NewsDrawerContent from './NewsDrawerContent/index';
import SimpleBarScroll from 'components/third-party/SimpleBar';
import { useDispatch, useSelector } from 'react-redux';
import { addNews,  } from 'store/reducers/news';
import configureNewsWSS from 'websockets/stocks/news/index';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open, handleDrawerToggle, window }) => {
  const dispatch = useDispatch();

  const { news } = useSelector((state) => state.news);

  useEffect(() => {
    configureNewsWSS((data) => {
      const parsedData = JSON.parse(data);
      dispatch(addNews(parsedData));
    });
  }, []);

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);
  const newsContent = useMemo(() => <NewsDrawerContent news={news} />);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={open}>
          {drawerHeader}
          <SimpleBarScroll>{open && newsContent}</SimpleBarScroll>
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit'
            }
          }}
        >
          {open && drawerHeader}
          <SimpleBarScroll>{open && newsContent}</SimpleBarScroll>
        </Drawer>
      )}
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default MainDrawer;
