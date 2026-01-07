import React, { useState, useCallback, useMemo } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { useContentManagement } from '../hooks/useContentManagement';
import ActionToolbar from '../shared/ActionToolbar';
import EmptyState from '../shared/EmptyState';
import PageList from './PageList';
import PagePropertiesPanel from './PagePropertiesPanel';
import GrapeVisualBuilder from '../../v3/GrapeVisualBuilder';
import CreatePageDialog from './CreatePageDialog';

export default function PagesSection() {
  const {
    pages,
    pagesLoading,
    pageTypes,
    selectedPage,
    selectPage,
    setSelectedPage,
    deletePage,
    fetchPages,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    activeFilters,
    setActiveFilters,
    isVisualBuilderOpen,
  } = useContentManagement();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);

  // Debounced search handler
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, [setSearchQuery]);

  // Build filter options from page types
  const filterOptions = useMemo(() => {
    return pageTypes.map((type) => ({
      id: type.id,
      label: type.title,
    }));
  }, [pageTypes]);

  // Sort options
  const sortOptions = [
    { value: 1, label: 'Title (A-Z)' },
    { value: 2, label: 'Title (Z-A)' },
    { value: 3, label: 'Updated (Newest)' },
    { value: 4, label: 'Updated (Oldest)' },
  ];

  // Handle page selection
  const handleSelectPage = useCallback((page) => {
    selectPage(page);
  }, [selectPage]);

  // Handle page deletion
  const handleDeletePage = useCallback((page) => {
    setPageToDelete(page);
    setDeleteConfirmOpen(true);
  }, []);

  const confirmDelete = async () => {
    if (pageToDelete) {
      await deletePage(pageToDelete.id);
      setDeleteConfirmOpen(false);
      setPageToDelete(null);
    }
  };

  // Handle close properties panel
  const handleCloseProperties = useCallback(() => {
    setSelectedPage(null);
  }, [setSelectedPage]);

  return (
    <>
      {/* GrapeJS Visual Builder - rendered via portal to document.body */}
      <GrapeVisualBuilder />
    <Box>
      {/* Header */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Pages
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your website pages. Click on a page to edit its properties, or use the Visual Editor to design the layout.
      </Typography>

      {/* Toolbar */}
      <ActionToolbar
        onAdd={() => setCreateDialogOpen(true)}
        addLabel="Create Page"
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search pages..."
        sortValue={sortOption}
        onSortChange={setSortOption}
        sortOptions={sortOptions}
        filters={filterOptions}
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        onRefresh={fetchPages}
      />

      {/* Content */}
      {pages.length === 0 && !pagesLoading ? (
        <EmptyState
          icon={ArticleRoundedIcon}
          title="No pages yet"
          description="Create your first page to get started building your website."
          actionLabel="Create Page"
          onAction={() => setCreateDialogOpen(true)}
        />
      ) : (
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 320px)', minHeight: 400 }}>
          {/* Page List - 60% or full width if no selection */}
          <Grid size={{ xs: 12, md: selectedPage ? 7 : 12 }}>
            <PageList
              onSelectPage={handleSelectPage}
              onDeletePage={handleDeletePage}
            />
          </Grid>

          {/* Properties Panel - 40% when a page is selected */}
          {selectedPage && (
            <Grid size={{ xs: 12, md: 5 }}>
              <PagePropertiesPanel onClose={handleCloseProperties} />
            </Grid>
          )}
        </Grid>
      )}

      {/* Create Page Dialog */}
      <CreatePageDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Page</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{pageToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
}
