import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

export const Countdown = {
  label: 'Countdown Timer',
  fields: {
    // Target
    targetDate: {
      type: 'text',
      label: 'Target Date (YYYY-MM-DD HH:MM)',
    },

    // Display
    showDays: {
      type: 'radio',
      label: 'Show Days',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showHours: {
      type: 'radio',
      label: 'Show Hours',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showMinutes: {
      type: 'radio',
      label: 'Show Minutes',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showSeconds: {
      type: 'radio',
      label: 'Show Seconds',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    labels: {
      type: 'select',
      label: 'Labels',
      options: [
        { label: 'Full (Days, Hours...)', value: 'full' },
        { label: 'Short (D, H, M, S)', value: 'short' },
        { label: 'None', value: 'none' },
      ],
    },

    // Expired message
    expiredMessage: {
      type: 'text',
      label: 'Expired Message',
    },

    // Styling
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Cards', value: 'cards' },
        { label: 'Inline', value: 'inline' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    numberColor: {
      type: 'text',
      label: 'Number Color',
    },
    labelColor: {
      type: 'text',
      label: 'Label Color',
    },
    backgroundColor: {
      type: 'text',
      label: 'Card Background Color',
    },
    separatorStyle: {
      type: 'select',
      label: 'Separator',
      options: [
        { label: 'Colon', value: 'colon' },
        { label: 'Dot', value: 'dot' },
        { label: 'None', value: 'none' },
      ],
    },
  },
  defaultProps: {
    targetDate: '2025-12-31 00:00',
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    labels: 'full',
    expiredMessage: 'Event has ended',
    layout: 'cards',
    size: 'medium',
    numberColor: '',
    labelColor: '',
    backgroundColor: '',
    separatorStyle: 'colon',
  },
  render: ({
    targetDate,
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    labels,
    expiredMessage,
    layout,
    size,
    numberColor,
    labelColor,
    backgroundColor,
    separatorStyle,
  }) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
    });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
        }

        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
          expired: false,
        };
      };

      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    const getLabel = (key) => {
      const fullLabels = { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };
      const shortLabels = { days: 'D', hours: 'H', minutes: 'M', seconds: 'S' };
      if (labels === 'full') return fullLabels[key];
      if (labels === 'short') return shortLabels[key];
      return '';
    };

    const getSizes = () => {
      switch (size) {
        case 'small':
          return { number: 'h5', label: 'caption', padding: 1.5, minWidth: 50, gap: 1 };
        case 'large':
          return { number: 'h3', label: 'body1', padding: 3, minWidth: 90, gap: 3 };
        default:
          return { number: 'h4', label: 'body2', padding: 2, minWidth: 70, gap: 2 };
      }
    };

    const sizes = getSizes();

    const getSeparator = () => {
      if (separatorStyle === 'none') return null;
      return (
        <Typography
          variant={sizes.number}
          sx={{
            color: numberColor || 'text.primary',
            fontWeight: 700,
            alignSelf: 'flex-start',
            mt: layout === 'cards' ? sizes.padding : 0,
          }}
        >
          {separatorStyle === 'colon' ? ':' : '·'}
        </Typography>
      );
    };

    if (timeLeft.expired) {
      return (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h5" color="text.secondary">
            {expiredMessage}
          </Typography>
        </Box>
      );
    }

    const units = [
      { key: 'days', value: timeLeft.days, show: showDays },
      { key: 'hours', value: timeLeft.hours, show: showHours },
      { key: 'minutes', value: timeLeft.minutes, show: showMinutes },
      { key: 'seconds', value: timeLeft.seconds, show: showSeconds },
    ].filter((u) => u.show);

    // Minimal layout
    if (layout === 'minimal') {
      const parts = units.map((u) => String(u.value).padStart(2, '0'));
      return (
        <Typography
          variant={sizes.number}
          sx={{
            fontWeight: 700,
            color: numberColor || 'text.primary',
            fontFamily: 'monospace',
          }}
        >
          {parts.join(separatorStyle === 'colon' ? ':' : ' · ')}
        </Typography>
      );
    }

    // Inline layout
    if (layout === 'inline') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: sizes.gap, flexWrap: 'wrap' }}>
          {units.map((unit, index) => (
            <React.Fragment key={unit.key}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                <Typography
                  variant={sizes.number}
                  sx={{
                    fontWeight: 700,
                    color: numberColor || 'text.primary',
                    fontFamily: 'monospace',
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </Typography>
                {labels !== 'none' && (
                  <Typography variant={sizes.label} sx={{ color: labelColor || 'text.secondary' }}>
                    {getLabel(unit.key)}
                  </Typography>
                )}
              </Box>
              {index < units.length - 1 && getSeparator()}
            </React.Fragment>
          ))}
        </Box>
      );
    }

    // Cards layout (default)
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: sizes.gap, flexWrap: 'wrap' }}>
        {units.map((unit, index) => (
          <React.Fragment key={unit.key}>
            <Paper
              elevation={1}
              sx={{
                p: sizes.padding,
                minWidth: sizes.minWidth,
                textAlign: 'center',
                backgroundColor: backgroundColor || 'background.paper',
              }}
            >
              <Typography
                variant={sizes.number}
                sx={{
                  fontWeight: 700,
                  color: numberColor || 'text.primary',
                  fontFamily: 'monospace',
                  lineHeight: 1,
                }}
              >
                {String(unit.value).padStart(2, '0')}
              </Typography>
              {labels !== 'none' && (
                <Typography
                  variant={sizes.label}
                  sx={{
                    color: labelColor || 'text.secondary',
                    mt: 0.5,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {getLabel(unit.key)}
                </Typography>
              )}
            </Paper>
            {index < units.length - 1 && getSeparator()}
          </React.Fragment>
        ))}
      </Box>
    );
  },
};

export default Countdown;
