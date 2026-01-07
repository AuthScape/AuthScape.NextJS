import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

export const Features = {
  label: 'Features Grid',
  fields: {
    // Features
    features: {
      type: 'array',
      label: 'Features',
      arrayFields: {
        icon: { type: 'text', label: 'Icon (Material Icon name)' },
        title: { type: 'text', label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
      },
      defaultItemProps: {
        icon: 'star',
        title: 'Feature',
        description: 'Description of this feature.',
      },
    },

    // Title
    showTitle: {
      type: 'radio',
      label: 'Show Section Title',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    sectionTitle: {
      type: 'text',
      label: 'Section Title',
    },
    sectionSubtitle: {
      type: 'text',
      label: 'Section Subtitle',
    },

    // Layout
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
      ],
    },
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Tight', value: 3 },
        { label: 'Normal', value: 4 },
        { label: 'Spacious', value: 6 },
      ],
    },

    // Card Style
    cardStyle: {
      type: 'select',
      label: 'Card Style',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' },
      ],
    },
    cardPadding: {
      type: 'select',
      label: 'Card Padding',
      options: [
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
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

    // Icon Style
    iconStyle: {
      type: 'select',
      label: 'Icon Style',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' },
        { label: 'Rounded', value: 'rounded' },
      ],
    },
    iconSize: {
      type: 'select',
      label: 'Icon Size',
      options: [
        { label: 'Small (24px)', value: 24 },
        { label: 'Medium (32px)', value: 32 },
        { label: 'Large (40px)', value: 40 },
      ],
    },
    iconColor: {
      type: 'text',
      label: 'Icon Color',
    },
    iconBgColor: {
      type: 'text',
      label: 'Icon Background Color',
    },
  },
  defaultProps: {
    features: [
      { icon: 'speed', title: 'Lightning Fast', description: 'Our platform is optimized for speed, ensuring quick load times and smooth performance.' },
      { icon: 'security', title: 'Secure by Default', description: 'Enterprise-grade security with encryption and compliance built-in from the ground up.' },
      { icon: 'support_agent', title: '24/7 Support', description: 'Our dedicated support team is available around the clock to help you succeed.' },
      { icon: 'trending_up', title: 'Scalable', description: 'Grow with confidence knowing our infrastructure scales with your needs.' },
      { icon: 'integration_instructions', title: 'Easy Integration', description: 'Connect with your favorite tools through our extensive API and integrations.' },
      { icon: 'analytics', title: 'Advanced Analytics', description: 'Get actionable insights with our powerful analytics and reporting tools.' },
    ],
    showTitle: true,
    sectionTitle: 'Why Choose Us',
    sectionSubtitle: 'Discover the features that make our platform stand out',
    columns: 3,
    alignment: 'center',
    spacing: 4,
    cardStyle: 'none',
    cardPadding: 3,
    borderRadius: 2,
    iconStyle: 'circle',
    iconSize: 32,
    iconColor: '',
    iconBgColor: '',
  },
  render: ({
    features,
    showTitle,
    sectionTitle,
    sectionSubtitle,
    columns,
    alignment,
    spacing,
    cardStyle,
    cardPadding,
    borderRadius,
    iconStyle,
    iconSize,
    iconColor,
    iconBgColor,
  }) => {
    const borderRadiusValue = borderRadius * 4;

    const getIconContainerStyles = () => {
      if (iconStyle === 'none') return {};

      const size = iconSize + 20;
      const base = {
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        mx: alignment === 'center' ? 'auto' : 0,
        backgroundColor: iconBgColor || 'primary.light',
      };

      switch (iconStyle) {
        case 'circle':
          return { ...base, borderRadius: '50%' };
        case 'square':
          return { ...base, borderRadius: 0 };
        case 'rounded':
          return { ...base, borderRadius: 2 };
        default:
          return base;
      }
    };

    const renderFeature = (feature, index) => {
      const content = (
        <>
          {/* Icon */}
          <Box sx={getIconContainerStyles()}>
            <Box
              component="span"
              className="material-icons"
              sx={{
                fontSize: iconSize,
                color: iconColor || 'primary.main',
              }}
            >
              {feature.icon}
            </Box>
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 1, textAlign: alignment === 'center' ? 'center' : 'left' }}
          >
            {feature.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.7,
              textAlign: alignment === 'center' ? 'center' : 'left',
            }}
          >
            {feature.description}
          </Typography>
        </>
      );

      if (cardStyle !== 'none') {
        return (
          <Grid item xs={12} sm={6} md={12 / columns} key={index}>
            <Paper
              elevation={cardStyle === 'elevated' ? 1 : 0}
              variant={cardStyle === 'outlined' ? 'outlined' : 'elevation'}
              sx={{
                p: cardPadding,
                height: '100%',
                borderRadius: `${borderRadiusValue}px`,
                backgroundColor: cardStyle === 'filled' ? 'grey.50' : 'background.paper',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: cardStyle === 'elevated' ? 'translateY(-4px)' : 'none',
                  boxShadow: cardStyle === 'elevated' ? 4 : undefined,
                },
              }}
            >
              {content}
            </Paper>
          </Grid>
        );
      }

      return (
        <Grid item xs={12} sm={6} md={12 / columns} key={index}>
          <Box sx={{ p: cardPadding }}>{content}</Box>
        </Grid>
      );
    };

    return (
      <Box>
        {/* Section Header */}
        {showTitle && (
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {sectionTitle}
            </Typography>
            {sectionSubtitle && (
              <Typography variant="h6" color="text.secondary" fontWeight={400}>
                {sectionSubtitle}
              </Typography>
            )}
          </Box>
        )}

        {/* Features Grid */}
        <Grid container spacing={spacing}>
          {features.map(renderFeature)}
        </Grid>
      </Box>
    );
  },
};

export default Features;
