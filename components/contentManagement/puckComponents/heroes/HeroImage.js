import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';

export const HeroImage = {
  label: 'Hero Image',
  fields: {
    // Image
    backgroundImage: {
      type: 'text',
      label: 'Background Image URL',
    },
    backgroundPosition: {
      type: 'select',
      label: 'Background Position',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    parallax: {
      type: 'radio',
      label: 'Parallax Effect',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Overlay
    overlayType: {
      type: 'select',
      label: 'Overlay Type',
      options: [
        { label: 'Solid Color', value: 'solid' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'None', value: 'none' },
      ],
    },
    overlayColor: {
      type: 'text',
      label: 'Overlay Color',
    },
    overlayOpacity: {
      type: 'select',
      label: 'Overlay Opacity',
      options: [
        { label: 'Light (0.3)', value: 0.3 },
        { label: 'Medium (0.5)', value: 0.5 },
        { label: 'Dark (0.7)', value: 0.7 },
        { label: 'Very Dark (0.85)', value: 0.85 },
      ],
    },
    gradientDirection: {
      type: 'select',
      label: 'Gradient Direction',
      options: [
        { label: 'Top to Bottom', value: 'to bottom' },
        { label: 'Bottom to Top', value: 'to top' },
        { label: 'Left to Right', value: 'to right' },
        { label: 'Right to Left', value: 'to left' },
        { label: 'Diagonal', value: 'to bottom right' },
      ],
    },

    // Content
    eyebrow: {
      type: 'text',
      label: 'Eyebrow Text',
    },
    title: {
      type: 'text',
      label: 'Title',
    },
    subtitle: {
      type: 'textarea',
      label: 'Subtitle',
    },
    primaryCTA: {
      type: 'text',
      label: 'Primary CTA Text',
    },
    primaryCTALink: {
      type: 'text',
      label: 'Primary CTA Link',
    },
    secondaryCTA: {
      type: 'text',
      label: 'Secondary CTA Text',
    },
    secondaryCTALink: {
      type: 'text',
      label: 'Secondary CTA Link',
    },

    // Layout
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Small (400px)', value: 400 },
        { label: 'Medium (500px)', value: 500 },
        { label: 'Large (600px)', value: 600 },
        { label: 'Extra Large (700px)', value: 700 },
        { label: 'Full Screen', value: '100vh' },
        { label: 'Full Screen (minus header)', value: 'calc(100vh - 64px)' },
      ],
    },
    contentAlign: {
      type: 'select',
      label: 'Content Alignment',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'flex-start' },
        { label: 'Right', value: 'flex-end' },
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
    textAlign: {
      type: 'select',
      label: 'Text Alignment',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Content Max Width',
      options: [
        { label: 'Small (600px)', value: 600 },
        { label: 'Medium (800px)', value: 800 },
        { label: 'Large (1000px)', value: 1000 },
        { label: 'Full', value: 'none' },
      ],
    },
    titleSize: {
      type: 'select',
      label: 'Title Size',
      options: [
        { label: 'Medium (h3)', value: 'h3' },
        { label: 'Large (h2)', value: 'h2' },
        { label: 'Extra Large (h1)', value: 'h1' },
      ],
    },
  },
  defaultProps: {
    backgroundImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600',
    backgroundPosition: 'center',
    parallax: false,
    overlayType: 'gradient',
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    gradientDirection: 'to bottom',
    eyebrow: '',
    title: 'Transform Your Business',
    subtitle: 'Powerful solutions designed to help your business grow and succeed in the digital age.',
    primaryCTA: 'Get Started',
    primaryCTALink: '#',
    secondaryCTA: 'Learn More',
    secondaryCTALink: '#',
    height: 600,
    contentAlign: 'center',
    verticalAlign: 'center',
    textAlign: 'center',
    maxWidth: 800,
    titleSize: 'h2',
  },
  render: ({
    backgroundImage,
    backgroundPosition,
    parallax,
    overlayType,
    overlayColor,
    overlayOpacity,
    gradientDirection,
    eyebrow,
    title,
    subtitle,
    primaryCTA,
    primaryCTALink,
    secondaryCTA,
    secondaryCTALink,
    height,
    contentAlign,
    verticalAlign,
    textAlign,
    maxWidth,
    titleSize,
  }) => {
    const getOverlay = () => {
      if (overlayType === 'none') return 'none';
      if (overlayType === 'gradient') {
        return `linear-gradient(${gradientDirection}, rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity * 0.3}))`;
      }
      return overlayColor;
    };

    return (
      <Box
        sx={{
          position: 'relative',
          height: height,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: backgroundPosition,
          backgroundAttachment: parallax ? 'fixed' : 'scroll',
          display: 'flex',
          alignItems: verticalAlign,
          py: verticalAlign !== 'center' ? 8 : 0,
        }}
      >
        {/* Overlay */}
        {overlayType !== 'none' && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: getOverlay(),
              opacity: overlayType === 'solid' ? overlayOpacity : 1,
            }}
          />
        )}

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: contentAlign,
              textAlign: textAlign,
              maxWidth: maxWidth === 'none' ? '100%' : maxWidth,
              mx: contentAlign === 'center' ? 'auto' : 0,
              ml: contentAlign === 'flex-end' ? 'auto' : 0,
            }}
          >
            {eyebrow && (
              <Typography
                variant="overline"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 600,
                  letterSpacing: 3,
                  mb: 2,
                }}
              >
                {eyebrow}
              </Typography>
            )}

            <Typography
              variant={titleSize}
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                mb: 3,
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400,
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                {subtitle}
              </Typography>
            )}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={contentAlign}
            >
              {primaryCTA && (
                <Button
                  variant="contained"
                  size="large"
                  href={primaryCTALink}
                  sx={{ px: 4, py: 1.5 }}
                >
                  {primaryCTA}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant="outlined"
                  size="large"
                  href={secondaryCTALink}
                  sx={{
                    px: 4,
                    py: 1.5,
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: '#ffffff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  {secondaryCTA}
                </Button>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>
    );
  },
};

export default HeroImage;
