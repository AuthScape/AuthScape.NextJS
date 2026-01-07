import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

export const LottieAnimation = {
  label: 'Lottie Animation',
  fields: {
    // Animation Source
    animationUrl: {
      type: 'text',
      label: 'Lottie JSON URL',
    },

    // Playback Options
    autoplay: {
      type: 'radio',
      label: 'Autoplay',
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
    speed: {
      type: 'select',
      label: 'Playback Speed',
      options: [
        { label: '0.25x', value: 0.25 },
        { label: '0.5x', value: 0.5 },
        { label: '0.75x', value: 0.75 },
        { label: '1x (Normal)', value: 1 },
        { label: '1.5x', value: 1.5 },
        { label: '2x', value: 2 },
      ],
    },
    direction: {
      type: 'select',
      label: 'Direction',
      options: [
        { label: 'Forward', value: 1 },
        { label: 'Reverse', value: -1 },
      ],
    },

    // Interaction
    playOnHover: {
      type: 'radio',
      label: 'Play on Hover',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    playOnClick: {
      type: 'radio',
      label: 'Play on Click',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Sizing
    width: {
      type: 'text',
      label: 'Width (e.g., 300px, 100%)',
    },
    height: {
      type: 'text',
      label: 'Height (e.g., 300px, auto)',
    },
    maxWidth: {
      type: 'text',
      label: 'Max Width',
    },

    // Layout
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'flex-end' },
      ],
    },

    // Rendering
    renderer: {
      type: 'select',
      label: 'Renderer',
      options: [
        { label: 'SVG (Best quality)', value: 'svg' },
        { label: 'Canvas (Better performance)', value: 'canvas' },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    padding: {
      type: 'select',
      label: 'Padding',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 2 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 4 },
      ],
    },
  },
  defaultProps: {
    animationUrl: '',
    autoplay: true,
    loop: true,
    speed: 1,
    direction: 1,
    playOnHover: false,
    playOnClick: false,
    width: '100%',
    height: 'auto',
    maxWidth: '400px',
    alignment: 'center',
    renderer: 'svg',
    backgroundColor: '',
    padding: 0,
  },
  render: ({
    animationUrl,
    autoplay,
    loop,
    speed,
    direction,
    playOnHover,
    playOnClick,
    width,
    height,
    maxWidth,
    alignment,
    renderer,
    backgroundColor,
    padding,
  }) => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      if (!animationUrl || !containerRef.current) return;

      let animation = null;

      const loadLottie = async () => {
        try {
          setIsLoading(true);
          setError(null);

          // Dynamically import lottie-web
          const lottie = (await import('lottie-web')).default;

          // Clear previous animation
          if (animationRef.current) {
            animationRef.current.destroy();
          }

          // Create new animation
          animation = lottie.loadAnimation({
            container: containerRef.current,
            renderer: renderer,
            loop: loop,
            autoplay: autoplay && !playOnHover,
            path: animationUrl,
          });

          animation.setSpeed(speed);
          animation.setDirection(direction);

          animationRef.current = animation;

          animation.addEventListener('DOMLoaded', () => {
            setIsLoading(false);
          });

          animation.addEventListener('data_failed', () => {
            setError('Failed to load animation');
            setIsLoading(false);
          });

        } catch (err) {
          setError('Failed to load Lottie library');
          setIsLoading(false);
        }
      };

      loadLottie();

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy();
        }
      };
    }, [animationUrl, renderer, loop, autoplay, speed, direction, playOnHover]);

    // Handle hover interaction
    useEffect(() => {
      if (!playOnHover || !animationRef.current) return;

      if (isHovered) {
        animationRef.current.play();
      } else {
        animationRef.current.pause();
      }
    }, [isHovered, playOnHover]);

    const handleClick = () => {
      if (playOnClick && animationRef.current) {
        animationRef.current.goToAndPlay(0);
      }
    };

    if (!animationUrl) {
      return (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            backgroundColor: backgroundColor || '#f5f5f5',
          }}
        >
          <Typography color="text.secondary">
            Enter a Lottie JSON URL to display animation
          </Typography>
          <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 1 }}>
            Get free animations from lottiefiles.com
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: alignment,
          backgroundColor: backgroundColor || 'transparent',
          p: padding,
        }}
      >
        <Box
          sx={{
            width: width,
            height: height,
            maxWidth: maxWidth,
            position: 'relative',
            cursor: (playOnHover || playOnClick) ? 'pointer' : 'default',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress size={32} />
            </Box>
          )}

          {error && (
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'error.main',
                borderRadius: 1,
              }}
            >
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
          )}

          <Box
            ref={containerRef}
            sx={{
              width: '100%',
              height: '100%',
              visibility: isLoading ? 'hidden' : 'visible',
            }}
          />
        </Box>
      </Box>
    );
  },
};

export default LottieAnimation;
