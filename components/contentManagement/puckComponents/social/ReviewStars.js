import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const ReviewStars = {
  label: 'Review Stars',
  fields: {
    // Rating
    rating: {
      type: 'number',
      label: 'Rating (0-5)',
    },
    maxRating: {
      type: 'select',
      label: 'Max Rating',
      options: [
        { label: '5 Stars', value: 5 },
        { label: '10 Stars', value: 10 },
      ],
    },
    precision: {
      type: 'select',
      label: 'Precision',
      options: [
        { label: 'Full Star', value: 1 },
        { label: 'Half Star', value: 0.5 },
        { label: 'Quarter Star', value: 0.25 },
      ],
    },

    // Display
    showValue: {
      type: 'radio',
      label: 'Show Rating Value',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    valuePosition: {
      type: 'select',
      label: 'Value Position',
      options: [
        { label: 'After Stars', value: 'after' },
        { label: 'Before Stars', value: 'before' },
        { label: 'Below Stars', value: 'below' },
      ],
    },
    showCount: {
      type: 'radio',
      label: 'Show Review Count',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    reviewCount: {
      type: 'number',
      label: 'Review Count',
    },
    countFormat: {
      type: 'select',
      label: 'Count Format',
      options: [
        { label: '(123)', value: 'parentheses' },
        { label: '123 reviews', value: 'text' },
        { label: 'Based on 123 reviews', value: 'full' },
      ],
    },

    // Styling
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    color: {
      type: 'text',
      label: 'Star Color',
    },
    emptyColor: {
      type: 'text',
      label: 'Empty Star Color',
    },
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Inline', value: 'inline' },
        { label: 'Stacked', value: 'stacked' },
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
  },
  defaultProps: {
    rating: 4.5,
    maxRating: 5,
    precision: 0.5,
    showValue: true,
    valuePosition: 'after',
    showCount: true,
    reviewCount: 128,
    countFormat: 'parentheses',
    size: 'medium',
    color: '#faaf00',
    emptyColor: '',
    layout: 'inline',
    align: 'flex-start',
  },
  render: ({
    rating,
    maxRating,
    precision,
    showValue,
    valuePosition,
    showCount,
    reviewCount,
    countFormat,
    size,
    color,
    emptyColor,
    layout,
    align,
  }) => {
    const clampedRating = Math.min(maxRating, Math.max(0, rating));

    const getCountText = () => {
      switch (countFormat) {
        case 'parentheses':
          return `(${reviewCount.toLocaleString()})`;
        case 'text':
          return `${reviewCount.toLocaleString()} reviews`;
        case 'full':
          return `Based on ${reviewCount.toLocaleString()} reviews`;
        default:
          return `(${reviewCount})`;
      }
    };

    const renderValue = () => {
      if (!showValue) return null;
      return (
        <Typography
          variant={size === 'large' ? 'h6' : size === 'small' ? 'body2' : 'body1'}
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {clampedRating.toFixed(1)}
        </Typography>
      );
    };

    const renderCount = () => {
      if (!showCount) return null;
      return (
        <Typography
          variant={size === 'large' ? 'body1' : 'body2'}
          color="text.secondary"
        >
          {getCountText()}
        </Typography>
      );
    };

    const starComponent = (
      <Rating
        value={clampedRating}
        max={maxRating}
        precision={precision}
        readOnly
        size={size}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" />}
        sx={{
          '& .MuiRating-iconFilled': {
            color: color,
          },
          '& .MuiRating-iconEmpty': {
            color: emptyColor || 'grey.300',
          },
        }}
      />
    );

    if (layout === 'stacked') {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: align,
            gap: 0.5,
          }}
        >
          {showValue && valuePosition === 'before' && renderValue()}
          {starComponent}
          {showValue && valuePosition === 'after' && renderValue()}
          {showValue && valuePosition === 'below' && renderValue()}
          {renderCount()}
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: align,
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {showValue && valuePosition === 'before' && renderValue()}
        {starComponent}
        {showValue && (valuePosition === 'after' || valuePosition === 'below') && renderValue()}
        {renderCount()}
      </Box>
    );
  },
};

export default ReviewStars;
