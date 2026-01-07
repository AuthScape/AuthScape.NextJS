import React, { useState, useEffect } from 'react';
import { Box, Fab, Zoom, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const iconMap = {
  arrow_upward: ArrowUpwardIcon,
  keyboard_arrow_up: KeyboardArrowUpIcon,
  expand_less: ExpandLessIcon,
};

export const ScrollToTop = {
  label: 'Scroll To Top',
  fields: {
    // Position
    position: {
      type: 'select',
      label: 'Position',
      options: [
        { label: 'Bottom Right', value: 'bottom-right' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
      ],
    },
    offsetBottom: {
      type: 'select',
      label: 'Bottom Offset',
      options: [
        { label: '16px', value: 16 },
        { label: '24px', value: 24 },
        { label: '32px', value: 32 },
        { label: '48px', value: 48 },
      ],
    },
    offsetSide: {
      type: 'select',
      label: 'Side Offset',
      options: [
        { label: '16px', value: 16 },
        { label: '24px', value: 24 },
        { label: '32px', value: 32 },
        { label: '48px', value: 48 },
      ],
    },

    // Behavior
    showAfter: {
      type: 'select',
      label: 'Show After Scroll',
      options: [
        { label: '100px', value: 100 },
        { label: '200px', value: 200 },
        { label: '300px', value: 300 },
        { label: '400px', value: 400 },
        { label: '500px', value: 500 },
      ],
    },
    smooth: {
      type: 'radio',
      label: 'Smooth Scroll',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Appearance
    icon: {
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Arrow Up', value: 'arrow_upward' },
        { label: 'Chevron Up', value: 'keyboard_arrow_up' },
        { label: 'Expand Less', value: 'expand_less' },
      ],
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    iconColor: {
      type: 'text',
      label: 'Icon Color',
    },
    hoverBackgroundColor: {
      type: 'text',
      label: 'Hover Background Color',
    },

    // Tooltip
    showTooltip: {
      type: 'radio',
      label: 'Show Tooltip',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    tooltipText: {
      type: 'text',
      label: 'Tooltip Text',
    },

    // Shadow
    elevation: {
      type: 'select',
      label: 'Shadow',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 4 },
        { label: 'Large', value: 8 },
      ],
    },
  },
  defaultProps: {
    position: 'bottom-right',
    offsetBottom: 24,
    offsetSide: 24,
    showAfter: 300,
    smooth: true,
    icon: 'keyboard_arrow_up',
    size: 'medium',
    backgroundColor: '',
    iconColor: '',
    hoverBackgroundColor: '',
    showTooltip: true,
    tooltipText: 'Back to top',
    elevation: 4,
  },
  render: ({
    position,
    offsetBottom,
    offsetSide,
    showAfter,
    smooth,
    icon,
    size,
    backgroundColor,
    iconColor,
    hoverBackgroundColor,
    showTooltip,
    tooltipText,
    elevation,
  }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        setVisible(scrollY > showAfter);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check initial state

      return () => window.removeEventListener('scroll', handleScroll);
    }, [showAfter]);

    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
    };

    const getPositionStyles = () => {
      const base = {
        position: 'fixed',
        bottom: offsetBottom,
        zIndex: 1000,
      };

      switch (position) {
        case 'bottom-left':
          return { ...base, left: offsetSide };
        case 'bottom-center':
          return { ...base, left: '50%', transform: 'translateX(-50%)' };
        case 'bottom-right':
        default:
          return { ...base, right: offsetSide };
      }
    };

    const IconComponent = iconMap[icon] || KeyboardArrowUpIcon;

    const sizeMap = {
      small: { fab: 'small', icon: 20 },
      medium: { fab: 'medium', icon: 24 },
      large: { fab: 'large', icon: 32 },
    };
    const sizeConfig = sizeMap[size];

    const button = (
      <Zoom in={visible}>
        <Fab
          onClick={handleClick}
          size={sizeConfig.fab}
          aria-label={tooltipText}
          sx={{
            ...getPositionStyles(),
            backgroundColor: backgroundColor || 'primary.main',
            color: iconColor || '#ffffff',
            boxShadow: elevation,
            '&:hover': {
              backgroundColor: hoverBackgroundColor || backgroundColor || 'primary.dark',
            },
          }}
        >
          <IconComponent sx={{ fontSize: sizeConfig.icon }} />
        </Fab>
      </Zoom>
    );

    if (showTooltip) {
      return (
        <Tooltip title={tooltipText} placement="left">
          {button}
        </Tooltip>
      );
    }

    return button;
  },
};

export default ScrollToTop;
