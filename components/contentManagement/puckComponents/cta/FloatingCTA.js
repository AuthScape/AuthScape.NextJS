import React, { useState, useEffect } from 'react';
import { Box, Button, Fab, Typography, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const iconMap = {
  arrow_up: KeyboardArrowUpIcon,
  chat: ChatIcon,
  phone: PhoneIcon,
  email: EmailIcon,
  calendar: CalendarTodayIcon,
};

export const FloatingCTA = {
  label: 'Floating CTA',
  fields: {
    // Content
    text: {
      type: 'text',
      label: 'Button Text (leave empty for icon only)',
    },
    link: {
      type: 'text',
      label: 'Link URL',
    },
    icon: {
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Arrow Up (scroll)', value: 'arrow_up' },
        { label: 'Chat', value: 'chat' },
        { label: 'Phone', value: 'phone' },
        { label: 'Email', value: 'email' },
        { label: 'Calendar', value: 'calendar' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customIcon: {
      type: 'text',
      label: 'Custom Icon (Material Icon name)',
    },

    // Behavior
    action: {
      type: 'select',
      label: 'Action',
      options: [
        { label: 'Navigate to Link', value: 'link' },
        { label: 'Scroll to Top', value: 'scroll' },
        { label: 'Open Phone', value: 'phone' },
        { label: 'Open Email', value: 'email' },
      ],
    },
    showAfterScroll: {
      type: 'radio',
      label: 'Show After Scroll',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    scrollThreshold: {
      type: 'select',
      label: 'Show After (px)',
      options: [
        { label: '200px', value: 200 },
        { label: '400px', value: 400 },
        { label: '600px', value: 600 },
      ],
    },

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
    offsetX: {
      type: 'number',
      label: 'Horizontal Offset (px)',
    },
    offsetY: {
      type: 'number',
      label: 'Vertical Offset (px)',
    },

    // Styling
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'FAB (Circle)', value: 'fab' },
        { label: 'Extended FAB', value: 'extended' },
        { label: 'Button', value: 'button' },
      ],
    },
    color: {
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Error', value: 'error' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customColor: {
      type: 'text',
      label: 'Custom Background Color',
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
    pulse: {
      type: 'radio',
      label: 'Pulse Animation',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    shadow: {
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
    text: '',
    link: '#',
    icon: 'arrow_up',
    customIcon: '',
    action: 'scroll',
    showAfterScroll: true,
    scrollThreshold: 400,
    position: 'bottom-right',
    offsetX: 24,
    offsetY: 24,
    variant: 'fab',
    color: 'primary',
    customColor: '',
    size: 'medium',
    pulse: false,
    shadow: 4,
  },
  render: ({
    text,
    link,
    icon,
    customIcon,
    action,
    showAfterScroll,
    scrollThreshold,
    position,
    offsetX,
    offsetY,
    variant,
    color,
    customColor,
    size,
    pulse,
    shadow,
  }) => {
    const [isVisible, setIsVisible] = useState(!showAfterScroll);

    useEffect(() => {
      if (!showAfterScroll) return;

      const handleScroll = () => {
        setIsVisible(window.scrollY > scrollThreshold);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [showAfterScroll, scrollThreshold]);

    const handleClick = () => {
      switch (action) {
        case 'scroll':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'phone':
          window.location.href = `tel:${link}`;
          break;
        case 'email':
          window.location.href = `mailto:${link}`;
          break;
        default:
          window.location.href = link;
      }
    };

    const getPositionStyles = () => {
      const base = {
        position: 'fixed',
        zIndex: 1000,
        bottom: offsetY,
      };

      switch (position) {
        case 'bottom-left':
          return { ...base, left: offsetX };
        case 'bottom-center':
          return { ...base, left: '50%', transform: 'translateX(-50%)' };
        default:
          return { ...base, right: offsetX };
      }
    };

    const IconComponent = icon === 'custom' && customIcon
      ? () => <Box component="span" className="material-icons">{customIcon}</Box>
      : iconMap[icon] || KeyboardArrowUpIcon;

    const pulseAnimation = pulse
      ? {
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { boxShadow: `0 0 0 0 rgba(25, 118, 210, 0.4)` },
            '70%': { boxShadow: '0 0 0 15px rgba(25, 118, 210, 0)' },
            '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' },
          },
        }
      : {};

    const customStyles = color === 'custom' && customColor
      ? { backgroundColor: customColor, '&:hover': { backgroundColor: customColor, opacity: 0.9 } }
      : {};

    if (variant === 'button') {
      return (
        <Zoom in={isVisible}>
          <Button
            variant="contained"
            color={color === 'custom' ? 'primary' : color}
            size={size}
            onClick={handleClick}
            startIcon={!text ? undefined : <IconComponent />}
            sx={{
              ...getPositionStyles(),
              boxShadow: shadow,
              ...pulseAnimation,
              ...customStyles,
            }}
          >
            {text || <IconComponent />}
          </Button>
        </Zoom>
      );
    }

    if (variant === 'extended' && text) {
      return (
        <Zoom in={isVisible}>
          <Fab
            variant="extended"
            color={color === 'custom' ? 'primary' : color}
            size={size}
            onClick={handleClick}
            sx={{
              ...getPositionStyles(),
              boxShadow: shadow,
              ...pulseAnimation,
              ...customStyles,
            }}
          >
            <IconComponent sx={{ mr: 1 }} />
            {text}
          </Fab>
        </Zoom>
      );
    }

    return (
      <Zoom in={isVisible}>
        <Fab
          color={color === 'custom' ? 'primary' : color}
          size={size}
          onClick={handleClick}
          sx={{
            ...getPositionStyles(),
            boxShadow: shadow,
            ...pulseAnimation,
            ...customStyles,
          }}
        >
          <IconComponent />
        </Fab>
      </Zoom>
    );
  },
};

export default FloatingCTA;
