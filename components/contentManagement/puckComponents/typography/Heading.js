import React from 'react';
import { Typography } from '@mui/material';
import {
  textAlignField,
  textColorField,
  fontWeightField,
  spacingField,
} from '../shared/fieldTypes';

export const Heading = {
  label: 'Heading',
  fields: {
    text: {
      type: 'textarea',
      label: 'Heading Text',
    },
    level: {
      type: 'select',
      label: 'Heading Level',
      options: [
        { label: 'H1 - Page Title', value: 'h1' },
        { label: 'H2 - Section Title', value: 'h2' },
        { label: 'H3 - Subsection', value: 'h3' },
        { label: 'H4 - Card Title', value: 'h4' },
        { label: 'H5 - Small Title', value: 'h5' },
        { label: 'H6 - Label', value: 'h6' },
      ],
    },
    color: textColorField,
    customColor: {
      type: 'text',
      label: 'Custom Color (hex)',
    },
    align: textAlignField,
    fontWeight: fontWeightField,
    letterSpacing: {
      type: 'select',
      label: 'Letter Spacing',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Tight (-0.5px)', value: '-0.5px' },
        { label: 'Wide (1px)', value: '1px' },
        { label: 'Extra Wide (2px)', value: '2px' },
      ],
    },
    textTransform: {
      type: 'select',
      label: 'Text Transform',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Uppercase', value: 'uppercase' },
        { label: 'Lowercase', value: 'lowercase' },
        { label: 'Capitalize', value: 'capitalize' },
      ],
    },
    margin: spacingField('Margin'),
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small (400px)', value: '400px' },
        { label: 'Medium (600px)', value: '600px' },
        { label: 'Large (800px)', value: '800px' },
        { label: 'Full', value: '100%' },
      ],
    },
  },
  defaultProps: {
    text: 'Your Heading Here',
    level: 'h2',
    color: 'text.primary',
    customColor: '',
    align: 'left',
    fontWeight: 700,
    letterSpacing: 'normal',
    textTransform: 'none',
    margin: { top: 0, right: 0, bottom: 16, left: 0 },
    maxWidth: 'none',
  },
  render: ({
    text,
    level,
    color,
    customColor,
    align,
    fontWeight,
    letterSpacing,
    textTransform,
    margin,
    maxWidth,
  }) => {
    const getColor = () => {
      if (color === 'custom' && customColor) {
        return customColor;
      }
      return color;
    };

    return (
      <Typography
        variant={level}
        component={level}
        sx={{
          color: getColor(),
          textAlign: align,
          fontWeight: fontWeight,
          letterSpacing: letterSpacing,
          textTransform: textTransform,
          margin: `${margin?.top || 0}px ${margin?.right || 0}px ${margin?.bottom || 0}px ${margin?.left || 0}px`,
          maxWidth: maxWidth === 'none' ? 'none' : maxWidth,
          width: '100%',
        }}
      >
        {text}
      </Typography>
    );
  },
};

export default Heading;
