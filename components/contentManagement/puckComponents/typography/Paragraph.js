import React from 'react';
import { Typography, Box } from '@mui/material';
import {
  textAlignField,
  textColorField,
  fontWeightField,
  spacingField,
} from '../shared/fieldTypes';

export const Paragraph = {
  label: 'Paragraph',
  fields: {
    text: {
      type: 'textarea',
      label: 'Paragraph Text',
    },
    variant: {
      type: 'select',
      label: 'Text Size',
      options: [
        { label: 'Body 1 (Default)', value: 'body1' },
        { label: 'Body 2 (Smaller)', value: 'body2' },
        { label: 'Subtitle 1 (Larger)', value: 'subtitle1' },
        { label: 'Subtitle 2', value: 'subtitle2' },
        { label: 'Caption (Small)', value: 'caption' },
      ],
    },
    color: textColorField,
    customColor: {
      type: 'text',
      label: 'Custom Color (hex)',
    },
    align: textAlignField,
    fontWeight: {
      type: 'select',
      label: 'Font Weight',
      options: [
        { label: 'Light', value: 300 },
        { label: 'Regular', value: 400 },
        { label: 'Medium', value: 500 },
        { label: 'Semi Bold', value: 600 },
      ],
    },
    lineHeight: {
      type: 'select',
      label: 'Line Height',
      options: [
        { label: 'Tight (1.2)', value: 1.2 },
        { label: 'Normal (1.5)', value: 1.5 },
        { label: 'Relaxed (1.75)', value: 1.75 },
        { label: 'Loose (2)', value: 2 },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Narrow (500px)', value: '500px' },
        { label: 'Medium (700px)', value: '700px' },
        { label: 'Wide (900px)', value: '900px' },
        { label: 'Full', value: '100%' },
      ],
    },
    margin: spacingField('Margin'),
    dropCap: {
      type: 'radio',
      label: 'Drop Cap (First Letter)',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    text: 'Enter your paragraph text here. This is a sample paragraph that demonstrates how text will appear in your design.',
    variant: 'body1',
    color: 'text.secondary',
    customColor: '',
    align: 'left',
    fontWeight: 400,
    lineHeight: 1.75,
    maxWidth: 'none',
    margin: { top: 0, right: 0, bottom: 16, left: 0 },
    dropCap: false,
  },
  render: ({
    text,
    variant,
    color,
    customColor,
    align,
    fontWeight,
    lineHeight,
    maxWidth,
    margin,
    dropCap,
  }) => {
    const getColor = () => {
      if (color === 'custom' && customColor) {
        return customColor;
      }
      return color;
    };

    return (
      <Box
        sx={{
          maxWidth: maxWidth === 'none' ? 'none' : maxWidth,
          width: '100%',
          margin: `${margin?.top || 0}px ${margin?.right || 0}px ${margin?.bottom || 0}px ${margin?.left || 0}px`,
        }}
      >
        <Typography
          variant={variant}
          sx={{
            color: getColor(),
            textAlign: align,
            fontWeight: fontWeight,
            lineHeight: lineHeight,
            ...(dropCap && {
              '&::first-letter': {
                float: 'left',
                fontSize: '3.5em',
                lineHeight: 0.8,
                paddingRight: '8px',
                fontWeight: 700,
              },
            }),
          }}
        >
          {text}
        </Typography>
      </Box>
    );
  },
};

export default Paragraph;
