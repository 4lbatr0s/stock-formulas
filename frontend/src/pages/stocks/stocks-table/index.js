import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useTheme } from '@mui/material/styles';
import SimpleBar from '../../../../node_modules/simplebar-react/dist/simplebar-react';
import { Paper, Tooltip } from '../../../../node_modules/@mui/material/index';

const namesToLabels = {
  stockSymbol: 'Symbol',
  priceToEarningRate: 'P/E',
  priceToBookRate: 'P/B',
  debtToEquityRate: 'D/E',
  currentRatioRate: 'Current Ratio',
  quickRatioRate: 'Quick Ratio',
  returnOnEquityRate: 'ROE',
  returnOnAssetsRate: 'ROA',
  grossMarginRate: 'Gross Margins',
  operatingMarginRate: 'Operating Margin',
  priceToSalesRate: 'P/S',
  earningsPerShareRate: 'EPS',
  netProfitMarginRate: 'Net Profit',
  averageSentimentScore: 'Sentiment Score',
  currentPrice: 'Price',
  overallScore: 'Overall Score'
};

export default function SortableTable({ rows }) {
  const theme = useTheme();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create an array of keys from the first row to use as column headers
  let columnHeaders = rows.length > 0 ? Object.keys(rows[0]) : [];
  // Sorting function
  const sortedRows = rows.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    return (isAsc ? 1 : -1) * (a[orderBy] - b[orderBy]);
  });

  // Pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  let filteredHeaders = columnHeaders.filter((header) => header !== 'market' && header !== 'country' && header !== 'industry');

  const filteredRows = paginatedRows.filter((row) => {
    return !['market', 'country', 'industry'].includes(row.stockSymbol);
  });

  const symbolCellStyle = {
    '&:hover': {
      backgroundImage: `linear-gradient(to right, ${theme.palette.primary[700]}, ${theme.palette.primary[200]})`,
      borderRadius: '25px 0 0 25px', // Set border radius for each corner
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-image 0.3s, font-size 0.3s, transform 0.3s ease-in-out'
    }
  };

  const tableHeaderStyle = {
    backgroundColor: theme.palette.primary.lighter,
    p: 1,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      backgroundImage: `linear-gradient(to right, ${theme.palette.primary[700]}, ${theme.palette.primary[200]})`,
      cursor: 'pointer',
      color: 'black',
      transform: 'scale(1.1)',
      transition: 'background-image 0.3s, font-size 0.3s, transform 0.3s ease-in-out',
    }
  };

  const tableRowStyles = {
    '&:hover': {
      backgroundColor: theme.palette.primary[200],
      transition: 'background-color 0.3s, transform 0.3s ease-in-out'
    }
  };

  return (
    <SimpleBar style={{ maxHeight: '100%', width: '100%' }}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer component={Paper} style={{ maxHeight: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {filteredHeaders.map((headCell) => (
                <TableCell key={headCell}>
                  <Tooltip title="hello" followCursor>
                    <TableSortLabel
                      sx={tableHeaderStyle}
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell)}
                    >
                      {namesToLabels[headCell] || headCell}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index} sx={tableRowStyles} tabIndex={-1}>
                {filteredHeaders.map((key) => (
                  <TableCell sx={key === 'stockSymbol' && symbolCellStyle} key={key}>
                    {typeof row[key] === 'number' ? row[key].toFixed(3) : row[key] ? row[key] : 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={filteredHeaders.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </SimpleBar>
  );
}
