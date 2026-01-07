import React from 'react';
import { Box, Paper, Typography, Chip, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  borderRadiusField,
  elevationField,
} from '../shared/fieldTypes';

export const BlogCard = {
  label: 'Blog Card',
  fields: {
    // Content
    image: {
      type: 'text',
      label: 'Featured Image URL',
    },
    title: {
      type: 'text',
      label: 'Title',
    },
    excerpt: {
      type: 'textarea',
      label: 'Excerpt',
    },
    link: {
      type: 'text',
      label: 'Article Link',
    },

    // Meta
    category: {
      type: 'text',
      label: 'Category',
    },
    categoryColor: {
      type: 'select',
      label: 'Category Color',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Info', value: 'info' },
      ],
    },
    date: {
      type: 'text',
      label: 'Date',
    },
    readTime: {
      type: 'text',
      label: 'Read Time (e.g., "5 min read")',
    },

    // Author
    showAuthor: {
      type: 'radio',
      label: 'Show Author',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    authorName: {
      type: 'text',
      label: 'Author Name',
    },
    authorAvatar: {
      type: 'text',
      label: 'Author Avatar URL',
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Overlay', value: 'overlay' },
      ],
    },
    imageHeight: {
      type: 'select',
      label: 'Image Height',
      options: [
        { label: 'Small (150px)', value: 150 },
        { label: 'Medium (200px)', value: 200 },
        { label: 'Large (250px)', value: 250 },
        { label: 'Auto (16:9)', value: 'auto' },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Lift', value: 'lift' },
        { label: 'Zoom Image', value: 'zoom' },
      ],
    },
  },
  defaultProps: {
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    title: 'How to Build Better Products with User Feedback',
    excerpt: 'Learn the essential strategies for collecting and implementing user feedback to create products people love.',
    link: '#',
    category: 'Product',
    categoryColor: 'primary',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    showAuthor: true,
    authorName: 'Sarah Johnson',
    authorAvatar: '',
    layout: 'vertical',
    imageHeight: 200,
    backgroundColor: '#ffffff',
    elevation: 1,
    borderRadius: 2,
    hoverEffect: 'lift',
  },
  render: ({
    image,
    title,
    excerpt,
    link,
    category,
    categoryColor,
    date,
    readTime,
    showAuthor,
    authorName,
    authorAvatar,
    layout,
    imageHeight,
    backgroundColor,
    elevation,
    borderRadius,
    hoverEffect,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;

    const getHoverStyles = () => {
      switch (hoverEffect) {
        case 'lift':
          return {
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
            },
          };
        case 'zoom':
          return {
            '& .blog-image': {
              transition: 'transform 0.3s ease',
            },
            '&:hover .blog-image': {
              transform: 'scale(1.05)',
            },
          };
        default:
          return {};
      }
    };

    const ImageComponent = (
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: layout === 'vertical' ? `${borderRadiusValue}px ${borderRadiusValue}px 0 0` : `${borderRadiusValue}px 0 0 ${borderRadiusValue}px`,
          ...(layout === 'horizontal' && { width: '40%', flexShrink: 0 }),
          ...(layout === 'overlay' && { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }),
        }}
      >
        <Box
          className="blog-image"
          sx={{
            width: '100%',
            height: imageHeight === 'auto' ? 0 : imageHeight,
            paddingBottom: imageHeight === 'auto' ? '56.25%' : 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ...(layout === 'overlay' && { height: '100%', paddingBottom: 0 }),
            ...(layout === 'horizontal' && { height: '100%', minHeight: 200 }),
          }}
        />
      </Box>
    );

    const ContentComponent = (
      <Box
        sx={{
          p: 3,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          ...(layout === 'overlay' && {
            justifyContent: 'flex-end',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            color: '#ffffff',
          }),
        }}
      >
        {/* Category */}
        {category && (
          <Box sx={{ mb: 2 }}>
            <Chip
              label={category}
              size="small"
              color={layout === 'overlay' ? 'default' : categoryColor}
              sx={{
                fontWeight: 500,
                ...(layout === 'overlay' && {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                }),
              }}
            />
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="h6"
          component="a"
          href={link}
          sx={{
            fontWeight: 600,
            mb: 1.5,
            color: layout === 'overlay' ? '#ffffff' : 'text.primary',
            textDecoration: 'none',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '&:hover': {
              color: layout === 'overlay' ? '#ffffff' : 'primary.main',
            },
          }}
        >
          {title}
        </Typography>

        {/* Excerpt */}
        {excerpt && layout !== 'overlay' && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 2,
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {excerpt}
          </Typography>
        )}

        {/* Meta */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
            mt: 'auto',
          }}
        >
          {/* Author */}
          {showAuthor && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={authorAvatar}
                alt={authorName}
                sx={{ width: 32, height: 32, fontSize: 14 }}
              >
                {!authorAvatar && authorName?.charAt(0)}
              </Avatar>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: layout === 'overlay' ? '#ffffff' : 'text.primary',
                }}
              >
                {authorName}
              </Typography>
            </Box>
          )}

          {/* Date & Read Time */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              color: layout === 'overlay' ? 'rgba(255,255,255,0.8)' : 'text.secondary',
            }}
          >
            {date && (
              <Typography variant="caption">{date}</Typography>
            )}
            {readTime && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption">{readTime}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );

    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: layout === 'horizontal' ? 'row' : 'column',
          position: 'relative',
          cursor: 'pointer',
          ...getHoverStyles(),
        }}
        component="article"
        onClick={() => link && (window.location.href = link)}
      >
        {ImageComponent}
        {ContentComponent}
      </Paper>
    );
  },
};

export default BlogCard;
