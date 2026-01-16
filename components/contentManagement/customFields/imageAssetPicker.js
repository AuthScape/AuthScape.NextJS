import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FieldLabel } from '@measured/puck';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { apiService } from 'authscape';

export const ImageAssetPicker = ({ field, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(value || '');
  const fileInputRef = useRef(null);

  // Fetch assets when modal opens
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await apiService().get('/Pages/GetPageImageAssets');
      if (response?.status === 200) {
        setAssets(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
    setLoading(false);
  };

  // Load assets when dialog opens
  useEffect(() => {
    if (open) {
      fetchAssets();
      setSelectedAsset(value || '');
    }
  }, [open, value]);

  // Filter assets by search term
  const filteredAssets = useMemo(() => {
    if (!search.trim()) return assets;
    const searchLower = search.toLowerCase();
    return assets.filter(
      (asset) =>
        asset.title?.toLowerCase().includes(searchLower) ||
        asset.fileName?.toLowerCase().includes(searchLower)
    );
  }, [assets, search]);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    // Reset input so same file can be selected again
    event.target.value = '';
  };

  // Handle file upload
  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Remove extension for title
      formData.append('file', file);
      formData.append('description', '');

      const response = await apiService().post(
        '/ContentManagement/CreateNewAsset',
        formData
      );

      if (response?.status === 200) {
        await fetchAssets(); // Refresh list after upload
      }
    } catch (error) {
      console.error('Error uploading asset:', error);
    }
    setUploading(false);
  };

  // Confirm selection
  const handleSelect = () => {
    onChange(selectedAsset);
    setOpen(false);
  };

  // Clear selection
  const handleClear = () => {
    setSelectedAsset('');
    onChange('');
  };

  // Get asset title from URL
  const getAssetTitle = (url) => {
    const asset = assets.find((a) => a.url === url);
    return asset?.title || 'Selected Image';
  };

  return (
    <FieldLabel label={field.label}>
      {/* Current value preview */}
      <Box sx={{ mt: 1 }}>
        {value && value !== '-1' ? (
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component="img"
              src={value}
              alt="Selected"
              sx={{
                width: 60,
                height: 60,
                objectFit: 'cover',
                borderRadius: 1,
                bgcolor: 'grey.100',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap>
                {getAssetTitle(value)}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {value}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleClear}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        ) : (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.50',
              color: 'text.secondary',
            }}
          >
            <ImageIcon sx={{ mr: 1 }} />
            <Typography variant="body2">No image selected</Typography>
          </Paper>
        )}

        {/* Browse button */}
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setOpen(true)}
          sx={{ mt: 1 }}
          startIcon={<ImageIcon />}
        >
          Browse Assets
        </Button>
      </Box>

      {/* Asset Browser Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { height: '80vh' },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">Select Image</Typography>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          {/* Search and Upload Row */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={
                uploading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <CloudUploadIcon />
                )
              }
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileSelect}
            />
          </Stack>

          {/* Asset Grid */}
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
              }}
            >
              <CircularProgress />
            </Box>
          ) : filteredAssets.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
                color: 'text.secondary',
              }}
            >
              <ImageIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography>
                {search ? 'No assets match your search' : 'No assets uploaded yet'}
              </Typography>
              <Typography variant="caption">
                Click "Upload" to add your first image
              </Typography>
            </Box>
          ) : (
            <ImageList cols={4} gap={12} sx={{ mt: 0 }}>
              {filteredAssets.map((asset) => (
                <ImageListItem
                  key={asset.id || asset.url}
                  onClick={() => setSelectedAsset(asset.url)}
                  sx={{
                    cursor: 'pointer',
                    border: 2,
                    borderColor:
                      selectedAsset === asset.url
                        ? 'primary.main'
                        : 'transparent',
                    borderRadius: 1,
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor:
                        selectedAsset === asset.url
                          ? 'primary.main'
                          : 'grey.300',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={asset.url}
                    alt={asset.title || 'Asset'}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: 140,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    onError={(e) => {
                      e.target.src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f5f5f5" width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999">Error</text></svg>';
                    }}
                  />
                  <ImageListItemBar
                    title={asset.title || 'Untitled'}
                    position="below"
                    sx={{
                      '& .MuiImageListItemBar-title': {
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    }}
                    actionIcon={
                      selectedAsset === asset.url ? (
                        <CheckCircleIcon
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                      ) : null
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSelect}
            disabled={!selectedAsset}
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </FieldLabel>
  );
};

export default ImageAssetPicker;
