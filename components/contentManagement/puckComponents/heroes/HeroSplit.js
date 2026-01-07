import React from 'react';
import { Box, Typography, Button, Container, Stack, Grid } from '@mui/material';
import { DropZone } from '@measured/puck';
import {
  buttonVariantField,
} from '../shared/fieldTypes';

export const HeroSplit = {
  label: 'Hero Split',
  fields: {
    // Layout
    imagePosition: {
      type: 'select',
      label: 'Image Position',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    contentWidth: {
      type: 'select',
      label: 'Content Width',
      options: [
        { label: '50/50', value: 6 },
        { label: '40/60 (More Image)', value: 5 },
        { label: '60/40 (More Content)', value: 7 },
      ],
    },
    verticalAlign: {
      type: 'select',
      label: 'Vertical Alignment',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Top', value: 'flex-start' },
        { label: 'Bottom', value: 'flex-end' },
      ],
    },
    mobileOrder: {
      type: 'select',
      label: 'Mobile Order',
      options: [
        { label: 'Image First', value: 'image-first' },
        { label: 'Content First', value: 'content-first' },
      ],
    },

    // Background
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },

    // Image
    image: {
      type: 'text',
      label: 'Image URL',
    },
    imageAlt: {
      type: 'text',
      label: 'Image Alt Text',
    },
    imageFit: {
      type: 'select',
      label: 'Image Fit',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
        { label: 'Fill', value: 'fill' },
      ],
    },
    imageRounded: {
      type: 'select',
      label: 'Image Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 8 },
        { label: 'Medium', value: 16 },
        { label: 'Large', value: 24 },
      ],
    },
    imageShadow: {
      type: 'radio',
      label: 'Image Shadow',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Content
    preTitle: {
      type: 'text',
      label: 'Pre-Title',
    },
    title: {
      type: 'textarea',
      label: 'Title',
    },
    subtitle: {
      type: 'textarea',
      label: 'Subtitle',
    },
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
    minHeight: {
      type: 'select',
      label: 'Minimum Height',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Medium (500px)', value: '500px' },
        { label: 'Large (600px)', value: '600px' },
        { label: 'Extra Large (700px)', value: '700px' },
        { label: 'Full Screen', value: '100vh' },
      ],
    },
    verticalPadding: {
      type: 'select',
      label: 'Vertical Padding',
      options: [
        { label: 'Small (40px)', value: 40 },
        { label: 'Medium (60px)', value: 60 },
        { label: 'Large (80px)', value: 80 },
        { label: 'Extra Large (100px)', value: 100 },
      ],
    },
    gap: {
      type: 'select',
      label: 'Gap Between Content & Image',
      options: [
        { label: 'Small (24px)', value: 24 },
        { label: 'Medium (48px)', value: 48 },
        { label: 'Large (64px)', value: 64 },
        { label: 'Extra Large (80px)', value: 80 },
      ],
    },
  },
  defaultProps: {
    imagePosition: 'right',
    contentWidth: 6,
    verticalAlign: 'center',
    mobileOrder: 'image-first',
    backgroundColor: '#ffffff',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    imageAlt: 'Hero image',
    imageFit: 'cover',
    imageRounded: 16,
    imageShadow: true,
    preTitle: 'WELCOME',
    title: 'Build Something Amazing Today',
    subtitle: 'Our platform helps you create stunning websites with powerful tools and beautiful templates.',
    textColor: '#212121',
    customTextColor: '',
    showPrimaryButton: true,
    primaryButtonText: 'Get Started Free',
    primaryButtonLink: '#',
    showSecondaryButton: true,
    secondaryButtonText: 'Watch Demo',
    secondaryButtonLink: '#',
    minHeight: '500px',
    verticalPadding: 60,
    gap: 48,
  },
  render: ({
    imagePosition,
    contentWidth,
    verticalAlign,
    mobileOrder,
    backgroundColor,
    image,
    imageAlt,
    imageFit,
    imageRounded,
    imageShadow,
    preTitle,
    title,
    subtitle,
    textColor,
    customTextColor,
    showPrimaryButton,
    primaryButtonText,
    primaryButtonLink,
    showSecondaryButton,
    secondaryButtonText,
    secondaryButtonLink,
    minHeight,
    verticalPadding,
    gap,
  }) => {
    const finalTextColor = textColor === 'custom' ? customTextColor : textColor;
    const imageWidth = 12 - contentWidth;

    const ContentSection = (
      <Grid
        item
        xs={12}
        md={contentWidth}
        sx={{
          order: {
            xs: mobileOrder === 'content-first' ? 1 : 2,
            md: imagePosition === 'right' ? 1 : 2,
          },
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: verticalAlign,
            pr: { md: imagePosition === 'right' ? 0 : gap / 8 },
            pl: { md: imagePosition === 'left' ? 0 : gap / 8 },
          }}
        >
          {/* Pre-title */}
          {preTitle && (
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                letterSpacing: 2,
                fontWeight: 600,
                mb: 1,
              }}
            >
              {preTitle}
            </Typography>
          )}

          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: finalTextColor,
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>

          {/* Subtitle */}
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                color: finalTextColor,
                opacity: 0.8,
                mb: 4,
                lineHeight: 1.7,
                fontSize: { xs: '1rem', md: '1.125rem' },
              }}
            >
              {subtitle}
            </Typography>
          )}

          {/* Buttons */}
          {(showPrimaryButton || showSecondaryButton) && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {showPrimaryButton && (
                <Button
                  variant="contained"
                  size="large"
                  href={primaryButtonLink}
                  sx={{ px: 4, py: 1.5 }}
                >
                  {primaryButtonText}
                </Button>
              )}
              {showSecondaryButton && (
                <Button
                  variant="outlined"
                  size="large"
                  href={secondaryButtonLink}
                  sx={{ px: 4, py: 1.5 }}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </Stack>
          )}
        </Box>
      </Grid>
    );

    const ImageSection = (
      <Grid
        item
        xs={12}
        md={imageWidth}
        sx={{
          order: {
            xs: mobileOrder === 'image-first' ? 1 : 2,
            md: imagePosition === 'right' ? 2 : 1,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '300px', md: '100%' },
            minHeight: { md: '400px' },
          }}
        >
          <Box
            component="img"
            src={image}
            alt={imageAlt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: imageFit,
              borderRadius: `${imageRounded}px`,
              boxShadow: imageShadow ? '0 20px 40px rgba(0,0,0,0.15)' : 'none',
            }}
          />
        </Box>
      </Grid>
    );

    return (
      <Box
        sx={{
          backgroundColor: backgroundColor,
          minHeight: minHeight,
          display: 'flex',
          alignItems: 'center',
          py: `${verticalPadding}px`,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={0}
            alignItems={verticalAlign}
          >
            {ContentSection}
            {ImageSection}
          </Grid>
        </Container>
      </Box>
    );
  },
};

export default HeroSplit;
