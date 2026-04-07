import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
/**
 * Table header component with sortable columns
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.columns - Column configuration array
 * @param {string} props.columns[].field - Unique field key for sorting and data mapping
 * @param {string} props.columns[].header - Column display name
 * @param {boolean} [props.columns[].hideOnMobile] - Hide column on small screens
 * @param {string} props.order - Current sort order ("asc" or "desc")
 * @param {string} props.orderBy - Current sorted column field
 * @param {Function} props.onSort - Callback triggered when a column is sorted
 * @returns {JSX.Element} Rendered table header
 */
const TableHeader = ({ columns, order, orderBy, onSort }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f1f3f5" }}>
        {columns.map((c) => (
          <TableCell
            key={c.field}
            sx={{
              fontWeight: 700,
              fontSize: { xs: 12, sm: 14 },
              color: "#333",
              borderBottom: "2px solid #dee2e6",
              display: c.hideOnMobile
                ? { xs: "none", sm: "table-cell" }
                : "table-cell",
            }}
          >
            <TableSortLabel
              active={orderBy === c.field}
              direction={orderBy === c.field ? order : "asc"}
              onClick={() => onSort(c.field)}
            >
              {c.header}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;