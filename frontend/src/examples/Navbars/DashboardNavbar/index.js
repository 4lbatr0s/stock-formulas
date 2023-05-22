/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from 'react';

// react-router components
import { useLocation, Link } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import Breadcrumbs from 'examples/Breadcrumbs';
import NotificationItem from 'examples/Items/NotificationItem';
import { Switch } from '@mui/material';
// Custom styles for DashboardNavbar
import {
    navbar,
    navbarContainer,
    navbarRow,
} from 'examples/Navbars/DashboardNavbar/styles';

// Material Dashboard 2 React context
import {
    setTransparentNavbarCall,
    setMiniSidenavCall,
    setOpenConfiguratorCall,
} from 'redux/apiCalls/materialUISlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkModeCall } from 'redux/apiCalls/materialUISlice';

function DashboardNavbar({ absolute, light, isMini }) {
    const dispatch = useDispatch();
    const [navbarType, setNavbarType] = useState();
    const controller = useSelector((state) => state.materialUI);
    const {
        miniSidenav,
        transparentNavbar,
        fixedNavbar,
        openConfigurator,
        darkMode,
    } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const route = useLocation().pathname.split('/').slice(1);

    console.log('transparentNavbar:', transparentNavbar);

    useEffect(() => {
        // Setting the navbar type
        if (fixedNavbar) {
            setNavbarType('sticky');
        } else {
            setNavbarType('static');
        }

        // A function that sets the transparent state of the navbar.
        function handleTransparentNavbar() {
            setTransparentNavbarCall(
                dispatch,
                (fixedNavbar && window.scrollY === 0) || !fixedNavbar
            );
        }

        /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
        window.addEventListener('scroll', handleTransparentNavbar);

        // Call the handleTransparentNavbar function to set the state with the initial value.
        handleTransparentNavbar();

        // Remove event listener on cleanup
        return () =>
            window.removeEventListener('scroll', handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);

    const handleDarkMode = (value) => setDarkModeCall(dispatch, value);
    const handleConfiguratorOpen = () =>
        setOpenConfiguratorCall(dispatch, !openConfigurator);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);

    // Render the notifications menu
    const renderMenu = () => (
        <Menu
            anchorEl={openMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
            sx={{ mt: 2 }}
        >
            <NotificationItem
                icon={<Icon>email</Icon>}
                title="Check new messages"
            />
            <NotificationItem
                icon={<Icon>podcasts</Icon>}
                title="Manage Podcast sessions"
            />
            <NotificationItem
                icon={<Icon>shopping_cart</Icon>}
                title="Payment successfully completed"
            />
        </Menu>
    );

    // Styles for the navbar icons
    const iconsStyle = ({
        palette: { dark, white, text },
        functions: { rgba },
    }) => ({
        color: () => {
            let colorValue = light || darkMode ? white.main : dark.main;

            if (transparentNavbar && !light) {
                colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
            }

            return colorValue;
        },
    });

    return (
        <AppBar
            position={absolute ? 'absolute' : navbarType}
            color="inherit"
            sx={(theme) =>
                navbar(theme, { transparentNavbar, absolute, light, darkMode })
            }
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <MDBox
                    color="inherit"
                    mb={{ xs: 1, md: 0 }}
                    sx={(theme) => navbarRow(theme, { isMini })}
                >
                    <Breadcrumbs
                        icon="home"
                        title={route[route.length - 1]}
                        route={route}
                        light={light}
                    />
                </MDBox>
                {isMini ? null : (
                    <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={(theme) => navbarRow(theme, { isMini })}
                    >
                        <MDBox pr={1}>
                            <MDInput label="Search here" />
                        </MDBox>
                        <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={(theme) => navbarRow(theme, { isMini })}
                        >
            
                            <MDBox display="flex" alignItems="center">
                                <IconButton
                                    color={`${darkMode ? 'white' : 'inherit'}`}
                                >
                                    <Icon variant="h6">
                                        {darkMode ? `dark_mode` : `light_mode`}
                                    </Icon>
                                </IconButton>
                                <Switch
                                    checked={darkMode}
                                    onChange={() => handleDarkMode(!darkMode)}
                                />
                            </MDBox>
                        </MDBox>
                    </MDBox>
                )}
            </Toolbar>
        </AppBar>
    );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;