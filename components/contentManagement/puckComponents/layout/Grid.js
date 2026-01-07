import React from 'react';
import { Box, Grid2 } from '@mui/material';
import { DropZone } from '@measured/puck';

export const Grid = {
  label: 'Grid Layout',
  fields: {
    // Grid Configuration
    columns: {
      type: 'select',
      label: 'Number of Columns',
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
        { label: '5 Columns', value: 5 },
        { label: '6 Columns', value: 6 },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'None', value: 0 },
        { label: 'Extra Small', value: 1 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
        { label: 'Extra Large', value: 6 },
      ],
    },
    rowSpacing: {
      type: 'select',
      label: 'Row Spacing (Override)',
      options: [
        { label: 'Same as Spacing', value: null },
        { label: 'None', value: 0 },
        { label: 'Extra Small', value: 1 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
        { label: 'Extra Large', value: 6 },
      ],
    },
    columnSpacing: {
      type: 'select',
      label: 'Column Spacing (Override)',
      options: [
        { label: 'Same as Spacing', value: null },
        { label: 'None', value: 0 },
        { label: 'Extra Small', value: 1 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
        { label: 'Extra Large', value: 6 },
      ],
    },

    // Alignment
    alignItems: {
      type: 'select',
      label: 'Align Items (Vertical)',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'flex-end' },
        { label: 'Stretch', value: 'stretch' },
        { label: 'Baseline', value: 'baseline' },
      ],
    },
    justifyContent: {
      type: 'select',
      label: 'Justify Content (Horizontal)',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'flex-end' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
    },

    // Responsive
    mobileColumns: {
      type: 'select',
      label: 'Mobile Columns',
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
        { label: 'Same as Desktop', value: null },
      ],
    },
    tabletColumns: {
      type: 'select',
      label: 'Tablet Columns',
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: 'Same as Desktop', value: null },
      ],
    },

    // Styling
    minHeight: {
      type: 'text',
      label: 'Minimum Height (e.g., 200px, 50vh)',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
        { label: 'Extra Large', value: 6 },
      ],
    },
  },
  defaultProps: {
    columns: 3,
    spacing: 2,
    rowSpacing: null,
    columnSpacing: null,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    mobileColumns: 1,
    tabletColumns: 2,
    minHeight: '',
    backgroundColor: '',
    padding: 0,
  },
  render: ({
    columns,
    spacing,
    rowSpacing,
    columnSpacing,
    alignItems,
    justifyContent,
    mobileColumns,
    tabletColumns,
    minHeight,
    backgroundColor,
    padding,
  }) => {
    // Calculate column width based on 12-grid system
    const getColumnSize = (cols) => Math.floor(12 / cols);

    const desktopSize = getColumnSize(columns);
    const tabletSize = tabletColumns ? getColumnSize(tabletColumns) : desktopSize;
    const mobileSize = mobileColumns ? getColumnSize(mobileColumns) : 12;

    return (
      <Box
        sx={{
          minHeight: minHeight || 'auto',
          backgroundColor: backgroundColor || 'transparent',
          p: padding,
        }}
      >
        <Grid2
          container
          spacing={spacing}
          rowSpacing={rowSpacing !== null ? rowSpacing : undefined}
          columnSpacing={columnSpacing !== null ? columnSpacing : undefined}
          sx={{
            alignItems: alignItems,
            justifyContent: justifyContent,
          }}
        >
          {[...Array(columns)].map((_, index) => (
            <Grid2
              key={index}
              size={{
                xs: mobileSize,
                sm: mobileSize,
                md: tabletSize,
                lg: desktopSize,
                xl: desktopSize,
              }}
            >
              <DropZone zone={`grid-column-${index}`} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    );
  },
};

export default Grid;
