import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  borderRadiusField,
  elevationField,
} from '../shared/fieldTypes';

export const Video = {
  label: 'Video',
  fields: {
    // Video Source
    source: {
      type: 'select',
      label: 'Video Source',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Direct URL (MP4)', value: 'direct' },
      ],
    },
    videoId: {
      type: 'text',
      label: 'Video ID (YouTube/Vimeo)',
    },
    videoUrl: {
      type: 'text',
      label: 'Video URL (for direct videos)',
    },

    // Playback
    autoplay: {
      type: 'radio',
      label: 'Autoplay',
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
    controls: {
      type: 'radio',
      label: 'Show Controls',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Layout
    aspectRatio: {
      type: 'select',
      label: 'Aspect Ratio',
      options: [
        { label: '16:9 (Widescreen)', value: '56.25%' },
        { label: '4:3 (Standard)', value: '75%' },
        { label: '1:1 (Square)', value: '100%' },
        { label: '21:9 (Cinematic)', value: '42.86%' },
        { label: '9:16 (Vertical)', value: '177.78%' },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { label: 'Small (480px)', value: '480px' },
        { label: 'Medium (720px)', value: '720px' },
        { label: 'Large (960px)', value: '960px' },
        { label: 'Extra Large (1200px)', value: '1200px' },
        { label: 'Full Width', value: '100%' },
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

    // Styling
    borderRadius: borderRadiusField,
    shadow: {
      type: 'radio',
      label: 'Shadow',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Caption
    showCaption: {
      type: 'radio',
      label: 'Show Caption',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    caption: {
      type: 'text',
      label: 'Caption Text',
    },
  },
  defaultProps: {
    source: 'youtube',
    videoId: 'dQw4w9WgXcQ',
    videoUrl: '',
    autoplay: false,
    muted: false,
    loop: false,
    controls: true,
    aspectRatio: '56.25%',
    maxWidth: '100%',
    align: 'center',
    borderRadius: 2,
    shadow: true,
    showCaption: false,
    caption: '',
  },
  render: ({
    source,
    videoId,
    videoUrl,
    autoplay,
    muted,
    loop,
    controls,
    aspectRatio,
    maxWidth,
    align,
    borderRadius,
    shadow,
    showCaption,
    caption,
  }) => {
    const getEmbedUrl = () => {
      const params = new URLSearchParams();
      if (autoplay) params.append('autoplay', '1');
      if (muted) params.append('mute', '1');
      if (loop) params.append('loop', '1');
      if (!controls) params.append('controls', '0');

      switch (source) {
        case 'youtube':
          if (loop) params.append('playlist', videoId);
          return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
        case 'vimeo':
          return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
        default:
          return videoUrl;
      }
    };

    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: align,
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: maxWidth,
            paddingBottom: aspectRatio,
            borderRadius: `${borderRadiusValue}px`,
            overflow: 'hidden',
            boxShadow: shadow ? '0 10px 40px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          {source === 'direct' ? (
            <Box
              component="video"
              src={videoUrl}
              autoPlay={autoplay}
              muted={muted}
              loop={loop}
              controls={controls}
              playsInline
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              component="iframe"
              src={getEmbedUrl()}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </Box>

        {showCaption && caption && (
          <Typography
            variant="caption"
            sx={{
              mt: 1.5,
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: maxWidth,
            }}
          >
            {caption}
          </Typography>
        )}
      </Box>
    );
  },
};

export default Video;
