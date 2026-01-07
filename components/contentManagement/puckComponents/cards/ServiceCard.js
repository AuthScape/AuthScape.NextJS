import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  borderRadiusField,
  elevationField,
  textAlignField,
  buttonVariantField,
} from '../shared/fieldTypes';

// Common service icons
const iconOptions = [
  { label: 'Settings', value: 'settings' },
  { label: 'Code', value: 'code' },
  { label: 'Design', value: 'palette' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Support', value: 'support_agent' },
  { label: 'Security', value: 'security' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Speed', value: 'speed' },
  { label: 'Storage', value: 'storage' },
  { label: 'Build', value: 'build' },
  { label: 'Device', value: 'devices' },
  { label: 'Integration', value: 'integration_instructions' },
  { label: 'API', value: 'api' },
  { label: 'Database', value: 'storage' },
  { label: 'Marketing', value: 'campaign' },
  { label: 'E-commerce', value: 'shopping_cart' },
];

export const ServiceCard = {
  label: 'Service Card',
  fields: {
    // Content
    icon: {
      type: 'select',
      label: 'Icon',
      options: iconOptions,
    },
    customIcon: {
      type: 'text',
      label: 'Custom Icon (Material Icon name)',
    },
    title: {
      type: 'text',
      label: 'Title',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },

    // Pricing (optional)
    showPrice: {
      type: 'radio',
      label: 'Show Price',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    price: {
      type: 'text',
      label: 'Price',
    },
    priceNote: {
      type: 'text',
      label: 'Price Note (e.g., "Starting from")',
    },

    // CTA
    showCTA: {
      type: 'radio',
      label: 'Show CTA',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    ctaText: {
      type: 'text',
      label: 'CTA Text',
    },
    ctaLink: {
      type: 'text',
      label: 'CTA Link',
    },
    ctaStyle: {
      type: 'select',
      label: 'CTA Style',
      options: [
        { label: 'Button', value: 'button' },
        { label: 'Link with Arrow', value: 'link' },
        { label: 'Text Only', value: 'text' },
      ],
    },

    // Layout
    align: textAlignField,
    iconSize: {
      type: 'select',
      label: 'Icon Size',
      options: [
        { label: 'Small (40px)', value: 40 },
        { label: 'Medium (56px)', value: 56 },
        { label: 'Large (72px)', value: 72 },
      ],
    },
    iconStyle: {
      type: 'select',
      label: 'Icon Style',
      options: [
        { label: 'Filled Circle', value: 'filled' },
        { label: 'Outlined Circle', value: 'outlined' },
        { label: 'Square', value: 'square' },
        { label: 'No Background', value: 'none' },
      ],
    },

    // Styling
    iconColor: {
      type: 'select',
      label: 'Icon Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'White', value: '#ffffff' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customIconColor: {
      type: 'text',
      label: 'Custom Icon Color',
    },
    iconBgColor: {
      type: 'text',
      label: 'Icon Background Color',
    },
    backgroundColor: {
      type: 'text',
      label: 'Card Background Color',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Lift', value: 'lift' },
        { label: 'Border Highlight', value: 'border' },
        { label: 'Icon Animation', value: 'icon' },
      ],
    },
  },
  defaultProps: {
    icon: 'code',
    customIcon: '',
    title: 'Web Development',
    description: 'Build modern, responsive websites with the latest technologies and best practices.',
    showPrice: false,
    price: '$999',
    priceNote: 'Starting from',
    showCTA: true,
    ctaText: 'Learn More',
    ctaLink: '#',
    ctaStyle: 'link',
    align: 'left',
    iconSize: 56,
    iconStyle: 'filled',
    iconColor: 'primary.main',
    customIconColor: '',
    iconBgColor: '',
    backgroundColor: '#ffffff',
    elevation: 1,
    borderRadius: 2,
    hoverEffect: 'lift',
  },
  render: ({
    icon,
    customIcon,
    title,
    description,
    showPrice,
    price,
    priceNote,
    showCTA,
    ctaText,
    ctaLink,
    ctaStyle,
    align,
    iconSize,
    iconStyle,
    iconColor,
    customIconColor,
    iconBgColor,
    backgroundColor,
    elevation,
    borderRadius,
    hoverEffect,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;
    const displayIcon = customIcon || icon;
    const finalIconColor = iconColor === 'custom' ? customIconColor : iconColor;

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'lift':
          return {
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
            },
          };
        case 'border':
          return {
            transition: 'border-color 0.3s ease',
            border: '2px solid transparent',
            '&:hover': {
              borderColor: 'primary.main',
            },
          };
        case 'icon':
          return {
            '& .service-icon': {
              transition: 'transform 0.3s ease',
            },
            '&:hover .service-icon': {
              transform: 'scale(1.1) rotate(5deg)',
            },
          };
        default:
          return {};
      }
    };

    const getIconContainerStyles = () => {
      const baseSize = iconSize + 24;
      const base = {
        width: baseSize,
        height: baseSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      };

      switch (iconStyle) {
        case 'filled':
          return {
            ...base,
            borderRadius: '50%',
            backgroundColor: iconBgColor || 'primary.light',
          };
        case 'outlined':
          return {
            ...base,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: finalIconColor,
          };
        case 'square':
          return {
            ...base,
            borderRadius: 2,
            backgroundColor: iconBgColor || 'primary.light',
          };
        default:
          return base;
      }
    };

    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          p: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
          textAlign: align,
          ...getHoverStyles(),
        }}
      >
        {/* Icon */}
        <Box className="service-icon" sx={getIconContainerStyles()}>
          <Box
            component="span"
            className="material-icons"
            sx={{
              fontSize: iconSize,
              color: finalIconColor,
            }}
          >
            {displayIcon}
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: showPrice || showCTA ? 3 : 0,
            flex: 1,
          }}
        >
          {description}
        </Typography>

        {/* Price */}
        {showPrice && (
          <Box sx={{ mb: showCTA ? 2 : 0 }}>
            {priceNote && (
              <Typography variant="caption" color="text.secondary">
                {priceNote}
              </Typography>
            )}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {price}
            </Typography>
          </Box>
        )}

        {/* CTA */}
        {showCTA && (
          <>
            {ctaStyle === 'button' && (
              <Button variant="contained" href={ctaLink}>
                {ctaText}
              </Button>
            )}
            {ctaStyle === 'link' && (
              <Button
                href={ctaLink}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {ctaText}
              </Button>
            )}
            {ctaStyle === 'text' && (
              <Typography
                component="a"
                href={ctaLink}
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {ctaText}
              </Typography>
            )}
          </>
        )}
      </Paper>
    );
  },
};

export default ServiceCard;
