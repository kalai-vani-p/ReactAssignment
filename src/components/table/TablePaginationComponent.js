import { TablePagination } from "@mui/material";
/**
 * Table pagination component for controlling page navigation
 * @component
 * @param {Object} props
 * @param {number} props.count - Total number of records
 * @param {number} props.page - Current page index (0-based)
 * @param {number} props.rowsPerPage - Number of rows displayed per page
 * @param {Function} props.onPageChange - Callback triggered when page changes
 * @param {Function} props.onRowsPerPageChange - Callback triggered when rows per page changes
 * @returns {JSX.Element} Rendered pagination component
 */
const TablePaginationComponent = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default TablePaginationComponent;