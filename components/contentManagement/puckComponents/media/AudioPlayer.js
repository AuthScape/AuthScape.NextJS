import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Slider,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';

export const AudioPlayer = {
  label: 'Audio Player',
  fields: {
    // Audio Source
    src: {
      type: 'text',
      label: 'Audio URL',
    },
    title: {
      type: 'text',
      label: 'Track Title',
    },
    artist: {
      type: 'text',
      label: 'Artist Name',
    },
    coverImage: {
      type: 'text',
      label: 'Cover Image URL',
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
    preload: {
      type: 'select',
      label: 'Preload',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Metadata', value: 'metadata' },
        { label: 'None', value: 'none' },
      ],
    },

    // Display Options
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Minimal', value: 'minimal' },
        { label: 'Standard', value: 'standard' },
        { label: 'Full', value: 'full' },
      ],
    },
    showVolumeControl: {
      type: 'radio',
      label: 'Show Volume Control',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showProgressBar: {
      type: 'radio',
      label: 'Show Progress Bar',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showTime: {
      type: 'radio',
      label: 'Show Time',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Styling
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    accentColor: {
      type: 'text',
      label: 'Accent Color',
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
    elevation: {
      type: 'select',
      label: 'Shadow',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
      ],
    },
  },
  defaultProps: {
    src: '',
    title: 'Audio Track',
    artist: 'Artist Name',
    coverImage: '',
    autoplay: false,
    loop: false,
    preload: 'metadata',
    variant: 'standard',
    showVolumeControl: true,
    showProgressBar: true,
    showTime: true,
    backgroundColor: '#ffffff',
    accentColor: '',
    borderRadius: 2,
    elevation: 2,
  },
  render: ({
    src,
    title,
    artist,
    coverImage,
    autoplay,
    loop,
    preload,
    variant,
    showVolumeControl,
    showProgressBar,
    showTime,
    backgroundColor,
    accentColor,
    borderRadius,
    elevation,
  }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.loop = loop;
        audio.volume = volume;
        audio.muted = isMuted;
      }
    }, [loop, volume, isMuted]);

    const formatTime = (time) => {
      if (isNaN(time)) return '0:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };

    const handlePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const handleSeek = (_, value) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value;
        setCurrentTime(value);
      }
    };

    const handleVolumeChange = (_, value) => {
      setVolume(value);
      if (audioRef.current) {
        audioRef.current.volume = value;
      }
      if (value > 0) setIsMuted(false);
    };

    const toggleMute = () => {
      setIsMuted(!isMuted);
      if (audioRef.current) {
        audioRef.current.muted = !isMuted;
      }
    };

    const borderRadiusValue = borderRadius * 4;

    if (!src) {
      return (
        <Paper
          elevation={elevation}
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: backgroundColor,
            borderRadius: `${borderRadiusValue}px`,
          }}
        >
          <Typography color="text.secondary">
            Add an audio URL to preview the player
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
        }}
      >
        <audio
          ref={audioRef}
          src={src}
          preload={preload}
          autoPlay={autoplay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', p: variant === 'minimal' ? 1 : 2 }}>
          {/* Cover Image */}
          {variant === 'full' && coverImage && (
            <Box
              component="img"
              src={coverImage}
              alt={title}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
                mr: 2,
              }}
            />
          )}

          {/* Controls & Info */}
          <Box sx={{ flex: 1 }}>
            {/* Title & Artist */}
            {variant !== 'minimal' && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {title}
                </Typography>
                {variant === 'full' && artist && (
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {artist}
                  </Typography>
                )}
              </Box>
            )}

            {/* Progress Bar */}
            {showProgressBar && (
              <Stack direction="row" alignItems="center" spacing={1}>
                {showTime && (
                  <Typography variant="caption" sx={{ minWidth: 40 }}>
                    {formatTime(currentTime)}
                  </Typography>
                )}
                <Slider
                  value={currentTime}
                  max={duration || 100}
                  onChange={handleSeek}
                  size="small"
                  sx={{
                    color: accentColor || 'primary.main',
                    '& .MuiSlider-thumb': {
                      width: 12,
                      height: 12,
                    },
                  }}
                />
                {showTime && (
                  <Typography variant="caption" sx={{ minWidth: 40 }}>
                    {formatTime(duration)}
                  </Typography>
                )}
              </Stack>
            )}

            {/* Controls */}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 1 }}>
              <IconButton size="small" onClick={handlePlayPause}>
                {isPlaying ? (
                  <PauseIcon sx={{ color: accentColor || 'primary.main' }} />
                ) : (
                  <PlayArrowIcon sx={{ color: accentColor || 'primary.main' }} />
                )}
              </IconButton>

              {loop && (
                <IconButton size="small">
                  <RepeatIcon fontSize="small" color="primary" />
                </IconButton>
              )}

              {showVolumeControl && (
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ ml: 'auto' }}>
                  <IconButton size="small" onClick={toggleMute}>
                    {isMuted || volume === 0 ? (
                      <VolumeOffIcon fontSize="small" />
                    ) : (
                      <VolumeUpIcon fontSize="small" />
                    )}
                  </IconButton>
                  {variant !== 'minimal' && (
                    <Slider
                      value={isMuted ? 0 : volume}
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={handleVolumeChange}
                      size="small"
                      sx={{ width: 80 }}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          </Box>
        </Box>
      </Paper>
    );
  },
};

export default AudioPlayer;
