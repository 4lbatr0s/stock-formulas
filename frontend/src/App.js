import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { setMiniSidenavCall } from "redux/apiCalls/materialUISlice.js";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useDispatch, useSelector } from "react-redux";
import MDSnackbar from "components/MDSnackbar";
import { Grid } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.materialUI);
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const newsController = useSelector((state) => state.news);
  const { recentNews } = newsController;

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  /**
   * @useStates
   */
  
  const [infoSB, setInfoSB] = useState(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);

  const renderInfoSB = (title, content) =>  (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const handleNewsPopUp = () => {
    openInfoSB();
    setTimeout(() => {
      closeInfoSB();
    }, 1500);
  };

  console.log("darkMode:", darkMode);
  console.log("sideNavColor:", sidenavColor);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenavCall(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenavCall(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    let {headline:title, summary:content} = recentNews[0];
    handleNewsPopUp(title, content);
  }, [recentNews]);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Grid item xs={12} sm={6} lg={3}>
        {renderInfoSB}
      </Grid>
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="ZuuFinn"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
