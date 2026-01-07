import React from 'react';
import { Box, Stack as MuiStack, Divider } from '@mui/material';
import { DropZone } from '@measured/puck';

export const Stack = {
  label: 'Stack Layout',
  fields: {
    // Stack Configuration
    direction: {
      type: 'select',
      label: 'Direction',
      options: [
        { label: 'Vertical (Column)', value: 'column' },
        { label: 'Horizontal (Row)', value: 'row' },
        { label: 'Vertical Reverse', value: 'column-reverse' },
        { label: 'Horizontal Reverse', value: 'row-reverse' },
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
        { label: 'XXL', value: 8 },
      ],
    },
    items: {
      type: 'select',
      label: 'Number of Items',
      options: [
        { label: '2 Items', value: 2 },
        { label: '3 Items', value: 3 },
        { label: '4 Items', value: 4 },
        { label: '5 Items', value: 5 },
        { label: '6 Items', value: 6 },
        { label: '8 Items', value: 8 },
        { label: '10 Items', value: 10 },
      ],
    },

    // Alignment
    alignItems: {
      type: 'select',
      label: 'Align Items',
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
      label: 'Justify Content',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'flex-end' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
    },

    // Divider
    showDivider: {
      type: 'radio',
      label: 'Show Divider',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    dividerColor: {
      type: 'text',
      label: 'Divider Color',
    },

    // Responsive
    mobileDirection: {
      type: 'select',
      label: 'Mobile Direction',
      options: [
        { label: 'Same as Desktop', value: null },
        { label: 'Vertical (Column)', value: 'column' },
        { label: 'Horizontal (Row)', value: 'row' },
      ],
    },

    // Styling
    flexWrap: {
      type: 'select',
      label: 'Flex Wrap',
      options: [
        { label: 'No Wrap', value: 'nowrap' },
        { label: 'Wrap', value: 'wrap' },
        { label: 'Wrap Reverse', value: 'wrap-reverse' },
      ],
    },
    useFlexGap: {
      type: 'radio',
      label: 'Use Flex Gap',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    minHeight: {
      type: 'text',
      label: 'Minimum Height',
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
    direction: 'column',
    spacing: 2,
    items: 3,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    showDivider: false,
    dividerColor: '',
    mobileDirection: null,
    flexWrap: 'nowrap',
    useFlexGap: true,
    minHeight: '',
    backgroundColor: '',
    padding: 0,
  },
  render: ({
    direction,
    spacing,
    items,
    alignItems,
    justifyContent,
    showDivider,
    dividerColor,
    mobileDirection,
    flexWrap,
    useFlexGap,
    minHeight,
    backgroundColor,
    padding,
  }) => {
    const isHorizontal = direction === 'row' || direction === 'row-reverse';
    const dividerOrientation = isHorizontal ? 'vertical' : 'horizontal';

    return (
      <Box
        sx={{
          minHeight: minHeight || 'auto',
          backgroundColor: backgroundColor || 'transparent',
          p: padding,
        }}
      >
        <MuiStack
          direction={{
            xs: mobileDirection || direction,
            md: direction,
          }}
          spacing={spacing}
          alignItems={alignItems}
          justifyContent={justifyContent}
          flexWrap={flexWrap}
          useFlexGap={useFlexGap}
          divider={
            showDivider ? (
              <Divider
                orientation={dividerOrientation}
                flexItem
                sx={{
                  borderColor: dividerColor || 'divider',
                }}
              />
            ) : undefined
          }
          sx={{
            minHeight: 'inherit',
          }}
        >
          {[...Array(items)].map((_, index) => (
            <Box key={index} sx={{ minWidth: 0 }}>
              <DropZone zone={`stack-item-${index}`} />
            </Box>
          ))}
        </MuiStack>
      </Box>
    );
  },
};

export default Stack;
