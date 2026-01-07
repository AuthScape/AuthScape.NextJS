import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import {
  textAlignField,
  buttonVariantField,
} from '../shared/fieldTypes';

export const CTABanner = {
  label: 'CTA Banner',
  fields: {
    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Left Aligned', value: 'left' },
        { label: 'Split (Text Left, Button Right)', value: 'split' },
      ],
    },

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
      label: 'Background Color',
    },
    gradientStart: {
      type: 'text',
      label: 'Gradient Start Color',
    },
    gradientEnd: {
      type: 'text',
      label: 'Gradient End Color',
    },
    backgroundImage: {
      type: 'text',
      label: 'Background Image URL',
    },
    overlayOpacity: {
      type: 'select',
      label: 'Image Overlay',
      options: [
        { label: 'None', value: 0 },
        { label: 'Light', value: 0.3 },
        { label: 'Medium', value: 0.5 },
        { label: 'Dark', value: 0.7 },
      ],
    },

    // Content
    title: {
      type: 'textarea',
      label: 'Title',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    textColor: {
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'White', value: '#ffffff' },
        { label: 'Dark', value: '#212121' },
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
    primaryButtonStyle: {
      type: 'select',
      label: 'Primary Button Style',
      options: [
        { label: 'White (for dark backgrounds)', value: 'white' },
        { label: 'Dark (for light backgrounds)', value: 'dark' },
        { label: 'Primary Color', value: 'primary' },
        { label: 'Outlined', value: 'outlined' },
      ],
    },

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

    // Sizing
    verticalPadding: {
      type: 'select',
      label: 'Vertical Padding',
      options: [
        { label: 'Small (32px)', value: 32 },
        { label: 'Medium (48px)', value: 48 },
        { label: 'Large (64px)', value: 64 },
        { label: 'Extra Large (80px)', value: 80 },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 8 },
        { label: 'Medium', value: 16 },
        { label: 'Large', value: 24 },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { label: 'Full Width', value: false },
        { label: 'Contained', value: 'lg' },
        { label: 'Narrow', value: 'md' },
      ],
    },
  },
  defaultProps: {
    layout: 'centered',
    backgroundType: 'gradient',
    backgroundColor: '#1976d2',
    gradientStart: '#6366f1',
    gradientEnd: '#8b5cf6',
    backgroundImage: '',
    overlayOpacity: 0.5,
    title: 'Ready to Get Started?',
    description: 'Join thousands of users who are already building amazing websites.',
    textColor: '#ffffff',
    customTextColor: '',
    showPrimaryButton: true,
    primaryButtonText: 'Start Free Trial',
    primaryButtonLink: '#',
    primaryButtonStyle: 'white',
    showSecondaryButton: true,
    secondaryButtonText: 'Contact Sales',
    secondaryButtonLink: '#',
    verticalPadding: 64,
    borderRadius: 0,
    maxWidth: false,
  },
  render: ({
    layout,
    backgroundType,
    backgroundColor,
    gradientStart,
    gradientEnd,
    backgroundImage,
    overlayOpacity,
    title,
    description,
    textColor,
    customTextColor,
    showPrimaryButton,
    primaryButtonText,
    primaryButtonLink,
    primaryButtonStyle,
    showSecondaryButton,
    secondaryButtonText,
    secondaryButtonLink,
    verticalPadding,
    borderRadius,
    maxWidth,
  }) => {
    const getBackground = () => {
      switch (backgroundType) {
        case 'gradient':
          return `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`;
        case 'image':
          return `url(${backgroundImage})`;
        default:
          return backgroundColor;
      }
    };

    const finalTextColor = textColor === 'custom' ? customTextColor : textColor;

    const getPrimaryButtonStyles = () => {
      switch (primaryButtonStyle) {
        case 'white':
          return {
            backgroundColor: '#ffffff',
            color: gradientStart || backgroundColor,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
          };
        case 'dark':
          return {
            backgroundColor: '#212121',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#333333',
            },
          };
        case 'outlined':
          return {
            backgroundColor: 'transparent',
            color: finalTextColor,
            border: `2px solid ${finalTextColor}`,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          };
        default:
          return {};
      }
    };

    const content = (
      <>
        {/* Content */}
        <Box
          sx={{
            flex: layout === 'split' ? 1 : 'none',
            textAlign: layout === 'centered' ? 'center' : 'left',
            mb: layout !== 'split' ? 3 : 0,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: finalTextColor,
              fontWeight: 700,
              mb: description ? 2 : 0,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body1"
              sx={{
                color: finalTextColor,
                opacity: 0.9,
                maxWidth: layout === 'centered' ? '600px' : 'none',
                margin: layout === 'centered' ? '0 auto' : 0,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* Buttons */}
        {(showPrimaryButton || showSecondaryButton) && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent={layout === 'centered' ? 'center' : 'flex-start'}
            alignItems="center"
          >
            {showPrimaryButton && (
              <Button
                variant="contained"
                size="large"
                href={primaryButtonLink}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  ...getPrimaryButtonStyles(),
                }}
              >
                {primaryButtonText}
              </Button>
            )}
            {showSecondaryButton && (
              <Button
                variant="text"
                size="large"
                href={secondaryButtonLink}
                sx={{
                  px: 3,
                  py: 1.5,
                  color: finalTextColor,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {secondaryButtonText}
              </Button>
            )}
          </Stack>
        )}
      </>
    );

    const innerContent = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: layout === 'split' ? { xs: 'column', md: 'row' } : 'column',
          alignItems: layout === 'split' ? { xs: 'flex-start', md: 'center' } : layout === 'centered' ? 'center' : 'flex-start',
          justifyContent: layout === 'split' ? 'space-between' : 'center',
          gap: 3,
        }}
      >
        {content}
      </Box>
    );

    return (
      <Box
        sx={{
          position: 'relative',
          background: getBackground(),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
        }}
      >
        {/* Overlay for images */}
        {backgroundType === 'image' && overlayOpacity > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#000000',
              opacity: overlayOpacity,
            }}
          />
        )}

        {/* Content wrapper */}
        <Box sx={{ position: 'relative', zIndex: 1, py: `${verticalPadding}px` }}>
          {maxWidth ? (
            <Container maxWidth={maxWidth}>
              {innerContent}
            </Container>
          ) : (
            <Box sx={{ px: { xs: 3, sm: 6, md: 8 } }}>
              {innerContent}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
};

export default CTABanner;
