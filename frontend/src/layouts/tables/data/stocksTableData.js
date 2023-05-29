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

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { Sort } from "@mui/icons-material";
import { Icon } from "@mui/material";

const StocksTableData = (stockValues, handleSortingValue) => {
  //   const Stock = ({ name, symbol }) => (
  //       <MDBox display="flex" alignItems="center" lineHeight={1}>
  //         <MDBox ml={2} lineHeight={1}>
  //           <MDTypography display="block" variant="button" fontWeight="medium">
  //             {name}
  //           </MDTypography>
  //           <MDTypography variant="caption">{symbol}</MDTypography>
  //         </MDBox>
  //       </MDBox>
  //   );

  const Stock = ({ name, symbol }) => (
    <MDButton
      py={0}
      component={MDBox}
      display="flex"
      alignItems="stretch"
      justifyContent="stretch"
      variant="text"
      color="info"
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        borderRadius: "4px",
        "&:hover": {
          opacity: 0.9,
        },
        "&:active": {
          boxShadow: "0px 0px 8px 3px rgba(0,0,0,0.3)",
        },
      }}
    >
      <MDBox
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        p={1} // Reduce the padding value to decrease the vertical gaps
      >
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{symbol}</MDTypography>
      </MDBox>
    </MDButton>
  );

  return {
    columns: [
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() => handleSortingValue("sortBy=name&orderBy=asc")}
              badgeContent="Stock Name"
              color="info"
              variant="gradient"
              size="lg"
            >
              <MDTypography variant="h6" color="white">
                Stock Name
              </MDTypography>{" "}
              <Sort />
            </MDButton>
          </MDBox>
        ),
        accessor: "stockName",
        width: "12%",
        align: "left",
      },
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() =>
                handleSortingValue("sortBy=priceToSalesRate&orderBy=asc")
              }
              color="info"
              variant="gradient"
              size="lg"
            >
              <MDTypography variant="h6" color="white">
                P/S Rate
              </MDTypography>{" "}
              <Icon>sort</Icon>
            </MDButton>
          </MDBox>
        ),
        accessor: "priceToSalesRate",
        align: "center",
      },
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() =>
                handleSortingValue("sortBy=priceToBookRate&orderBy=asc")
              }
              badgeContent="Stock Name"
              color="info"
              variant="gradient"
              size="lg"
            >
              <MDTypography variant="h6" color="white">
                P/B Rate
              </MDTypography>{" "}
              <Sort />
            </MDButton>
          </MDBox>
        ),
        accessor: "priceToBookRate",
        align: "center",
      },
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() =>
                handleSortingValue("sortBy=priceToEarningRate&orderBy=asc")
              }
              badgeContent="Stock Name"
              color="info"
              variant="gradient"
              size="lg"
            >
              <MDTypography variant="h6" color="white">
                P/E Rate
              </MDTypography>{" "}
              <Sort />
            </MDButton>
          </MDBox>
        ),
        accessor: "priceToEarningRate",
        align: "center",
      },
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() =>
                handleSortingValue("sortBy=debtToEquityRate&orderBy=asc")
              }
              badgeContent="Debt to Equity Rate"
              color="info"
              variant="gradient"
              size="sm"
              width="5%"
            >
              <MDTypography variant="h6" color="white">
                D/E Rate
              </MDTypography>{" "}
              <Sort />
            </MDButton>
          </MDBox>
        ),
        accessor: "debtToEquityRate",
        align: "center",
      },
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() =>
                handleSortingValue("sortBy=returnOnEquityRate&orderBy=desc")
              }
              badgeContent="Return on Equity Ratio"
              color="info"
              variant="gradient"
              size="lg"
            >
              <MDTypography variant="h6" color="white">
                ROE
              </MDTypography>{" "}
              <Sort />
            </MDButton>
          </MDBox>
        ),
        accessor: "returnOnEquityRate",
        align: "center",
      },
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() => handleSortingValue("sortBy=ebitda&orderBy=desc")}
              badgeContent="Ebitda"
              color="info"
              variant="gradient"
              size="lg"
            >
              <MDTypography variant="h6" color="white">
                Ebitda
              </MDTypography>{" "}
              <Sort />
            </MDButton>
          </MDBox>
        ),
        accessor: "ebitda",
        align: "center",
      },
      {
        Header: (
          <MDBox ml={-1}>
            <MDButton
              onClick={() =>
                handleSortingValue("sortBy=overallScore&orderBy=desc")
              }
              badgeContent="Overall Score"
              color="info"
              variant="gradient"
              size="lg"
            >
              <MDTypography variant="h6" color="white">
                Overall Score
              </MDTypography>{" "}
              <Sort />
            </MDButton>
          </MDBox>
        ),
        accessor: "overallScore",
        align: "center",
      },
    ],

    rows: stockValues.map((stock) => ({
      stockName: <Stock name={stock.name} symbol={stock.symbol} />,
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
