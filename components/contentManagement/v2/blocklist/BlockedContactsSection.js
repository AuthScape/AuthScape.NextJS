import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Chip,
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import dayjs from 'dayjs';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';
import ActionToolbar from '../shared/ActionToolbar';
import EmptyState from '../shared/EmptyState';

export default function BlockedContactsSection() {
  const { oemCompanyId, showNotification, configLoad } = useContentManagement();

  const [blockedContacts, setBlockedContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [saving, setSaving] = useState(false);

  // Fetch blocked contacts
  const fetchBlockedContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService().get(
        `/ContentManagement/GetBlockedContacts?privateLabelCompanyId=${oemCompanyId || ''}`
      );
      if (response?.status === 200) {
        setBlockedContacts(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching blocked contacts:', error);
      showNotification('Failed to load blocked contacts', 'error');
    } finally {
      setLoading(false);
    }
  }, [oemCompanyId, showNotification]);

  useEffect(() => {
    fetchBlockedContacts();
  }, [fetchBlockedContacts]);

  // Add blocked contact
  const handleAdd = async () => {
    if (!newEmail.trim()) return;

    setSaving(true);
    try {
      const response = await apiService().post('/ContentManagement/AddBlockedContact', {
        email: newEmail.trim(),
        privateLabelCompanyId: oemCompanyId,
      });
      if (response?.status === 200) {
        showNotification('Contact blocked successfully', 'success');
        setNewEmail('');
        setAddDialogOpen(false);
        await fetchBlockedContacts();
        if (configLoad) {
          configLoad();
        }
      }
    } catch (error) {
      console.error('Error blocking contact:', error);
      showNotification('Failed to block contact', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete blocked contact
  const handleDelete = async () => {
    if (!contactToDelete) return;

    try {
      const response = await apiService().post(
        `/ContentManagement/RemoveBlockedContact?blockedContactId=${contactToDelete.id}`
      );
      if (response?.status === 200) {
        showNotification('Contact unblocked successfully', 'success');
        await fetchBlockedContacts();
      }
    } catch (error) {
      console.error('Error unblocking contact:', error);
      showNotification('Failed to unblock contact', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setContactToDelete(null);
    }
  };

  // Filter contacts by search
  const filteredContacts = blockedContacts.filter((contact) =>
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
      minWidth: 250,
    },
    {
      field: 'reason',
      headerName: 'Reason',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Chip
          label={params.value || 'Manual block'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Blocked Date',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params ? dayjs(params).format('MMM DD, YYYY') : 'N/A',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 80,
      getActions: ({ row }) => [
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Unblock">
              <DeleteIcon fontSize="small" color="error" />
            </Tooltip>
          }
          label="Unblock"
          onClick={() => {
            setContactToDelete(row);
            setDeleteConfirmOpen(true);
          }}
        />,
      ],
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Blocked Contacts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage email addresses that are blocked from contacting you through your website.
      </Typography>

      {/* Toolbar */}
      <ActionToolbar
        onAdd={() => setAddDialogOpen(true)}
        addLabel="Block Contact"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by email..."
        showSort={false}
        showFilters={false}
        onRefresh={fetchBlockedContacts}
      />

      {/* Content */}
      {filteredContacts.length === 0 ? (
        <EmptyState
          icon={BlockRoundedIcon}
          title={searchQuery ? 'No matching contacts' : 'No blocked contacts'}
          description={
            searchQuery
              ? 'Try adjusting your search query.'
              : 'Block email addresses to prevent them from contacting you through your website forms.'
          }
          actionLabel="Block Contact"
          onAction={() => setAddDialogOpen(true)}
          showAction={!searchQuery}
        />
      ) : (
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <DataGrid
            rows={filteredContacts}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            disableColumnSelector
            disableColumnFilter
            disableColumnMenu
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            sx={{
              border: 'none',
            }}
          />
        </Paper>
      )}

      {/* Add Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Block Contact</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the email address you want to block from contacting you.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Email Address"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            disabled={!newEmail.trim() || saving}
          >
            {saving ? 'Blocking...' : 'Block Contact'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Unblock Contact</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to unblock "{contactToDelete?.email}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Unblock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
