import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';

export const HeroAnimated = {
  label: 'Hero Animated',
  fields: {
    // Animation
    animationType: {
      type: 'select',
      label: 'Animation Type',
      options: [
        { label: 'Gradient Flow', value: 'gradient' },
        { label: 'Particles', value: 'particles' },
        { label: 'Waves', value: 'waves' },
        { label: 'Geometric', value: 'geometric' },
      ],
    },
    gradientColors: {
      type: 'array',
      label: 'Gradient Colors',
      arrayFields: {
        color: { type: 'text', label: 'Color (hex)' },
      },
      defaultItemProps: {
        color: '#6366f1',
      },
    },
    animationSpeed: {
      type: 'select',
      label: 'Animation Speed',
      options: [
        { label: 'Slow', value: 15 },
        { label: 'Normal', value: 10 },
        { label: 'Fast', value: 5 },
      ],
    },

    // Content
    eyebrow: {
      type: 'text',
      label: 'Eyebrow Text',
    },
    title: {
      type: 'text',
      label: 'Title',
    },
    subtitle: {
      type: 'textarea',
      label: 'Subtitle',
    },
    primaryCTA: {
      type: 'text',
      label: 'Primary CTA Text',
    },
    primaryCTALink: {
      type: 'text',
      label: 'Primary CTA Link',
    },
    secondaryCTA: {
      type: 'text',
      label: 'Secondary CTA Text',
    },
    secondaryCTALink: {
      type: 'text',
      label: 'Secondary CTA Link',
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
    maxWidth: {
      type: 'select',
      label: 'Content Max Width',
      options: [
        { label: 'Small (600px)', value: 600 },
        { label: 'Medium (800px)', value: 800 },
        { label: 'Large (1000px)', value: 1000 },
      ],
    },

    // Text Style
    textColor: {
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'White', value: '#ffffff' },
        { label: 'Dark', value: '#1a1a1a' },
      ],
    },
    buttonStyle: {
      type: 'select',
      label: 'Button Style',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Primary', value: 'primary' },
      ],
    },
  },
  defaultProps: {
    animationType: 'gradient',
    gradientColors: [
      { color: '#667eea' },
      { color: '#764ba2' },
      { color: '#6B8DD6' },
      { color: '#8E37D7' },
    ],
    animationSpeed: 10,
    eyebrow: 'Welcome',
    title: 'The Future is Now',
    subtitle: 'Experience the next generation of digital innovation with our cutting-edge solutions.',
    primaryCTA: 'Get Started',
    primaryCTALink: '#',
    secondaryCTA: 'Learn More',
    secondaryCTALink: '#',
    height: '100vh',
    contentAlign: 'center',
    textAlign: 'center',
    maxWidth: 800,
    textColor: '#ffffff',
    buttonStyle: 'light',
  },
  render: ({
    animationType,
    gradientColors,
    animationSpeed,
    eyebrow,
    title,
    subtitle,
    primaryCTA,
    primaryCTALink,
    secondaryCTA,
    secondaryCTALink,
    height,
    contentAlign,
    textAlign,
    maxWidth,
    textColor,
    buttonStyle,
  }) => {
    const colors = gradientColors.map((c) => c.color).join(', ');

    const getBackground = () => {
      switch (animationType) {
        case 'waves':
          return `
            linear-gradient(45deg, ${gradientColors[0]?.color || '#667eea'}, ${gradientColors[1]?.color || '#764ba2'})
          `;
        case 'particles':
        case 'geometric':
          return `linear-gradient(135deg, ${gradientColors[0]?.color || '#667eea'} 0%, ${gradientColors[1]?.color || '#764ba2'} 100%)`;
        default:
          return `linear-gradient(-45deg, ${colors})`;
      }
    };

    const getAnimation = () => {
      switch (animationType) {
        case 'gradient':
          return {
            backgroundSize: '400% 400%',
            animation: `gradient ${animationSpeed}s ease infinite`,
            '@keyframes gradient': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
          };
        case 'waves':
          return {
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 200,
              background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23ffffff\' fill-opacity=\'0.2\' d=\'M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom',
              animation: `wave ${animationSpeed}s linear infinite`,
            },
            '@keyframes wave': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          };
        default:
          return {};
      }
    };

    const getButtonStyles = () => {
      if (buttonStyle === 'light') {
        return {
          primary: {
            backgroundColor: '#ffffff',
            color: gradientColors[0]?.color || '#667eea',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
          },
          secondary: {
            color: '#ffffff',
            borderColor: 'rgba(255,255,255,0.5)',
            '&:hover': { borderColor: '#ffffff', backgroundColor: 'rgba(255,255,255,0.1)' },
          },
        };
      }
      if (buttonStyle === 'dark') {
        return {
          primary: {
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#333333' },
          },
          secondary: {
            color: '#1a1a1a',
            borderColor: 'rgba(0,0,0,0.3)',
            '&:hover': { borderColor: '#1a1a1a', backgroundColor: 'rgba(0,0,0,0.05)' },
          },
        };
      }
      return {
        primary: {},
        secondary: {
          color: textColor,
          borderColor: textColor === '#ffffff' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)',
        },
      };
    };

    const btnStyles = getButtonStyles();

    return (
      <Box
        sx={{
          position: 'relative',
          height: height,
          background: getBackground(),
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          ...getAnimation(),
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: contentAlign,
              textAlign: textAlign,
              maxWidth: maxWidth,
              mx: contentAlign === 'center' ? 'auto' : 0,
            }}
          >
            {eyebrow && (
              <Typography
                variant="overline"
                sx={{
                  color: textColor,
                  opacity: 0.8,
                  fontWeight: 600,
                  letterSpacing: 3,
                  mb: 2,
                }}
              >
                {eyebrow}
              </Typography>
            )}

            <Typography
              variant="h1"
              sx={{
                color: textColor,
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="h6"
                sx={{
                  color: textColor,
                  opacity: 0.9,
                  fontWeight: 400,
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                {subtitle}
              </Typography>
            )}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={contentAlign}
            >
              {primaryCTA && (
                <Button
                  variant="contained"
                  size="large"
                  href={primaryCTALink}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    ...btnStyles.primary,
                  }}
                >
                  {primaryCTA}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant="outlined"
                  size="large"
                  href={secondaryCTALink}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    ...btnStyles.secondary,
                  }}
                >
                  {secondaryCTA}
                </Button>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>
    );
  },
};

export default HeroAnimated;
