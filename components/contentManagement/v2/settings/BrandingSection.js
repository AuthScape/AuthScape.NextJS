import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';

// Try to import optional components - they may not exist in all authscape versions
let Dropzone, ColorPicker;
try {
  const authscape = require('authscape');
  Dropzone = authscape.Dropzone;
  ColorPicker = authscape.ColorPicker;
} catch (e) {
  console.warn('Dropzone or ColorPicker not available from authscape');
}

export default function BrandingSection() {
  const { oemCompanyId, showNotification } = useContentManagement();

  const [loading, setLoading] = useState(true);
  const [dnsFields, setDnsFields] = useState([]);
  const [oEMDomain, setOEMDomain] = useState(null);

  const getBaseUrl = () => {
    return window.location.protocol + '//' + window.location.host;
  };

  // Load DNS fields
  const loadDNSFields = useCallback(async (domain = null) => {
    const targetDomain = domain || getBaseUrl();

    try {
      const response = await apiService().get(
        `/PrivateLabel/GetFields?domain=${targetDomain}${
          oemCompanyId ? `&companyId=${oemCompanyId}` : ''
        }`
      );
      if (response?.status === 200) {
        setDnsFields(response.data || []);
      }
    } catch (error) {
      console.error('Error loading DNS fields:', error);
      showNotification('Failed to load branding settings', 'error');
    } finally {
      setLoading(false);
    }
  }, [oemCompanyId, showNotification]);

  // Fetch OEM domain on mount
  useEffect(() => {
    const fetchOEMData = async () => {
      try {
        const response = await apiService().get('/PrivateLabel/GetAllDomainsUser');
        if (response?.status === 200 && response.data.length > 0) {
          setOEMDomain(response.data[0].name);
        } else {
          // No domain configured, use current domain
          setOEMDomain(getBaseUrl());
        }
      } catch (error) {
        console.error('Error fetching OEM data:', error);
        setOEMDomain(getBaseUrl());
      }
    };

    fetchOEMData();
  }, []);

  // Load fields when domain is set
  useEffect(() => {
    if (oEMDomain) {
      loadDNSFields(oEMDomain);
    }
  }, [oEMDomain, loadDNSFields]);

  // Handle color change
  const handleColorChange = async (field, hex) => {
    try {
      await apiService().post('/PrivateLabel/SetFieldValue', {
        id: field.id,
        fieldId: field.fieldId,
        value: hex,
      });
      showNotification(`${field.name} saved`, 'success');
    } catch (error) {
      console.error('Error saving color:', error);
      showNotification(`Failed to save ${field.name}`, 'error');
    }
  };

  // Handle app icon upload
  const handleAppIconUpload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('domain', oEMDomain);

    try {
      const response = await apiService().post('/PrivateLabel/UploadAppIcon', data);
      if (response?.status === 200) {
        showNotification('App icon updated successfully', 'success');
        window.location.reload(); // Needed to refresh favicon
      }
    } catch (error) {
      console.error('Error uploading app icon:', error);
      showNotification('Failed to upload app icon', 'error');
    }
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
        App Icon & Colors
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Customize your website's branding with a custom app icon and color scheme.
      </Typography>

      <Grid container spacing={4}>
        {/* App Icon */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              App Icon
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload your app icon (favicon). Recommended size: 192x192 pixels.
            </Typography>
            {Dropzone ? (
              <Dropzone
                image={`${process.env.apiUri}/api/PrivateLabel/GetFavIcon?oemCompanyId=${oemCompanyId}`}
                text="Drag 'n' drop your app icon here"
                onDrop={handleAppIconUpload}
              />
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
                <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Dropzone component not available
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Colors */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Brand Colors
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Customize the colors used throughout your website.
            </Typography>

            {dnsFields.length === 0 ? (
              <Typography color="text.secondary">
                No color settings available for this domain.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dnsFields.map((field) => (
                  <Box
                    key={field.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'background.default',
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {field.name}
                    </Typography>
                    {ColorPicker ? (
                      <ColorPicker
                        name={field.name}
                        defaultColor={field.value}
                        onColorChanged={(name, hex) => handleColorChange(field, hex)}
                      />
                    ) : (
                      <TextField
                        size="small"
                        type="color"
                        value={field.value || '#000000'}
                        onChange={(e) => handleColorChange(field, e.target.value)}
                        sx={{ width: 80 }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
