import React from 'react';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';

export const CTACard = {
  label: 'CTA Card',
  fields: {
    // Content
    title: {
      type: 'text',
      label: 'Title',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    image: {
      type: 'text',
      label: 'Image URL (optional)',
    },

    // Primary CTA
    primaryText: {
      type: 'text',
      label: 'Primary Button Text',
    },
    primaryLink: {
      type: 'text',
      label: 'Primary Button Link',
    },
    primaryVariant: {
      type: 'select',
      label: 'Primary Button Style',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Outlined', value: 'outlined' },
      ],
    },

    // Secondary CTA
    showSecondary: {
      type: 'radio',
      label: 'Show Secondary Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    secondaryText: {
      type: 'text',
      label: 'Secondary Button Text',
    },
    secondaryLink: {
      type: 'text',
      label: 'Secondary Button Link',
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Split Image', value: 'split' },
      ],
    },
    imagePosition: {
      type: 'select',
      label: 'Image Position (Split)',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    align: {
      type: 'select',
      label: 'Content Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'select',
      label: 'Background Color',
      options: [
        { label: 'White', value: '#ffffff' },
        { label: 'Light Grey', value: '#f5f5f5' },
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Dark', value: '#1a1a1a' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customBgColor: {
      type: 'text',
      label: 'Custom Background Color',
    },
    textColor: {
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Elevation',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'Small', value: 3 },
        { label: 'Medium', value: 4 },
        { label: 'Large', value: 6 },
      ],
    },
  },
  defaultProps: {
    title: 'Ready to Get Started?',
    description: 'Join thousands of satisfied customers and take your business to the next level.',
    image: '',
    primaryText: 'Get Started',
    primaryLink: '#',
    primaryVariant: 'contained',
    showSecondary: true,
    secondaryText: 'Contact Sales',
    secondaryLink: '#',
    layout: 'horizontal',
    imagePosition: 'right',
    align: 'flex-start',
    backgroundColor: 'primary.main',
    customBgColor: '',
    textColor: 'light',
    elevation: 0,
    borderRadius: 2,
    padding: 4,
  },
  render: ({
    title,
    description,
    image,
    primaryText,
    primaryLink,
    primaryVariant,
    showSecondary,
    secondaryText,
    secondaryLink,
    layout,
    imagePosition,
    align,
    backgroundColor,
    customBgColor,
    textColor,
    elevation,
    borderRadius,
    padding,
  }) => {
    const bgColor = backgroundColor === 'custom' ? customBgColor : backgroundColor;
    const isLight = textColor === 'light';
    const borderRadiusValue = borderRadius * 4;

    const getButtonStyles = () => {
      if (isLight) {
        return {
          primary: primaryVariant === 'contained'
            ? { backgroundColor: '#ffffff', color: bgColor, '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } }
            : { color: '#ffffff', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: '#ffffff' } },
          secondary: { color: '#ffffff', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: '#ffffff', backgroundColor: 'rgba(255,255,255,0.1)' } },
        };
      }
      return {
        primary: {},
        secondary: { color: 'text.primary' },
      };
    };

    const btnStyles = getButtonStyles();

    const textContent = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: align,
          textAlign: align === 'center' ? 'center' : 'left',
          flex: 1,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: isLight ? '#ffffff' : 'text.primary',
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body1"
            sx={{
              color: isLight ? 'rgba(255,255,255,0.9)' : 'text.secondary',
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            {description}
          </Typography>
        )}

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ width: align === 'center' ? 'auto' : '100%' }}
        >
          {primaryText && (
            <Button
              variant={primaryVariant}
              size="large"
              href={primaryLink}
              sx={{
                px: 4,
                py: 1.5,
                ...btnStyles.primary,
              }}
            >
              {primaryText}
            </Button>
          )}
          {showSecondary && secondaryText && (
            <Button
              variant="outlined"
              size="large"
              href={secondaryLink}
              sx={{
                px: 4,
                py: 1.5,
                ...btnStyles.secondary,
              }}
            >
              {secondaryText}
            </Button>
          )}
        </Stack>
      </Box>
    );

    // Split layout with image
    if (layout === 'split' && image) {
      return (
        <Paper
          elevation={elevation}
          sx={{
            borderRadius: `${borderRadiusValue}px`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column', md: imagePosition === 'left' ? 'row-reverse' : 'row' },
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: bgColor,
              p: padding,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {textContent}
          </Box>
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
              minHeight: { xs: 200, md: 'auto' },
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Paper>
      );
    }

    // Vertical layout
    if (layout === 'vertical') {
      return (
        <Paper
          elevation={elevation}
          sx={{
            backgroundColor: bgColor,
            borderRadius: `${borderRadiusValue}px`,
            p: padding,
            textAlign: 'center',
          }}
        >
          {image && (
            <Box
              component="img"
              src={image}
              alt=""
              sx={{
                maxWidth: 200,
                mb: 3,
                mx: 'auto',
                display: 'block',
              }}
            />
          )}
          <Box sx={{ ...textContent.props?.sx, alignItems: 'center', textAlign: 'center' }}>
            {textContent}
          </Box>
        </Paper>
      );
    }

    // Horizontal layout (default)
    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: bgColor,
          borderRadius: `${borderRadiusValue}px`,
          p: padding,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4,
        }}
      >
        {textContent}
        {image && (
          <Box
            component="img"
            src={image}
            alt=""
            sx={{
              maxWidth: { xs: '100%', md: 300 },
              height: 'auto',
              flexShrink: 0,
            }}
          />
        )}
      </Paper>
    );
  },
};

export default CTACard;
