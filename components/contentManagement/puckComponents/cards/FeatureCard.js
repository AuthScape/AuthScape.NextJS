import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import {
  spacingField,
  backgroundColorField,
  elevationField,
  borderRadiusField,
  textColorField,
  textAlignField,
  buttonVariantField,
} from '../shared/fieldTypes';

// Common icon names that can be rendered
const iconOptions = [
  { label: 'None', value: '' },
  { label: 'Star', value: 'star' },
  { label: 'Check Circle', value: 'check_circle' },
  { label: 'Rocket', value: 'rocket_launch' },
  { label: 'Speed', value: 'speed' },
  { label: 'Security', value: 'security' },
  { label: 'Support', value: 'support_agent' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Code', value: 'code' },
  { label: 'Device', value: 'devices' },
  { label: 'Globe', value: 'public' },
  { label: 'Lightbulb', value: 'lightbulb' },
  { label: 'Lock', value: 'lock' },
  { label: 'Palette', value: 'palette' },
  { label: 'Person', value: 'person' },
  { label: 'Settings', value: 'settings' },
  { label: 'Shopping', value: 'shopping_cart' },
  { label: 'Thumb Up', value: 'thumb_up' },
  { label: 'Trending Up', value: 'trending_up' },
];

export const FeatureCard = {
  label: 'Feature Card',
  fields: {
    icon: {
      type: 'select',
      label: 'Icon',
      options: iconOptions,
    },
    customIcon: {
      type: 'text',
      label: 'Custom Icon (Material Icon name)',
    },
    iconSize: {
      type: 'select',
      label: 'Icon Size',
      options: [
        { label: 'Small (32px)', value: 32 },
        { label: 'Medium (48px)', value: 48 },
        { label: 'Large (64px)', value: 64 },
      ],
    },
    iconColor: {
      type: 'select',
      label: 'Icon Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'White', value: '#ffffff' },
        { label: 'Dark', value: '#212121' },
        { label: 'Success', value: 'success.main' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customIconColor: {
      type: 'text',
      label: 'Custom Icon Color (hex)',
    },
    iconBackground: {
      type: 'select',
      label: 'Icon Background',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Circle Light', value: 'circle-light' },
        { label: 'Circle Primary', value: 'circle-primary' },
        { label: 'Square Light', value: 'square-light' },
        { label: 'Square Primary', value: 'square-primary' },
      ],
    },
    title: {
      type: 'text',
      label: 'Title',
    },
    titleColor: textColorField,
    description: {
      type: 'textarea',
      label: 'Description',
    },
    descriptionColor: {
      type: 'select',
      label: 'Description Color',
      options: [
        { label: 'Default', value: 'text.secondary' },
        { label: 'Primary', value: 'text.primary' },
        { label: 'White', value: '#ffffff' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customDescriptionColor: {
      type: 'text',
      label: 'Custom Description Color',
    },
    align: textAlignField,
    showButton: {
      type: 'radio',
      label: 'Show Button',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    buttonText: {
      type: 'text',
      label: 'Button Text',
    },
    buttonLink: {
      type: 'text',
      label: 'Button Link',
    },
    buttonVariant: buttonVariantField,
    backgroundColor: backgroundColorField,
    customBackgroundColor: {
      type: 'text',
      label: 'Custom Background Color',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
    padding: spacingField('Padding'),
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Lift', value: 'lift' },
        { label: 'Glow', value: 'glow' },
      ],
    },
  },
  defaultProps: {
    icon: 'star',
    customIcon: '',
    iconSize: 48,
    iconColor: 'primary.main',
    customIconColor: '',
    iconBackground: 'circle-light',
    title: 'Feature Title',
    titleColor: 'text.primary',
    description: 'Describe your feature here. Explain the benefits and value it provides to your users.',
    descriptionColor: 'text.secondary',
    customDescriptionColor: '',
    align: 'center',
    showButton: false,
    buttonText: 'Learn More',
    buttonLink: '#',
    buttonVariant: 'text',
    backgroundColor: '#ffffff',
    customBackgroundColor: '',
    elevation: 1,
    borderRadius: 2,
    padding: { top: 32, right: 24, bottom: 32, left: 24 },
    hoverEffect: 'lift',
  },
  render: ({
    icon,
    customIcon,
    iconSize,
    iconColor,
    customIconColor,
    iconBackground,
    title,
    titleColor,
    description,
    descriptionColor,
    customDescriptionColor,
    align,
    showButton,
    buttonText,
    buttonLink,
    buttonVariant,
    backgroundColor,
    customBackgroundColor,
    elevation,
    borderRadius,
    padding,
    hoverEffect,
  }) => {
    const getBackgroundColor = () => {
      if (backgroundColor === 'custom' && customBackgroundColor) {
        return customBackgroundColor;
      }
      return backgroundColor;
    };

    const getIconColor = () => {
      if (iconColor === 'custom' && customIconColor) {
        return customIconColor;
      }
      return iconColor;
    };

    const getDescriptionColor = () => {
      if (descriptionColor === 'custom' && customDescriptionColor) {
        return customDescriptionColor;
      }
      return descriptionColor;
    };

    const iconName = customIcon || icon;

    const getIconBackgroundStyles = () => {
      const size = iconSize + 24;
      switch (iconBackground) {
        case 'circle-light':
          return {
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: 'action.hover',
          };
        case 'circle-primary':
          return {
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: 'primary.light',
          };
        case 'square-light':
          return {
            width: size,
            height: size,
            borderRadius: 2,
            backgroundColor: 'action.hover',
          };
        case 'square-primary':
          return {
            width: size,
            height: size,
            borderRadius: 2,
            backgroundColor: 'primary.light',
          };
        default:
          return {};
      }
    };

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'lift':
          return {
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 6,
            },
          };
        case 'glow':
          return {
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 0 20px rgba(0,0,0,0.15)',
            },
          };
        default:
          return {};
      }
    };

    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: getBackgroundColor(),
          borderRadius: borderRadius,
          padding: `${padding?.top || 0}px ${padding?.right || 0}px ${padding?.bottom || 0}px ${padding?.left || 0}px`,
          textAlign: align,
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
          gap: 2,
          height: '100%',
          ...getHoverStyles(),
        }}
      >
        {/* Icon */}
        {iconName && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              ...getIconBackgroundStyles(),
            }}
          >
            <Box
              component="span"
              className="material-icons"
              sx={{
                fontSize: iconSize,
                color: getIconColor(),
              }}
            >
              {iconName}
            </Box>
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: titleColor,
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: getDescriptionColor(),
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {description}
        </Typography>

        {/* Button */}
        {showButton && (
          <Button
            variant={buttonVariant}
            href={buttonLink}
            sx={{ mt: 2 }}
          >
            {buttonText}
          </Button>
        )}
      </Paper>
    );
  },
};

export default FeatureCard;
