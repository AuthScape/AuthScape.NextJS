import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  borderRadiusField,
  textColorField,
} from '../shared/fieldTypes';

export const Timeline = {
  label: 'Timeline',
  fields: {
    items: {
      type: 'array',
      label: 'Timeline Items',
      arrayFields: {
        date: { type: 'text', label: 'Date/Time' },
        title: { type: 'text', label: 'Title' },
        content: { type: 'textarea', label: 'Content' },
        icon: { type: 'text', label: 'Icon (Material Icon name)' },
        highlight: {
          type: 'radio',
          label: 'Highlight',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
      },
      defaultItemProps: {
        date: '2024',
        title: 'Event Title',
        content: 'Description of this event or milestone.',
        icon: '',
        highlight: false,
      },
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Left Aligned', value: 'left' },
        { label: 'Alternating', value: 'alternating' },
        { label: 'Centered', value: 'centered' },
      ],
    },
    orientation: {
      type: 'select',
      label: 'Orientation',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },

    // Line Styling
    lineColor: {
      type: 'select',
      label: 'Line Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Gray', value: '#e0e0e0' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customLineColor: {
      type: 'text',
      label: 'Custom Line Color',
    },
    lineWidth: {
      type: 'select',
      label: 'Line Width',
      options: [
        { label: 'Thin (2px)', value: 2 },
        { label: 'Medium (3px)', value: 3 },
        { label: 'Thick (4px)', value: 4 },
      ],
    },

    // Dot Styling
    dotSize: {
      type: 'select',
      label: 'Dot Size',
      options: [
        { label: 'Small (12px)', value: 12 },
        { label: 'Medium (16px)', value: 16 },
        { label: 'Large (20px)', value: 20 },
        { label: 'Extra Large (24px)', value: 24 },
      ],
    },
    dotColor: {
      type: 'select',
      label: 'Dot Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'White with Border', value: 'white-border' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customDotColor: {
      type: 'text',
      label: 'Custom Dot Color',
    },
    dotStyle: {
      type: 'select',
      label: 'Dot Style',
      options: [
        { label: 'Filled', value: 'filled' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Icon', value: 'icon' },
      ],
    },

    // Card Styling
    showCards: {
      type: 'radio',
      label: 'Show Cards',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    cardBackgroundColor: {
      type: 'text',
      label: 'Card Background Color',
    },
    borderRadius: borderRadiusField,

    // Text Colors
    dateColor: {
      type: 'select',
      label: 'Date Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'text.secondary' },
        { label: 'Dark', value: '#212121' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customDateColor: {
      type: 'text',
      label: 'Custom Date Color',
    },
    titleColor: textColorField,
    contentColor: {
      type: 'select',
      label: 'Content Color',
      options: [
        { label: 'Default', value: 'text.secondary' },
        { label: 'Primary', value: 'text.primary' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customContentColor: {
      type: 'text',
      label: 'Custom Content Color',
    },

    // Spacing
    spacing: {
      type: 'select',
      label: 'Item Spacing',
      options: [
        { label: 'Compact (24px)', value: 24 },
        { label: 'Normal (48px)', value: 48 },
        { label: 'Spacious (64px)', value: 64 },
      ],
    },
  },
  defaultProps: {
    items: [
      { date: '2020', title: 'Company Founded', content: 'We started our journey with a vision to transform the industry.', icon: 'rocket_launch', highlight: false },
      { date: '2021', title: 'First Major Client', content: 'Secured our first enterprise client and expanded the team.', icon: 'handshake', highlight: false },
      { date: '2022', title: 'Product Launch', content: 'Released our flagship product to overwhelming positive response.', icon: 'celebration', highlight: true },
      { date: '2023', title: 'Global Expansion', content: 'Opened offices in 5 new countries and grew to 100+ employees.', icon: 'public', highlight: false },
      { date: '2024', title: 'Industry Leader', content: 'Recognized as a market leader with multiple awards.', icon: 'emoji_events', highlight: true },
    ],
    layout: 'left',
    orientation: 'vertical',
    lineColor: 'primary.main',
    customLineColor: '',
    lineWidth: 2,
    dotSize: 16,
    dotColor: 'primary.main',
    customDotColor: '',
    dotStyle: 'filled',
    showCards: true,
    cardBackgroundColor: '#ffffff',
    borderRadius: 2,
    dateColor: 'primary.main',
    customDateColor: '',
    titleColor: 'text.primary',
    contentColor: 'text.secondary',
    customContentColor: '',
    spacing: 48,
  },
  render: ({
    items,
    layout,
    orientation,
    lineColor,
    customLineColor,
    lineWidth,
    dotSize,
    dotColor,
    customDotColor,
    dotStyle,
    showCards,
    cardBackgroundColor,
    borderRadius,
    dateColor,
    customDateColor,
    titleColor,
    contentColor,
    customContentColor,
    spacing,
  }) => {
    const borderRadiusValue = typeof borderRadius === 'string' ? borderRadius : borderRadius * 4;
    const finalLineColor = lineColor === 'custom' ? customLineColor : lineColor;
    const finalDotColor = dotColor === 'custom' ? customDotColor : (dotColor === 'white-border' ? '#ffffff' : dotColor);
    const finalDateColor = dateColor === 'custom' ? customDateColor : dateColor;
    const finalContentColor = contentColor === 'custom' ? customContentColor : contentColor;

    const getDotStyles = (item) => {
      const baseStyles = {
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        flexShrink: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      if (dotStyle === 'outlined') {
        return {
          ...baseStyles,
          backgroundColor: cardBackgroundColor || '#ffffff',
          border: `3px solid`,
          borderColor: item.highlight ? 'secondary.main' : finalDotColor,
        };
      }

      if (dotStyle === 'icon' && item.icon) {
        return {
          ...baseStyles,
          backgroundColor: item.highlight ? 'secondary.main' : finalDotColor,
          width: dotSize + 8,
          height: dotSize + 8,
        };
      }

      return {
        ...baseStyles,
        backgroundColor: item.highlight ? 'secondary.main' : finalDotColor,
        border: dotColor === 'white-border' ? `3px solid ${finalLineColor}` : 'none',
      };
    };

    // Vertical Timeline
    if (orientation === 'vertical') {
      return (
        <Box sx={{ position: 'relative' }}>
          {items.map((item, index) => {
            const isLeft = layout === 'left' || (layout === 'alternating' && index % 2 === 0);
            const isCentered = layout === 'centered';

            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: isLeft && !isCentered ? 'row' : 'row-reverse',
                  justifyContent: isCentered ? 'center' : 'flex-start',
                  alignItems: 'flex-start',
                  mb: index < items.length - 1 ? `${spacing}px` : 0,
                  position: 'relative',
                }}
              >
                {/* Line */}
                {index < items.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: isCentered ? '50%' : (layout === 'alternating' ? '50%' : dotSize / 2),
                      top: dotSize,
                      width: lineWidth,
                      height: `calc(100% + ${spacing}px - ${dotSize}px)`,
                      backgroundColor: finalLineColor,
                      transform: isCentered || layout === 'alternating' ? 'translateX(-50%)' : 'none',
                    }}
                  />
                )}

                {/* Content Side */}
                {!isCentered && layout === 'alternating' && (
                  <Box sx={{ flex: 1, pr: isLeft ? 3 : 0, pl: !isLeft ? 3 : 0 }}>
                    {!isLeft && renderContent(item)}
                  </Box>
                )}

                {/* Dot */}
                <Box
                  sx={{
                    ...getDotStyles(item),
                    mx: isCentered || layout === 'alternating' ? 2 : 0,
                    mr: layout === 'left' ? 3 : (layout === 'alternating' ? 2 : 0),
                  }}
                >
                  {dotStyle === 'icon' && item.icon && (
                    <Box
                      component="span"
                      className="material-icons"
                      sx={{ fontSize: dotSize * 0.6, color: '#ffffff' }}
                    >
                      {item.icon}
                    </Box>
                  )}
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    flex: isCentered ? 'none' : 1,
                    maxWidth: isCentered ? '400px' : 'none',
                    pl: !isLeft && !isCentered ? 3 : 0,
                    pr: isLeft && !isCentered && layout === 'alternating' ? 3 : 0,
                  }}
                >
                  {(layout !== 'alternating' || isLeft) && renderContent(item)}
                </Box>

                {/* Right Side Content for Alternating */}
                {!isCentered && layout === 'alternating' && (
                  <Box sx={{ flex: 1, pl: !isLeft ? 0 : 3, pr: isLeft ? 0 : 3 }}>
                    {isLeft && <Box />}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      );
    }

    // Horizontal Timeline
    return (
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          pb: 2,
          position: 'relative',
        }}
      >
        {/* Horizontal Line */}
        <Box
          sx={{
            position: 'absolute',
            top: dotSize / 2,
            left: 0,
            right: 0,
            height: lineWidth,
            backgroundColor: finalLineColor,
          }}
        />

        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 200,
              flex: 1,
              px: 2,
            }}
          >
            {/* Dot */}
            <Box sx={getDotStyles(item)}>
              {dotStyle === 'icon' && item.icon && (
                <Box
                  component="span"
                  className="material-icons"
                  sx={{ fontSize: dotSize * 0.6, color: '#ffffff' }}
                >
                  {item.icon}
                </Box>
              )}
            </Box>

            {/* Content */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              {renderContent(item, true)}
            </Box>
          </Box>
        ))}
      </Box>
    );

    function renderContent(item, isHorizontal = false) {
      const content = (
        <Box sx={{ textAlign: isHorizontal ? 'center' : 'left' }}>
          {/* Date */}
          <Typography
            variant="overline"
            sx={{
              color: finalDateColor,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {item.date}
          </Typography>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              color: titleColor,
              fontWeight: 600,
              mt: 0.5,
              mb: 1,
            }}
          >
            {item.title}
          </Typography>

          {/* Content */}
          <Typography
            variant="body2"
            sx={{
              color: finalContentColor,
              lineHeight: 1.6,
            }}
          >
            {item.content}
          </Typography>
        </Box>
      );

      if (showCards) {
        return (
          <Paper
            elevation={1}
            sx={{
              backgroundColor: cardBackgroundColor,
              borderRadius: `${borderRadiusValue}px`,
              p: 2.5,
              borderLeft: item.highlight ? '4px solid' : 'none',
              borderColor: 'secondary.main',
            }}
          >
            {content}
          </Paper>
        );
      }

      return content;
    }
  },
};

export default Timeline;
