import React from 'react';
import { Box } from '@mui/material';

export const Spacer = {
  label: 'Spacer',
  fields: {
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Extra Small (8px)', value: 8 },
        { label: 'Small (16px)', value: 16 },
        { label: 'Medium (24px)', value: 24 },
        { label: 'Large (32px)', value: 32 },
        { label: 'Extra Large (48px)', value: 48 },
        { label: 'XXL (64px)', value: 64 },
        { label: 'XXXL (96px)', value: 96 },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customHeight: {
      type: 'number',
      label: 'Custom Height (px)',
    },
    mobileHeight: {
      type: 'select',
      label: 'Mobile Height',
      options: [
        { label: 'Same as Desktop', value: 'inherit' },
        { label: 'Extra Small (8px)', value: 8 },
        { label: 'Small (16px)', value: 16 },
        { label: 'Medium (24px)', value: 24 },
        { label: 'Large (32px)', value: 32 },
        { label: 'Extra Large (48px)', value: 48 },
      ],
    },
    showDivider: {
      type: 'radio',
      label: 'Show Divider Line',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    dividerColor: {
      type: 'select',
      label: 'Divider Color',
      options: [
        { label: 'Light Gray', value: '#e0e0e0' },
        { label: 'Gray', value: '#9e9e9e' },
        { label: 'Dark Gray', value: '#616161' },
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
      ],
    },
    dividerWidth: {
      type: 'select',
      label: 'Divider Width',
      options: [
        { label: 'Full Width', value: '100%' },
        { label: '75%', value: '75%' },
        { label: '50%', value: '50%' },
        { label: '25%', value: '25%' },
      ],
    },
  },
  defaultProps: {
    height: 32,
    customHeight: 50,
    mobileHeight: 'inherit',
    showDivider: false,
    dividerColor: '#e0e0e0',
    dividerWidth: '100%',
  },
  render: ({
    height,
    customHeight,
    mobileHeight,
    showDivider,
    dividerColor,
    dividerWidth,
  }) => {
    const getHeight = () => {
      if (height === 'custom') {
        return customHeight || 50;
      }
      return height;
    };

    const desktopHeight = getHeight();
    const responsiveMobileHeight = mobileHeight === 'inherit' ? desktopHeight : mobileHeight;

    return (
      <Box
        sx={{
          width: '100%',
          height: {
            xs: `${responsiveMobileHeight}px`,
            md: `${desktopHeight}px`,
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showDivider && (
          <Box
            sx={{
              width: dividerWidth,
              height: '1px',
              backgroundColor: dividerColor,
            }}
          />
        )}
      </Box>
    );
  },
};

export default Spacer;
