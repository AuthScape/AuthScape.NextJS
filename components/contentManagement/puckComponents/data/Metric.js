import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export const Metric = {
  label: 'Metric',
  fields: {
    // Value
    value: {
      type: 'text',
      label: 'Value',
    },
    label: {
      type: 'text',
      label: 'Label',
    },
    description: {
      type: 'text',
      label: 'Description',
    },

    // Trend
    showTrend: {
      type: 'radio',
      label: 'Show Trend',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    trendValue: {
      type: 'text',
      label: 'Trend Value (e.g., +12%)',
    },
    trendDirection: {
      type: 'select',
      label: 'Trend Direction',
      options: [
        { label: 'Up (Positive)', value: 'up' },
        { label: 'Down (Negative)', value: 'down' },
        { label: 'Flat', value: 'flat' },
        { label: 'Up (Negative)', value: 'up_negative' },
        { label: 'Down (Positive)', value: 'down_positive' },
      ],
    },
    trendPeriod: {
      type: 'text',
      label: 'Trend Period (e.g., vs last month)',
    },

    // Icon
    showIcon: {
      type: 'radio',
      label: 'Show Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    icon: {
      type: 'select',
      label: 'Icon',
      options: [
        { label: 'Analytics', value: 'analytics' },
        { label: 'People', value: 'people' },
        { label: 'Shopping Cart', value: 'shopping_cart' },
        { label: 'Payments', value: 'payments' },
        { label: 'Visibility', value: 'visibility' },
        { label: 'Favorite', value: 'favorite' },
        { label: 'Star', value: 'star' },
        { label: 'Speed', value: 'speed' },
        { label: 'Inventory', value: 'inventory' },
        { label: 'Account Balance', value: 'account_balance_wallet' },
      ],
    },
    iconColor: {
      type: 'text',
      label: 'Icon Color',
    },
    iconBgColor: {
      type: 'text',
      label: 'Icon Background Color',
    },

    // Layout
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Compact', value: 'compact' },
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

    // Styling
    showCard: {
      type: 'radio',
      label: 'Show Card Background',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    valueColor: {
      type: 'text',
      label: 'Value Color',
    },
    valueSize: {
      type: 'select',
      label: 'Value Size',
      options: [
        { label: 'Small', value: 'h5' },
        { label: 'Medium', value: 'h4' },
        { label: 'Large', value: 'h3' },
        { label: 'Extra Large', value: 'h2' },
      ],
    },
    elevation: {
      type: 'select',
      label: 'Elevation',
      options: [
        { label: 'None', value: 0 },
        { label: 'Small', value: 1 },
        { label: 'Medium', value: 3 },
        { label: 'Large', value: 6 },
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
    value: '$12,450',
    label: 'Revenue',
    description: 'Total sales this month',
    showTrend: true,
    trendValue: '+12.5%',
    trendDirection: 'up',
    trendPeriod: 'vs last month',
    showIcon: true,
    icon: 'payments',
    iconColor: '#ffffff',
    iconBgColor: '',
    layout: 'vertical',
    align: 'left',
    showCard: true,
    backgroundColor: '#ffffff',
    valueColor: '',
    valueSize: 'h4',
    elevation: 1,
    borderRadius: 2,
  },
  render: ({
    value,
    label,
    description,
    showTrend,
    trendValue,
    trendDirection,
    trendPeriod,
    showIcon,
    icon,
    iconColor,
    iconBgColor,
    layout,
    align,
    showCard,
    backgroundColor,
    valueColor,
    valueSize,
    elevation,
    borderRadius,
  }) => {
    const getTrendIcon = () => {
      if (trendDirection === 'up' || trendDirection === 'up_negative') {
        return <TrendingUpIcon fontSize="small" />;
      }
      if (trendDirection === 'down' || trendDirection === 'down_positive') {
        return <TrendingDownIcon fontSize="small" />;
      }
      return <TrendingFlatIcon fontSize="small" />;
    };

    const getTrendColor = () => {
      if (trendDirection === 'up' || trendDirection === 'down_positive') {
        return 'success.main';
      }
      if (trendDirection === 'down' || trendDirection === 'up_negative') {
        return 'error.main';
      }
      return 'text.secondary';
    };

    const borderRadiusValue = borderRadius * 4;

    const content = (
      <>
        {/* Icon */}
        {showIcon && (
          <Box
            sx={{
              width: layout === 'compact' ? 40 : 48,
              height: layout === 'compact' ? 40 : 48,
              borderRadius: 2,
              backgroundColor: iconBgColor || 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Box
              component="span"
              className="material-icons"
              sx={{ fontSize: layout === 'compact' ? 20 : 24, color: iconColor }}
            >
              {icon}
            </Box>
          </Box>
        )}

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {label && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            >
              {label}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Typography
              variant={valueSize}
              sx={{
                fontWeight: 700,
                color: valueColor || 'text.primary',
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>

            {showTrend && trendValue && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.25,
                  color: getTrendColor(),
                }}
              >
                {getTrendIcon()}
                <Typography variant="body2" fontWeight={600}>
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>

          {showTrend && trendPeriod && (
            <Typography variant="caption" color="text.secondary">
              {trendPeriod}
            </Typography>
          )}

          {description && !showTrend && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
      </>
    );

    const containerSx = {
      display: 'flex',
      flexDirection: layout === 'horizontal' ? 'row' : 'column',
      alignItems: layout === 'horizontal' ? 'center' : align === 'center' ? 'center' : 'flex-start',
      gap: layout === 'compact' ? 1.5 : 2,
      textAlign: align,
    };

    if (showCard) {
      return (
        <Paper
          elevation={elevation}
          sx={{
            p: layout === 'compact' ? 2 : 3,
            backgroundColor: backgroundColor,
            borderRadius: `${borderRadiusValue}px`,
            ...containerSx,
          }}
        >
          {content}
        </Paper>
      );
    }

    return <Box sx={containerSx}>{content}</Box>;
  },
};

export default Metric;
