/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import MDBadge from 'components/MDBadge';
import MDButton from 'components/MDButton';
import Transaction from 'layouts/billing/components/Transaction';


import { Sort } from '@mui/icons-material';
import { Icon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const StocksTableData = (stockValues, handleSortingValue) => {

    const Stock = ({ name, symbol }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
                <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                >
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{symbol}</MDTypography>
            </MDBox>
        </MDBox>
    );


    return {
        columns: [
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=name&orderBy=asc')}
                            badgeContent="Stock Name"
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                Stock Name
                            </MDTypography>{' '}
                            <Sort />
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'stockName',
                width: '25%',
                align: 'left',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=priceToSalesRate&orderBy=asc')}
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                P/S Rate
                            </MDTypography>{' '}
                            <Icon>sort</Icon>
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'priceToSalesRate',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=priceToBookRate&orderBy=asc')}
                            badgeContent="Stock Name"
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                P/B Rate
                            </MDTypography>{' '}
                            <Sort />
                        </MDButton>

                    </MDBox>
                ),
                accessor: 'priceToBookRate',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=priceToEarningRate&orderBy=asc')}
                            badgeContent="Stock Name"
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                P/E Rate
                            </MDTypography>{' '}
                            <Sort />
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'priceToEarningRate',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=debtToEquityRate&orderBy=asc')}
                            badgeContent="Stock Name"
                            color="info"
                            variant="gradient"
                            size="lg"
                        >

                            <MDTypography variant="h6" color="white">
                                Debt/Equity
                            </MDTypography>{' '}
                            <Sort />
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'debtToEquityRate',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=returnOnEquityRate&orderBy=desc')}
                            badgeContent="Stock Name"
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                Return/Equity
                            </MDTypography>{' '}
                            <Sort />
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'returnOnEquityRate',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=ebitda&orderBy=desc')}
                            badgeContent="Ebitda"
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                Ebitda
                            </MDTypography>{' '}
                            <Sort />
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'ebitda',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=overallScore&orderBy=desc')}
                            badgeContent="Overall Score"
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                Overall Score
                            </MDTypography>{' '}
                            <Sort />
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'overallScore',
                align: 'center',
            },
        ],

        rows: stockValues.map((stock) => ({
            stockName: (
                <Stock
                    name={stock.name}
                    symbol={stock.symbol}
                />
            ),
            priceToSalesRate: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.priceToSalesRate ? stock.priceToSalesRate : "N/A"}
                </MDTypography>
            ),
            priceToBookRate: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.priceToBookRate}
                </MDTypography>
            ),
            priceToEarningRate: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.priceToEarningRate ? stock.priceToEarningRate : "N/A"}
                </MDTypography>
            ),
            debtToEquityRate: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.debtToEquityRate ? stock.debtToEquityRate : "N/A"}
                </MDTypography>
            ),
            returnOnEquityRate: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.returnOnEquityRate ? stock.returnOnEquityRate : "N/A"}
                </MDTypography>
            ),
            ebitda: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.ebitda ? stock.ebitda : "N/A"}
                </MDTypography>
            ),
            overallScore: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.overallScore ? stock.overallScore : "N/A"}
                </MDTypography>
            ),
        })),
    };
};

export default StocksTableData;