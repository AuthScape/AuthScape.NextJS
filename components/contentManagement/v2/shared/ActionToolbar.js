import React from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ActionToolbar({
  onAdd,
  addLabel = 'Add New',
  showAdd = true,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  showSearch = true,
  sortValue,
  onSortChange,
  sortOptions = [],
  showSort = true,
  onRefresh,
  showRefresh = true,
  filters = [],
  activeFilters = [],
  onFilterChange,
  showFilters = true,
  children,
}) {
  const handleSearchChange = (event) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  const handleFilterClick = (filterId) => {
    if (onFilterChange) {
      const isActive = activeFilters.includes(filterId);
      const newFilters = isActive
        ? activeFilters.filter((f) => f !== filterId)
        : [...activeFilters, filterId];
      onFilterChange(newFilters);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* Filter chips row */}
      {showFilters && filters.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {filters.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              variant={activeFilters.includes(filter.id) ? 'filled' : 'outlined'}
              color={activeFilters.includes(filter.id) ? 'primary' : 'default'}
              onClick={() => handleFilterClick(filter.id)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      )}

      {/* Main toolbar row */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left side - Search and Sort */}
        <Box sx={{ display: 'flex', gap: 2, flex: 1, minWidth: 300 }}>
          {showSearch && (
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={searchValue || ''}
              onChange={handleSearchChange}
              sx={{ minWidth: 200, flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}

          {showSort && sortOptions.length > 0 && (
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortValue || ''}
                label="Sort By"
                onChange={(e) => onSortChange && onSortChange(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {/* Right side - Actions */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {children}

          {showRefresh && (
            <Tooltip title="Refresh">
              <IconButton onClick={onRefresh} size="small">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}

          {showAdd && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAdd}
            >
              {addLabel}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
