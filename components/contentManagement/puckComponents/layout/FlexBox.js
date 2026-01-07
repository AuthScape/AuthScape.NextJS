import React from 'react';
import { Box } from '@mui/material';
import { DropZone } from '@measured/puck';

export const FlexBox = {
  label: 'Flex Box',
  fields: {
    // Flex Configuration
    flexDirection: {
      type: 'select',
      label: 'Flex Direction',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
        { label: 'Row Reverse', value: 'row-reverse' },
        { label: 'Column Reverse', value: 'column-reverse' },
      ],
    },
    flexWrap: {
      type: 'select',
      label: 'Flex Wrap',
      options: [
        { label: 'No Wrap', value: 'nowrap' },
        { label: 'Wrap', value: 'wrap' },
        { label: 'Wrap Reverse', value: 'wrap-reverse' },
      ],
    },

    // Alignment
    justifyContent: {
      type: 'select',
      label: 'Justify Content (Main Axis)',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'flex-end' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
    },
    alignItems: {
      type: 'select',
      label: 'Align Items (Cross Axis)',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'flex-end' },
        { label: 'Stretch', value: 'stretch' },
        { label: 'Baseline', value: 'baseline' },
      ],
    },
    alignContent: {
      type: 'select',
      label: 'Align Content (Multi-line)',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'flex-end' },
        { label: 'Stretch', value: 'stretch' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
      ],
    },

    // Gap
    gap: {
      type: 'select',
      label: 'Gap',
      options: [
        { label: 'None', value: 0 },
        { label: '4px', value: 4 },
        { label: '8px', value: 8 },
        { label: '12px', value: 12 },
        { label: '16px', value: 16 },
        { label: '24px', value: 24 },
        { label: '32px', value: 32 },
        { label: '48px', value: 48 },
      ],
    },
    rowGap: {
      type: 'select',
      label: 'Row Gap (Override)',
      options: [
        { label: 'Same as Gap', value: null },
        { label: 'None', value: 0 },
        { label: '4px', value: 4 },
        { label: '8px', value: 8 },
        { label: '16px', value: 16 },
        { label: '24px', value: 24 },
        { label: '32px', value: 32 },
      ],
    },
    columnGap: {
      type: 'select',
      label: 'Column Gap (Override)',
      options: [
        { label: 'Same as Gap', value: null },
        { label: 'None', value: 0 },
        { label: '4px', value: 4 },
        { label: '8px', value: 8 },
        { label: '16px', value: 16 },
        { label: '24px', value: 24 },
        { label: '32px', value: 32 },
      ],
    },

    // Responsive
    mobileDirection: {
      type: 'select',
      label: 'Mobile Direction',
      options: [
        { label: 'Same as Desktop', value: null },
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
      ],
    },

    // Sizing
    minHeight: {
      type: 'text',
      label: 'Minimum Height (e.g., 200px, 50vh)',
    },
    maxWidth: {
      type: 'text',
      label: 'Maximum Width (e.g., 1200px, 100%)',
    },
    fullHeight: {
      type: 'radio',
      label: 'Full Viewport Height',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small (8px)', value: 1 },
        { label: 'Medium (16px)', value: 2 },
        { label: 'Large (24px)', value: 3 },
        { label: 'XL (32px)', value: 4 },
        { label: 'XXL (48px)', value: 6 },
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
  },
  defaultProps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'flex-start',
    gap: 16,
    rowGap: null,
    columnGap: null,
    mobileDirection: 'column',
    minHeight: '',
    maxWidth: '',
    fullHeight: false,
    backgroundColor: '',
    padding: 0,
    borderRadius: 0,
  },
  render: ({
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    rowGap,
    columnGap,
    mobileDirection,
    minHeight,
    maxWidth,
    fullHeight,
    backgroundColor,
    padding,
    borderRadius,
  }) => {
    const borderRadiusValue = borderRadius * 4;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: mobileDirection || flexDirection,
            md: flexDirection,
          },
          flexWrap: flexWrap,
          justifyContent: justifyContent,
          alignItems: alignItems,
          alignContent: alignContent,
          gap: `${gap}px`,
          rowGap: rowGap !== null ? `${rowGap}px` : undefined,
          columnGap: columnGap !== null ? `${columnGap}px` : undefined,
          minHeight: fullHeight ? '100vh' : (minHeight || 'auto'),
          maxWidth: maxWidth || 'none',
          backgroundColor: backgroundColor || 'transparent',
          p: padding,
          borderRadius: `${borderRadiusValue}px`,
          margin: maxWidth ? '0 auto' : undefined,
        }}
      >
        <DropZone zone="flex-content" />
      </Box>
    );
  },
};

export default FlexBox;
