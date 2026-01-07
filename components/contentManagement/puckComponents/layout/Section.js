import React from 'react';
import { Box } from '@mui/material';
import { DropZone } from '@measured/puck';
import {
  spacingField,
  backgroundColorField,
  maxWidthField,
  alignItemsField,
  justifyContentField,
} from '../shared/fieldTypes';

export const Section = {
  label: 'Section',
  fields: {
    backgroundColor: backgroundColorField,
    customBackgroundColor: {
      type: 'text',
      label: 'Custom Color (hex)',
    },
    backgroundImage: {
      type: 'text',
      label: 'Background Image URL',
    },
    backgroundOverlay: {
      type: 'select',
      label: 'Image Overlay',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'rgba(255,255,255,0.3)' },
        { label: 'Medium', value: 'rgba(0,0,0,0.3)' },
        { label: 'Dark', value: 'rgba(0,0,0,0.6)' },
        { label: 'Very Dark', value: 'rgba(0,0,0,0.8)' },
      ],
    },
    maxWidth: maxWidthField,
    minHeight: {
      type: 'select',
      label: 'Minimum Height',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Small (200px)', value: '200px' },
        { label: 'Medium (400px)', value: '400px' },
        { label: 'Large (600px)', value: '600px' },
        { label: 'Full Screen', value: '100vh' },
      ],
    },
    verticalAlign: alignItemsField,
    horizontalAlign: justifyContentField,
    padding: spacingField('Padding'),
    margin: spacingField('Margin'),
    fullWidth: {
      type: 'radio',
      label: 'Full Width',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    backgroundColor: 'transparent',
    customBackgroundColor: '',
    backgroundImage: '',
    backgroundOverlay: 'none',
    maxWidth: 'lg',
    minHeight: 'auto',
    verticalAlign: 'flex-start',
    horizontalAlign: 'center',
    padding: { top: 48, right: 24, bottom: 48, left: 24 },
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    fullWidth: false,
  },
  render: ({
    backgroundColor,
    customBackgroundColor,
    backgroundImage,
    backgroundOverlay,
    maxWidth,
    minHeight,
    verticalAlign,
    horizontalAlign,
    padding,
    margin,
    fullWidth,
  }) => {
    const getBackgroundColor = () => {
      if (backgroundColor === 'custom' && customBackgroundColor) {
        return customBackgroundColor;
      }
      return backgroundColor;
    };

    const maxWidthValues = {
      xs: '444px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      false: '100%',
    };

    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: minHeight,
          backgroundColor: getBackgroundColor(),
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          margin: `${margin?.top || 0}px ${margin?.right || 0}px ${margin?.bottom || 0}px ${margin?.left || 0}px`,
          display: 'flex',
          alignItems: verticalAlign,
          justifyContent: horizontalAlign,
        }}
      >
        {/* Background overlay */}
        {backgroundImage && backgroundOverlay !== 'none' && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: backgroundOverlay,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Content container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: fullWidth ? '100%' : maxWidthValues[maxWidth] || '1200px',
            padding: `${padding?.top || 0}px ${padding?.right || 0}px ${padding?.bottom || 0}px ${padding?.left || 0}px`,
            zIndex: 1,
          }}
        >
          <DropZone zone="section-content" />
        </Box>
      </Box>
    );
  },
};

export default Section;
