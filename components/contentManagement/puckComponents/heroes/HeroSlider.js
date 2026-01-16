import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ImageAssetPicker } from '../../customFields/imageAssetPicker';

export const HeroSlider = {
  label: 'Hero Slider',
  fields: {
    // Slides
    slides: {
      type: 'array',
      label: 'Slides',
      arrayFields: {
        image: { type: 'text', label: 'Background Image', render: ImageAssetPicker },
        title: { type: 'text', label: 'Title' },
        subtitle: { type: 'textarea', label: 'Subtitle' },
        ctaText: { type: 'text', label: 'CTA Text' },
        ctaLink: { type: 'text', label: 'CTA Link' },
      },
      defaultItemProps: {
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600',
        title: 'Slide Title',
        subtitle: 'Slide subtitle goes here',
        ctaText: 'Learn More',
        ctaLink: '#',
      },
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

    // Overlay
    overlayOpacity: {
      type: 'select',
      label: 'Overlay Opacity',
      options: [
        { label: 'None', value: 0 },
        { label: 'Light (0.3)', value: 0.3 },
        { label: 'Medium (0.5)', value: 0.5 },
        { label: 'Dark (0.7)', value: 0.7 },
      ],
    },

    // Layout
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Medium (500px)', value: 500 },
        { label: 'Large (600px)', value: 600 },
        { label: 'Full Screen', value: '100vh' },
        { label: 'Full Screen (minus header)', value: 'calc(100vh - 64px)' },
      ],
    },
    contentAlign: {
      type: 'select',
      label: 'Content Alignment',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'flex-start' },
        { label: 'Right', value: 'flex-end' },
      ],
    },
    textAlign: {
      type: 'select',
      label: 'Text Alignment',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
    },

    // Animation
    transition: {
      type: 'select',
      label: 'Transition',
      options: [
        { label: 'Fade', value: 'fade' },
        { label: 'Slide', value: 'slide' },
      ],
    },
  },
  defaultProps: {
    slides: [
      { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600', title: 'Welcome to Our Platform', subtitle: 'Discover amazing features and grow your business', ctaText: 'Get Started', ctaLink: '#' },
      { image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600', title: 'Powerful Tools', subtitle: 'Everything you need to succeed in one place', ctaText: 'Learn More', ctaLink: '#' },
      { image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600', title: 'Join Our Community', subtitle: 'Connect with thousands of professionals worldwide', ctaText: 'Join Now', ctaLink: '#' },
    ],
    autoplay: true,
    interval: 5000,
    showArrows: true,
    showDots: true,
    overlayOpacity: 0.5,
    height: '100vh',
    contentAlign: 'center',
    textAlign: 'center',
    transition: 'fade',
  },
  render: ({
    slides,
    autoplay,
    interval,
    showArrows,
    showDots,
    overlayOpacity,
    height,
    contentAlign,
    textAlign,
    transition,
  }) => {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      if (!autoplay || isHovered) return;

      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, interval);

      return () => clearInterval(timer);
    }, [autoplay, interval, slides.length, isHovered]);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: 'relative',
          height: height,
          overflow: 'hidden',
        }}
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: transition === 'fade' ? (index === current ? 1 : 0) : 1,
              transform: transition === 'slide' ? `translateX(${(index - current) * 100}%)` : 'none',
              transition: transition === 'fade' ? 'opacity 0.8s ease' : 'transform 0.8s ease',
            }}
          >
            {/* Background */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 6s ease',
                transform: index === current ? 'scale(1.05)' : 'scale(1)',
              }}
            />

            {/* Overlay */}
            {overlayOpacity > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
                }}
              />
            )}

            {/* Content */}
            <Container
              maxWidth="lg"
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: contentAlign,
                  textAlign: textAlign,
                  maxWidth: 800,
                  mx: contentAlign === 'center' ? 'auto' : 0,
                  ml: contentAlign === 'flex-end' ? 'auto' : 0,
                  opacity: index === current ? 1 : 0,
                  transform: index === current ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease 0.3s',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  {slide.title}
                </Typography>

                {slide.subtitle && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      fontWeight: 400,
                      mb: 4,
                      lineHeight: 1.6,
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                )}

                {slide.ctaText && (
                  <Button
                    variant="contained"
                    size="large"
                    href={slide.ctaLink}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    {slide.ctaText}
                  </Button>
                )}
              </Box>
            </Container>
          </Box>
        ))}

        {/* Arrows */}
        {showArrows && slides.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
              }}
            >
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={next}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
              }}
            >
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </>
        )}

        {/* Dots */}
        {showDots && slides.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1.5,
            }}
          >
            {slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrent(index)}
                sx={{
                  width: index === current ? 32 : 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: index === current ? '#ffffff' : 'rgba(255,255,255,0.5)',
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

export default HeroSlider;
