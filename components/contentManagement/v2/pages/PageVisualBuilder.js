import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Puck } from '@measured/puck';
import { apiService } from 'authscape';
import { useContentManagement } from '../hooks/useContentManagement';

export default function PageVisualBuilder() {
  const {
    isVisualBuilderOpen,
    closeVisualBuilder,
    config,
    showNotification,
  } = useContentManagement();

  const [page, setPage] = useState(null);
  const [contentData, setContentData] = useState({
    root: { props: {} },
    content: [],
    zones: {},
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const initialData = {
    root: { props: {} },
    content: [],
    zones: {},
  };

  // Track if component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Fetch page details when visual builder opens
  useEffect(() => {
    const fetchPageDetail = async () => {
      if (!isVisualBuilderOpen) {
        // Don't reset immediately - let it stay rendered but hidden
        return;
      }

      setLoading(true);
      try {
        const response = await apiService().get(
          `/ContentManagement/GetPage?pageId=${isVisualBuilderOpen}`
        );

        if (response?.status === 200) {
          setPage(response.data);

          if (response.data.content) {
            try {
              const parsedContent = JSON.parse(response.data.content);
              setContentData(parsedContent.data || initialData);
            } catch (error) {
              console.error('Error parsing content:', error);
              setContentData(initialData);
            }
          } else {
            setContentData(initialData);
          }
        }
      } catch (error) {
        console.error('API fetch error:', error);
        setContentData(initialData);
        showNotification('Failed to load page content', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPageDetail();
  }, [isVisualBuilderOpen]);

  // Handle close
  const handleClose = () => {
    closeVisualBuilder();
  };

  // Save content to server
  const handleSave = async (data) => {
    try {
      const contentParam = {
        pageId: page.id,
        content: JSON.stringify({ data }),
      };

      const response = await apiService().post(
        '/ContentManagement/UpdatePageContent',
        contentParam
      );

      if (response?.status === 200) {
        showNotification('Page content saved successfully', 'success');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      showNotification('Failed to save page content', 'error');
    }
  };

  // Don't render anything if not open or not mounted
  if (!isVisualBuilderOpen || !mounted) {
    return null;
  }

  // Use portal to render outside the normal component tree
  // This prevents unmount issues when the parent re-renders
  return createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>Loading page content...</Typography>
        </Box>
      ) : (
        <Puck
          config={config}
          data={contentData}
          onPublish={handleSave}
          overrides={{
            headerActions: ({ children }) => (
              <>
                {children}
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleClose}
                  sx={{ ml: 1 }}
                >
                  Back to Pages
                </Button>
              </>
            ),
          }}
        />
      )}
    </Box>,
    document.body
  );
}
