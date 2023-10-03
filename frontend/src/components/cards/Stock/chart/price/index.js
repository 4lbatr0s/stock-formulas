import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const StockPriceChart = ({ slot, height, historicalData }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: historicalData.map((item) => item.date), // Use dates as categories
        labels: {
          style: {
            colors: [secondary],
            rotate: 0 // Rotate labels for better visibility
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: historicalData.length // Set tick amount based on data length
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot, historicalData]);

  const [series, setSeries] = useState([
    {
      name: 'Price',
      data: [0, 86, 28, 115, 48, 210, 136]
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Price $',
        data: historicalData.map((item) => item?.close)
      }
    ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={height ? height : 450} />;
};

StockPriceChart.propTypes = {
  slot: PropTypes.string
};

export default StockPriceChart;
