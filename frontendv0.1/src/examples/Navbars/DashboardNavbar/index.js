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

// Material Dashboard 2 React example components
import Breadcrumbs from 'examples/Breadcrumbs';
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
} from 'redux/apiCalls/materialUISlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkModeCall } from 'redux/apiCalls/materialUISlice';
import { setSidenavColorCall } from 'redux/apiCalls/materialUISlice';
import darkModeColors from 'assets/theme-dark/base/colors';

function DashboardNavbar({ absolute, light, isMini }) {
    const dispatch = useDispatch();
    const [navbarType, setNavbarType] = useState();
    const controller = useSelector((state) => state.materialUI);
    const {
        transparentNavbar,
        fixedNavbar,
        sidenavColor,
        darkMode,
    } = controller;
    
    const route = useLocation().pathname.split('/').slice(1);

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

        window.addEventListener('scroll', handleTransparentNavbar);

        // Call the handleTransparentNavbar function to set the state with the initial value.
        handleTransparentNavbar();

        // Remove event listener on cleanup
        return () =>
            window.removeEventListener('scroll', handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);


    useEffect(()=> {
        if(darkMode){
            setSidenavColorCall(dispatch, "ffffff")
        }
    }, [darkMode])

    const handleDarkMode = (value) => setDarkModeCall(dispatch, value);


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
