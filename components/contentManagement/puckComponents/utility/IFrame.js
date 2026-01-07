import React from 'react';
import { Box, Paper, Typography, Skeleton } from '@mui/material';

export const IFrame = {
  label: 'IFrame Embed',
  fields: {
    // Source
    src: {
      type: 'text',
      label: 'Source URL',
    },
    title: {
      type: 'text',
      label: 'Title (for accessibility)',
    },

    // Dimensions
    width: {
      type: 'select',
      label: 'Width',
      options: [
        { label: 'Full Width', value: '100%' },
        { label: '800px', value: '800px' },
        { label: '640px', value: '640px' },
        { label: '560px', value: '560px' },
        { label: '480px', value: '480px' },
      ],
    },
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Auto (16:9 ratio)', value: 'auto' },
        { label: '200px', value: '200px' },
        { label: '315px', value: '315px' },
        { label: '400px', value: '400px' },
        { label: '500px', value: '500px' },
        { label: '600px', value: '600px' },
      ],
    },
    aspectRatio: {
      type: 'select',
      label: 'Aspect Ratio (when height is Auto)',
      options: [
        { label: '16:9 (Video)', value: '56.25%' },
        { label: '4:3 (Standard)', value: '75%' },
        { label: '1:1 (Square)', value: '100%' },
        { label: '21:9 (Ultrawide)', value: '42.85%' },
      ],
    },

    // Permissions
    allowFullscreen: {
      type: 'radio',
      label: 'Allow Fullscreen',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    allowAutoplay: {
      type: 'radio',
      label: 'Allow Autoplay',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    allowCamera: {
      type: 'radio',
      label: 'Allow Camera',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    allowMicrophone: {
      type: 'radio',
      label: 'Allow Microphone',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'flex-end' },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Shadow',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
      ],
    },
    showBorder: {
      type: 'radio',
      label: 'Show Border',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Caption
    caption: {
      type: 'text',
      label: 'Caption',
    },
  },
  defaultProps: {
    src: '',
    title: 'Embedded content',
    width: '100%',
    height: 'auto',
    aspectRatio: '56.25%',
    allowFullscreen: true,
    allowAutoplay: false,
    allowCamera: false,
    allowMicrophone: false,
    alignment: 'center',
    borderRadius: 2,
    elevation: 0,
    showBorder: false,
    caption: '',
  },
  render: ({
    src,
    title,
    width,
    height,
    aspectRatio,
    allowFullscreen,
    allowAutoplay,
    allowCamera,
    allowMicrophone,
    alignment,
    borderRadius,
    elevation,
    showBorder,
    caption,
  }) => {
    const borderRadiusValue = borderRadius * 4;

    const getAllowPermissions = () => {
      const permissions = [];
      if (allowAutoplay) permissions.push('autoplay');
      if (allowFullscreen) permissions.push('fullscreen');
      if (allowCamera) permissions.push('camera');
      if (allowMicrophone) permissions.push('microphone');
      permissions.push('encrypted-media', 'picture-in-picture');
      return permissions.join('; ');
    };

    if (!src) {
      return (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">
            Enter a URL to embed external content
          </Typography>
        </Box>
      );
    }

    const isAutoHeight = height === 'auto';

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignment,
        }}
      >
        <Paper
          elevation={elevation}
          sx={{
            width: width,
            maxWidth: '100%',
            borderRadius: `${borderRadiusValue}px`,
            overflow: 'hidden',
            border: showBorder ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          {isAutoHeight ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: aspectRatio,
              }}
            >
              <Box
                component="iframe"
                src={src}
                title={title}
                allow={getAllowPermissions()}
                allowFullScreen={allowFullscreen}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          ) : (
            <Box
              component="iframe"
              src={src}
              title={title}
              allow={getAllowPermissions()}
              allowFullScreen={allowFullscreen}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{
                width: '100%',
                height: height,
                border: 'none',
                display: 'block',
              }}
            />
          )}
        </Paper>

        {caption && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, textAlign: 'center' }}
          >
            {caption}
          </Typography>
        )}
      </Box>
    );
  },
};

export default IFrame;
