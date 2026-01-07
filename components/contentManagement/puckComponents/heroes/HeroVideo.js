import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const HeroVideo = {
  label: 'Hero Video',
  fields: {
    // Video
    videoUrl: {
      type: 'text',
      label: 'Video URL (MP4 or YouTube embed)',
    },
    posterImage: {
      type: 'text',
      label: 'Poster Image URL',
    },
    autoPlay: {
      type: 'radio',
      label: 'Auto Play',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    muted: {
      type: 'radio',
      label: 'Muted',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    loop: {
      type: 'radio',
      label: 'Loop',
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
        { label: 'Very Dark (0.85)', value: 0.85 },
      ],
    },
    overlayColor: {
      type: 'text',
      label: 'Overlay Color',
    },

    // Content
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
        { label: 'Right', value: 'flex-end' },
      ],
    },
    textAlign: {
      type: 'select',
      label: 'Text Alignment',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Content Max Width',
      options: [
        { label: 'Small (600px)', value: 600 },
        { label: 'Medium (800px)', value: 800 },
        { label: 'Large (1000px)', value: 1000 },
        { label: 'Full', value: 'none' },
      ],
    },
  },
  defaultProps: {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    posterImage: '',
    autoPlay: true,
    muted: true,
    loop: true,
    overlayOpacity: 0.5,
    overlayColor: '#000000',
    title: 'Powerful Video Backgrounds',
    subtitle: 'Create stunning hero sections with video backgrounds that captivate your audience and tell your story.',
    primaryCTA: 'Get Started',
    primaryCTALink: '#',
    secondaryCTA: 'Watch Demo',
    secondaryCTALink: '#',
    height: '100vh',
    contentAlign: 'center',
    textAlign: 'center',
    maxWidth: 800,
  },
  render: ({
    videoUrl,
    posterImage,
    autoPlay,
    muted,
    loop,
    overlayOpacity,
    overlayColor,
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
  }) => {
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

    return (
      <Box
        sx={{
          position: 'relative',
          height: height,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Video Background */}
        {isYouTube ? (
          <Box
            component="iframe"
            src={`${videoUrl}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=0&showinfo=0`}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: '100vh',
              minWidth: '177.77vh',
              minHeight: '56.25vw',
              border: 'none',
              pointerEvents: 'none',
            }}
            allow="autoplay; encrypted-media"
          />
        ) : (
          <Box
            component="video"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            poster={posterImage}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </Box>
        )}

        {/* Overlay */}
        {overlayOpacity > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            }}
          />
        )}

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: contentAlign,
              textAlign: textAlign,
              maxWidth: maxWidth === 'none' ? '100%' : maxWidth,
              mx: contentAlign === 'center' ? 'auto' : 0,
              ml: contentAlign === 'flex-end' ? 'auto' : 0,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                mb: 3,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
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
                  startIcon={secondaryCTA.toLowerCase().includes('watch') ? <PlayArrowIcon /> : undefined}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: '#ffffff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
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

export default HeroVideo;
