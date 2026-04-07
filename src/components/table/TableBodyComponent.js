import { TableBody, TableRow, TableCell } from "@mui/material";

const formatUSD = (value) => {
  if (typeof value !== "number" || isNaN(value)) return value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const TableBodyComponent = ({ data, columns }) => {
  if (!data.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length}
            align="center"
            sx={{ py: 3, color: "#888" }}
          >
            No data found
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((row, i) => (
        <TableRow
          key={row.id || i}
          hover
          sx={{
            backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f9fa",
          }}
        >
          {columns.map((c) => (
            <TableCell
              key={c.field}
              sx={{
                fontSize: { xs: 12, sm: 13 },
                color: "#444",
                borderBottom: "1px solid #eee",
                py: { xs: 1, sm: 2 },
                px: { xs: 1, sm: 2 },
                display: c.hideOnMobile
                  ? { xs: "none", sm: "table-cell" }
                  : "table-cell",
              }}
            >
              {c.field === "price"
                ? formatUSD(row?.[c.field])
                : row?.[c.field] ?? "-"}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;