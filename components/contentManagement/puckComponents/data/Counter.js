import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export const Counter = {
  label: 'Animated Counter',
  fields: {
    // Value
    value: {
      type: 'number',
      label: 'Target Value',
    },
    startValue: {
      type: 'number',
      label: 'Start Value',
    },
    prefix: {
      type: 'text',
      label: 'Prefix (e.g., $)',
    },
    suffix: {
      type: 'text',
      label: 'Suffix (e.g., +, %, K)',
    },
    decimals: {
      type: 'select',
      label: 'Decimal Places',
      options: [
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
      ],
    },
    thousandsSeparator: {
      type: 'radio',
      label: 'Thousands Separator',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },

    // Animation
    duration: {
      type: 'select',
      label: 'Animation Duration',
      options: [
        { label: 'Fast (1s)', value: 1000 },
        { label: 'Normal (2s)', value: 2000 },
        { label: 'Slow (3s)', value: 3000 },
        { label: 'Very Slow (5s)', value: 5000 },
      ],
    },
    startOnView: {
      type: 'radio',
      label: 'Start When Visible',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    easing: {
      type: 'select',
      label: 'Easing',
      options: [
        { label: 'Ease Out', value: 'easeOut' },
        { label: 'Ease In Out', value: 'easeInOut' },
        { label: 'Linear', value: 'linear' },
      ],
    },

    // Label
    label: {
      type: 'text',
      label: 'Label',
    },
    labelPosition: {
      type: 'select',
      label: 'Label Position',
      options: [
        { label: 'Below', value: 'below' },
        { label: 'Above', value: 'above' },
        { label: 'None', value: 'none' },
      ],
    },

    // Styling
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'h5' },
        { label: 'Medium', value: 'h4' },
        { label: 'Large', value: 'h3' },
        { label: 'Extra Large', value: 'h2' },
        { label: 'Huge', value: 'h1' },
      ],
    },
    color: {
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Primary', value: 'primary.main' },
        { label: 'Secondary', value: 'secondary.main' },
        { label: 'Text Primary', value: 'text.primary' },
        { label: 'Success', value: 'success.main' },
        { label: 'Error', value: 'error.main' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customColor: {
      type: 'text',
      label: 'Custom Color',
    },
    fontWeight: {
      type: 'select',
      label: 'Font Weight',
      options: [
        { label: 'Normal', value: 400 },
        { label: 'Medium', value: 500 },
        { label: 'Semi Bold', value: 600 },
        { label: 'Bold', value: 700 },
        { label: 'Extra Bold', value: 800 },
      ],
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  },
  defaultProps: {
    value: 1000,
    startValue: 0,
    prefix: '',
    suffix: '+',
    decimals: 0,
    thousandsSeparator: true,
    duration: 2000,
    startOnView: true,
    easing: 'easeOut',
    label: 'Happy Customers',
    labelPosition: 'below',
    size: 'h3',
    color: 'primary.main',
    customColor: '',
    fontWeight: 700,
    align: 'center',
  },
  render: ({
    value,
    startValue,
    prefix,
    suffix,
    decimals,
    thousandsSeparator,
    duration,
    startOnView,
    easing,
    label,
    labelPosition,
    size,
    color,
    customColor,
    fontWeight,
    align,
  }) => {
    const [count, setCount] = useState(startValue);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    const easingFunctions = {
      easeOut: (t) => 1 - Math.pow(1 - t, 3),
      easeInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      linear: (t) => t,
    };

    useEffect(() => {
      if (!startOnView) {
        setHasStarted(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [startOnView, hasStarted]);

    useEffect(() => {
      if (!hasStarted) return;

      const startTime = Date.now();
      const easeFn = easingFunctions[easing] || easingFunctions.easeOut;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeFn(progress);
        const currentValue = startValue + (value - startValue) * easedProgress;
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [hasStarted, value, startValue, duration, easing]);

    const formatNumber = (num) => {
      const fixed = num.toFixed(decimals);
      if (!thousandsSeparator) return fixed;
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };

    const displayColor = color === 'custom' ? customColor : color;

    return (
      <Box ref={ref} sx={{ textAlign: align }}>
        {labelPosition === 'above' && label && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
            {label}
          </Typography>
        )}

        <Typography
          variant={size}
          sx={{
            color: displayColor,
            fontWeight: fontWeight,
            fontFamily: 'inherit',
          }}
        >
          {prefix}
          {formatNumber(count)}
          {suffix}
        </Typography>

        {labelPosition === 'below' && label && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            {label}
          </Typography>
        )}
      </Box>
    );
  },
};

export default Counter;
