import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useContentManagement } from '../hooks/useContentManagement';
import ActionToolbar from '../shared/ActionToolbar';
import EmptyState from '../shared/EmptyState';
import CreateUrlRouteDialog from './CreateUrlRouteDialog';

export default function UrlRoutesSection() {
  const { pageRoots, deleteUrlRoute, fetchPageRoots } = useContentManagement();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editRoute, setEditRoute] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);

  // Build hierarchical structure
  const buildHierarchy = () => {
    const topLevel = pageRoots.filter((r) => !r.parentId);
    const result = [];

    topLevel.forEach((parent) => {
      result.push({ ...parent, level: 0 });
      const children = pageRoots.filter((r) => r.parentId === parent.id);
      children.forEach((child) => {
        result.push({ ...child, level: 1 });
      });
    });

    return result;
  };

  const hierarchicalRoutes = buildHierarchy();

  const handleEdit = useCallback((route) => {
    setEditRoute(route);
    setCreateDialogOpen(true);
  }, []);

  const handleDelete = useCallback((route) => {
    setRouteToDelete(route);
    setDeleteConfirmOpen(true);
  }, []);

  const confirmDelete = async () => {
    if (routeToDelete) {
      await deleteUrlRoute(routeToDelete.id);
      setDeleteConfirmOpen(false);
      setRouteToDelete(null);
    }
  };

  const handleDialogClose = () => {
    setCreateDialogOpen(false);
    setEditRoute(null);
  };

  const handleRouteCreated = async () => {
    await fetchPageRoots();
    handleDialogClose();
  };

  return (
    <Box>
      {/* Header */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        URL Routes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage URL routes (previously called Page Roots) to organize your pages under specific paths.
      </Typography>

      {/* Toolbar */}
      <ActionToolbar
        onAdd={() => setCreateDialogOpen(true)}
        addLabel="Create Route"
        showSearch={false}
        showSort={false}
        showFilters={false}
        onRefresh={fetchPageRoots}
      />

      {/* Content */}
      {hierarchicalRoutes.length === 0 ? (
        <EmptyState
          icon={LinkRoundedIcon}
          title="No URL routes yet"
          description="Create URL routes to organize your pages under specific paths like /blog or /products."
          actionLabel="Create Route"
          onAction={() => setCreateDialogOpen(true)}
        />
      ) : (
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <List disablePadding>
            {hierarchicalRoutes.map((route, index) => (
              <ListItem
                key={route.id}
                divider={index < hierarchicalRoutes.length - 1}
                sx={{
                  pl: route.level === 1 ? 6 : 2,
                  py: 1.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                  {route.level === 1 && (
                    <SubdirectoryArrowRightIcon
                      fontSize="small"
                      sx={{ color: 'text.secondary' }}
                    />
                  )}
                  <LinkRoundedIcon
                    fontSize="small"
                    sx={{ color: route.level === 0 ? 'primary.main' : 'text.secondary' }}
                  />
                </Box>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body1"
                        fontWeight={route.level === 0 ? 500 : 400}
                      >
                        /{route.rootUrl}
                      </Typography>
                      {route.title && (
                        <Chip
                          label={route.title}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    route.level === 0 && pageRoots.filter((r) => r.parentId === route.id).length > 0
                      ? `${pageRoots.filter((r) => r.parentId === route.id).length} child route(s)`
                      : null
                  }
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => handleEdit(route)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(route)}
                      sx={{ ml: 0.5 }}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Create/Edit Dialog */}
      <CreateUrlRouteDialog
        open={createDialogOpen}
        onClose={handleDialogClose}
        onCreated={handleRouteCreated}
        editRoute={editRoute}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete URL Route</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the route "/{routeToDelete?.rootUrl}"?
          </Typography>
          {pageRoots.filter((r) => r.parentId === routeToDelete?.id).length > 0 && (
            <Typography color="error" sx={{ mt: 1 }}>
              Warning: This route has child routes that will also be affected.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
