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
import { Paper } from '../../../../node_modules/@mui/material/index';

const namesToLabels = {
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
  const columnHeaders = rows.length > 0 ? Object.keys(rows[0]) : [];

  // Sorting function
  const sortedRows = rows.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    return (isAsc ? 1 : -1) * (a[orderBy] - b[orderBy]);
  });

  // Pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <SimpleBar style={{ maxHeight: '100%', width: '100%' }}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
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
              {columnHeaders.map((headCell) => (
                <TableCell key={headCell}>
                  <TableSortLabel
                    sx={{
                      backgroundColor: theme.palette.primary.lighter,
                      p: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}
                    active={orderBy === headCell}
                    direction={orderBy === headCell ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell)}
                  >
                    {namesToLabels[headCell] || headCell}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={index}
                hover
                tabIndex={-1}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: theme.palette.primary.lighter } }}
              >
                {columnHeaders.map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={columnHeaders.length} />
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
