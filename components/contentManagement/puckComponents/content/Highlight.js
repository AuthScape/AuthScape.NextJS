import React from 'react';
import { Box, Typography } from '@mui/material';

export const Highlight = {
  label: 'Highlight Box',
  fields: {
    // Content
    text: {
      type: 'textarea',
      label: 'Text',
    },
    title: {
      type: 'text',
      label: 'Title (optional)',
    },

    // Style
    style: {
      type: 'select',
      label: 'Style',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Note', value: 'note' },
        { label: 'Tip', value: 'tip' },
        { label: 'Custom', value: 'custom' },
      ],
    },

    // Icon
    showIcon: {
      type: 'radio',
      label: 'Show Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    customIcon: {
      type: 'text',
      label: 'Custom Icon (Material Icon name)',
    },

    // Custom Colors
    backgroundColor: {
      type: 'text',
      label: 'Background Color (Custom)',
    },
    borderColor: {
      type: 'text',
      label: 'Border Color (Custom)',
    },
    iconColor: {
      type: 'text',
      label: 'Icon Color (Custom)',
    },

    // Border
    borderPosition: {
      type: 'select',
      label: 'Border Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Top', value: 'top' },
        { label: 'All Sides', value: 'all' },
        { label: 'None', value: 'none' },
      ],
    },
    borderWidth: {
      type: 'select',
      label: 'Border Width',
      options: [
        { label: 'Thin (2px)', value: 2 },
        { label: 'Normal (4px)', value: 4 },
        { label: 'Thick (6px)', value: 6 },
      ],
    },

    // Padding
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
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
      ],
    },
  },
  defaultProps: {
    text: 'This is an important piece of information that you should pay attention to.',
    title: '',
    style: 'info',
    showIcon: true,
    customIcon: '',
    backgroundColor: '',
    borderColor: '',
    iconColor: '',
    borderPosition: 'left',
    borderWidth: 4,
    padding: 3,
    borderRadius: 1,
  },
  render: ({
    text,
    title,
    style,
    showIcon,
    customIcon,
    backgroundColor,
    borderColor,
    iconColor,
    borderPosition,
    borderWidth,
    padding,
    borderRadius,
  }) => {
    const stylePresets = {
      info: {
        bg: '#e3f2fd',
        border: '#2196f3',
        icon: 'info',
        iconColor: '#1976d2',
      },
      success: {
        bg: '#e8f5e9',
        border: '#4caf50',
        icon: 'check_circle',
        iconColor: '#2e7d32',
      },
      warning: {
        bg: '#fff3e0',
        border: '#ff9800',
        icon: 'warning',
        iconColor: '#f57c00',
      },
      error: {
        bg: '#ffebee',
        border: '#f44336',
        icon: 'error',
        iconColor: '#d32f2f',
      },
      note: {
        bg: '#f3e5f5',
        border: '#9c27b0',
        icon: 'edit_note',
        iconColor: '#7b1fa2',
      },
      tip: {
        bg: '#e0f7fa',
        border: '#00bcd4',
        icon: 'lightbulb',
        iconColor: '#0097a7',
      },
      custom: {
        bg: backgroundColor || '#f5f5f5',
        border: borderColor || '#9e9e9e',
        icon: customIcon || 'info',
        iconColor: iconColor || '#616161',
      },
    };

    const preset = stylePresets[style];
    const borderRadiusValue = borderRadius * 4;

    const getBorderStyles = () => {
      switch (borderPosition) {
        case 'top':
          return { borderTop: `${borderWidth}px solid ${preset.border}` };
        case 'all':
          return { border: `${borderWidth}px solid ${preset.border}` };
        case 'none':
          return {};
        default:
          return { borderLeft: `${borderWidth}px solid ${preset.border}` };
      }
    };

    return (
      <Box
        sx={{
          backgroundColor: preset.bg,
          p: padding,
          borderRadius: `${borderRadiusValue}px`,
          display: 'flex',
          gap: 2,
          alignItems: title ? 'flex-start' : 'center',
          ...getBorderStyles(),
        }}
      >
        {showIcon && (
          <Box
            component="span"
            className="material-icons"
            sx={{
              fontSize: 24,
              color: preset.iconColor,
              flexShrink: 0,
              mt: title ? 0.5 : 0,
            }}
          >
            {customIcon || preset.icon}
          </Box>
        )}
        <Box>
          {title && (
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ mb: 0.5, color: preset.iconColor }}
            >
              {title}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
            {text}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export default Highlight;
