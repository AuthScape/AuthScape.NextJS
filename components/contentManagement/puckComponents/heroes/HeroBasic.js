import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import {
  textAlignField,
  buttonVariantField,
  buttonSizeField,
} from '../shared/fieldTypes';

export const HeroBasic = {
  label: 'Hero Basic',
  fields: {
    // Background
    backgroundType: {
      type: 'select',
      label: 'Background Type',
      options: [
        { label: 'Solid Color', value: 'solid' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Image', value: 'image' },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color (hex)',
    },
    gradientStart: {
      type: 'text',
      label: 'Gradient Start Color',
    },
    gradientEnd: {
      type: 'text',
      label: 'Gradient End Color',
    },
    gradientDirection: {
      type: 'select',
      label: 'Gradient Direction',
      options: [
        { label: 'To Right', value: 'to right' },
        { label: 'To Left', value: 'to left' },
        { label: 'To Bottom', value: 'to bottom' },
        { label: 'To Top', value: 'to top' },
        { label: 'Diagonal', value: 'to bottom right' },
      ],
    },
    backgroundImage: {
      type: 'text',
      label: 'Background Image URL',
    },
    overlayColor: {
      type: 'text',
      label: 'Overlay Color (rgba)',
    },
    overlayOpacity: {
      type: 'select',
      label: 'Overlay Opacity',
      options: [
        { label: 'None', value: 0 },
        { label: 'Light (30%)', value: 0.3 },
        { label: 'Medium (50%)', value: 0.5 },
        { label: 'Dark (70%)', value: 0.7 },
        { label: 'Very Dark (85%)', value: 0.85 },
      ],
    },

    // Content
    preTitle: {
      type: 'text',
      label: 'Pre-Title (small text above)',
    },
    title: {
      type: 'textarea',
      label: 'Title',
    },
    subtitle: {
      type: 'textarea',
      label: 'Subtitle',
    },
    align: textAlignField,

    // Colors
    textColor: {
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'Dark', value: '#212121' },
        { label: 'Light', value: '#ffffff' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customTextColor: {
      type: 'text',
      label: 'Custom Text Color',
    },

    // Primary Button
    showPrimaryButton: {
      type: 'radio',
      label: 'Show Primary Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    primaryButtonText: {
      type: 'text',
      label: 'Primary Button Text',
    },
    primaryButtonLink: {
      type: 'text',
      label: 'Primary Button Link',
    },
    primaryButtonVariant: buttonVariantField,

    // Secondary Button
    showSecondaryButton: {
      type: 'radio',
      label: 'Show Secondary Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    secondaryButtonText: {
      type: 'text',
      label: 'Secondary Button Text',
    },
    secondaryButtonLink: {
      type: 'text',
      label: 'Secondary Button Link',
    },

    // Layout
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Small (400px)', value: '400px' },
        { label: 'Medium (500px)', value: '500px' },
        { label: 'Large (600px)', value: '600px' },
        { label: 'Extra Large (700px)', value: '700px' },
        { label: 'Full Screen', value: '100vh' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Content Max Width',
      options: [
        { label: 'Narrow (600px)', value: '600px' },
        { label: 'Medium (800px)', value: '800px' },
        { label: 'Wide (1000px)', value: '1000px' },
        { label: 'Full', value: '100%' },
      ],
    },
    verticalPadding: {
      type: 'select',
      label: 'Vertical Padding',
      options: [
        { label: 'Small (48px)', value: 48 },
        { label: 'Medium (80px)', value: 80 },
        { label: 'Large (120px)', value: 120 },
        { label: 'Extra Large (160px)', value: 160 },
      ],
    },
  },
  defaultProps: {
    backgroundType: 'gradient',
    backgroundColor: '#1976d2',
    gradientStart: '#1976d2',
    gradientEnd: '#42a5f5',
    gradientDirection: 'to bottom right',
    backgroundImage: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    preTitle: '',
    title: 'Create Amazing Experiences',
    subtitle: 'Build beautiful, modern websites with our powerful drag-and-drop editor. No coding required.',
    align: 'center',
    textColor: '#ffffff',
    customTextColor: '',
    showPrimaryButton: true,
    primaryButtonText: 'Get Started',
    primaryButtonLink: '#',
    primaryButtonVariant: 'contained',
    showSecondaryButton: true,
    secondaryButtonText: 'Learn More',
    secondaryButtonLink: '#',
    height: '500px',
    maxWidth: '800px',
    verticalPadding: 80,
  },
  render: ({
    backgroundType,
    backgroundColor,
    gradientStart,
    gradientEnd,
    gradientDirection,
    backgroundImage,
    overlayColor,
    overlayOpacity,
    preTitle,
    title,
    subtitle,
    align,
    textColor,
    customTextColor,
    showPrimaryButton,
    primaryButtonText,
    primaryButtonLink,
    primaryButtonVariant,
    showSecondaryButton,
    secondaryButtonText,
    secondaryButtonLink,
    height,
    maxWidth,
    verticalPadding,
  }) => {
    const getBackground = () => {
      switch (backgroundType) {
        case 'gradient':
          return `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`;
        case 'image':
          return `url(${backgroundImage})`;
        default:
          return backgroundColor;
      }
    };

    const finalTextColor = textColor === 'custom' ? customTextColor : textColor;

    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: height,
          background: getBackground(),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Overlay */}
        {backgroundType === 'image' && overlayOpacity > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            }}
          />
        )}

        {/* Content */}
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              maxWidth: maxWidth,
              margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : 0,
              textAlign: align,
              py: `${verticalPadding}px`,
            }}
          >
            {/* Pre-title */}
            {preTitle && (
              <Typography
                variant="overline"
                sx={{
                  color: finalTextColor,
                  opacity: 0.9,
                  letterSpacing: 2,
                  fontSize: '0.875rem',
                  display: 'block',
                  mb: 1,
                }}
              >
                {preTitle}
              </Typography>
            )}

            {/* Title */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: finalTextColor,
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>

            {/* Subtitle */}
            {subtitle && (
              <Typography
                variant="h6"
                sx={{
                  color: finalTextColor,
                  opacity: 0.9,
                  fontWeight: 400,
                  mb: 4,
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                }}
              >
                {subtitle}
              </Typography>
            )}

            {/* Buttons */}
            {(showPrimaryButton || showSecondaryButton) && (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={align}
                alignItems={align === 'center' ? 'center' : 'flex-start'}
              >
                {showPrimaryButton && (
                  <Button
                    variant={primaryButtonVariant}
                    size="large"
                    href={primaryButtonLink}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      ...(primaryButtonVariant === 'contained' && {
                        backgroundColor: 'white',
                        color: backgroundColor || gradientStart,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                        },
                      }),
                    }}
                  >
                    {primaryButtonText}
                  </Button>
                )}
                {showSecondaryButton && (
                  <Button
                    variant="outlined"
                    size="large"
                    href={secondaryButtonLink}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      borderColor: finalTextColor,
                      color: finalTextColor,
                      '&:hover': {
                        borderColor: finalTextColor,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    {secondaryButtonText}
                  </Button>
                )}
              </Stack>
            )}
          </Box>
        </Container>
      </Box>
    );
  },
};

export default HeroBasic;
