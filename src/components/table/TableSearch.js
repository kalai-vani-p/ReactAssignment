import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
/**
 * Search input component for filtering table data
 * @component
 * @param {Object} props
 * @param {string} props.value - Current search input value
 * @param {Function} props.onChange - Callback triggered when input value changes
 * @param {string} props.label - Label used in placeholder text
 * @returns {JSX.Element} Rendered search input field
 */

const TableSearch = ({ value, onChange, label }) => {
  return (
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
        placeholder={`Search ${label}`}
        value={value}
        onChange={onChange}
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
  );
};

export default TableSearch;