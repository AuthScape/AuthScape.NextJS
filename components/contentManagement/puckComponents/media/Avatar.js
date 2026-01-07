import React from 'react';
import { Box, Avatar as MuiAvatar, Badge, Typography } from '@mui/material';

export const Avatar = {
  label: 'Avatar',
  fields: {
    // Image
    src: {
      type: 'text',
      label: 'Image URL',
    },
    alt: {
      type: 'text',
      label: 'Alt Text / Name',
    },
    fallbackText: {
      type: 'text',
      label: 'Fallback Text (initials)',
    },

    // Size
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Extra Small (24px)', value: 24 },
        { label: 'Small (32px)', value: 32 },
        { label: 'Medium (40px)', value: 40 },
        { label: 'Large (56px)', value: 56 },
        { label: 'Extra Large (80px)', value: 80 },
        { label: 'Huge (120px)', value: 120 },
      ],
    },

    // Shape
    shape: {
      type: 'select',
      label: 'Shape',
      options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Rounded Square', value: 'rounded' },
        { label: 'Square', value: 'square' },
      ],
    },

    // Border
    showBorder: {
      type: 'radio',
      label: 'Show Border',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    borderColor: {
      type: 'select',
      label: 'Border Color',
      options: [
        { label: 'White', value: '#ffffff' },
        { label: 'Primary', value: 'primary.main' },
        { label: 'Grey', value: 'grey.300' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customBorderColor: {
      type: 'text',
      label: 'Custom Border Color',
    },
    borderWidth: {
      type: 'select',
      label: 'Border Width',
      options: [
        { label: 'Thin (2px)', value: 2 },
        { label: 'Normal (3px)', value: 3 },
        { label: 'Thick (4px)', value: 4 },
      ],
    },

    // Status Badge
    showStatus: {
      type: 'radio',
      label: 'Show Status',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    status: {
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Online', value: 'online' },
        { label: 'Offline', value: 'offline' },
        { label: 'Away', value: 'away' },
        { label: 'Busy', value: 'busy' },
      ],
    },

    // Background (for fallback)
    backgroundColor: {
      type: 'select',
      label: 'Background Color (fallback)',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Grey', value: 'grey.500' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customBackgroundColor: {
      type: 'text',
      label: 'Custom Background Color',
    },

    // Label
    showLabel: {
      type: 'radio',
      label: 'Show Label',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    labelText: {
      type: 'text',
      label: 'Label Text',
    },
    labelPosition: {
      type: 'select',
      label: 'Label Position',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Below', value: 'below' },
      ],
    },

    // Link
    link: {
      type: 'text',
      label: 'Link (optional)',
    },
  },
  defaultProps: {
    src: '',
    alt: 'User',
    fallbackText: 'JD',
    size: 56,
    shape: 'circle',
    showBorder: false,
    borderColor: '#ffffff',
    customBorderColor: '',
    borderWidth: 3,
    showStatus: false,
    status: 'online',
    backgroundColor: 'primary.main',
    customBackgroundColor: '',
    showLabel: false,
    labelText: 'John Doe',
    labelPosition: 'right',
    link: '',
  },
  render: ({
    src,
    alt,
    fallbackText,
    size,
    shape,
    showBorder,
    borderColor,
    customBorderColor,
    borderWidth,
    showStatus,
    status,
    backgroundColor,
    customBackgroundColor,
    showLabel,
    labelText,
    labelPosition,
    link,
  }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'online':
          return '#44b700';
        case 'offline':
          return '#bdbdbd';
        case 'away':
          return '#ffc107';
        case 'busy':
          return '#f44336';
        default:
          return '#44b700';
      }
    };

    const getBorderRadius = () => {
      switch (shape) {
        case 'circle':
          return '50%';
        case 'rounded':
          return size * 0.15;
        default:
          return 0;
      }
    };

    const finalBorderColor = borderColor === 'custom' ? customBorderColor : borderColor;
    const finalBgColor = backgroundColor === 'custom' ? customBackgroundColor : backgroundColor;

    const avatarElement = (
      <MuiAvatar
        src={src}
        alt={alt}
        sx={{
          width: size,
          height: size,
          fontSize: size * 0.4,
          fontWeight: 600,
          backgroundColor: finalBgColor,
          borderRadius: getBorderRadius(),
          ...(showBorder && {
            border: `${borderWidth}px solid`,
            borderColor: finalBorderColor,
          }),
        }}
      >
        {fallbackText}
      </MuiAvatar>
    );

    const avatarWithStatus = showStatus ? (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Box
            sx={{
              width: Math.max(size * 0.22, 10),
              height: Math.max(size * 0.22, 10),
              borderRadius: '50%',
              backgroundColor: getStatusColor(),
              border: '2px solid #ffffff',
            }}
          />
        }
      >
        {avatarElement}
      </Badge>
    ) : (
      avatarElement
    );

    const avatarWithLabel = showLabel ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: labelPosition === 'below' ? 'column' : 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {avatarWithStatus}
        <Typography
          variant={size >= 56 ? 'body1' : 'body2'}
          fontWeight={500}
        >
          {labelText}
        </Typography>
      </Box>
    ) : (
      avatarWithStatus
    );

    if (link) {
      return (
        <Box
          component="a"
          href={link}
          sx={{
            display: 'inline-flex',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        >
          {avatarWithLabel}
        </Box>
      );
    }

    return avatarWithLabel;
  },
};

export default Avatar;
