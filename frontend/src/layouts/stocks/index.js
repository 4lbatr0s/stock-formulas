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

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// Data
import authorsTableData from 'layouts/tables/data/authorsTableData';
import projectsTableData from 'layouts/tables/data/projectsTableData';
import stocksTableData from 'layouts/tables/data/stocksTableData';
import SimpleBlogCard from 'examples/Cards/BlogCards/SimpleBlogCard';
import MarketNavigationCard from 'examples/Cards/CustomCards/MarketNavigationCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllStocksStartCall } from 'redux/apiCalls/sp500Calls';
import { bist100Dummy } from 'helpers/dummyData.js';
import { getAllStocksSuccess } from 'redux/sp500Slice';

function StockTables() {

    /**
     * @useStates
     */
    const [market, setMarket] = useState("sp500");
    const dispatch = useDispatch();
    const stockListController = useSelector(state=> state.sp500);
    useEffect(()=> {
      const allStocksCall = async()=> {
        await getAllStocksStartCall(dispatch);
      };   
      if(market==="sp500") {
        allStocksCall();
      } else {
        getAllStocksSuccess(bist100Dummy); //fake data for now.
      }
      
    },[])

    useEffect(()=> {
      console.log("stockListController:", stockListController?.stockList)
    }, [stockListController?.stockList]);

    const { columns, rows } = stocksTableData(market === "sp500" ? stockListController.stockList.data.data : bist100Dummy);


    console.log(market);

    /**
     * @handlers
     */

 
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <MDBox display="flex" justifyContent="center">
                            <Grid
                                container
                                spacing={6}
                                display="flex"
                                justifyContent="center"
                            >
                                <Grid item lg={3} onClick={()=>setMarket("bist100")}>
                                    <MarketNavigationCard market={market} content="BIST100" imageUrl="https://upload.wikimedia.org/wikipedia/commons/b/bb/Turkey_flag_300.png"/>                                    
                                </Grid>
                                <Grid item lg={3} onClick={()=>setMarket("sp500")} >
                                    <MarketNavigationCard market ={market} content="SP500" imageUrl="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"/>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container>
                                {' '}
                                {/* add a Grid container and set justifyContent to "center" */}
                                <Grid item lg={3}>
                                    <MDBox
                                        mx={2}
                                        mt={-3}
                                        py={3}
                                        px={2}
                                        variant="gradient"
                                        bgColor="info"
                                        borderRadius="lg"
                                        coloredShadow="info"
                                    >
                                        <MDTypography
                                            variant="h6"
                                            color="white"
                                        >
                                            {'SP500'}
                                        </MDTypography>
                                    </MDBox>
                                </Grid>
                            </Grid>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}
export default StockTables;
