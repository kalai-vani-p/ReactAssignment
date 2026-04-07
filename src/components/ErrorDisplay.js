import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
/**
 * Error display component to show fallback UI
 * @component
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @returns {JSX.Element} Rendered error UI
 */
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