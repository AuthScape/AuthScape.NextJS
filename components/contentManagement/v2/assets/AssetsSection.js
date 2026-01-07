import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import SearchIcon from '@mui/icons-material/Search';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';
import ActionToolbar from '../shared/ActionToolbar';
import EmptyState from '../shared/EmptyState';

// Try to import optional FileUploader component
let FileUploader;
try {
  const authscape = require('authscape');
  FileUploader = authscape.FileUploader;
} catch (e) {
  console.warn('FileUploader not available from authscape');
}

export default function AssetsSection() {
  const { oemCompanyId, showNotification, configLoad } = useContentManagement();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Fetch assets
  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService().get(
        `/ContentManagement/GetAssets?privateLabelCompanyId=${oemCompanyId || ''}`
      );
      if (response?.status === 200) {
        setAssets(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
      showNotification('Failed to load assets', 'error');
    } finally {
      setLoading(false);
    }
  }, [oemCompanyId, showNotification]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Filter assets by search
  const filteredAssets = assets.filter((asset) =>
    asset.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete asset
  const handleDelete = async () => {
    if (!assetToDelete) return;

    try {
      const response = await apiService().post(
        `/ContentManagement/RemoveAsset?assetId=${assetToDelete.id}`
      );
      if (response?.status === 200) {
        showNotification('Asset deleted successfully', 'success');
        await fetchAssets();
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      showNotification('Failed to delete asset', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setAssetToDelete(null);
    }
  };

  // Copy URL to clipboard
  const copyUrl = (asset) => {
    const url = `${process.env.apiUri}/api/ContentManagement/GetAsset?assetId=${asset.id}`;
    navigator.clipboard.writeText(url);
    showNotification('URL copied to clipboard', 'success');
  };

  // Handle upload complete
  const handleUploadComplete = () => {
    setUploadDialogOpen(false);
    fetchAssets();
    if (configLoad) {
      configLoad();
    }
    showNotification('Asset uploaded successfully', 'success');
  };

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
        Assets
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Upload and manage images, documents, and other files for your website.
      </Typography>

      {/* Toolbar */}
      <ActionToolbar
        onAdd={() => setUploadDialogOpen(true)}
        addLabel="Upload Asset"
        showSort={false}
        showFilters={false}
        onRefresh={fetchAssets}
      >
        <TextField
          size="small"
          placeholder="Search assets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </ActionToolbar>

      {/* Content */}
      {filteredAssets.length === 0 ? (
        <EmptyState
          icon={ImageRoundedIcon}
          title={searchQuery ? 'No matching assets' : 'No assets yet'}
          description={
            searchQuery
              ? 'Try adjusting your search query.'
              : 'Upload images and files to use in your pages.'
          }
          actionLabel="Upload Asset"
          onAction={() => setUploadDialogOpen(true)}
          showAction={!searchQuery}
        />
      ) : (
        <Grid container spacing={2}>
          {filteredAssets.map((asset) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={asset.id}>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.apiUri}/api/ContentManagement/GetAsset?assetId=${asset.id}`}
                  alt={asset.fileName}
                  sx={{
                    objectFit: 'cover',
                    backgroundColor: 'grey.100',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
                <CardContent sx={{ flex: 1, py: 1.5 }}>
                  <Typography
                    variant="body2"
                    noWrap
                    title={asset.fileName}
                    sx={{ fontWeight: 500 }}
                  >
                    {asset.fileName}
                  </Typography>
                  {asset.contentType && (
                    <Typography variant="caption" color="text.secondary">
                      {asset.contentType}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                  <Tooltip title="Copy URL">
                    <IconButton size="small" onClick={() => copyUrl(asset)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setAssetToDelete(asset);
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Asset</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            {FileUploader ? (
              <FileUploader
                url="/ContentManagement/UploadAsset"
                accept="image/*,.pdf,.doc,.docx"
                params={{
                  privateLabelCompanyId: oemCompanyId,
                }}
                multiple={false}
                onUploadCompleted={handleUploadComplete}
              >
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ImageRoundedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography>
                    Click to upload or drag and drop
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Images, PDFs, and documents supported
                  </Typography>
                </Box>
              </FileUploader>
            ) : (
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <ImageRoundedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography color="text.secondary">
                  FileUploader component not available
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Asset</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{assetToDelete?.fileName}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
