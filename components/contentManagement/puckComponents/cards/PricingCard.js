import React from 'react';
import { Box, Paper, Typography, Button, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  borderRadiusField,
  elevationField,
  buttonVariantField,
} from '../shared/fieldTypes';

export const PricingCard = {
  label: 'Pricing Card',
  fields: {
    // Plan info
    planName: {
      type: 'text',
      label: 'Plan Name',
    },
    price: {
      type: 'text',
      label: 'Price',
    },
    currency: {
      type: 'text',
      label: 'Currency Symbol',
    },
    period: {
      type: 'select',
      label: 'Billing Period',
      options: [
        { label: 'Per Month', value: '/mo' },
        { label: 'Per Year', value: '/yr' },
        { label: 'One Time', value: '' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customPeriod: {
      type: 'text',
      label: 'Custom Period Text',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },

    // Badge
    showBadge: {
      type: 'radio',
      label: 'Show Badge',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    badgeText: {
      type: 'text',
      label: 'Badge Text',
    },
    badgeColor: {
      type: 'select',
      label: 'Badge Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
      ],
    },

    // Features
    features: {
      type: 'array',
      label: 'Features',
      arrayFields: {
        text: { type: 'text', label: 'Feature Text' },
        included: {
          type: 'radio',
          label: 'Included',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
      },
      defaultItemProps: {
        text: 'Feature item',
        included: true,
      },
    },

    // CTA Button
    buttonText: {
      type: 'text',
      label: 'Button Text',
    },
    buttonLink: {
      type: 'text',
      label: 'Button Link',
    },
    buttonVariant: buttonVariantField,

    // Styling
    highlighted: {
      type: 'radio',
      label: 'Highlighted (Popular)',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    highlightColor: {
      type: 'text',
      label: 'Highlight Border Color',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
  },
  defaultProps: {
    planName: 'Professional',
    price: '49',
    currency: '$',
    period: '/mo',
    customPeriod: '',
    description: 'Perfect for growing businesses',
    showBadge: true,
    badgeText: 'Most Popular',
    badgeColor: 'primary',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: '50GB storage', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom integrations', included: false },
    ],
    buttonText: 'Get Started',
    buttonLink: '#',
    buttonVariant: 'contained',
    highlighted: true,
    highlightColor: '',
    backgroundColor: '#ffffff',
    elevation: 3,
    borderRadius: 2,
  },
  render: ({
    planName,
    price,
    currency,
    period,
    customPeriod,
    description,
    showBadge,
    badgeText,
    badgeColor,
    features,
    buttonText,
    buttonLink,
    buttonVariant,
    highlighted,
    highlightColor,
    backgroundColor,
    elevation,
    borderRadius,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;
    const displayPeriod = period === 'custom' ? customPeriod : period;

    return (
      <Paper
        elevation={highlighted ? elevation + 2 : elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          position: 'relative',
          border: highlighted ? '2px solid' : 'none',
          borderColor: highlightColor || 'primary.main',
          transform: highlighted ? 'scale(1.02)' : 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: highlighted ? 'scale(1.04)' : 'scale(1.02)',
          },
        }}
      >
        {/* Badge */}
        {showBadge && badgeText && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            <Chip
              label={badgeText}
              color={badgeColor}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        )}

        <Box sx={{ p: 4 }}>
          {/* Plan Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1,
            }}
          >
            {planName}
          </Typography>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              {currency}{price}
            </Typography>
            {displayPeriod && (
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  ml: 0.5,
                }}
              >
                {displayPeriod}
              </Typography>
            )}
          </Box>

          {/* Description */}
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 3,
              }}
            >
              {description}
            </Typography>
          )}

          {/* Features List */}
          <List dense sx={{ mb: 3 }}>
            {features.map((feature, index) => (
              <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {feature.included ? (
                    <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  ) : (
                    <CloseIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={feature.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: feature.included ? 'text.primary' : 'text.disabled',
                      fontSize: '0.875rem',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          {/* CTA Button */}
          <Button
            variant={buttonVariant}
            fullWidth
            size="large"
            href={buttonLink}
            color={highlighted ? 'primary' : 'inherit'}
            sx={{
              py: 1.5,
              fontWeight: 600,
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Paper>
    );
  },
};

export default PricingCard;
