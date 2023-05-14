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
                            onClick={() => handleSortingValue('sortBy=stockName')}
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
                            onClick={() => handleSortingValue('sortBy=grahamNumber')}
                            color="info"
                            variant="gradient"
                            size="lg"
                        >
                            <MDTypography variant="h6" color="white">
                                Graham
                            </MDTypography>{' '}
                            <Icon>sort</Icon>
                        </MDButton>
                    </MDBox>
                ),
                accessor: 'grahamNumber',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=priceToBookRate')}
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
                            onClick={() => handleSortingValue('sortBy=priceToEarningRate')}
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
                            onClick={() => handleSortingValue('sortBy=debtToEquities')}
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
                accessor: 'debtToEquities',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=returnOnEquity')}
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
                accessor: 'returnOnEquity',
                align: 'center',
            },
            {
                Header: (
                    <MDBox ml={-1}>
                        <MDButton
                            onClick={() => handleSortingValue('sortBy=returnOnEquity')}
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
                            onClick={() => handleSortingValue('sortBy=overallScore')}
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
            grahamNumber: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.grahamNumber ? stock.grahamNumber : "N/A"}
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
            debtToEquities: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.debtToEquities ? stock.debtToEquities : "N/A"}
                </MDTypography>
            ),
            returnOnEquity: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="bold"
                >
                    {stock.returnOnEquity ? stock.returnOnEquity : "N/A"}
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