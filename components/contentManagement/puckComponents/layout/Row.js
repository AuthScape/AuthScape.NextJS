import React from 'react';
import { Box } from '@mui/material';
import { DropZone } from '@measured/puck';
import {
  spacingField,
  justifyContentField,
  alignItemsField,
} from '../shared/fieldTypes';

export const Row = {
  label: 'Row',
  fields: {
    justifyContent: justifyContentField,
    alignItems: alignItemsField,
    gap: {
      type: 'select',
      label: 'Gap Between Items',
      options: [
        { label: 'None', value: 0 },
        { label: 'Extra Small (4px)', value: 4 },
        { label: 'Small (8px)', value: 8 },
        { label: 'Medium (16px)', value: 16 },
        { label: 'Large (24px)', value: 24 },
        { label: 'Extra Large (32px)', value: 32 },
        { label: 'XXL (48px)', value: 48 },
      ],
    },
    wrap: {
      type: 'radio',
      label: 'Wrap Items',
      options: [
        { label: 'Wrap', value: 'wrap' },
        { label: 'No Wrap', value: 'nowrap' },
      ],
    },
    direction: {
      type: 'select',
      label: 'Direction',
      options: [
        { label: 'Horizontal', value: 'row' },
        { label: 'Horizontal Reverse', value: 'row-reverse' },
        { label: 'Vertical', value: 'column' },
        { label: 'Vertical Reverse', value: 'column-reverse' },
      ],
    },
    mobileDirection: {
      type: 'select',
      label: 'Mobile Direction',
      options: [
        { label: 'Same as Desktop', value: 'inherit' },
        { label: 'Stack Vertical', value: 'column' },
        { label: 'Stack Vertical Reverse', value: 'column-reverse' },
      ],
    },
    padding: spacingField('Padding'),
    minHeight: {
      type: 'number',
      label: 'Min Height (px)',
    },
  },
  defaultProps: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 16,
    wrap: 'wrap',
    direction: 'row',
    mobileDirection: 'column',
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    minHeight: 0,
  },
  render: ({
    justifyContent,
    alignItems,
    gap,
    wrap,
    direction,
    mobileDirection,
    padding,
    minHeight,
  }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: mobileDirection === 'inherit' ? direction : mobileDirection,
            md: direction,
          },
          justifyContent: justifyContent,
          alignItems: alignItems,
          gap: `${gap}px`,
          flexWrap: wrap,
          padding: `${padding?.top || 0}px ${padding?.right || 0}px ${padding?.bottom || 0}px ${padding?.left || 0}px`,
          minHeight: minHeight ? `${minHeight}px` : 'auto',
          width: '100%',
        }}
      >
        <DropZone zone="row-content" />
      </Box>
    );
  },
};

export default Row;
