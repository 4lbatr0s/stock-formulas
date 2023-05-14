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
import StocksTableData from 'layouts/tables/data/StocksTableData.js';
import MarketNavigationCard from 'examples/Cards/CustomCards/MarketNavigationCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllStocksCallSP500, getAllStocksCallBIST100 } from 'redux/apiCalls/stockCalls.js';

const StockTables = () => {

    /**
     * @useSelectors
     */

    const { sp500List, bist100List } = useSelector(state => ({
        sp500List: state.stocks.stockListSP500,
        bist100List: state.stocks.stockListBIST100
    }));
      

    /**
     * @useStates
     */
    const [market, setMarket] = useState("SP500");
    const dispatch = useDispatch();
    const [dataFetched, setDataFetched] = useState(false);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [sortingValue, setSortingValue] = useState("");


    /**
     * @handlers
     */

    const fetchStockData = async () => {
        if (market === 'SP500') {
            await getAllStocksCallSP500(dispatch, sortingValue);
        } else if (market === 'BIST100') {
            await getAllStocksCallBIST100(dispatch, sortingValue);
        }

        setDataFetched(true);
    };


    const handleSortingValue = (value) => {
        sortingValue && sortingValue === value ? setSortingValue('') : setSortingValue(value);
    }


    useEffect(()=> {
        console.log("sortingValue:",sortingValue);
    }, [sortingValue])


    /**
     * @useEffects
     */

    useEffect(() => {
        fetchStockData();
    }, [market, sortingValue]);

    useEffect(()=> {
        console.log(' stockListController.stockListSP500:',  sp500List);
        console.log(' stockListController.stockListBIST100:',  bist100List);
        console.log(' dataFetched:',  dataFetched);
    }, [ sp500List, bist100List,dataFetched])

    useEffect(() => {
        if (dataFetched) {
            const { columns, rows } = StocksTableData(
                market === 'SP500' ? sp500List : bist100List
                , handleSortingValue);
            setColumns(columns);
            setRows(rows);
            console.log(market);
            console.log('columns:', columns);
            console.log('rows:', rows);
        }
    }, [dataFetched, market, sp500List, bist100List]);



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
                                <Grid item lg={3} onClick={() => setMarket("BIST100")}>
                                    <MarketNavigationCard market={market} content="BIST100" imageUrl="https://upload.wikimedia.org/wikipedia/commons/b/bb/Turkey_flag_300.png" />
                                </Grid>
                                <Grid item lg={3} onClick={() => setMarket("SP500")} >
                                    <MarketNavigationCard market={market} content="SP500" imageUrl="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg" />
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
                                            {market}
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
