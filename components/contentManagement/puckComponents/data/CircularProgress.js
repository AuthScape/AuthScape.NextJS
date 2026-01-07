import React from 'react';
import { Box, Typography, CircularProgress as MuiCircularProgress } from '@mui/material';

export const CircularProgress = {
  label: 'Circular Progress',
  fields: {
    // Value
    value: {
      type: 'number',
      label: 'Value (0-100)',
    },
    showValue: {
      type: 'radio',
      label: 'Show Value',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    valueFormat: {
      type: 'select',
      label: 'Value Format',
      options: [
        { label: 'Percentage', value: 'percent' },
        { label: 'Number', value: 'number' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customValue: {
      type: 'text',
      label: 'Custom Value Text',
    },

    // Label
    label: {
      type: 'text',
      label: 'Label',
    },
    labelPosition: {
      type: 'select',
      label: 'Label Position',
      options: [
        { label: 'Below', value: 'below' },
        { label: 'Inside (replaces value)', value: 'inside' },
        { label: 'None', value: 'none' },
      ],
    },

    // Styling
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small (60px)', value: 60 },
        { label: 'Medium (80px)', value: 80 },
        { label: 'Large (100px)', value: 100 },
        { label: 'Extra Large (140px)', value: 140 },
        { label: 'Huge (180px)', value: 180 },
      ],
    },
    thickness: {
      type: 'select',
      label: 'Thickness',
      options: [
        { label: 'Thin', value: 2 },
        { label: 'Light', value: 3 },
        { label: 'Normal', value: 4 },
        { label: 'Medium', value: 5 },
        { label: 'Thick', value: 6 },
        { label: 'Heavy', value: 8 },
      ],
    },
    color: {
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Info', value: 'info' },
      ],
    },
    customColor: {
      type: 'text',
      label: 'Custom Color (hex)',
    },
    trackColor: {
      type: 'text',
      label: 'Track Color',
    },
    valueColor: {
      type: 'text',
      label: 'Value Text Color',
    },
    valueFontSize: {
      type: 'select',
      label: 'Value Font Size',
      options: [
        { label: 'Small', value: 'body2' },
        { label: 'Medium', value: 'body1' },
        { label: 'Large', value: 'h6' },
        { label: 'Extra Large', value: 'h5' },
        { label: 'Huge', value: 'h4' },
      ],
    },
  },
  defaultProps: {
    value: 75,
    showValue: true,
    valueFormat: 'percent',
    customValue: '',
    label: '',
    labelPosition: 'below',
    size: 100,
    thickness: 4,
    color: 'primary',
    customColor: '',
    trackColor: '',
    valueColor: '',
    valueFontSize: 'h6',
  },
  render: ({
    value,
    showValue,
    valueFormat,
    customValue,
    label,
    labelPosition,
    size,
    thickness,
    color,
    customColor,
    trackColor,
    valueColor,
  }) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    const getDisplayValue = () => {
      if (labelPosition === 'inside' && label) return label;
      if (!showValue) return null;
      switch (valueFormat) {
        case 'percent':
          return `${clampedValue}%`;
        case 'number':
          return clampedValue;
        case 'custom':
          return customValue;
        default:
          return `${clampedValue}%`;
      }
    };

    const displayValue = getDisplayValue();

    // Calculate font size based on circle size
    const getFontVariant = () => {
      if (size <= 60) return 'body2';
      if (size <= 80) return 'body1';
      if (size <= 100) return 'h6';
      if (size <= 140) return 'h5';
      return 'h4';
    };

    return (
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          {/* Track circle */}
          <MuiCircularProgress
            variant="determinate"
            value={100}
            size={size}
            thickness={thickness}
            sx={{
              color: trackColor || 'grey.200',
              position: 'absolute',
            }}
          />

          {/* Progress circle */}
          <MuiCircularProgress
            variant="determinate"
            value={clampedValue}
            size={size}
            thickness={thickness}
            color={customColor ? 'inherit' : color}
            sx={{
              color: customColor || undefined,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                transition: 'stroke-dashoffset 0.6s ease',
              },
            }}
          />

          {/* Center content */}
          {displayValue && (
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant={getFontVariant()}
                component="div"
                sx={{
                  color: valueColor || 'text.primary',
                  fontWeight: 600,
                }}
              >
                {displayValue}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Label below */}
        {labelPosition === 'below' && label && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {label}
          </Typography>
        )}
      </Box>
    );
  },
};

export default CircularProgress;
