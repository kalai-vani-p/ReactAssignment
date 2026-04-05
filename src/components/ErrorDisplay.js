import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorDisplay({ message }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        gap: 2,
        color: "error.main",
        px: 2
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80 }} /> {/* larger icon */}
      <Typography variant="h5" fontWeight="bold">
        {message || "Something went wrong"}
      </Typography>
    </Box>
  );
}