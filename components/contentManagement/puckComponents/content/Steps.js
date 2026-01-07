import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

export const Steps = {
  label: 'Process Steps',
  fields: {
    // Steps
    steps: {
      type: 'array',
      label: 'Steps',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
        icon: { type: 'text', label: 'Icon (optional)' },
      },
      defaultItemProps: {
        title: 'Step Title',
        description: 'Step description goes here.',
        icon: '',
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
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Alternating', value: 'alternating' },
      ],
    },
    showNumbers: {
      type: 'radio',
      label: 'Show Step Numbers',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showConnector: {
      type: 'radio',
      label: 'Show Connectors',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    numberStyle: {
      type: 'select',
      label: 'Number Style',
      options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    accentColor: {
      type: 'text',
      label: 'Accent Color',
    },
    cardStyle: {
      type: 'select',
      label: 'Card Style',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Outlined', value: 'outlined' },
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
  },
  defaultProps: {
    steps: [
      { title: 'Sign Up', description: 'Create your account in just a few clicks. No credit card required.', icon: 'person_add' },
      { title: 'Configure', description: 'Set up your preferences and customize your workspace.', icon: 'settings' },
      { title: 'Connect', description: 'Integrate with your favorite tools and import your data.', icon: 'link' },
      { title: 'Launch', description: "You're ready to go! Start using all features immediately.", icon: 'rocket_launch' },
    ],
    showTitle: true,
    sectionTitle: 'How It Works',
    sectionSubtitle: 'Get started in just 4 simple steps',
    layout: 'horizontal',
    showNumbers: true,
    showConnector: true,
    numberStyle: 'circle',
    accentColor: '',
    cardStyle: 'none',
    cardPadding: 3,
  },
  render: ({
    steps,
    showTitle,
    sectionTitle,
    sectionSubtitle,
    layout,
    showNumbers,
    showConnector,
    numberStyle,
    accentColor,
    cardStyle,
    cardPadding,
  }) => {
    const color = accentColor || 'primary.main';

    const getNumberStyles = () => {
      const base = {
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 700,
        flexShrink: 0,
      };

      switch (numberStyle) {
        case 'square':
          return { ...base, backgroundColor: color, color: '#ffffff', borderRadius: 1 };
        case 'outline':
          return { ...base, border: '2px solid', borderColor: color, color: color, borderRadius: '50%' };
        default:
          return { ...base, backgroundColor: color, color: '#ffffff', borderRadius: '50%' };
      }
    };

    const renderStep = (step, index) => {
      const isLast = index === steps.length - 1;

      const stepContent = (
        <Box
          sx={{
            display: 'flex',
            flexDirection: layout === 'horizontal' ? 'column' : 'row',
            alignItems: layout === 'horizontal' ? 'center' : 'flex-start',
            textAlign: layout === 'horizontal' ? 'center' : 'left',
            gap: 2,
          }}
        >
          {/* Number/Icon */}
          <Box sx={{ position: 'relative' }}>
            <Box sx={getNumberStyles()}>
              {step.icon ? (
                <Box component="span" className="material-icons" sx={{ fontSize: 24 }}>
                  {step.icon}
                </Box>
              ) : showNumbers ? (
                index + 1
              ) : null}
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {step.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {step.description}
            </Typography>
          </Box>
        </Box>
      );

      if (layout === 'horizontal') {
        return (
          <Grid item xs={12} sm={6} md={12 / steps.length} key={index}>
            <Box sx={{ position: 'relative' }}>
              {/* Connector Line */}
              {showConnector && !isLast && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: '50%',
                    width: '100%',
                    height: 2,
                    backgroundColor: 'grey.300',
                    zIndex: 0,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
              )}

              {cardStyle !== 'none' ? (
                <Paper
                  elevation={cardStyle === 'elevated' ? 1 : 0}
                  variant={cardStyle === 'outlined' ? 'outlined' : 'elevation'}
                  sx={{ p: cardPadding, position: 'relative', zIndex: 1 }}
                >
                  {stepContent}
                </Paper>
              ) : (
                <Box sx={{ position: 'relative', zIndex: 1 }}>{stepContent}</Box>
              )}
            </Box>
          </Grid>
        );
      }

      // Vertical or Alternating layout
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: layout === 'alternating' && index % 2 === 1 ? 'row-reverse' : 'row',
            mb: isLast ? 0 : 4,
            position: 'relative',
          }}
        >
          {/* Connector Line */}
          {showConnector && !isLast && (
            <Box
              sx={{
                position: 'absolute',
                left: layout === 'alternating' ? '50%' : 24,
                top: 48,
                bottom: -16,
                width: 2,
                backgroundColor: 'grey.300',
                transform: 'translateX(-50%)',
              }}
            />
          )}

          {cardStyle !== 'none' ? (
            <Paper
              elevation={cardStyle === 'elevated' ? 1 : 0}
              variant={cardStyle === 'outlined' ? 'outlined' : 'elevation'}
              sx={{ p: cardPadding, flex: 1, position: 'relative', zIndex: 1 }}
            >
              {stepContent}
            </Paper>
          ) : (
            <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>{stepContent}</Box>
          )}
        </Box>
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

        {/* Steps */}
        {layout === 'horizontal' ? (
          <Grid container spacing={4}>
            {steps.map(renderStep)}
          </Grid>
        ) : (
          <Box>{steps.map(renderStep)}</Box>
        )}
      </Box>
    );
  },
};

export default Steps;
