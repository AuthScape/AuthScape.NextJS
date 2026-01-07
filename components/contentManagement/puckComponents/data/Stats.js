import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import {
  textAlignField,
  textColorField,
  borderRadiusField,
  elevationField,
} from '../shared/fieldTypes';

export const Stats = {
  label: 'Stats',
  fields: {
    stats: {
      type: 'array',
      label: 'Statistics',
      arrayFields: {
        value: { type: 'text', label: 'Value (e.g., 99%, 10K+)' },
        label: { type: 'text', label: 'Label' },
        prefix: { type: 'text', label: 'Prefix (e.g., $)' },
        suffix: { type: 'text', label: 'Suffix (e.g., +, %)' },
        description: { type: 'text', label: 'Description (optional)' },
      },
      defaultItemProps: {
        value: '100',
        label: 'Stat Label',
        prefix: '',
        suffix: '',
        description: '',
      },
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
    layout: {
      type: 'select',
      label: 'Layout Style',
      options: [
        { label: 'Simple', value: 'simple' },
        { label: 'Cards', value: 'cards' },
        { label: 'Bordered', value: 'bordered' },
        { label: 'Icon Background', value: 'icon-bg' },
      ],
    },
    align: textAlignField,

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    cardBackgroundColor: {
      type: 'text',
      label: 'Card Background Color (for Cards layout)',
    },
    valueColor: {
      type: 'select',
      label: 'Value Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Dark', value: '#212121' },
        { label: 'Light', value: '#ffffff' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customValueColor: {
      type: 'text',
      label: 'Custom Value Color',
    },
    labelColor: textColorField,
    valueSize: {
      type: 'select',
      label: 'Value Size',
      options: [
        { label: 'Small', value: 'h4' },
        { label: 'Medium', value: 'h3' },
        { label: 'Large', value: 'h2' },
        { label: 'Extra Large', value: 'h1' },
      ],
    },
    borderRadius: borderRadiusField,
    elevation: elevationField,

    // Animation
    animate: {
      type: 'radio',
      label: 'Animate Numbers',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Dividers
    showDividers: {
      type: 'radio',
      label: 'Show Dividers (for Simple/Bordered)',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    dividerColor: {
      type: 'text',
      label: 'Divider Color',
    },

    // Spacing
    verticalPadding: {
      type: 'select',
      label: 'Vertical Padding',
      options: [
        { label: 'Small (24px)', value: 24 },
        { label: 'Medium (48px)', value: 48 },
        { label: 'Large (64px)', value: 64 },
      ],
    },
  },
  defaultProps: {
    stats: [
      { value: '10', label: 'Years Experience', prefix: '', suffix: '+', description: '' },
      { value: '500', label: 'Happy Clients', prefix: '', suffix: '+', description: '' },
      { value: '99', label: 'Satisfaction Rate', prefix: '', suffix: '%', description: '' },
      { value: '24', label: 'Support', prefix: '', suffix: '/7', description: '' },
    ],
    columns: 4,
    layout: 'simple',
    align: 'center',
    backgroundColor: 'transparent',
    cardBackgroundColor: '#ffffff',
    valueColor: 'primary.main',
    customValueColor: '',
    labelColor: 'text.secondary',
    valueSize: 'h3',
    borderRadius: 2,
    elevation: 1,
    animate: false,
    showDividers: false,
    dividerColor: '#e0e0e0',
    verticalPadding: 48,
  },
  render: ({
    stats,
    columns,
    layout,
    align,
    backgroundColor,
    cardBackgroundColor,
    valueColor,
    customValueColor,
    labelColor,
    valueSize,
    borderRadius,
    elevation,
    animate,
    showDividers,
    dividerColor,
    verticalPadding,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;
    const finalValueColor = valueColor === 'custom' ? customValueColor : valueColor;

    const StatItem = ({ stat, index }) => {
      const content = (
        <Box sx={{ textAlign: align, py: layout === 'cards' ? 3 : 0, px: 2 }}>
          {/* Value */}
          <Typography
            variant={valueSize}
            sx={{
              color: finalValueColor,
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            {stat.prefix}
            {stat.value}
            {stat.suffix}
          </Typography>

          {/* Label */}
          <Typography
            variant="body1"
            sx={{
              color: labelColor,
              fontWeight: 500,
            }}
          >
            {stat.label}
          </Typography>

          {/* Description */}
          {stat.description && (
            <Typography
              variant="body2"
              sx={{
                color: labelColor,
                opacity: 0.7,
                mt: 0.5,
              }}
            >
              {stat.description}
            </Typography>
          )}
        </Box>
      );

      if (layout === 'cards') {
        return (
          <Paper
            elevation={elevation}
            sx={{
              backgroundColor: cardBackgroundColor,
              borderRadius: `${borderRadiusValue}px`,
              height: '100%',
            }}
          >
            {content}
          </Paper>
        );
      }

      if (layout === 'bordered') {
        return (
          <Box
            sx={{
              border: '1px solid',
              borderColor: dividerColor,
              borderRadius: `${borderRadiusValue}px`,
              py: 3,
              height: '100%',
            }}
          >
            {content}
          </Box>
        );
      }

      if (layout === 'icon-bg') {
        return (
          <Box
            sx={{
              position: 'relative',
              py: 3,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: finalValueColor,
                opacity: 0.1,
                zIndex: 0,
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>{content}</Box>
          </Box>
        );
      }

      // Simple layout
      return (
        <Box
          sx={{
            py: 2,
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {content}
          {/* Divider */}
          {showDividers && index < stats.length - 1 && (
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: '20%',
                height: '60%',
                width: '1px',
                backgroundColor: dividerColor,
                display: { xs: 'none', md: 'block' },
              }}
            />
          )}
        </Box>
      );
    };

    return (
      <Box
        sx={{
          backgroundColor: backgroundColor,
          py: `${verticalPadding}px`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={layout === 'cards' ? 3 : 2}>
            {stats.map((stat, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={12 / columns}
                key={index}
              >
                <StatItem stat={stat} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  },
};

export default Stats;
