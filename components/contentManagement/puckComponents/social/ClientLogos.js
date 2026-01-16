import React from 'react';
import { Box, Typography } from '@mui/material';
import { ImageAssetPicker } from '../../customFields/imageAssetPicker';

export const ClientLogos = {
  label: 'Client Logos',
  fields: {
    // Logos
    logos: {
      type: 'array',
      label: 'Logos',
      arrayFields: {
        image: { type: 'text', label: 'Logo Image', render: ImageAssetPicker },
        alt: { type: 'text', label: 'Alt Text' },
        link: { type: 'text', label: 'Link (optional)' },
      },
      defaultItemProps: {
        image: 'https://via.placeholder.com/150x50?text=Logo',
        alt: 'Client Logo',
        link: '',
      },
    },

    // Header
    showTitle: {
      type: 'radio',
      label: 'Show Title',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    title: {
      type: 'text',
      label: 'Title',
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Scroll', value: 'scroll' },
        { label: 'Inline', value: 'inline' },
      ],
    },
    columns: {
      type: 'select',
      label: 'Columns (Grid)',
      options: [
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
        { label: '5 Columns', value: 5 },
        { label: '6 Columns', value: 6 },
      ],
    },
    logoHeight: {
      type: 'select',
      label: 'Logo Height',
      options: [
        { label: 'Small (30px)', value: 30 },
        { label: 'Medium (40px)', value: 40 },
        { label: 'Large (50px)', value: 50 },
        { label: 'Extra Large (60px)', value: 60 },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Tight', value: 3 },
        { label: 'Normal', value: 4 },
        { label: 'Comfortable', value: 6 },
        { label: 'Spacious', value: 8 },
      ],
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'flex-end' },
      ],
    },

    // Styling
    grayscale: {
      type: 'radio',
      label: 'Grayscale',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    hoverColorize: {
      type: 'radio',
      label: 'Colorize on Hover',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    opacity: {
      type: 'select',
      label: 'Opacity',
      options: [
        { label: 'Full (100%)', value: 1 },
        { label: 'High (80%)', value: 0.8 },
        { label: 'Medium (60%)', value: 0.6 },
        { label: 'Low (40%)', value: 0.4 },
      ],
    },
    hoverOpacity: {
      type: 'select',
      label: 'Hover Opacity',
      options: [
        { label: 'Full (100%)', value: 1 },
        { label: 'High (80%)', value: 0.8 },
        { label: 'Medium (60%)', value: 0.6 },
      ],
    },

    // Animation (for scroll layout)
    scrollSpeed: {
      type: 'select',
      label: 'Scroll Speed',
      options: [
        { label: 'Slow (60s)', value: 60 },
        { label: 'Normal (40s)', value: 40 },
        { label: 'Fast (25s)', value: 25 },
        { label: 'Very Fast (15s)', value: 15 },
      ],
    },
    pauseOnHover: {
      type: 'radio',
      label: 'Pause on Hover',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    logos: [
      { image: 'https://via.placeholder.com/150x50?text=Logo+1', alt: 'Client 1', link: '' },
      { image: 'https://via.placeholder.com/150x50?text=Logo+2', alt: 'Client 2', link: '' },
      { image: 'https://via.placeholder.com/150x50?text=Logo+3', alt: 'Client 3', link: '' },
      { image: 'https://via.placeholder.com/150x50?text=Logo+4', alt: 'Client 4', link: '' },
      { image: 'https://via.placeholder.com/150x50?text=Logo+5', alt: 'Client 5', link: '' },
      { image: 'https://via.placeholder.com/150x50?text=Logo+6', alt: 'Client 6', link: '' },
    ],
    showTitle: true,
    title: 'Trusted by leading companies',
    layout: 'grid',
    columns: 6,
    logoHeight: 40,
    spacing: 4,
    align: 'center',
    grayscale: true,
    hoverColorize: true,
    opacity: 0.6,
    hoverOpacity: 1,
    scrollSpeed: 40,
    pauseOnHover: true,
  },
  render: ({
    logos,
    showTitle,
    title,
    layout,
    columns,
    logoHeight,
    spacing,
    align,
    grayscale,
    hoverColorize,
    opacity,
    hoverOpacity,
    scrollSpeed,
    pauseOnHover,
  }) => {
    const logoStyles = {
      height: logoHeight,
      maxWidth: '100%',
      objectFit: 'contain',
      filter: grayscale ? 'grayscale(100%)' : 'none',
      opacity: opacity,
      transition: 'all 0.3s ease',
    };

    const hoverStyles = {
      filter: hoverColorize ? 'grayscale(0%)' : logoStyles.filter,
      opacity: hoverOpacity,
    };

    const renderLogo = (logo, index) => {
      const imgElement = (
        <Box
          component="img"
          src={logo.image}
          alt={logo.alt}
          sx={{
            ...logoStyles,
            '&:hover': hoverStyles,
          }}
        />
      );

      if (logo.link) {
        return (
          <Box
            key={index}
            component="a"
            href={logo.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {imgElement}
          </Box>
        );
      }

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {imgElement}
        </Box>
      );
    };

    // Scroll layout
    if (layout === 'scroll') {
      const duplicatedLogos = [...logos, ...logos];

      return (
        <Box>
          {showTitle && title && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {title}
            </Typography>
          )}

          <Box
            sx={{
              overflow: 'hidden',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 100,
                zIndex: 2,
              },
              '&::before': {
                left: 0,
                background: 'linear-gradient(to right, white, transparent)',
              },
              '&::after': {
                right: 0,
                background: 'linear-gradient(to left, white, transparent)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: spacing,
                animation: `scroll ${scrollSpeed}s linear infinite`,
                '&:hover': pauseOnHover ? { animationPlayState: 'paused' } : {},
                '@keyframes scroll': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' },
                },
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <Box
                  key={index}
                  sx={{
                    flexShrink: 0,
                    px: 2,
                  }}
                >
                  {renderLogo(logo, index)}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      );
    }

    // Grid layout
    if (layout === 'grid') {
      return (
        <Box>
          {showTitle && title && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {title}
            </Typography>
          )}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: `repeat(${Math.min(columns, 4)}, 1fr)`,
                md: `repeat(${columns}, 1fr)`,
              },
              gap: spacing,
              alignItems: 'center',
              justifyItems: 'center',
            }}
          >
            {logos.map(renderLogo)}
          </Box>
        </Box>
      );
    }

    // Inline layout
    return (
      <Box>
        {showTitle && title && (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}
          >
            {title}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing,
            alignItems: 'center',
            justifyContent: align,
          }}
        >
          {logos.map(renderLogo)}
        </Box>
      </Box>
    );
  },
};

export default ClientLogos;
