import React from 'react';
import { Box, Typography } from '@mui/material';

export const Anchor = {
  label: 'Anchor',
  fields: {
    // Anchor
    id: {
      type: 'text',
      label: 'Anchor ID (used in URL as #id)',
    },
    offset: {
      type: 'select',
      label: 'Scroll Offset',
      options: [
        { label: 'None', value: 0 },
        { label: '50px (Small header)', value: 50 },
        { label: '64px (Standard header)', value: 64 },
        { label: '80px (Large header)', value: 80 },
        { label: '100px', value: 100 },
      ],
    },

    // Visibility
    showMarker: {
      type: 'radio',
      label: 'Show Visual Marker (Editor Only)',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    label: {
      type: 'text',
      label: 'Label (Editor Only)',
    },

    // Spacing
    marginTop: {
      type: 'select',
      label: 'Margin Top',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 4 },
        { label: 'Large', value: 6 },
      ],
    },
    marginBottom: {
      type: 'select',
      label: 'Margin Bottom',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 4 },
        { label: 'Large', value: 6 },
      ],
    },
  },
  defaultProps: {
    id: 'section-1',
    offset: 64,
    showMarker: true,
    label: 'Anchor Point',
    marginTop: 0,
    marginBottom: 0,
  },
  render: ({
    id,
    offset,
    showMarker,
    label,
    marginTop,
    marginBottom,
  }) => {
    // Clean the ID to be URL-safe
    const cleanId = id?.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase() || 'anchor';

    return (
      <Box
        id={cleanId}
        sx={{
          scrollMarginTop: offset,
          mt: marginTop,
          mb: marginBottom,
          position: 'relative',
        }}
      >
        {showMarker && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              py: 0.5,
              px: 1,
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              borderLeft: '3px solid',
              borderColor: 'primary.main',
              borderRadius: '0 4px 4px 0',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                fontFamily: 'monospace',
              }}
            >
              #{cleanId}
            </Typography>
            {label && (
              <Typography
                variant="caption"
                color="text.secondary"
              >
                — {label}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  },
};

export default Anchor;
