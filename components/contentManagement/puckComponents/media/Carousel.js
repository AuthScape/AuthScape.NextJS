import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Carousel = {
  label: 'Carousel',
  fields: {
    // Slides
    slides: {
      type: 'array',
      label: 'Slides',
      arrayFields: {
        image: { type: 'text', label: 'Image URL' },
        title: { type: 'text', label: 'Title (optional)' },
        subtitle: { type: 'text', label: 'Subtitle (optional)' },
        link: { type: 'text', label: 'Link (optional)' },
      },
      defaultItemProps: {
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        title: '',
        subtitle: '',
        link: '',
      },
    },

    // Display
    aspectRatio: {
      type: 'select',
      label: 'Aspect Ratio',
      options: [
        { label: 'Wide (16:9)', value: '56.25%' },
        { label: 'Standard (4:3)', value: '75%' },
        { label: 'Square (1:1)', value: '100%' },
        { label: 'Portrait (3:4)', value: '133%' },
        { label: 'Banner (21:9)', value: '42.86%' },
      ],
    },
    showOverlay: {
      type: 'radio',
      label: 'Show Text Overlay',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    overlayPosition: {
      type: 'select',
      label: 'Overlay Position',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Top Left', value: 'top-left' },
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
    dotsPosition: {
      type: 'select',
      label: 'Dots Position',
      options: [
        { label: 'Inside Bottom', value: 'inside' },
        { label: 'Outside Bottom', value: 'outside' },
      ],
    },

    // Autoplay
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
      label: 'Interval',
      options: [
        { label: '3 seconds', value: 3000 },
        { label: '5 seconds', value: 5000 },
        { label: '7 seconds', value: 7000 },
        { label: '10 seconds', value: 10000 },
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

    // Styling
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
    arrowStyle: {
      type: 'select',
      label: 'Arrow Style',
      options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    transition: {
      type: 'select',
      label: 'Transition',
      options: [
        { label: 'Slide', value: 'slide' },
        { label: 'Fade', value: 'fade' },
      ],
    },
  },
  defaultProps: {
    slides: [
      { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', title: 'Slide 1', subtitle: '', link: '' },
      { image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', title: 'Slide 2', subtitle: '', link: '' },
      { image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', title: 'Slide 3', subtitle: '', link: '' },
    ],
    aspectRatio: '56.25%',
    showOverlay: false,
    overlayPosition: 'center',
    showArrows: true,
    showDots: true,
    dotsPosition: 'inside',
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    borderRadius: 2,
    arrowStyle: 'circle',
    transition: 'slide',
  },
  render: ({
    slides,
    aspectRatio,
    showOverlay,
    overlayPosition,
    showArrows,
    showDots,
    dotsPosition,
    autoplay,
    interval,
    pauseOnHover,
    borderRadius,
    arrowStyle,
    transition,
  }) => {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      if (!autoplay || (pauseOnHover && isHovered)) return;

      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, interval);

      return () => clearInterval(timer);
    }, [autoplay, interval, slides.length, pauseOnHover, isHovered]);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    const borderRadiusValue = borderRadius * 4;

    const getOverlayStyles = () => {
      switch (overlayPosition) {
        case 'bottom-left':
          return { bottom: 24, left: 24, textAlign: 'left' };
        case 'bottom-center':
          return { bottom: 24, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' };
        case 'top-left':
          return { top: 24, left: 24, textAlign: 'left' };
        default:
          return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' };
      }
    };

    const getArrowStyles = () => {
      const base = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        transition: 'all 0.2s ease',
      };

      switch (arrowStyle) {
        case 'square':
          return {
            ...base,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 1,
            '&:hover': { backgroundColor: '#ffffff' },
          };
        case 'minimal':
          return {
            ...base,
            backgroundColor: 'transparent',
            color: '#ffffff',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          };
        default:
          return {
            ...base,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '50%',
            '&:hover': { backgroundColor: '#ffffff' },
          };
      }
    };

    const arrowSx = getArrowStyles();

    return (
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ position: 'relative' }}
      >
        {/* Carousel Container */}
        <Box
          sx={{
            position: 'relative',
            paddingBottom: aspectRatio,
            borderRadius: `${borderRadiusValue}px`,
            overflow: 'hidden',
          }}
        >
          {/* Slides */}
          {slides.map((slide, index) => (
            <Box
              key={index}
              component={slide.link ? 'a' : 'div'}
              href={slide.link || undefined}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: transition === 'fade' ? (index === current ? 1 : 0) : 1,
                transform: transition === 'slide' ? `translateX(${(index - current) * 100}%)` : 'none',
                transition: transition === 'fade' ? 'opacity 0.5s ease' : 'transform 0.5s ease',
                textDecoration: 'none',
              }}
            >
              {/* Overlay */}
              {showOverlay && (slide.title || slide.subtitle) && (
                <Box
                  sx={{
                    position: 'absolute',
                    ...getOverlayStyles(),
                    color: '#ffffff',
                    zIndex: 1,
                  }}
                >
                  {slide.title && (
                    <Typography variant="h5" fontWeight={700} sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                      {slide.title}
                    </Typography>
                  )}
                  {slide.subtitle && (
                    <Typography variant="body1" sx={{ mt: 1, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                      {slide.subtitle}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          ))}

          {/* Arrows */}
          {showArrows && slides.length > 1 && (
            <>
              <IconButton onClick={prev} sx={{ ...arrowSx, left: 16 }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={next} sx={{ ...arrowSx, right: 16 }}>
                <ChevronRightIcon />
              </IconButton>
            </>
          )}

          {/* Dots - Inside */}
          {showDots && dotsPosition === 'inside' && slides.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
                zIndex: 2,
              }}
            >
              {slides.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrent(index)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: index === current ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Dots - Outside */}
        {showDots && dotsPosition === 'outside' && slides.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 2,
            }}
          >
            {slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrent(index)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: index === current ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  },
};

export default Carousel;
