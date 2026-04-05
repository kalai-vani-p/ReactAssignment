// import React, { useMemo, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Paper, Tabs, Tab, Box, TextField, Table, TableHead,
//   TableRow, TableCell, TableBody, TablePagination,
//   TableSortLabel, InputAdornment, Container
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { logger } from "../utils/logger";

// const CommonTable = ({ tabs }) => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("id");

//   const activeTab = tabs?.[tabIndex] || { data: [], columns: [] };

//   // Extract filtering logic (no duplication)
//   const filteredData = useMemo(() => {
//     try {
//       const source = Array.isArray(activeTab.data) ? activeTab.data : [];

//       if (!search) return source;

//       return source.filter((item) =>
//         Object.values(item).some((v) =>
//           String(v).toLowerCase().includes(search.toLowerCase())
//         )
//       );
//     } catch (error) {
//       logger.error("Filtering error", error);
//       return [];
//     }
//   }, [activeTab.data, search]);

//   // Sorting + pagination
//   const paginatedData = useMemo(() => {
//     try {
//       const sorted = [...filteredData].sort((a, b) => {
//         const aVal = a?.[orderBy];
//         const bVal = b?.[orderBy];

//         if (aVal == null || bVal == null) return 0;

//         if (aVal < bVal) return order === "asc" ? -1 : 1;
//         if (aVal > bVal) return order === "asc" ? 1 : -1;
//         return 0;
//       });

//       return sorted.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       );
//     } catch (error) {
//       logger.error("Sorting/Pagination error", error);
//       return [];
//     }
//   }, [filteredData, order, orderBy, page, rowsPerPage]);

//   // Handlers (clean)
//   const handleTabChange = (_, value) => {
//     setTabIndex(value);
//     setPage(0);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(0);
//   };

//   const handleSort = (field) => {
//     if (orderBy === field) {
//       setOrder(order === "asc" ? "desc" : "asc");
//     } else {
//       setOrderBy(field);
//       setOrder("asc");
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setPage(0);
//   };
  
//   const formatUSD = (value) => {
//     if (typeof value !== "number" || isNaN(value)) return value;
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(value);
//   };

//   return (
//     <Container maxWidth={false} sx={{ mt: 2, px: 1 }}>
//       <Tabs value={tabIndex} onChange={handleTabChange}>
//         {tabs.map((t, i) => (
//           <Tab key={t.label || i} label={t.label} />
//         ))}
//       </Tabs>

//       <Paper
//         sx={{
//           p: 2,
//           borderRadius: 2,
//           border: "1px solid #e0e0e0",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <TextField
//             size="small"
//             placeholder={`Search ${activeTab?.label || ""}`}
//             value={search}
//             onChange={handleSearchChange}
//             sx={{ width: 250, py: 4}}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon fontSize="small" />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#f1f3f5" }}>
//               {activeTab.columns.map((c) => (
//                 <TableCell
//                   key={c.field}
//                   sx={{
//                     fontWeight: 700,
//                     fontSize: 14,
//                     color: "#333",
//                     borderBottom: "2px solid #dee2e6"
//                   }}
//                 >
//                   <TableSortLabel
//                     active={orderBy === c.field}
//                     direction={orderBy === c.field ? order : "asc"}
//                     onClick={() => handleSort(c.field)}
//                   >
//                     {c.header}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginatedData.length ? (
//               paginatedData.map((row, i) => (
//                 <TableRow
//                   key={row.id || i}
//                   hover
//                   sx={{
//                     backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f9fa"
//                   }}
//                 >
//                   {activeTab.columns.map((c) => (
//                     <TableCell
//                       key={c.field}
//                       sx={{
//                         fontSize: 13,
//                         color: "#444",
//                         borderBottom: "1px solid #eee"
//                       }}
//                     >
//                       {c.field === "price"
//                       ? formatUSD(row?.[c.field])
//                       : row?.[c.field] ?? "-"}
//                       {/* {row?.[c.field] ?? "-"} */}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={activeTab.columns.length} align="center" sx={{ py: 3, color: "#888" }}>
//                   No data found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>

//         <TablePagination
//           component="div"
//           count={filteredData.length}
//           page={page}
//           onPageChange={(_, p) => setPage(p)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Paper>
//     </Container>
//   );
// };

// CommonTable.propTypes = {
//   tabs: PropTypes.array.isRequired
// };

// export default CommonTable;
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  InputAdornment,
  Card,
  CardContent,
  TableContainer
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { logger } from "../utils/logger";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const CommonTable = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [hasError, setHasError] = useState(false);

  const activeTab = tabs?.[tabIndex] || { data: [], columns: [] };

  const filteredData = React.useMemo(() => {
    try {
      const source = Array.isArray(activeTab.data) ? activeTab.data : [];
      if (!search) return source;
      return source.filter((item) =>
        Object.values(item).some((v) =>
          String(v).toLowerCase().includes(search.toLowerCase())
        )
      );
    } catch (error) {
      logger.error("Filtering error", error);
      setHasError(true);
      return [];
    }
  }, [activeTab.data, search]);

  const paginatedData = React.useMemo(() => {
    try {
      const sorted = [...filteredData].sort((a, b) => {
        const aVal = a?.[orderBy];
        const bVal = b?.[orderBy];
        if (aVal == null || bVal == null) return 0;
        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
      });
      return sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    } catch (error) {
      logger.error("Sorting/Pagination error", error);
      setHasError(true);
      return [];
    }
  }, [filteredData, order, orderBy, page, rowsPerPage]);

  const handleTabChange = (_, value) => {
    setTabIndex(value);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(field);
      setOrder("asc");
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const formatUSD = (value) => {
    if (typeof value !== "number" || isNaN(value)) return value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 1, px: 1 }}>
      {/* Header Card */}
      <Card sx={{ mb: 1, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmojiEventsIcon color="primary" />
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#4b81b8"
            sx={{ position: "relative", top: 3 }}
          >
            Rewards Dashboard
          </Typography>
        </CardContent>
      </Card>

      {/* Tabs + Table */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Tabs value={tabIndex} onChange={handleTabChange}>
          {tabs.map((t, i) => (
            <Tab key={t.label || i} label={t.label} />
          ))}
        </Tabs>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <TextField
            size="small"
            placeholder={`Search ${activeTab?.label || ""}`}
            value={search}
            onChange={handleSearchChange}
            sx={{ width: { xs: "100%", sm: 250 }, py: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer sx={{ maxHeight: 1000, overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f3f5" }}>
                {activeTab.columns.map((c) => (
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
                      onClick={() => handleSort(c.field)}
                    >
                      {c.header}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.length ? (
                paginatedData.map((row, i) => (
                  <TableRow
                    key={row.id || i}
                    hover
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f9fa",
                    }}
                  >
                    {activeTab.columns.map((c) => (
                      <TableCell
                        key={c.field}
                        sx={{
                          fontSize: { xs: 12, sm: 13 },
                          color: "#444",
                          borderBottom: "1px solid #eee",
                          py: { xs: 1, sm: 2 },    // vertical padding
                          px: { xs: 1, sm: 2 },    // horizontal padding
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
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={activeTab.columns.length}
                    align="center"
                    sx={{ py: 3, color: "#888" }}
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Container>
  );
};

CommonTable.propTypes = {
  tabs: PropTypes.array.isRequired,
};

export default CommonTable;