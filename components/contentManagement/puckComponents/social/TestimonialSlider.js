import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, Rating, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export const TestimonialSlider = {
  label: 'Testimonial Slider',
  fields: {
    // Testimonials
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
        quote: 'This product has transformed how we work.',
        author: 'John Doe',
        role: 'CEO',
        company: 'Company Inc.',
        avatar: '',
        rating: 5,
      },
    },

    // Display
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
    showCompany: {
      type: 'radio',
      label: 'Show Company',
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

    // Navigation
    showArrows: {
      type: 'radio',
      label: 'Show Arrows',
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
    autoplay: {
      type: 'radio',
      label: 'Autoplay',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    interval: {
      type: 'select',
      label: 'Autoplay Interval',
      options: [
        { label: '3 seconds', value: 3000 },
        { label: '5 seconds', value: 5000 },
        { label: '7 seconds', value: 7000 },
        { label: '10 seconds', value: 10000 },
      ],
    },

    // Styling
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Card', value: 'card' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Centered', value: 'centered' },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    quoteColor: {
      type: 'text',
      label: 'Quote Text Color',
    },
    accentColor: {
      type: 'text',
      label: 'Accent Color (icons, dots)',
    },
    elevation: {
      type: 'select',
      label: 'Card Elevation',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
      ],
    },
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Large', value: 3 },
      ],
    },
  },
  defaultProps: {
    testimonials: [
      {
        quote: "This product has completely transformed how our team collaborates. The intuitive interface and powerful features have made us more productive than ever.",
        author: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'TechCorp',
        avatar: '',
        rating: 5,
      },
      {
        quote: "Exceptional quality and outstanding customer support. I can't imagine running my business without this tool.",
        author: 'Michael Chen',
        role: 'Founder',
        company: 'StartupXYZ',
        avatar: '',
        rating: 5,
      },
      {
        quote: "The best investment we've made this year. ROI was visible within the first month.",
        author: 'Emily Davis',
        role: 'Marketing Director',
        company: 'GrowthCo',
        avatar: '',
        rating: 4,
      },
    ],
    showRating: true,
    showAvatar: true,
    showCompany: true,
    showQuoteIcon: true,
    showArrows: true,
    showDots: true,
    autoplay: true,
    interval: 5000,
    layout: 'card',
    backgroundColor: '#ffffff',
    quoteColor: '',
    accentColor: '',
    elevation: 2,
    borderRadius: 2,
  },
  render: ({
    testimonials,
    showRating,
    showAvatar,
    showCompany,
    showQuoteIcon,
    showArrows,
    showDots,
    autoplay,
    interval,
    layout,
    backgroundColor,
    quoteColor,
    accentColor,
    elevation,
    borderRadius,
  }) => {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      if (!autoplay || isHovered) return;

      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, interval);

      return () => clearInterval(timer);
    }, [autoplay, interval, testimonials.length, isHovered]);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const borderRadiusValue = borderRadius * 4;
    const testimonial = testimonials[current];

    if (!testimonial) return null;

    const content = (
      <>
        {/* Quote Icon */}
        {showQuoteIcon && (
          <FormatQuoteIcon
            sx={{
              fontSize: 48,
              color: accentColor || 'primary.light',
              opacity: 0.5,
              mb: 2,
            }}
          />
        )}

        {/* Rating */}
        {showRating && testimonial.rating && (
          <Rating
            value={testimonial.rating}
            readOnly
            size="small"
            sx={{ mb: 2, color: accentColor || undefined }}
          />
        )}

        {/* Quote */}
        <Typography
          variant={layout === 'centered' ? 'h6' : 'body1'}
          sx={{
            color: quoteColor || 'text.primary',
            fontStyle: 'italic',
            lineHeight: 1.8,
            mb: 3,
            textAlign: layout === 'centered' ? 'center' : 'left',
          }}
        >
          "{testimonial.quote}"
        </Typography>

        {/* Author */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: layout === 'centered' ? 'center' : 'flex-start',
          }}
        >
          {showAvatar && (
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.author}
              sx={{ width: 48, height: 48 }}
            >
              {testimonial.author?.charAt(0)}
            </Avatar>
          )}
          <Box sx={{ textAlign: layout === 'centered' && !showAvatar ? 'center' : 'left' }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {testimonial.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {testimonial.role}
              {showCompany && testimonial.company && ` at ${testimonial.company}`}
            </Typography>
          </Box>
        </Box>
      </>
    );

    return (
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ position: 'relative' }}
      >
        {/* Main Content */}
        {layout === 'card' ? (
          <Paper
            elevation={elevation}
            sx={{
              p: 4,
              backgroundColor: backgroundColor,
              borderRadius: `${borderRadiusValue}px`,
            }}
          >
            {content}
          </Paper>
        ) : (
          <Box
            sx={{
              p: layout === 'minimal' ? 0 : 4,
              textAlign: layout === 'centered' ? 'center' : 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: layout === 'centered' ? 'center' : 'flex-start',
            }}
          >
            {content}
          </Box>
        )}

        {/* Navigation Arrows */}
        {showArrows && testimonials.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              sx={{
                position: 'absolute',
                left: layout === 'card' ? -20 : -40,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={next}
              sx={{
                position: 'absolute',
                right: layout === 'card' ? -20 : -40,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}

        {/* Dots */}
        {showDots && testimonials.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 3,
            }}
          >
            {testimonials.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrent(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === current ? (accentColor || 'primary.main') : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  },
};

export default TestimonialSlider;
