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
import { ratioLabels } from '../ratios/ratio-items/ratio-labels';
export function createFinancialData(
  symbol,
  price,
  pe,
  pb,
  de,
  roe,
  roa,
  ps,
  eps,
  currentRatio,
  quickRatio,
  sentimentScore,

  grossMargin,
  operatingMargin,

  netProfitMargin
) {
  return {
    [ratioLabels.STOCK_SYMBOL]: symbol,
    [ratioLabels.CURRENT_PRICE]: price,
    [ratioLabels.PRICE_TO_EARNING]: pe,
    [ratioLabels.PRICE_TO_BOOK]: pb,
    [ratioLabels.DEBT_TO_EQUITY]: de,
    [ratioLabels.RETURN_ON_EQUITY]: roe,
    [ratioLabels.RETURN_ON_ASSETS]: roa,
    [ratioLabels.PRICE_TO_SALES]: ps,
    [ratioLabels.EARNINGS_PER_SHARE]: eps,
    [ratioLabels.CURRENT_RATIO]: currentRatio,
    [ratioLabels.QUICK_RATIO]: quickRatio,
    [ratioLabels.AVERAGE_SENTIMENT_SCORE]: sentimentScore,
    [ratioLabels.GROSS_MARGIN]: grossMargin,
    [ratioLabels.OPERATING_MARGIN]: operatingMargin,
    [ratioLabels.NET_PROFIT_MARGIN]: netProfitMargin
  };
}

export const rows = [
  createFinancialData('AAPL', 27.45, 8.29, 1.64, 1.15, 0.87, 103.67, 24.68, 39.07, 24.44, 7.41, 22.99, 0.212, 89.5, 148.56),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('MSFT', 37.23, 14.69, 0.49, 2.8, 2.22, 45.51, 15.8, 66.52, 40.22, 11.18, 9.48, 0.195, 78.3, 305.98),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89),
  createFinancialData('GOOGL', 28.62, 5.08, 0.05, 2.85, 1.15, 16.76, 14.03, 56.05, 23.86, 6.15, 94.54, 0.198, 78.2, 2754.89)

  // Add more financial data here
];

export default function SortableTable() {
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
      <TableContainer component={Paper} style={{ maxHeight: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(rows[0]).map((headCell) => (
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
                    {headCell}
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
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={Object.keys(rows[0]).length} />
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
