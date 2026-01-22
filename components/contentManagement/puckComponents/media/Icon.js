import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const iconCategories = {
  general: ['home', 'settings', 'search', 'menu', 'close', 'add', 'remove', 'check', 'arrow_forward', 'arrow_back'],
  action: ['favorite', 'bookmark', 'share', 'download', 'upload', 'print', 'edit', 'delete', 'save', 'send'],
  communication: ['email', 'phone', 'chat', 'message', 'forum', 'contact_mail', 'call', 'sms', 'voicemail', 'comment'],
  content: ['article', 'description', 'folder', 'file_copy', 'attachment', 'link', 'image', 'video_library', 'audio_file', 'text_snippet'],
  social: ['person', 'group', 'public', 'language', 'thumb_up', 'thumb_down', 'mood', 'sentiment_satisfied', 'star', 'favorite_border'],
  business: ['business', 'work', 'trending_up', 'analytics', 'assessment', 'money', 'payments', 'shopping_cart', 'store', 'inventory'],
  navigation: ['expand_more', 'expand_less', 'chevron_right', 'chevron_left', 'first_page', 'last_page', 'north', 'south', 'east', 'west'],
  alert: ['warning', 'error', 'info', 'help', 'notification_important', 'report', 'report_problem', 'new_releases', 'privacy_tip', 'verified'],
};

export const Icon = {
  label: 'Icon',
  fields: {
    // Icon Selection
    icon: {
      type: 'text',
      label: 'Icon Name (Material Icon)',
    },
    iconCategory: {
      type: 'select',
      label: 'Quick Select Category',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Action', value: 'action' },
        { label: 'Communication', value: 'communication' },
        { label: 'Content', value: 'content' },
        { label: 'Social', value: 'social' },
        { label: 'Business', value: 'business' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Alert', value: 'alert' },
      ],
    },

    // Size
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Extra Small (16px)', value: 16 },
        { label: 'Small (24px)', value: 24 },
        { label: 'Medium (32px)', value: 32 },
        { label: 'Large (48px)', value: 48 },
        { label: 'Extra Large (64px)', value: 64 },
        { label: 'Huge (96px)', value: 96 },
      ],
    },

    // Color
    color: {
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Text Primary', value: 'text.primary' },
        { label: 'Text Secondary', value: 'text.secondary' },
        { label: 'Success', value: 'success.main' },
        { label: 'Warning', value: 'warning.main' },
        { label: 'Error', value: 'error.main' },
        { label: 'Info', value: 'info.main' },
        { label: 'White', value: '#ffffff' },
        { label: 'Black', value: '#000000' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customColor: {
      type: 'text',
      label: 'Custom Color',
    },

    // Background
    showBackground: {
      type: 'radio',
      label: 'Show Background',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    backgroundColor: {
      type: 'select',
      label: 'Background Color',
      options: [
        { label: 'Primary Light', value: 'primary.light' },
        { label: 'Secondary Light', value: 'secondary.light' },
        { label: 'Grey', value: 'grey.200' },
        { label: 'Success Light', value: 'success.light' },
        { label: 'Warning Light', value: 'warning.light' },
        { label: 'Error Light', value: 'error.light' },
        { label: 'Info Light', value: 'info.light' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customBackgroundColor: {
      type: 'text',
      label: 'Custom Background Color',
    },
    backgroundShape: {
      type: 'select',
      label: 'Background Shape',
      options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' },
        { label: 'Rounded Square', value: 'rounded' },
      ],
    },
    backgroundPadding: {
      type: 'select',
      label: 'Background Padding',
      options: [
        { label: 'Small', value: 8 },
        { label: 'Medium', value: 12 },
        { label: 'Large', value: 16 },
        { label: 'Extra Large', value: 24 },
      ],
    },

    // Effects
    rotate: {
      type: 'select',
      label: 'Rotation',
      options: [
        { label: 'None', value: 0 },
        { label: '45°', value: 45 },
        { label: '90°', value: 90 },
        { label: '180°', value: 180 },
        { label: '270°', value: 270 },
      ],
    },
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Scale', value: 'scale' },
        { label: 'Rotate', value: 'rotate' },
        { label: 'Color Change', value: 'color' },
      ],
    },

    // Link
    link: {
      type: 'text',
      label: 'Link (optional)',
    },
  },
  defaultProps: {
    icon: 'star',
    iconCategory: 'general',
    size: 48,
    color: 'primary.main',
    customColor: '',
    showBackground: false,
    backgroundColor: 'primary.light',
    customBackgroundColor: '',
    backgroundShape: 'circle',
    backgroundPadding: 12,
    rotate: 0,
    hoverEffect: 'none',
    link: '',
  },
  render: ({
    icon,
    size,
    color,
    customColor,
    showBackground,
    backgroundColor,
    customBackgroundColor,
    backgroundShape,
    backgroundPadding,
    rotate,
    hoverEffect,
    link,
  }) => {
    // Use state to ensure client-side only rendering to prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const finalColor = color === 'custom' ? customColor : color;
    const finalBgColor = backgroundColor === 'custom' ? customBackgroundColor : backgroundColor;

    const getBorderRadius = () => {
      switch (backgroundShape) {
        case 'circle':
          return '50%';
        case 'rounded':
          return 8;
        default:
          return 0;
      }
    };

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'scale':
          return {
            transition: 'transform 0.2s ease',
            '&:hover': { transform: `rotate(${rotate}deg) scale(1.15)` },
          };
        case 'rotate':
          return {
            transition: 'transform 0.3s ease',
            '&:hover': { transform: `rotate(${rotate + 360}deg)` },
          };
        case 'color':
          return {
            transition: 'opacity 0.2s ease',
            '&:hover': { opacity: 0.7 },
          };
        default:
          return {};
      }
    };

    // Don't render anything until client-side mount to prevent hydration issues
    if (!isMounted) {
      return (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
            ...(showBackground && {
              backgroundColor: finalBgColor,
              borderRadius: getBorderRadius(),
              padding: `${backgroundPadding}px`,
            }),
          }}
        />
      );
    }

    // Use a simple span with inline styles to ensure the font-family is applied
    const iconElement = (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(showBackground && {
            backgroundColor: finalBgColor,
            borderRadius: getBorderRadius(),
            padding: `${backgroundPadding}px`,
          }),
          transform: `rotate(${rotate}deg)`,
          ...getHoverStyles(),
        }}
      >
        <span
          className="material-icons"
          style={{
            fontSize: size,
            color: finalColor,
          }}
        >
          {icon}
        </span>
      </Box>
    );

    if (link) {
      return (
        <Box
          component="a"
          href={link}
          sx={{
            display: 'inline-flex',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {iconElement}
        </Box>
      );
    }

    return iconElement;
  },
};

export default Icon;
