import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Rating,
  IconButton,
  Grid2,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Testimonials = {
  label: 'Testimonials',
  fields: {
    // Content
    testimonials: {
      type: 'array',
      label: 'Testimonials',
      arrayFields: {
        quote: { type: 'textarea', label: 'Quote' },
        author: { type: 'text', label: 'Author Name' },
        role: { type: 'text', label: 'Role/Title' },
        company: { type: 'text', label: 'Company' },
        avatar: { type: 'text', label: 'Avatar URL' },
        rating: { type: 'number', label: 'Rating (1-5)' },
      },
      defaultItemProps: {
        quote: 'This product has transformed our business. Highly recommended!',
        author: 'John Doe',
        role: 'CEO',
        company: 'Acme Inc.',
        avatar: '',
        rating: 5,
      },
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
        { label: 'Single', value: 'single' },
      ],
    },
    columns: {
      type: 'select',
      label: 'Columns (Grid)',
      options: [
        { label: '1 Column', value: 1 },
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 },
        { label: '4 Columns', value: 4 },
      ],
    },

    // Slider Options
    autoplay: {
      type: 'radio',
      label: 'Autoplay (Slider)',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    autoplayInterval: {
      type: 'select',
      label: 'Autoplay Interval',
      options: [
        { label: '3 seconds', value: 3000 },
        { label: '5 seconds', value: 5000 },
        { label: '7 seconds', value: 7000 },
        { label: '10 seconds', value: 10000 },
      ],
    },
    showArrows: {
      type: 'radio',
      label: 'Show Navigation Arrows',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showDots: {
      type: 'radio',
      label: 'Show Dots',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Display Options
    showRating: {
      type: 'radio',
      label: 'Show Rating',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showAvatar: {
      type: 'radio',
      label: 'Show Avatar',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
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

    // Card Style
    cardStyle: {
      type: 'select',
      label: 'Card Style',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Bordered', value: 'bordered' },
        { label: 'Shadow', value: 'shadow' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    cardAlignment: {
      type: 'select',
      label: 'Card Text Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    cardBackgroundColor: {
      type: 'text',
      label: 'Card Background Color',
    },
    accentColor: {
      type: 'text',
      label: 'Accent Color',
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
      ],
    },
    padding: {
      type: 'select',
      label: 'Container Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 4 },
        { label: 'Large', value: 6 },
      ],
    },
  },
  defaultProps: {
    testimonials: [
      {
        quote: 'This product has completely transformed how we work. The results speak for themselves.',
        author: 'Sarah Johnson',
        role: 'Marketing Director',
        company: 'Tech Corp',
        avatar: '',
        rating: 5,
      },
      {
        quote: 'Exceptional quality and outstanding customer support. Would highly recommend to anyone.',
        author: 'Michael Chen',
        role: 'Founder',
        company: 'StartUp Inc',
        avatar: '',
        rating: 5,
      },
      {
        quote: 'We saw a 40% increase in productivity within the first month of using this solution.',
        author: 'Emily Davis',
        role: 'Operations Manager',
        company: 'Global Systems',
        avatar: '',
        rating: 4,
      },
    ],
    layout: 'grid',
    columns: 3,
    autoplay: true,
    autoplayInterval: 5000,
    showArrows: true,
    showDots: true,
    showRating: true,
    showAvatar: true,
    showQuoteIcon: true,
    cardStyle: 'shadow',
    cardAlignment: 'center',
    backgroundColor: '',
    cardBackgroundColor: '#ffffff',
    accentColor: '',
    spacing: 3,
    padding: 4,
  },
  render: ({
    testimonials,
    layout,
    columns,
    autoplay,
    autoplayInterval,
    showArrows,
    showDots,
    showRating,
    showAvatar,
    showQuoteIcon,
    cardStyle,
    cardAlignment,
    backgroundColor,
    cardBackgroundColor,
    accentColor,
    spacing,
    padding,
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Autoplay for slider
    useEffect(() => {
      if (layout !== 'slider' || !autoplay || testimonials.length <= 1) return;

      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, autoplayInterval);

      return () => clearInterval(interval);
    }, [layout, autoplay, autoplayInterval, testimonials.length]);

    const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const getCardStyles = () => {
      const base = {
        backgroundColor: cardBackgroundColor,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      };

      switch (cardStyle) {
        case 'bordered':
          return { ...base, border: '1px solid', borderColor: 'divider', borderRadius: 2 };
        case 'shadow':
          return { ...base, boxShadow: 3, borderRadius: 2 };
        case 'minimal':
          return { ...base, backgroundColor: 'transparent' };
        default:
          return { ...base, borderRadius: 2 };
      }
    };

    const TestimonialCard = ({ testimonial, index }) => (
      <Paper elevation={cardStyle === 'shadow' ? 3 : 0} sx={getCardStyles()}>
        <Box sx={{ p: 3, textAlign: cardAlignment, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {showQuoteIcon && (
            <FormatQuoteIcon
              sx={{
                fontSize: 40,
                color: accentColor || 'primary.main',
                opacity: 0.3,
                mb: 1,
                alignSelf: cardAlignment === 'center' ? 'center' : 'flex-start',
              }}
            />
          )}

          <Typography
            variant="body1"
            sx={{
              fontStyle: 'italic',
              mb: 3,
              flex: 1,
              lineHeight: 1.7,
            }}
          >
            "{testimonial.quote}"
          </Typography>

          {showRating && testimonial.rating && (
            <Box sx={{ mb: 2, display: 'flex', justifyContent: cardAlignment === 'center' ? 'center' : 'flex-start' }}>
              <Rating value={testimonial.rating} readOnly size="small" />
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: cardAlignment === 'center' ? 'center' : 'flex-start',
            }}
          >
            {showAvatar && (
              <Avatar
                src={testimonial.avatar}
                alt={testimonial.author}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: accentColor || 'primary.main',
                }}
              >
                {testimonial.author?.charAt(0)}
              </Avatar>
            )}
            <Box sx={{ textAlign: cardAlignment === 'center' && !showAvatar ? 'center' : 'left' }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {testimonial.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {testimonial.role}
                {testimonial.company && `, ${testimonial.company}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    );

    // Grid Layout
    if (layout === 'grid') {
      return (
        <Box sx={{ backgroundColor: backgroundColor || 'transparent', p: padding }}>
          <Grid2 container spacing={spacing}>
            {testimonials.map((testimonial, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, md: 12 / columns }}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      );
    }

    // Slider Layout
    if (layout === 'slider') {
      return (
        <Box sx={{ backgroundColor: backgroundColor || 'transparent', p: padding, position: 'relative' }}>
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
            <TestimonialCard testimonial={testimonials[currentIndex]} index={currentIndex} />
          </Box>

          {showArrows && testimonials.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { backgroundColor: 'background.paper' },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { backgroundColor: 'background.paper' },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}

          {showDots && testimonials.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: index === currentIndex ? (accentColor || 'primary.main') : 'grey.300',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      );
    }

    // Single Layout
    return (
      <Box sx={{ backgroundColor: backgroundColor || 'transparent', p: padding }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <TestimonialCard testimonial={testimonials[0]} index={0} />
        </Box>
      </Box>
    );
  },
};

export default Testimonials;
