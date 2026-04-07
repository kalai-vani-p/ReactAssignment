import React, { useState, useMemo } from "react";
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Table,
  TableContainer,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import TableHeader from "./table/TableHeader";
import TableBodyComponent from "./table/TableBodyComponent";
import TableSearch from "./table/TableSearch";
import TablePaginationComponent from "./table/TablePaginationComponent";
/**
 * Reusable table component with tabs, search, sorting, and pagination
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.tabs - Array of tab configurations
 * @param {string} props.tabs[].label - Tab label
 * @param {Array<Object>} props.tabs[].data - Data for the table
 * @param {Array<Object>} props.tabs[].columns - Column configuration
 * @returns {JSX.Element} Rendered table with multiple features
 */
const CommonTable = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const activeTab = tabs?.[tabIndex] || { data: [], columns: [] };

  const filteredData = useMemo(() => {
    const source = Array.isArray(activeTab.data) ? activeTab.data : [];

    if (!search) return source;

    return source.filter((item) =>
      Object.values(item).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [activeTab.data, search]);

  const paginatedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a?.[orderBy];
      const bVal = b?.[orderBy];

      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });

    return sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, order, orderBy, page, rowsPerPage]);

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(field);
      setOrder("asc");
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 1, px: 1 }}>
      {/* Header */}
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

      {/* Table */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
          {tabs.map((t, i) => (
            <Tab key={i} label={t.label} />
          ))}
        </Tabs>

        <TableSearch
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          label={activeTab.label}
        />

        <TableContainer sx={{ maxHeight: 1000, overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHeader
              columns={activeTab.columns}
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
            />

            <TableBodyComponent
              data={paginatedData}
              columns={activeTab.columns}
            />
          </Table>
        </TableContainer>

        <TablePaginationComponent
          count={filteredData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Paper>
    </Container>
  );
};

export default CommonTable;