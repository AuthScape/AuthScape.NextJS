import React, { useState } from 'react';
import { Box, Container, Typography, Button, IconButton, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const AnnouncementBar = {
  label: 'Announcement Bar',
  fields: {
    // Content
    text: {
      type: 'text',
      label: 'Announcement Text',
    },
    linkText: {
      type: 'text',
      label: 'Link Text',
    },
    linkUrl: {
      type: 'text',
      label: 'Link URL',
    },
    icon: {
      type: 'text',
      label: 'Icon (Material Icon name)',
    },

    // Behavior
    dismissible: {
      type: 'radio',
      label: 'Dismissible',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    sticky: {
      type: 'radio',
      label: 'Sticky',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'select',
      label: 'Background Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Success', value: 'success.main' },
        { label: 'Warning', value: 'warning.main' },
        { label: 'Error', value: 'error.main' },
        { label: 'Info', value: 'info.main' },
        { label: 'Dark', value: '#1a1a1a' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customBgColor: {
      type: 'text',
      label: 'Custom Background Color',
    },
    textColor: {
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'White', value: '#ffffff' },
        { label: 'Black', value: '#000000' },
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
    linkStyle: {
      type: 'select',
      label: 'Link Style',
      options: [
        { label: 'Text with Arrow', value: 'arrow' },
        { label: 'Button', value: 'button' },
        { label: 'Underlined', value: 'underline' },
      ],
    },
  },
  defaultProps: {
    text: '🎉 New feature released! Check out our latest update.',
    linkText: 'Learn more',
    linkUrl: '#',
    icon: '',
    dismissible: true,
    sticky: false,
    backgroundColor: 'primary.main',
    customBgColor: '',
    textColor: '#ffffff',
    size: 'medium',
    linkStyle: 'arrow',
  },
  render: ({
    text,
    linkText,
    linkUrl,
    icon,
    dismissible,
    sticky,
    backgroundColor,
    customBgColor,
    textColor,
    size,
    linkStyle,
  }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const bgColor = backgroundColor === 'custom' ? customBgColor : backgroundColor;

    const getPadding = () => {
      switch (size) {
        case 'small':
          return { py: 0.75 };
        case 'large':
          return { py: 1.5 };
        default:
          return { py: 1 };
      }
    };

    const getTextSize = () => {
      switch (size) {
        case 'small':
          return 'body2';
        case 'large':
          return 'body1';
        default:
          return 'body2';
      }
    };

    const renderLink = () => {
      if (!linkText || !linkUrl) return null;

      if (linkStyle === 'button') {
        return (
          <Button
            size="small"
            href={linkUrl}
            sx={{
              ml: 2,
              color: bgColor === '#1a1a1a' ? '#ffffff' : 'inherit',
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
              },
            }}
          >
            {linkText}
          </Button>
        );
      }

      return (
        <Link
          href={linkUrl}
          sx={{
            ml: 2,
            color: textColor,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: linkStyle === 'underline' ? 'underline' : 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {linkText}
          {linkStyle === 'arrow' && <ArrowForwardIcon sx={{ ml: 0.5, fontSize: 18 }} />}
        </Link>
      );
    };

    return (
      <Box
        sx={{
          backgroundColor: bgColor,
          color: textColor,
          ...getPadding(),
          position: sticky ? 'sticky' : 'relative',
          top: sticky ? 0 : 'auto',
          zIndex: sticky ? 1100 : 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {icon && (
              <Box
                component="span"
                className="material-icons"
                sx={{ fontSize: size === 'large' ? 24 : 20 }}
              >
                {icon}
              </Box>
            )}

            <Typography
              variant={getTextSize()}
              component="span"
              sx={{ fontWeight: 500 }}
            >
              {text}
            </Typography>

            {renderLink()}

            {dismissible && (
              <IconButton
                size="small"
                onClick={() => setIsVisible(false)}
                sx={{
                  ml: 'auto',
                  color: textColor,
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Container>
      </Box>
    );
  },
};

export default AnnouncementBar;
