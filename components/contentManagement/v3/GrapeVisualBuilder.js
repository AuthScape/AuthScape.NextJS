/**
 * GrapeJS Visual Builder Wrapper
 *
 * This component wraps the GrapeEditor and handles:
 * - Loading page content from API
 * - Saving page content to API
 * - Portal-based rendering to avoid parent unmount issues
 * - Integration with ContentManagement context
 */

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { Box, CircularProgress, Typography } from '@mui/material';
import { apiService } from 'authscape';
import { useContentManagement } from '../v2/hooks/useContentManagement';

// Dynamic import of GrapeEditor (client-side only)
const GrapeEditor = dynamic(() => import('./GrapeEditor'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: '#1976d2' }} />
      <Typography sx={{ color: '#6d7882' }}>Loading editor...</Typography>
    </Box>
  ),
});

export default function GrapeVisualBuilder() {
  const { isVisualBuilderOpen, closeVisualBuilder, showNotification, oemCompanyId } = useContentManagement();

  const [page, setPage] = useState(null);
  const [initialContent, setInitialContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Track if component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Fetch page details when visual builder opens
  useEffect(() => {
    const fetchPageDetail = async () => {
      if (!isVisualBuilderOpen) {
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

              // Check if it's GrapeJS format or Puck format
              if (parsedContent.html !== undefined) {
                // GrapeJS format
                setInitialContent(parsedContent);
              } else if (parsedContent.data) {
                // Puck format - convert to empty GrapeJS format
                // User will start fresh with GrapeJS
                setInitialContent({
                  html: '',
                  css: '',
                  components: [],
                  styles: [],
                });
                showNotification(
                  'This page was created with the previous editor. Starting with a blank canvas.',
                  'info'
                );
              } else {
                setInitialContent(parsedContent);
              }
            } catch (error) {
              console.error('Error parsing content:', error);
              setInitialContent({ html: '', css: '' });
            }
          } else {
            setInitialContent({ html: '', css: '' });
          }
        }
      } catch (error) {
        console.error('API fetch error:', error);
        setInitialContent({ html: '', css: '' });
        showNotification('Failed to load page content', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPageDetail();
  }, [isVisualBuilderOpen]);

  // Handle save
  const handleSave = useCallback(
    async (content) => {
      if (!page) return;

      try {
        const contentParam = {
          pageId: page.id,
          content: JSON.stringify(content),
        };

        const response = await apiService().post(
          '/ContentManagement/UpdatePageContent',
          contentParam
        );

        if (response?.status === 200) {
          showNotification('Page content saved successfully', 'success');
        } else {
          throw new Error('Save failed');
        }
      } catch (error) {
        console.error('Error saving content:', error);
        showNotification('Failed to save page content', 'error');
        throw error;
      }
    },
    [page, showNotification]
  );

  // Handle close
  const handleClose = useCallback(() => {
    closeVisualBuilder();
  }, [closeVisualBuilder]);

  // Don't render anything if not open or not mounted
  if (!isVisualBuilderOpen || !mounted) {
    return null;
  }

  // Use portal to render outside the normal component tree
  return createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        backgroundColor: '#f0f0f0',
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
          <CircularProgress sx={{ color: '#1976d2' }} />
          <Typography sx={{ color: '#6d7882' }}>Loading page content...</Typography>
        </Box>
      ) : (
        <GrapeEditor
          pageId={page?.id}
          pageTitle={page?.title}
          initialContent={initialContent}
          oemCompanyId={oemCompanyId}
          onSave={handleSave}
          onClose={handleClose}
          enableAIPrompt
        />
      )}
    </Box>,
    document.body
  );
}
