import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

export const ProgressBar = {
  label: 'Progress Bar',
  fields: {
    // Value
    value: {
      type: 'number',
      label: 'Value (0-100)',
    },
    showPercent: {
      type: 'radio',
      label: 'Show Percentage',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
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
        { label: 'Above', value: 'above' },
        { label: 'Inline', value: 'inline' },
        { label: 'None', value: 'none' },
      ],
    },

    // Styling
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
    backgroundColor: {
      type: 'text',
      label: 'Track Background Color',
    },
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Thin (4px)', value: 4 },
        { label: 'Small (8px)', value: 8 },
        { label: 'Medium (12px)', value: 12 },
        { label: 'Large (16px)', value: 16 },
        { label: 'Extra Large (24px)', value: 24 },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 4 },
        { label: 'Medium', value: 8 },
        { label: 'Rounded', value: 50 },
      ],
    },
    animated: {
      type: 'radio',
      label: 'Animated',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    striped: {
      type: 'radio',
      label: 'Striped Pattern',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    value: 65,
    showPercent: true,
    label: 'Progress',
    labelPosition: 'above',
    color: 'primary',
    customColor: '',
    backgroundColor: '',
    height: 8,
    borderRadius: 4,
    animated: false,
    striped: false,
  },
  render: ({
    value,
    showPercent,
    label,
    labelPosition,
    color,
    customColor,
    backgroundColor,
    height,
    borderRadius,
    animated,
    striped,
  }) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const barColor = customColor || undefined;

    const stripedStyle = striped
      ? {
          backgroundImage: `linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          )`,
          backgroundSize: `${height * 2}px ${height * 2}px`,
          animation: animated ? 'progress-bar-stripes 1s linear infinite' : undefined,
        }
      : {};

    return (
      <Box sx={{ width: '100%' }}>
        {labelPosition === 'above' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            {label && (
              <Typography variant="body2" fontWeight={500}>
                {label}
              </Typography>
            )}
            {showPercent && (
              <Typography variant="body2" color="text.secondary">
                {clampedValue}%
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {labelPosition === 'inline' && label && (
            <Typography variant="body2" fontWeight={500} sx={{ minWidth: 80 }}>
              {label}
            </Typography>
          )}

          <Box sx={{ flex: 1, position: 'relative' }}>
            <LinearProgress
              variant="determinate"
              value={clampedValue}
              color={customColor ? 'inherit' : color}
              sx={{
                height: height,
                borderRadius: `${borderRadius}px`,
                backgroundColor: backgroundColor || undefined,
                '& .MuiLinearProgress-bar': {
                  borderRadius: `${borderRadius}px`,
                  backgroundColor: barColor,
                  transition: animated ? 'transform 0.6s ease' : 'none',
                  ...stripedStyle,
                },
              }}
            />
          </Box>

          {labelPosition === 'inline' && showPercent && (
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
              {clampedValue}%
            </Typography>
          )}
        </Box>

        <style jsx global>{`
          @keyframes progress-bar-stripes {
            from {
              background-position: ${height * 2}px 0;
            }
            to {
              background-position: 0 0;
            }
          }
        `}</style>
      </Box>
    );
  },
};

export default ProgressBar;
