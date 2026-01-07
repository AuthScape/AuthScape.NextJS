import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import dayjs from 'dayjs';
import { useContentManagement } from '../hooks/useContentManagement';

export default function PageList({ onSelectPage, onDeletePage }) {
  const {
    pages,
    pagesLoading,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    selectedPage,
    openVisualBuilder,
    duplicatePage,
  } = useContentManagement();

  const totalPageCount = Math.ceil(totalPages / pageSize);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: selectedPage?.id === params.row.id ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'typeTitle',
      headerName: 'Type',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Chip
            label={params.value}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        </Box>
      ),
    },
    {
      field: 'rootUrl',
      headerName: 'Route',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body2">
            {params.value ? `/${params.value}` : 'Root'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'slug',
      headerName: 'Slug',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body2">
            {params.value ? `/${params.value}` : ''}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'lastUpdated',
      headerName: 'Updated',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body2">
            {dayjs(params.value).format('MMM DD, YYYY')}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 180,
      getActions: ({ id, row }) => {
        const actions = [];

        // Preview page in new tab (only for non-recursive pages)
        if (row.recursion == null) {
          actions.push(
            <GridActionsCellItem
              key={`link-${id}`}
              icon={
                <Tooltip title="Preview in new tab" arrow>
                  <OpenInNewRoundedIcon
                    fontSize="small"
                    sx={{ color: 'text.secondary' }}
                  />
                </Tooltip>
              }
              label="Preview"
              onClick={() => {
                const url = row.rootUrl
                  ? `/${row.rootUrl}/${row.slug}`
                  : `/${row.slug}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            />
          );
        }

        // Page settings/properties
        actions.push(
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={
              <Tooltip title="Page settings" arrow>
                <SettingsRoundedIcon
                  fontSize="small"
                  sx={{ color: 'primary.main' }}
                />
              </Tooltip>
            }
            label="Settings"
            onClick={() => onSelectPage(row)}
          />
        );

        // Design with Visual Editor
        actions.push(
          <GridActionsCellItem
            key={`build-${id}`}
            icon={
              <Tooltip title="Design page" arrow>
                <BrushRoundedIcon
                  fontSize="small"
                  sx={{ color: 'secondary.main' }}
                />
              </Tooltip>
            }
            label="Design"
            onClick={() => openVisualBuilder(id)}
          />
        );

        // Duplicate/Copy page
        actions.push(
          <GridActionsCellItem
            key={`duplicate-${id}`}
            icon={
              <Tooltip title="Duplicate page" arrow>
                <FileCopyOutlinedIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
              </Tooltip>
            }
            label="Duplicate"
            onClick={() => duplicatePage(row)}
          />
        );

        // Delete page
        actions.push(
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={
              <Tooltip title="Delete page" arrow>
                <DeleteOutlineRoundedIcon
                  fontSize="small"
                  sx={{ color: 'error.main' }}
                />
              </Tooltip>
            }
            label="Delete"
            onClick={() => onDeletePage(row)}
          />
        );

        return actions;
      },
    },
  ];

  const CustomPagination = () => (
    <Box display="flex" alignItems="center" gap={1} p={1}>
      {totalPageCount > 0 && (
        <>
          <IconButton
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">
            {currentPage} of {totalPageCount}
          </Typography>
          <IconButton
            size="small"
            disabled={currentPage === totalPageCount}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <KeyboardArrowRightIcon fontSize="small" />
          </IconButton>
        </>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
        Total: {totalPages}
      </Typography>
    </Box>
  );

  if (pagesLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <DataGrid
        rows={pages}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnSelector
        disableColumnFilter
        disableColumnMenu
        rowCount={totalPages}
        paginationMode="server"
        onRowClick={(params) => onSelectPage(params.row)}
        slots={{
          pagination: CustomPagination,
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'action.selected',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
        getRowClassName={(params) =>
          selectedPage?.id === params.row.id ? 'Mui-selected' : ''
        }
      />
    </Paper>
  );
}
