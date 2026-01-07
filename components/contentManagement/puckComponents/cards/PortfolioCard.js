import React from 'react';
import { Box, Paper, Typography, Chip, Stack, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  borderRadiusField,
  elevationField,
} from '../shared/fieldTypes';

export const PortfolioCard = {
  label: 'Portfolio Card',
  fields: {
    // Content
    image: {
      type: 'text',
      label: 'Project Image URL',
    },
    title: {
      type: 'text',
      label: 'Project Title',
    },
    category: {
      type: 'text',
      label: 'Category',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },

    // Tags
    tags: {
      type: 'array',
      label: 'Tags',
      arrayFields: {
        text: { type: 'text', label: 'Tag' },
      },
      defaultItemProps: {
        text: 'Tag',
      },
    },

    // Links
    projectLink: {
      type: 'text',
      label: 'Project Link (View Live)',
    },
    detailLink: {
      type: 'text',
      label: 'Detail Page Link',
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Overlay on Hover', value: 'overlay' },
        { label: 'Info Below Image', value: 'below' },
        { label: 'Side by Side', value: 'side' },
      ],
    },
    aspectRatio: {
      type: 'select',
      label: 'Aspect Ratio',
      options: [
        { label: 'Square (1:1)', value: '100%' },
        { label: 'Landscape (4:3)', value: '75%' },
        { label: 'Wide (16:9)', value: '56.25%' },
        { label: 'Portrait (3:4)', value: '133%' },
      ],
    },

    // Styling
    overlayColor: {
      type: 'text',
      label: 'Overlay Color',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
    tagStyle: {
      type: 'select',
      label: 'Tag Style',
      options: [
        { label: 'Filled', value: 'filled' },
        { label: 'Outlined', value: 'outlined' },
      ],
    },
  },
  defaultProps: {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    title: 'E-Commerce Platform Redesign',
    category: 'Web Design',
    description: 'A complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
    tags: [
      { text: 'React' },
      { text: 'Node.js' },
      { text: 'UI/UX' },
    ],
    projectLink: '#',
    detailLink: '#',
    layout: 'overlay',
    aspectRatio: '75%',
    overlayColor: 'rgba(0,0,0,0.8)',
    backgroundColor: '#ffffff',
    elevation: 1,
    borderRadius: 2,
    tagStyle: 'outlined',
  },
  render: ({
    image,
    title,
    category,
    description,
    tags,
    projectLink,
    detailLink,
    layout,
    aspectRatio,
    overlayColor,
    backgroundColor,
    elevation,
    borderRadius,
    tagStyle,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;

    // Overlay layout
    if (layout === 'overlay') {
      return (
        <Paper
          elevation={elevation}
          sx={{
            borderRadius: `${borderRadiusValue}px`,
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            '&:hover .portfolio-overlay': {
              opacity: 1,
            },
            '&:hover .portfolio-image': {
              transform: 'scale(1.05)',
            },
          }}
          onClick={() => detailLink && (window.location.href = detailLink)}
        >
          {/* Image */}
          <Box
            sx={{
              position: 'relative',
              paddingBottom: aspectRatio,
              overflow: 'hidden',
            }}
          >
            <Box
              className="portfolio-image"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
              }}
            />

            {/* Category Badge */}
            <Chip
              label={category}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: 'rgba(255,255,255,0.95)',
                fontWeight: 500,
                zIndex: 2,
              }}
            />

            {/* Overlay */}
            <Box
              className="portfolio-overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: overlayColor,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: '#ffffff', fontWeight: 600, mb: 1.5 }}
              >
                {title}
              </Typography>

              {description && (
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}
                >
                  {description}
                </Typography>
              )}

              {/* Tags */}
              <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ mb: 2, gap: 1 }}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.text}
                    size="small"
                    variant={tagStyle}
                    sx={{
                      color: '#ffffff',
                      borderColor: 'rgba(255,255,255,0.5)',
                      ...(tagStyle === 'filled' && {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      }),
                    }}
                  />
                ))}
              </Stack>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2}>
                {projectLink && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(projectLink, '_blank');
                    }}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                      },
                    }}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                )}
                {detailLink && (
                  <IconButton
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                      },
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </Box>
        </Paper>
      );
    }

    // Below layout
    if (layout === 'below') {
      return (
        <Paper
          elevation={elevation}
          sx={{
            backgroundColor: backgroundColor,
            borderRadius: `${borderRadiusValue}px`,
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
            },
            '&:hover .portfolio-image': {
              transform: 'scale(1.05)',
            },
          }}
          onClick={() => detailLink && (window.location.href = detailLink)}
        >
          {/* Image */}
          <Box sx={{ overflow: 'hidden' }}>
            <Box
              className="portfolio-image"
              sx={{
                paddingBottom: aspectRatio,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
              }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
              {category}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                {description}
              </Typography>
            )}
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.text}
                  size="small"
                  variant={tagStyle}
                />
              ))}
            </Stack>
          </Box>
        </Paper>
      );
    }

    // Side layout
    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: 8,
          },
          '&:hover .portfolio-image': {
            transform: 'scale(1.05)',
          },
        }}
        onClick={() => detailLink && (window.location.href = detailLink)}
      >
        {/* Image */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            overflow: 'hidden',
          }}
        >
          <Box
            className="portfolio-image"
            sx={{
              height: { xs: 250, md: '100%' },
              minHeight: 300,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.5s ease',
            }}
          />
        </Box>

        {/* Content */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
            {category}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {description}
            </Typography>
          )}
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag.text}
                size="small"
                variant={tagStyle}
              />
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  },
};

export default PortfolioCard;
