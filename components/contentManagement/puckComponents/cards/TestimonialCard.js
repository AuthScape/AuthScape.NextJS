import React from 'react';
import { Box, Paper, Typography, Avatar, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import {
  borderRadiusField,
  elevationField,
  textAlignField,
} from '../shared/fieldTypes';

export const TestimonialCard = {
  label: 'Testimonial Card',
  fields: {
    // Content
    quote: {
      type: 'textarea',
      label: 'Quote',
    },
    authorName: {
      type: 'text',
      label: 'Author Name',
    },
    authorRole: {
      type: 'text',
      label: 'Role/Title',
    },
    company: {
      type: 'text',
      label: 'Company',
    },
    avatar: {
      type: 'text',
      label: 'Avatar Image URL',
    },

    // Rating
    showRating: {
      type: 'radio',
      label: 'Show Rating',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    rating: {
      type: 'number',
      label: 'Rating (1-5)',
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Centered', value: 'centered' },
        { label: 'Large Quote', value: 'large' },
      ],
    },
    showQuoteIcon: {
      type: 'radio',
      label: 'Show Quote Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    align: textAlignField,

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    quoteColor: {
      type: 'select',
      label: 'Quote Text Color',
      options: [
        { label: 'Default', value: 'text.primary' },
        { label: 'Secondary', value: 'text.secondary' },
        { label: 'White', value: '#ffffff' },
      ],
    },
    accentColor: {
      type: 'text',
      label: 'Accent Color (quote icon)',
    },
    elevation: elevationField,
    borderRadius: borderRadiusField,
  },
  defaultProps: {
    quote: 'This product has completely transformed how we work. The team is more productive than ever, and the results speak for themselves.',
    authorName: 'Sarah Johnson',
    authorRole: 'CEO',
    company: 'TechCorp Inc.',
    avatar: '',
    showRating: true,
    rating: 5,
    layout: 'standard',
    showQuoteIcon: true,
    align: 'left',
    backgroundColor: '#ffffff',
    quoteColor: 'text.primary',
    accentColor: '',
    elevation: 1,
    borderRadius: 2,
  },
  render: ({
    quote,
    authorName,
    authorRole,
    company,
    avatar,
    showRating,
    rating,
    layout,
    showQuoteIcon,
    align,
    backgroundColor,
    quoteColor,
    accentColor,
    elevation,
    borderRadius,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;
    const isCentered = layout === 'centered' || align === 'center';

    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          p: layout === 'large' ? 5 : 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Quote Icon */}
        {showQuoteIcon && (
          <Box
            sx={{
              mb: 2,
              textAlign: isCentered ? 'center' : 'left',
            }}
          >
            <FormatQuoteIcon
              sx={{
                fontSize: layout === 'large' ? 48 : 36,
                color: accentColor || 'primary.main',
                opacity: 0.8,
                transform: 'rotate(180deg)',
              }}
            />
          </Box>
        )}

        {/* Rating */}
        {showRating && (
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: isCentered ? 'center' : 'flex-start',
            }}
          >
            <Rating value={rating} readOnly size={layout === 'large' ? 'medium' : 'small'} />
          </Box>
        )}

        {/* Quote */}
        <Typography
          variant={layout === 'large' ? 'h6' : 'body1'}
          sx={{
            color: quoteColor,
            fontStyle: 'italic',
            lineHeight: 1.7,
            mb: 3,
            flex: 1,
            textAlign: align,
            fontWeight: layout === 'large' ? 400 : 400,
          }}
        >
          "{quote}"
        </Typography>

        {/* Author Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: isCentered ? 'column' : 'row',
            textAlign: isCentered ? 'center' : 'left',
            gap: isCentered ? 1 : 2,
          }}
        >
          {avatar && (
            <Avatar
              src={avatar}
              alt={authorName}
              sx={{
                width: layout === 'large' ? 64 : 48,
                height: layout === 'large' ? 64 : 48,
              }}
            />
          )}
          {!avatar && authorName && (
            <Avatar
              sx={{
                width: layout === 'large' ? 64 : 48,
                height: layout === 'large' ? 64 : 48,
                bgcolor: accentColor || 'primary.main',
                fontSize: layout === 'large' ? 24 : 18,
              }}
            >
              {authorName.charAt(0)}
            </Avatar>
          )}

          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.3,
              }}
            >
              {authorName}
            </Typography>
            {(authorRole || company) && (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
              >
                {authorRole}
                {authorRole && company && ', '}
                {company}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    );
  },
};

export default TestimonialCard;
