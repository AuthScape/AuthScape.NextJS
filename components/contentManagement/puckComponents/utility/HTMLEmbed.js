import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';

export const HTMLEmbed = {
  label: 'HTML Embed',
  fields: {
    // Content
    code: {
      type: 'textarea',
      label: 'HTML Code',
    },
    executeScripts: {
      type: 'radio',
      label: 'Execute Scripts',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Layout
    width: {
      type: 'select',
      label: 'Width',
      options: [
        { label: 'Full Width', value: '100%' },
        { label: 'Auto', value: 'auto' },
        { label: 'Fixed (400px)', value: '400px' },
        { label: 'Fixed (600px)', value: '600px' },
        { label: 'Fixed (800px)', value: '800px' },
      ],
    },
    minHeight: {
      type: 'select',
      label: 'Minimum Height',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: '100px', value: '100px' },
        { label: '200px', value: '200px' },
        { label: '300px', value: '300px' },
        { label: '400px', value: '400px' },
      ],
    },
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'flex-end' },
      ],
    },

    // Styling
    showBorder: {
      type: 'radio',
      label: 'Show Border',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    backgroundColor: {
      type: 'select',
      label: 'Background',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: '#ffffff' },
        { label: 'Light Grey', value: '#f5f5f5' },
      ],
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
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

    // Editor Note
    note: {
      type: 'text',
      label: 'Editor Note (not displayed)',
    },
  },
  defaultProps: {
    code: '<div style="padding: 20px; background: #f0f0f0; border-radius: 8px;">\n  <p>Your custom HTML here</p>\n</div>',
    executeScripts: false,
    width: '100%',
    minHeight: 'auto',
    alignment: 'flex-start',
    showBorder: false,
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    note: '',
  },
  render: ({
    code,
    executeScripts,
    width,
    minHeight,
    alignment,
    showBorder,
    backgroundColor,
    padding,
    borderRadius,
  }) => {
    const containerRef = useRef(null);

    useEffect(() => {
      if (executeScripts && containerRef.current) {
        // Find and execute any script tags
        const scripts = containerRef.current.querySelectorAll('script');
        scripts.forEach((oldScript) => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
      }
    }, [code, executeScripts]);

    const borderRadiusValue = borderRadius * 4;

    if (!code) {
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
            Add HTML code to display content
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: alignment,
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            width: width,
            minHeight: minHeight,
            backgroundColor: backgroundColor,
            p: padding,
            borderRadius: `${borderRadiusValue}px`,
            border: showBorder ? '1px solid' : 'none',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </Box>
    );
  },
};

export default HTMLEmbed;
