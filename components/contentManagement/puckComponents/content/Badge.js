import React from 'react';
import { Chip, Box } from '@mui/material';

export const Badge = {
  label: 'Badge',
  fields: {
    // Content
    text: {
      type: 'text',
      label: 'Text',
    },
    icon: {
      type: 'text',
      label: 'Icon (Material Icon name)',
    },
    iconPosition: {
      type: 'select',
      label: 'Icon Position',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'End', value: 'end' },
      ],
    },

    // Style
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Filled', value: 'filled' },
        { label: 'Outlined', value: 'outlined' },
      ],
    },
    color: {
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Info', value: 'info' },
        { label: 'Default', value: 'default' },
      ],
    },
    customColor: {
      type: 'text',
      label: 'Custom Background Color',
    },
    customTextColor: {
      type: 'text',
      label: 'Custom Text Color',
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
      ],
    },

    // Shape
    shape: {
      type: 'select',
      label: 'Shape',
      options: [
        { label: 'Rounded', value: 'rounded' },
        { label: 'Pill', value: 'pill' },
        { label: 'Square', value: 'square' },
      ],
    },

    // Link
    clickable: {
      type: 'radio',
      label: 'Clickable',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    link: {
      type: 'text',
      label: 'Link URL',
    },
  },
  defaultProps: {
    text: 'New',
    icon: '',
    iconPosition: 'start',
    variant: 'filled',
    color: 'primary',
    customColor: '',
    customTextColor: '',
    size: 'small',
    shape: 'rounded',
    clickable: false,
    link: '',
  },
  render: ({
    text,
    icon,
    iconPosition,
    variant,
    color,
    customColor,
    customTextColor,
    size,
    shape,
    clickable,
    link,
  }) => {
    const getBorderRadius = () => {
      switch (shape) {
        case 'pill':
          return 50;
        case 'square':
          return 0;
        default:
          return undefined;
      }
    };

    const iconElement = icon ? (
      <Box
        component="span"
        className="material-icons"
        sx={{ fontSize: size === 'small' ? 14 : 18 }}
      >
        {icon}
      </Box>
    ) : undefined;

    const handleClick = () => {
      if (clickable && link) {
        window.location.href = link;
      }
    };

    return (
      <Chip
        label={text}
        variant={variant}
        color={customColor ? 'default' : color}
        size={size}
        icon={iconPosition === 'start' ? iconElement : undefined}
        deleteIcon={iconPosition === 'end' ? iconElement : undefined}
        onDelete={iconPosition === 'end' && icon ? () => {} : undefined}
        clickable={clickable}
        onClick={clickable ? handleClick : undefined}
        component={clickable && link ? 'a' : 'div'}
        href={clickable && link ? link : undefined}
        sx={{
          borderRadius: getBorderRadius(),
          ...(customColor && {
            backgroundColor: variant === 'filled' ? customColor : 'transparent',
            borderColor: customColor,
            color: customTextColor || (variant === 'filled' ? '#ffffff' : customColor),
            '&:hover': {
              backgroundColor: variant === 'filled' ? customColor : `${customColor}22`,
            },
          }),
          '& .MuiChip-deleteIcon': {
            color: 'inherit',
            '&:hover': {
              color: 'inherit',
            },
          },
        }}
      />
    );
  },
};

export default Badge;
