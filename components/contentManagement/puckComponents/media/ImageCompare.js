import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export const ImageCompare = {
  label: 'Image Compare',
  fields: {
    // Images
    beforeImage: {
      type: 'text',
      label: 'Before Image URL',
    },
    afterImage: {
      type: 'text',
      label: 'After Image URL',
    },
    beforeLabel: {
      type: 'text',
      label: 'Before Label',
    },
    afterLabel: {
      type: 'text',
      label: 'After Label',
    },

    // Settings
    initialPosition: {
      type: 'select',
      label: 'Initial Position',
      options: [
        { label: '25%', value: 25 },
        { label: '50%', value: 50 },
        { label: '75%', value: 75 },
      ],
    },
    showLabels: {
      type: 'radio',
      label: 'Show Labels',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    labelPosition: {
      type: 'select',
      label: 'Label Position',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },

    // Handle Style
    handleStyle: {
      type: 'select',
      label: 'Handle Style',
      options: [
        { label: 'Line', value: 'line' },
        { label: 'Circle', value: 'circle' },
        { label: 'Arrows', value: 'arrows' },
      ],
    },
    handleColor: {
      type: 'text',
      label: 'Handle Color',
    },
    handleWidth: {
      type: 'select',
      label: 'Handle Width',
      options: [
        { label: 'Thin (2px)', value: 2 },
        { label: 'Normal (4px)', value: 4 },
        { label: 'Thick (6px)', value: 6 },
      ],
    },

    // Styling
    aspectRatio: {
      type: 'select',
      label: 'Aspect Ratio',
      options: [
        { label: 'Wide (16:9)', value: '56.25%' },
        { label: 'Standard (4:3)', value: '75%' },
        { label: 'Square (1:1)', value: '100%' },
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
    beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    beforeLabel: 'Before',
    afterLabel: 'After',
    initialPosition: 50,
    showLabels: true,
    labelPosition: 'top',
    handleStyle: 'circle',
    handleColor: '#ffffff',
    handleWidth: 4,
    aspectRatio: '56.25%',
    borderRadius: 2,
  },
  render: ({
    beforeImage,
    afterImage,
    beforeLabel,
    afterLabel,
    initialPosition,
    showLabels,
    labelPosition,
    handleStyle,
    handleColor,
    handleWidth,
    aspectRatio,
    borderRadius,
  }) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
      setPosition(percentage);
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };

    const borderRadiusValue = borderRadius * 4;

    const renderHandle = () => {
      const commonProps = {
        position: 'absolute',
        top: '50%',
        left: `${position}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
        cursor: 'ew-resize',
      };

      if (handleStyle === 'circle') {
        return (
          <Box
            sx={{
              ...commonProps,
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: handleColor,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                width: 0,
                height: 0,
              },
              '&::before': {
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: `6px solid rgba(0,0,0,0.5)`,
                left: 8,
              },
              '&::after': {
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: `6px solid rgba(0,0,0,0.5)`,
                right: 8,
              },
            }}
          />
        );
      }

      if (handleStyle === 'arrows') {
        return (
          <Box
            sx={{
              ...commonProps,
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: handleColor,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1,
            }}
          >
            <Box
              component="span"
              className="material-icons"
              sx={{ fontSize: 20, color: 'text.primary' }}
            >
              chevron_left
            </Box>
            <Box
              component="span"
              className="material-icons"
              sx={{ fontSize: 20, color: 'text.primary' }}
            >
              chevron_right
            </Box>
          </Box>
        );
      }

      // Line style (default)
      return null;
    };

    return (
      <Box
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        sx={{
          position: 'relative',
          paddingBottom: aspectRatio,
          borderRadius: `${borderRadiusValue}px`,
          overflow: 'hidden',
          cursor: 'ew-resize',
          userSelect: 'none',
        }}
      >
        {/* After Image (Background) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${afterImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Before Image (Clipped) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${beforeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        />

        {/* Divider Line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: handleWidth,
            backgroundColor: handleColor,
            transform: 'translateX(-50%)',
            zIndex: 2,
            boxShadow: '0 0 8px rgba(0,0,0,0.3)',
          }}
        />

        {/* Handle */}
        {renderHandle()}

        {/* Labels */}
        {showLabels && (
          <>
            <Box
              sx={{
                position: 'absolute',
                [labelPosition]: 16,
                left: 16,
                zIndex: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#ffffff',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              >
                {beforeLabel}
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                [labelPosition]: 16,
                right: 16,
                zIndex: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#ffffff',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              >
                {afterLabel}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    );
  },
};

export default ImageCompare;
