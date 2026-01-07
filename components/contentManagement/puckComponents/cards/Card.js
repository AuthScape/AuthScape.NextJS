import React from 'react';
import { Box, Paper } from '@mui/material';
import { DropZone } from '@measured/puck';
import {
  spacingField,
  backgroundColorField,
  elevationField,
  borderRadiusField,
  alignItemsField,
  justifyContentField,
} from '../shared/fieldTypes';

export const Card = {
  label: 'Card',
  fields: {
    backgroundColor: backgroundColorField,
    customBackgroundColor: {
      type: 'text',
      label: 'Custom Color (hex)',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
    border: {
      type: 'select',
      label: 'Border',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: '1px solid #e0e0e0' },
        { label: 'Medium', value: '1px solid #bdbdbd' },
        { label: 'Dark', value: '1px solid #757575' },
        { label: 'Primary', value: '2px solid primary.main' },
      ],
    },
    padding: spacingField('Padding'),
    minHeight: {
      type: 'number',
      label: 'Min Height (px)',
    },
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Lift', value: 'lift' },
        { label: 'Glow', value: 'glow' },
        { label: 'Scale', value: 'scale' },
        { label: 'Border Highlight', value: 'border' },
      ],
    },
    layout: {
      type: 'select',
      label: 'Content Layout',
      options: [
        { label: 'Vertical', value: 'column' },
        { label: 'Horizontal', value: 'row' },
      ],
    },
    alignItems: alignItemsField,
    justifyContent: justifyContentField,
    gap: {
      type: 'select',
      label: 'Content Gap',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small (8px)', value: 8 },
        { label: 'Medium (16px)', value: 16 },
        { label: 'Large (24px)', value: 24 },
      ],
    },
    clickable: {
      type: 'radio',
      label: 'Clickable Card',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    link: {
      type: 'text',
      label: 'Link URL',
    },
    openInNewTab: {
      type: 'radio',
      label: 'Open in New Tab',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    backgroundColor: '#ffffff',
    customBackgroundColor: '',
    elevation: 1,
    borderRadius: 2,
    border: 'none',
    padding: { top: 24, right: 24, bottom: 24, left: 24 },
    minHeight: 0,
    hoverEffect: 'lift',
    layout: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 16,
    clickable: false,
    link: '',
    openInNewTab: false,
  },
  render: ({
    backgroundColor,
    customBackgroundColor,
    elevation,
    borderRadius,
    border,
    padding,
    minHeight,
    hoverEffect,
    layout,
    alignItems,
    justifyContent,
    gap,
    clickable,
    link,
    openInNewTab,
  }) => {
    const getBackgroundColor = () => {
      if (backgroundColor === 'custom' && customBackgroundColor) {
        return customBackgroundColor;
      }
      return backgroundColor;
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
        case 'scale':
          return {
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          };
        case 'border':
          return {
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: 'primary.main',
              borderWidth: '2px',
              borderStyle: 'solid',
            },
          };
        default:
          return {};
      }
    };

    const CardWrapper = clickable && link ? 'a' : 'div';
    const wrapperProps = clickable && link ? {
      href: link,
      target: openInNewTab ? '_blank' : '_self',
      rel: openInNewTab ? 'noopener noreferrer' : undefined,
      style: { textDecoration: 'none', color: 'inherit', display: 'block' },
    } : {};

    return (
      <CardWrapper {...wrapperProps}>
        <Paper
          elevation={elevation}
          sx={{
            backgroundColor: getBackgroundColor(),
            borderRadius: borderRadius,
            border: border !== 'none' ? border : undefined,
            padding: `${padding?.top || 0}px ${padding?.right || 0}px ${padding?.bottom || 0}px ${padding?.left || 0}px`,
            minHeight: minHeight ? `${minHeight}px` : 'auto',
            display: 'flex',
            flexDirection: layout,
            alignItems: alignItems,
            justifyContent: justifyContent,
            gap: `${gap}px`,
            cursor: clickable ? 'pointer' : 'default',
            height: '100%',
            ...getHoverStyles(),
          }}
        >
          <DropZone zone="card-content" />
        </Paper>
      </CardWrapper>
    );
  },
};

export default Card;
