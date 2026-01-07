import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';

// Try to import optional FileUploader component
let FileUploader;
try {
  const authscape = require('authscape');
  FileUploader = authscape.FileUploader;
} catch (e) {
  console.warn('FileUploader not available from authscape');
}

export default function TypographySection() {
  const { oemCompanyId, showNotification } = useContentManagement();

  const [loading, setLoading] = useState(true);
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState(null);
  const [fontUri, setFontUri] = useState(null);
  const [oEMDomain, setOEMDomain] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const getBaseUrl = () => {
    return window.location.protocol + '//' + window.location.host;
  };

  // Fetch fonts and editor data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch available fonts
      const fontsResponse = await apiService().get('/PrivateLabel/GetFonts');
      if (fontsResponse?.status === 200) {
        setFonts(fontsResponse.data || []);
      }

      // Fetch OEM domain
      const domainResponse = await apiService().get('/PrivateLabel/GetAllDomainsUser');
      if (domainResponse?.status === 200 && domainResponse.data.length > 0) {
        setOEMDomain(domainResponse.data[0].name);
      } else {
        setOEMDomain(getBaseUrl());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('Failed to load typography settings', 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  // Fetch current font when domain is set
  useEffect(() => {
    const fetchCurrentFont = async () => {
      if (!oEMDomain) return;

      try {
        const response = await apiService().get(
          `/PrivateLabel/GetEditorData?domain=${oEMDomain}${
            oemCompanyId ? `&companyId=${oemCompanyId}` : ''
          }`
        );
        if (response?.status === 200) {
          setSelectedFont(response.data.fontFamily);
          setFontUri(response.data.fontUrl);
        }
      } catch (error) {
        console.error('Error fetching current font:', error);
      }
    };

    fetchCurrentFont();
  }, [oEMDomain, oemCompanyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle font selection
  const handleFontSelect = async (font) => {
    try {
      const response = await apiService().post('/PrivateLabel/SetFont', {
        companyId: oemCompanyId,
        domain: oEMDomain,
        value: font.label,
      });
      if (response?.status === 200) {
        setSelectedFont(font.label);
        setFontUri(null);
        showNotification('Font saved!', 'success');
      }
    } catch (error) {
      console.error('Error saving font:', error);
      showNotification('Failed to save font', 'error');
    }
  };

  const columns = [
    {
      field: 'label',
      headerName: 'Font Name',
      flex: 1,
      renderCell: (params) => (
        <>
          <Box
            sx={{
              fontFamily: params.value,
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {params.value}
            {selectedFont === params.value && (
              <CheckCircleIcon color="primary" fontSize="small" />
            )}
          </Box>
          <link
            href={`https://fonts.googleapis.com/css2?family=${params.value}`}
            rel="stylesheet"
          />
        </>
      ),
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
      {/* Load selected font */}
      {selectedFont && fontUri == null && (
        <link
          href={`https://fonts.googleapis.com/css2?family=${selectedFont}`}
          rel="stylesheet"
        />
      )}

      {/* Header */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Typography
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose a font for your website or upload a custom font file.
      </Typography>

      <Grid container spacing={3}>
        {/* Font List */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Available Fonts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click on a font to select it
              </Typography>
            </Box>
            <DataGrid
              rows={fonts}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 50]}
              onRowClick={(params) => handleFontSelect(params.row)}
              sx={{
                height: 500,
                border: 'none',
                '& .MuiDataGrid-row': {
                  cursor: 'pointer',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Font Preview & Upload */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Upload Custom Font
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload your own font files (.OTF, .TTF, or .WOFF)
            </Typography>
            {FileUploader ? (
              <FileUploader
                url="/PrivateLabel/UploadCustomFont"
                accept=".otf,.ttf,.woff"
                params={{
                  domain: oEMDomain,
                }}
                multiple={true}
                variant="custom"
                onUploadCompleted={() => {
                  window.location.reload();
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  startIcon={<PublishRoundedIcon />}
                  sx={{ height: 50 }}
                >
                  Upload Font
                </Button>
              </FileUploader>
            ) : (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                startIcon={<PublishRoundedIcon />}
                sx={{ height: 50 }}
                disabled
              >
                Upload Font (Not Available)
              </Button>
            )}
          </Paper>

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
              Font Preview
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Currently selected:
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {selectedFont || 'No font selected'}
              </Typography>
            </Box>
            <Box
              sx={{
                fontFamily: selectedFont,
                p: 2,
                backgroundColor: 'background.default',
                borderRadius: 1,
              }}
            >
              <Typography sx={{ fontFamily: selectedFont, mb: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                ultricies odio. Nunc ut quam turpis. In hac habitasse platea
                dictumst.
              </Typography>
              <Typography sx={{ fontFamily: selectedFont, fontWeight: 'bold' }}>
                Aenean tempus semper est vel convallis. Sed feugiat, risus eu
                tincidunt eleifend, purus metus vulputate nulla.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
